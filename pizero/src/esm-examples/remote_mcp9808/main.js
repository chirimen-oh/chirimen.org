// ===================================================
// MCP9808 高精度温度センサーの値を WebSocket で送信するプログラム
// ===================================================

import { requestI2CAccess } from "node-web-i2c";
import MCP9808 from "@chirimen/mcp9808";
import { RelayServer } from "./RelayServer.js";

// データを送る間隔 (ミリ秒)
const SEND_INTERVAL_MS = 5000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- センサーの準備 ---
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const mcp9808 = new MCP9808(i2cPort, 0x18);
await mcp9808.init();
await mcp9808.wake();
await mcp9808.setResolution(3);
console.log("MCP9808センサーの準備ができました");

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenMCP");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取る関数 ---
async function readSensorData() {
  const mode = await mcp9808.getResolution();
  const tempC = await mcp9808.readTempC();
  const tempF = await mcp9808.readTempF();
  return { tempC, tempF, mode };
}

for (;;) {
  const sensorData = await readSensorData();
  console.log(
    `T: ${sensorData.tempC}℃ / F: ${sensorData.tempF}℉ (mode:${sensorData.mode})`,
  );

  channel.send(sensorData);
  console.log("送信しました:", JSON.stringify(sensorData));

  await sleep(SEND_INTERVAL_MS);
}

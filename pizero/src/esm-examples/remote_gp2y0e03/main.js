// ===================================================
// GP2Y0E03 赤外線測距センサーの値を WebSocket で送信するプログラム
// ===================================================

import { requestI2CAccess } from "node-web-i2c";
import GP2Y0E03 from "@chirimen/gp2y0e03";
import { RelayServer } from "./RelayServer.js";

// データを送る間隔 (ミリ秒)
const SEND_INTERVAL_MS = 3000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- センサーの準備 ---
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const sensorUnit = new GP2Y0E03(i2cPort, 0x40);
await sensorUnit.init();
console.log("GP2Y0E03センサーの準備ができました");

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenGP2Y");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取る関数 ---
async function readSensorData() {
  const distance = await sensorUnit.read();
  return { distance };
}

for (;;) {
  try {
    const sensorData = await readSensorData();
    console.log(
      sensorData.distance != null
        ? `Distance: ${sensorData.distance}cm`
        : "out of range",
    );

    channel.send(sensorData);
    console.log("送信しました:", JSON.stringify(sensorData));
  } catch (err) {
    console.error("READ ERROR:", err);
  }

  await sleep(SEND_INTERVAL_MS);
}

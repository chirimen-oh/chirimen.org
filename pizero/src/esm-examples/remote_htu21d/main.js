// ===================================================
// HTU21D 温湿度センサーの値を WebSocket で送信するプログラム
// ===================================================

import { requestI2CAccess } from "node-web-i2c";
import HTU21D from "@chirimen/htu21d";
import { RelayServer } from "./RelayServer.js";

// データを送る間隔 (ミリ秒)
const SEND_INTERVAL_MS = 5000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- センサーの準備 ---
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const htu21d = new HTU21D(i2cPort, 0x40);
await htu21d.init();
console.log("HTU21Dセンサーの準備ができました");

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenHTU");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取る関数 ---
async function readSensorData() {
  const temperature = await htu21d.readTemperature();
  const humidity = await htu21d.readHumidity();
  return { temperature, humidity };
}

for (;;) {
  const sensorData = await readSensorData();
  console.log(
    `温度: ${sensorData.temperature}℃ / 湿度: ${sensorData.humidity}%`,
  );

  channel.send(sensorData);
  console.log("送信しました:", JSON.stringify(sensorData));

  await sleep(SEND_INTERVAL_MS);
}

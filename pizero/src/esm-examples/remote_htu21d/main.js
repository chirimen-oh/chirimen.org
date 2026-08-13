// ===================================================
// HTU21D 温湿度センサーの値を WebSocket で送信するプログラム
// ===================================================

import { requestI2CAccess } from "node-web-i2c";
import HTU21D from "@chirimen/htu21d";
import { RelayServer } from "./RelayServer.js";

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
async function readSensor() {
  const temperature = await htu21d.readTemperature();
  const humidity = await htu21d.readHumidity();
  return { temperature, humidity };
}

while (true) {
  const data = await readSensor();
  console.log(`温度: ${data.temperature}℃ / 湿度: ${data.humidity}%`);

  channel.send(data);
  console.log("送信しました:", JSON.stringify(data));

  // データを送る間隔 (ミリ秒)
  await sleep(5000);
}

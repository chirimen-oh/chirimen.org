// ===================================================
// MAX30102 心拍センサーの値を WebSocket で送信するプログラム
// ===================================================

import { requestI2CAccess } from "node-web-i2c";
import MAX30102 from "@chirimen/max30102";
import { RelayServer } from "./RelayServer.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- センサーの準備 ---
const i2cAccess = await requestI2CAccess();
const max30102 = new MAX30102(i2cAccess.ports.get(1));
await max30102.init();
console.log("MAX30102センサーの準備ができました");

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenMAX");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取る関数 ---
async function readSensorData() {
  const { heartRate } = await max30102.read();
  return { heartRate };
}

while (true) {
  const sensorData = await readSensorData();
  console.log(`Heart Rate: ${sensorData.heartRate} bpm`);

  channel.send(sensorData);
  console.log("送信しました:", JSON.stringify(sensorData));
}

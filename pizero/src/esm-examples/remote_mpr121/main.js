// ===================================================
// MPR121 (Grove-Touch) タッチセンサーの値を WebSocket で送信するプログラム
// ===================================================

import { requestI2CAccess } from "node-web-i2c";
import GroveTouch from "@chirimen/grove-touch";
import { RelayServer } from "./RelayServer.js";

// データを送る間隔 (ミリ秒)
const SEND_INTERVAL_MS = 3000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- センサーの準備 ---
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const touchSensor = new GroveTouch(i2cPort, 0x5a);
await touchSensor.init();
console.log("MPR121センサーの準備ができました");

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenMPR");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取る関数 ---
async function readSensorData() {
  // 12チャンネル分のタッチ状態 (true/false) の配列
  const channels = await touchSensor.read();
  return { channels };
}

for (;;) {
  const sensorData = await readSensorData();
  console.log("channels:", JSON.stringify(sensorData.channels));

  channel.send(sensorData);
  console.log("送信しました:", JSON.stringify(sensorData));

  await sleep(SEND_INTERVAL_MS);
}

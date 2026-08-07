// ===================================================
// ADXL345 (Grove 3軸加速度センサー) の値を WebSocket で送信するプログラム
// ===================================================

// --- ライブラリの読み込み ---
import { requestI2CAccess } from "node-web-i2c";
import GROVEACCELEROMETER from "@chirimen/grove-accelerometer";
import { RelayServer } from "./RelayServer.js";

// --- センサーの準備 ---
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const accelerometer = new GROVEACCELEROMETER(i2cPort, 0x53);
await accelerometer.init();
console.log("ADXL345センサーの準備ができました");

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenADXL");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取って送信する ---
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

while (true) {
  const { x, y, z } = await accelerometer.read();
  const sensorData = { x, y, z };
  console.log(`x: ${x} m/s², y: ${y} m/s², z: ${z} m/s²`);
  channel.send(sensorData);
  console.log("送信しました:", JSON.stringify(sensorData));
  // データを送る間隔 (ミリ秒)
  await sleep(4000);
}

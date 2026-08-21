// ===================================================
// AS5600 (非接触回転角センサー) の値を WebSocket で送信するプログラム
// ===================================================

// --- ライブラリの読み込み ---
import { requestI2CAccess } from "node-web-i2c";
import AS5600 from "@chirimen/as5600";
import { RelayServer } from "./RelayServer.js";

// --- センサーの準備 ---
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const as5600 = new AS5600(i2cPort);
await as5600.init();
console.log("AS5600センサーの準備ができました");

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenAS5600");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取って送信する ---
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

while (true) {
  const angle = await as5600.getAngle();
  const { detected, tooLow, tooHigh } = await as5600.getStatus();
  const sensorData = { angle, detected, tooLow, tooHigh };

  console.log(`angle: ${angle.toFixed(1)}° / magnet detected: ${detected}`);
  channel.send(sensorData);
  console.log("送信しました:", JSON.stringify(sensorData));
  // データを送る間隔 (ミリ秒)
  await sleep(3000);
}

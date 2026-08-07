// ===================================================
// AS7341 (分光カラーセンサー) の値を WebSocket で送信するプログラム
// ===================================================

// --- ライブラリの読み込み ---
import { requestI2CAccess } from "node-web-i2c";
import AS7341 from "@chirimen/as7341";
import { RelayServer } from "./RelayServer.js";

// --- 設定 ---
const I2CADDR_AS7341 = 0x39;

// --- センサーの準備 ---
const i2cAccess = await requestI2CAccess();
const as7341 = new AS7341(i2cAccess.ports.get(1), I2CADDR_AS7341);
await as7341.init();
console.log("AS7341センサーの準備ができました");

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenAS7341");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取って送信する ---
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

while (true) {
  // f1〜f8（各波長の強度）、clear（全可視光）、nir（近赤外）
  const sensorData = await as7341.read();
  console.dir(sensorData);
  channel.send(sensorData);
  console.log("送信しました:", JSON.stringify(sensorData));
  // データを送る間隔 (ミリ秒)
  await sleep(3000);
}

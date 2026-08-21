// ===================================================
// AMG8833 (8x8サーモグラフィー) の値を WebSocket で送信するプログラム
// ===================================================

// --- ライブラリの読み込み ---
import { requestI2CAccess } from "node-web-i2c";
import AMG8833 from "@chirimen/amg8833";
import { RelayServer } from "./RelayServer.js";

// --- センサーの準備 ---
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const amg8833 = new AMG8833(i2cPort, 0x69);
await amg8833.init();
console.log("AMG8833センサーの準備ができました");

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenAMG");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータ(8x8の温度分布)を読み取って送信する ---
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

while (true) {
  // pixels: 8行×8列の温度データ(摂氏)の配列
  const pixels = await amg8833.readData();
  const sensorData = { pixels };
  console.log(
    pixels.map((row) => row.map((v) => v.toFixed(1)).join(" ")).join("\n"),
  );
  channel.send(sensorData);
  console.log("送信しました");
  // データを送る間隔 (ミリ秒)
  await sleep(3000);
}

// ===================================================
// PAJ7620 (Grove Gesture ジェスチャーセンサー) の検出結果を WebSocket で送信するプログラム
// ===================================================

// --- ライブラリの読み込み ---
import { requestI2CAccess } from "node-web-i2c";
import PAJ7620 from "@chirimen/grove-gesture";
import { RelayServer } from "./RelayServer.js";

// --- センサーの準備 ---
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const gesture = new PAJ7620(i2cPort, 0x73);
await gesture.init();
console.log("PAJ7620センサーの準備ができました");

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenGesture");
console.log("WebSocketリレーサービスに接続しました");

// --- ジェスチャーを検出したときだけ送信する ---
async function pollGesture() {
  const direction = await gesture.read();
  if (direction === "----") return; // 何も検出されていない場合は送らない

  const sensorData = { direction, timestamp: new Date().toLocaleString() };
  console.log(`ジェスチャーを検出しました: ${direction}`);
  channel.send(sensorData);
  console.log("送信しました:", JSON.stringify(sensorData));
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

console.log("ジェスチャーの検出を待機しています...");
while (true) {
  await pollGesture();
  // ジェスチャーを読み取る間隔 (ミリ秒)。イベント検出型なので短めに設定する
  await sleep(300);
}

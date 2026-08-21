// ===================================================
// MMA7660 (3軸加速度センサー) の値を WebSocket で送信するプログラム
// ===================================================

// --- ライブラリの読み込み ---
import { requestI2CAccess } from "node-web-i2c";
import MMA7660 from "@chirimen/mma7660";
import { RelayServer } from "./RelayServer.js";

// --- センサーの準備 ---
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const mma7660 = new MMA7660(i2cPort, 0x4c);
await mma7660.init();
console.log("MMA7660センサーの準備ができました");

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenMMA");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取って送信する ---
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

while (true) {
  const { X, Y, Z } = await mma7660.getXYZ();
  const { X: gx, Y: gy, Z: gz } = await mma7660.getAcceleration();
  const sensorData = { x: X, y: Y, z: Z, gx, gy, gz };

  console.log(`X: ${X}, Y: ${Y}, Z: ${Z} (${gx}g, ${gy}g, ${gz}g)`);
  channel.send(sensorData);
  console.log("送信しました:", JSON.stringify(sensorData));
  // データを送る間隔 (ミリ秒)
  await sleep(3000);
}

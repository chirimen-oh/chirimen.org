// ===================================================
// Grove水位センサーの値を WebSocket で送信するプログラム
// ===================================================

import { requestI2CAccess } from "node-web-i2c";
import WaterLevelSensor from "@chirimen/grove-water-level-sensor";
import { RelayServer } from "./RelayServer.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- センサーの準備 ---
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const waterLevelSensor = new WaterLevelSensor(i2cPort, 0x77, 0x78);
await waterLevelSensor.init();
console.log("水位センサーの準備ができました");

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenWL");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取る関数 ---
async function readSensor() {
  const high12SectionValue = await waterLevelSensor.getHigh12SectionValue();
  const low8SectionValue = await waterLevelSensor.getLow8SectionValue();
  const waterLevel = await waterLevelSensor.getWaterLevel();
  return { waterLevel, high12SectionValue, low8SectionValue };
}

while (true) {
  const data = await readSensor();
  console.log(`waterLevel: ${data.waterLevel}%`);

  channel.send(data);
  console.log("送信しました:", JSON.stringify(data));

  // データを送る間隔 (ミリ秒)
  await sleep(3000);
}

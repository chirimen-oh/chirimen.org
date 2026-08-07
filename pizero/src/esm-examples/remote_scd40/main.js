// ===================================================
// SCD40 CO2センサーの値を WebSocket で送信するプログラム
// ===================================================

import { requestI2CAccess } from "node-web-i2c";
import SCD40 from "@chirimen/scd40";
import { RelayServer } from "./RelayServer.js";

// データを送る間隔 (ミリ秒)
const SEND_INTERVAL_MS = 5000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- センサーの準備 ---
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const scd40 = new SCD40(i2cPort, 0x62);
await scd40.init();
console.log("serial number:", await scd40.serial_number());
await scd40.start_periodic_measurement();
console.log("SCD40センサーの準備ができました");

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenSCD");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取る関数 ---
// 値が更新されるまで数秒かかります。更新されると data.updated が true になります。
async function readSensorData() {
  return await scd40.getData();
}

for (;;) {
  const sensorData = await readSensorData();
  console.log(
    `CO2: ${sensorData.co2}ppm / ${sensorData.temperature}℃ / ${sensorData.relative_humidity}%`,
  );

  channel.send(sensorData);
  console.log("送信しました:", JSON.stringify(sensorData));

  await sleep(SEND_INTERVAL_MS);
}

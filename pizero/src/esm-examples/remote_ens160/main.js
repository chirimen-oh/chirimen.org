// ===================================================
// ENS160 空気質センサーの値を WebSocket で送信するプログラム
// ===================================================

import { requestI2CAccess } from "node-web-i2c";
import ENS160 from "@chirimen/ens160";
import { RelayServer } from "./RelayServer.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- センサーの準備 ---
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const ens160 = new ENS160(i2cPort, 0x53);
await ens160.init();

// 周囲の温度・湿度を設定しておくと補正精度が上がる
await ens160.set_temperature(22);
await ens160.set_humidity(52);
await sleep(1500);
console.log("ENS160センサーの準備ができました");

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenENS");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取る関数 ---
async function readSensorData() {
  const { AQI, TVOC, eCO2 } = await ens160.get_data();
  const mode = await ens160.get_mode();
  return { AQI, TVOC, eCO2, mode };
}

while (true) {
  const sensorData = await readSensorData();
  console.log(
    `AQI(1-5):${sensorData.AQI}, TVOC:${sensorData.TVOC}ppb, eCO2:${sensorData.eCO2}ppm, mode:${sensorData.mode}`,
  );

  channel.send(sensorData);
  console.log("送信しました:", JSON.stringify(sensorData));

  // データを送る間隔 (ミリ秒)
  await sleep(5000);
}

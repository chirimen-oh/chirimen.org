// ===================================================
// MLX90614 赤外線温度センサーの値を WebSocket で送信するプログラム
// ===================================================

import { requestI2CAccess } from "node-web-i2c";
import MLX90614 from "@chirimen/mlx90614";
import { RelayServer } from "./RelayServer.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- センサーの準備 ---
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const mlx90614 = new MLX90614(i2cPort, 0x5a);
await mlx90614.init();
console.log("MLX90614センサーの準備ができました");

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenMLX");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取る関数 ---
async function readSensorData() {
  // センサーが見ている対象物の温度 (赤外線で計測)
  const objectTemperature = await mlx90614.get_obj_temp();
  // センサー自体(周囲)の温度
  const ambientTemperature = await mlx90614.get_amb_temp();
  return { objectTemperature, ambientTemperature };
}

while (true) {
  const sensorData = await readSensorData();
  console.log(
    `Object: ${sensorData.objectTemperature.toFixed(2)}℃ / Ambient: ${sensorData.ambientTemperature.toFixed(2)}℃`,
  );

  channel.send(sensorData);
  console.log("送信しました:", JSON.stringify(sensorData));

  // データを送る間隔 (ミリ秒)
  await sleep(3000);
}

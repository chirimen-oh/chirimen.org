// ===================================================
// MPU6050 (3軸ジャイロ+3軸加速度 複合センサー) の値を WebSocket で送信するプログラム
// ===================================================

// --- ライブラリの読み込み ---
import { requestI2CAccess } from "node-web-i2c";
import MPU6050 from "@chirimen/mpu6050";
import { RelayServer } from "./RelayServer.js";

// --- センサーの準備 ---
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const mpu6050 = new MPU6050(i2cPort, 0x68);
await mpu6050.init();
console.log("MPU6050センサーの準備ができました");

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenMPU6050");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取って送信する ---
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

while (true) {
  const { temperature, gx, gy, gz, rx, ry, rz } = await mpu6050.readAll();
  const sensorData = {
    temperature: Number(temperature.toFixed(2)),
    gx,
    gy,
    gz,
    rx,
    ry,
    rz,
  };

  console.log(
    [
      `Temperature: ${sensorData.temperature} degree`,
      `Gx: ${gx}, Gy: ${gy}, Gz: ${gz}`,
      `Rx: ${rx}, Ry: ${ry}, Rz: ${rz}`,
    ].join("\n"),
  );
  channel.send(sensorData);
  console.log("送信しました:", JSON.stringify(sensorData));
  // データを送る間隔 (ミリ秒)
  await sleep(3000);
}

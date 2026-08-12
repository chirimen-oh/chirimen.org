// ===================================================
// MPU9250 (3軸ジャイロ+3軸加速度+3軸磁気 複合センサー) の値を WebSocket で送信するプログラム
// MPU6500(ジャイロ+加速度)とAK8963(磁気)の2つのI2Cデバイスで構成される
// ===================================================

// --- ライブラリの読み込み ---
import { requestI2CAccess } from "node-web-i2c";
import MPU6500 from "@chirimen/mpu6500";
import AK8963 from "@chirimen/ak8963";
import { RelayServer } from "./RelayServer.js";

// --- センサーの準備 ---
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const mpu6500 = new MPU6500(i2cPort, 0x68);
const ak8963 = new AK8963(i2cPort, 0x0c);
await mpu6500.init();
await ak8963.init();
console.log("MPU9250センサーの準備ができました");

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenMPU9250");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取って送信する ---
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

while (true) {
  const g = await mpu6500.getGyro();
  const r = await mpu6500.getAcceleration();
  const h = await ak8963.readData();
  const sensorData = {
    gx: g.x,
    gy: g.y,
    gz: g.z,
    rx: r.x,
    ry: r.y,
    rz: r.z,
    hx: h.x,
    hy: h.y,
    hz: h.z,
  };

  console.log(
    [
      `Gx: ${g.x}, Gy: ${g.y}, Gz: ${g.z}`,
      `Rx: ${r.x}, Ry: ${r.y}, Rz: ${r.z}`,
      `Hx: ${h.x}, Hy: ${h.y}, Hz: ${h.z}`,
    ].join("\n"),
  );
  channel.send(sensorData);
  console.log("送信しました:", JSON.stringify(sensorData));
  // データを送る間隔 (ミリ秒)
  await sleep(3000);
}

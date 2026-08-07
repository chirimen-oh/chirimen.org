// ===================================================
// ICM20948 (9軸: 3軸ジャイロ+3軸加速度+3軸磁気 センサー) の値を WebSocket で送信するプログラム
// ===================================================

// --- ライブラリの読み込み ---
import { requestI2CAccess } from "node-web-i2c";
import ICM20948 from "@chirimen/icm20948";
import { RelayServer } from "./RelayServer.js";

// --- センサーの準備 ---
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const icm20948 = new ICM20948(i2cPort);
await icm20948.init();
console.log("ICM20948センサーの準備ができました");

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenICM");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取って送信する ---
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

while (true) {
  const [roll, pitch, yaw, ax, ay, az, gx, gy, gz, mx, my, mz] = await icm20948.getdata();
  const sensorData = { roll, pitch, yaw, ax, ay, az, gx, gy, gz, mx, my, mz };

  console.log(
    [
      `Roll = ${roll.toFixed(2)} , Pitch = ${pitch.toFixed(2)} , Yaw = ${yaw.toFixed(2)}`,
      `Acceleration: X = ${ax}, Y = ${ay}, Z = ${az}`,
      `Gyroscope:     X = ${gx} , Y = ${gy} , Z = ${gz}`,
      `Magnetic:      X = ${mx} , Y = ${my} , Z = ${mz}`,
    ].join("\n"),
  );
  channel.send(sensorData);
  console.log("送信しました:", JSON.stringify(sensorData));
  // データを送る間隔 (ミリ秒)
  await sleep(3000);
}

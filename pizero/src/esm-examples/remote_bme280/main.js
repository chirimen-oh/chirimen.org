// ===================================================
// BME280 温度・湿度・気圧センサーの値を WebSocket で送信するプログラム
// ===================================================

// --- ライブラリの読み込み ---
// I2C通信（センサーとのデータのやりとり）に使うライブラリ
import { requestI2CAccess } from "node-web-i2c";
// BME280（温度・湿度・気圧を測れるセンサー）を動かすためのライブラリ
import BME280 from "@chirimen/bme280";
// リレーサーバー（データの中継役）に接続するためのライブラリ
import { RelayServer } from "./RelayServer.js";

// --- センサーの準備 ---
// I2Cという通信方式でセンサーとつながる「ポート」を取得する
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);

// BME280センサーを初期化（使えるようにする）
// スレーブアドレスが 0x76 のものと 0x77 のものがあるので注意
const bme280 = new BME280(i2cPort, 0x76);
await bme280.init();
console.log("BME280センサーの準備ができました");

// --- WebSocketリレーの準備 ---
// リレーサーバーに接続
const relay = RelayServer("chirimentest", "chirimenSocket");
// データを送れる「チャンネル」を作る
const channel = await relay.subscribe("chirimenBME280");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取る関数 ---
async function readSensorData() {
  const { temperature, humidity, pressure } = await bme280.readData();
  console.log(
    `温度: ${temperature.toFixed(2)}℃ / 湿度: ${humidity.toFixed(2)}% / 気圧: ${pressure.toFixed(2)}hPa`,
  );
  return { temperature, humidity, pressure };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

while (true) {
  // センサーからデータを読み取る
  const sensorData = await readSensorData();

  // チャンネルを通じてデータを送信する
  channel.send(sensorData);
  console.log("送信しました:", JSON.stringify(sensorData));
  // データを送る間隔 (ミリ秒)
  await sleep(5000);
}

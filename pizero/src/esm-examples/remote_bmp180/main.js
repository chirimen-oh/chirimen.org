// ===================================================
// BMP180 気圧・温度センサーの値を WebSocket で送信するプログラム
// ===================================================

// --- ライブラリの読み込み ---
// I2C通信（センサーとのデータのやりとり）に使うライブラリ
import { requestI2CAccess } from "node-web-i2c";
// BMP180（気圧と温度を測れるセンサー）を動かすためのライブラリ
import BMP180 from "@chirimen/bmp180";
// リレーサーバー（データの中継役）に接続するためのライブラリ
import { RelayServer } from "./RelayServer.js";

// --- 設定 ---
// データを送る間隔 (ミリ秒)
const SEND_INTERVAL_MS = 5000;

// --- センサーの準備 ---
// I2Cという通信方式でセンサーとつながる「ポート」を取得する
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);

// BMP180センサーを初期化（使えるようにする）
const bmp180 = new BMP180(i2cPort, 0x77);
await bmp180.init();
console.log("BMP180センサーの準備ができました");

// --- WebSocketリレーの準備 ---
// リレーサーバーに接続
const relay = RelayServer("chirimentest", "chirimenSocket");
// データを送れる「チャンネル」を作る
const channel = await relay.subscribe("chirimenBMP180");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取る関数 ---
async function readSensorData() {
  const pressure = await bmp180.readPressure();
  const temperature = await bmp180.readTemperature();
  console.log(`気圧: ${pressure.toFixed(2)}Pa / 温度: ${temperature}℃`);
  return { pressure, temperature };
}

setInterval(async () => {
  try {
    // センサーからデータを読み取る
    const sensorData = await readSensorData();

    // チャンネルを通じてデータを送信する
    channel.send(sensorData);
    console.log("送信しました:", JSON.stringify(sensorData));
  } catch (error) {
    console.error(`読み取りエラー: ${error.message}`);
  }
}, SEND_INTERVAL_MS);

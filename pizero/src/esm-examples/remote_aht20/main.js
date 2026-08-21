// ===================================================
// AHT20 温湿度センサーの値を WebSocket で送信するプログラム
// ===================================================

// --- ライブラリの読み込み ---
// I2C通信（センサーとのデータのやりとり）に使うライブラリ
import { requestI2CAccess } from "node-web-i2c";
// AHT20（温度と湿度を測れるセンサー）を動かすためのライブラリ (AHT10でも使用可能)
import AHT20 from "@chirimen/ahtx0";
// リレーサーバー（データの中継役）に接続するためのライブラリ
import { RelayServer } from "./RelayServer.js";

// --- センサーの準備 ---
// I2Cという通信方式でセンサーとつながる「ポート」を取得する
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);

// AHT20センサーを初期化（使えるようにする）
const aht20 = new AHT20(i2cPort, 0x38);
await aht20.init();
console.log("AHT20センサーの準備ができました");

// --- WebSocketリレーの準備 ---
// リレーサーバーに接続
const relay = RelayServer("chirimentest", "chirimenSocket");
// データを送れる「チャンネル」を作る
const channel = await relay.subscribe("chirimenAHT20");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取る関数 ---
async function readSensorData() {
  const { temperature, humidity } = await aht20.readData();
  console.log(
    `温度: ${temperature.toFixed(2)}℃ / 湿度: ${humidity.toFixed(2)}%`,
  );
  return { temperature, humidity };
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

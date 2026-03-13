// ===================================================
// SHT30 温湿度センサーの値を WebSocket で送信するプログラム
// ===================================================

// --- ライブラリの読み込み ---
// I2C通信（センサーとのデータのやりとり）に使うライブラリ
import { requestI2CAccess } from "node-web-i2c";
// SHT30（温度と湿度を測れるセンサー）を動かすためのライブラリ
import SHT30 from "@chirimen/sht30";
// WebSocket（インターネット経由でデータを送る仕組み）のライブラリ
import nodeWebSocketLib from "websocket";
// リレーサーバー（データの中継役）に接続するためのライブラリ
import { RelayServer } from "./RelayServer.js";

// --- 設定 ---
// データを送る間隔 (ミリ秒) 例: 5000ミリ秒 = 5秒
const SEND_INTERVAL_MS = 5000;

// 指定したミリ秒だけ待つための関数
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

// --- センサーの準備 ---
// I2Cという通信方式でセンサーとつながる「ポート」を取得する
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);

// SHT30センサーを初期化（使えるようにする）
const sht = new SHT30(i2cPort);
await sht.init();
console.log("SHT30センサーの準備ができました");

// --- WebSocketリレーの準備 ---
// リレーサーバーに接続
const relay = RelayServer(
    "chirimentest",
    "chirimenSocket",
    nodeWebSocketLib,
    "https://chirimen.org",
);
// データを送れる「チャンネル」を作る
const channel = await relay.subscribe("chirimenSHT");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取る関数 ---
async function readSensorData() {
    const data = await sht.readData();
    console.log(`温度: ${data.temperature}℃ / 湿度: ${data.humidity}%`);
    return data;
}

while (true) {
    // センサーからデータを読み取る
    const sensorData = await readSensorData();

    // チャンネルを通じてデータを送信する
    channel.send(sensorData);
    console.log("送信しました:", JSON.stringify(sensorData));

    // 次の送信まで待つ
    await sleep(SEND_INTERVAL_MS);
}

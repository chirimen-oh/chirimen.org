// ===================================================
// BH1750 照度センサーの値を WebSocket で送信するプログラム
// ===================================================

// --- ライブラリの読み込み ---
// I2C通信（センサーとのデータのやりとり）に使うライブラリ
import { requestI2CAccess } from "node-web-i2c";
// BH1750（明るさを測れるセンサー）を動かすためのライブラリ
import BH1750 from "@chirimen/bh1750";
// リレーサーバー（データの中継役）に接続するためのライブラリ
import { RelayServer } from "./RelayServer.js";

// --- センサーの準備 ---
// I2Cという通信方式でセンサーとつながる「ポート」を取得する
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);

// BH1750センサーを初期化（使えるようにする）
const bh1750 = new BH1750(i2cPort, 0x23);
await bh1750.init();
console.log("BH1750センサーの準備ができました");

// --- WebSocketリレーの準備 ---
// リレーサーバーに接続
const relay = RelayServer("chirimentest", "chirimenSocket");
// データを送れる「チャンネル」を作る
const channel = await relay.subscribe("chirimenBH1750");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取る関数 ---
async function readSensorData() {
  const lux = await bh1750.measure_high_res();
  console.log(`照度: ${lux.toFixed(3)}lx`);
  return { lux };
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

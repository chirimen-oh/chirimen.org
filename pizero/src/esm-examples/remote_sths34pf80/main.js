// ===================================================
// STHS34PF80 赤外線温度センサーの値を WebSocket で送信するプログラム
// ===================================================

// --- ライブラリの読み込み ---
// I2C通信（センサーとのデータのやりとり）に使うライブラリ
import { requestI2CAccess } from "node-web-i2c";
// STHS34PF80（対象物の赤外線温度と周辺温度を測れるセンサー）を動かすためのライブラリ
import STHS34PF80 from "@chirimen/sths34pf80";
// リレーサーバー（データの中継役）に接続するためのライブラリ
import { RelayServer } from "./RelayServer.js";

// --- センサーの準備 ---
// I2Cという通信方式でセンサーとつながる「ポート」を取得する
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);

// STHS34PF80センサーを初期化（使えるようにする）
const sths34pf80 = new STHS34PF80(i2cPort, 0x5a);
await sths34pf80.init();
console.log("STHS34PF80センサーの準備ができました");

// --- WebSocketリレーの準備 ---
// リレーサーバーに接続
const relay = RelayServer("chirimentest", "chirimenSocket");
// データを送れる「チャンネル」を作る
const channel = await relay.subscribe("chirimenSTHS34PF80");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取る関数 ---
async function readSensorData() {
  const { objectTemperature, ambientTemperature } = await sths34pf80.read();
  console.log(
    `対象物温度: ${objectTemperature}℃ / 周辺温度: ${ambientTemperature}℃`,
  );
  return { objectTemperature, ambientTemperature };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

while (true) {
  // センサーからデータを読み取る
  const sensorData = await readSensorData();

  // チャンネルを通じてデータを送信する
  channel.send(sensorData);
  console.log("送信しました:", JSON.stringify(sensorData));
  // データを送る間隔 (ミリ秒)
  await sleep(1000);
}

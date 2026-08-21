// ===================================================
// ADS1115 差動入力 + ロードセルの重さ相当値を WebSocket で送信するプログラム
// ===================================================

// --- ライブラリの読み込み ---
// I2C通信（センサーとのデータのやりとり）に使うライブラリ
import { requestI2CAccess } from "node-web-i2c";
// ADS1X15（16bitのADコンバータ）を動かすためのライブラリ
import ADS1X15 from "@chirimen/ads1x15";
// リレーサーバー（データの中継役）に接続するためのライブラリ
import { RelayServer } from "./RelayServer.js";

// --- センサーの準備 ---
// I2Cという通信方式でセンサーとつながる「ポート」を取得する
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);

// ADS1X15センサーを初期化（使えるようにする）
const ads1115 = new ADS1X15(i2cPort, 0x48);
// ADS1115 + ハイゲイン(7) でロードセルの微小な差動電圧を読み取る
await ads1115.init(true, 7);
console.log("ADS1115センサーの準備ができました");

// 起動直後の値を「風袋(タレ)」として記録し、以降はその差分を重さ相当値とする
const tare = ads1115.getVoltage(await ads1115.read("0,1"));

// --- WebSocketリレーの準備 ---
// リレーサーバーに接続
const relay = RelayServer("chirimentest", "chirimenSocket");
// データを送れる「チャンネル」を作る
const channel = await relay.subscribe("chirimenLoadCell");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取る関数 ---
async function readSensorData() {
  // p0-p1 の差動入力モードで読み取る
  const rawData = await ads1115.read("0,1");
  const voltage = ads1115.getVoltage(rawData);
  const weight = voltage - tare;
  console.log(
    `電圧: ${voltage.toFixed(6)}V / 風袋差引後: ${weight.toFixed(6)}V`,
  );
  return { voltage, weight };
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

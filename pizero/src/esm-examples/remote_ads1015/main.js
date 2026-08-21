// ===================================================
// ADS1015 (12bit ADC) の電圧を WebSocket で送信するプログラム
// ===================================================

// --- ライブラリの読み込み ---
// I2C通信（センサーとのデータのやりとり）に使うライブラリ
import { requestI2CAccess } from "node-web-i2c";
// ADS1015（12bitのADコンバータ）を動かすためのライブラリ
import ADS1015 from "@chirimen/ads1015";
// リレーサーバー（データの中継役）に接続するためのライブラリ
import { RelayServer } from "./RelayServer.js";

// --- 設定 ---
// 読み取るチャンネル番号 (0-3)
const CHANNEL = 0;
// ADS1015 は Gain=1 (フルスケール ±4.096V) で初期化されるため、
// 12bit (0-2047) の読み取り値 1 につき 2mV に相当する
const VOLTS_PER_BIT = 4.096 / 2048;

// --- センサーの準備 ---
// I2Cという通信方式でセンサーとつながる「ポート」を取得する
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);

// ADS1015センサーを初期化（使えるようにする）
const ads1015 = new ADS1015(i2cPort, 0x48);
await ads1015.init();
console.log("ADS1015センサーの準備ができました");

// --- WebSocketリレーの準備 ---
// リレーサーバーに接続
const relay = RelayServer("chirimentest", "chirimenSocket");
// データを送れる「チャンネル」を作る
const channel = await relay.subscribe("chirimenADS1015");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取る関数 ---
async function readSensorData() {
  const raw = await ads1015.read(CHANNEL);
  const voltage = raw * VOLTS_PER_BIT;
  console.log(`ADC値: ${raw} / 電圧: ${voltage.toFixed(3)}V`);
  return { raw, voltage };
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

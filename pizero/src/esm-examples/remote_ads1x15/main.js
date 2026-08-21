// ===================================================
// ADS1115 (16bit ADC) 4チャンネルの電圧を WebSocket で送信するプログラム
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
const ads1x15 = new ADS1X15(i2cPort, 0x48);
// ADS1115を使う場合は true を指定する (ADS1015の場合は false)
await ads1x15.init(true);
console.log("ADS1115センサーの準備ができました");

// --- WebSocketリレーの準備 ---
// リレーサーバーに接続
const relay = RelayServer("chirimentest", "chirimenSocket");
// データを送れる「チャンネル」を作る
const channel = await relay.subscribe("chirimenADS1X15");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取る関数 ---
async function readSensorData() {
  const voltages = [];
  // ADS1115 は 4 チャンネル持っている
  for (let ch = 0; ch < 4; ch++) {
    const rawData = await ads1x15.read(ch);
    voltages.push(ads1x15.getVoltage(rawData));
  }
  console.log(voltages.map((v, i) => `CH${i}:${v.toFixed(3)}V`).join(" "));
  return { voltages };
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

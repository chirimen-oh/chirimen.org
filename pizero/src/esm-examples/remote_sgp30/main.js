// ===================================================
// SGP30 ガスセンサー(eCO2/TVOC)の値を WebSocket で送信するプログラム
// ===================================================

// --- ライブラリの読み込み ---
// I2C通信（センサーとのデータのやりとり）に使うライブラリ
import { requestI2CAccess } from "node-web-i2c";
// SGP30（eCO2とTVOCを測れるガスセンサー）を動かすためのライブラリ
import SGP30 from "@chirimen/sgp30";
// リレーサーバー（データの中継役）に接続するためのライブラリ
import { RelayServer } from "./RelayServer.js";

// --- センサーの準備 ---
// I2Cという通信方式でセンサーとつながる「ポート」を取得する
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);

// SGP30センサーを初期化（使えるようにする）
const sgp30 = new SGP30(i2cPort, 0x58);
await sgp30.init();
console.log("SGP30センサーの準備ができました");

// --- WebSocketリレーの準備 ---
// リレーサーバーに接続
const relay = RelayServer("chirimentest", "chirimenSocket");
// データを送れる「チャンネル」を作る
const channel = await relay.subscribe("chirimenSGP30");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取る関数 ---
async function readSensorData() {
  const { eCO2, tvoc } = await sgp30.read();
  console.log(`eCO2: ${eCO2} ppm / TVOC: ${tvoc} ppb`);
  return { eCO2, tvoc };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// init() 直後から約15秒間は初期化フェーズのため、
// eCO2 = 400ppm / tvoc = 0ppb の固定値が返ります。
// また動的ベースライン補正のため、約1秒間隔で read() を呼び続ける必要があります。
while (true) {
  // センサーからデータを読み取る
  const sensorData = await readSensorData();

  // チャンネルを通じてデータを送信する
  channel.send(sensorData);
  console.log("送信しました:", JSON.stringify(sensorData));
  // データを送る間隔 (ミリ秒)
  await sleep(1000);
}

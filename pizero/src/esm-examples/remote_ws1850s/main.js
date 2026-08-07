// Remote WS1850S / RC522 (RFIDリーダー)
import { requestI2CAccess } from "node-web-i2c";
import RC522 from "@chirimen/rc522_ws1850s";
import { RelayServer } from "./RelayServer.js";

// I2Cポートと、I2CデバイスRC522(WS1850S)の初期化
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const rc522 = new RC522(i2cPort);
await rc522.init();

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenRFID");
console.log("web socketリレーサービスに接続しました");

function toHex(uid) {
  return Array.from(uid)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join(":")
    .toUpperCase();
}

async function checkCard() {
  // カードがリーダー上にあるかを確認
  const isNewCard = await rc522.PICC_IsNewCardPresent();
  if (!isNewCard) return;

  const uid = await rc522.PICC_ReadCardSerial();
  await rc522.PICC_HaltA();

  const sensorData = { uid: toHex(uid), detectedAt: new Date().toISOString() };
  channel.send(sensorData);
  console.log("UID検出:", sensorData.uid);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

while (true) {
  await checkCard();
  // データを送る間隔 (ミリ秒)
  await sleep(3000);
}

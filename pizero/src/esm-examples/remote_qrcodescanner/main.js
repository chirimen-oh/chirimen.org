// Remote QR Code Scanner - receiver

import { requestI2CAccess } from "node-web-i2c";
import QRScanner from "@chirimen/qrcodescanner";
import { RelayServer } from "./RelayServer.js";

const POLL_INTERVAL_MS = 3000;
const SCAN_TIMEOUT_MS = 2000;

let lastData = "";
let scanning = false;

// QRコードを読み取り、内容が変化していれば送信する
async function pollQRCode() {
  if (scanning) return;
  scanning = true;
  try {
    const data = await qrscanner.scanData(SCAN_TIMEOUT_MS);
    if (data && data !== lastData) {
      lastData = data;
      channel.send({ data });
    }
  } catch {
    // タイムアウト(一定時間内にQRコードを検出できなかった場合)は何もしない
  } finally {
    scanning = false;
  }
}

// I2C QRコードスキャナーの初期化
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const qrscanner = new QRScanner(i2cPort, 0x21);
await qrscanner.init();
await qrscanner.setTriggerMode(0); // 自動トリガーモード

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenQR");
console.log("web socketリレーサービスに接続しました");

// 一定間隔でQRコードをポーリングする
setInterval(pollQRCode, POLL_INTERVAL_MS);

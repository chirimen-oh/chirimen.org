// Remote Example: シリアルGPSレシーバの位置情報をWebSocketで送信するプログラム

import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import { GPS } from "gps";
import { RelayServer } from "./RelayServer.js";

// --- シリアルポート・GPSパーサーの準備 ---
const port = new SerialPort({ path: "/dev/ttyS0", baudRate: 9600 });
const parser = port.pipe(new ReadlineParser());
const gps = new GPS();

let latestFix = null;

parser.on("data", (line) => gps.update(line));

// GGAセンテンス（位置情報）を受信するたびに最新の値を保持しておく
gps.on("GGA", (data) => {
  latestFix = data;
});

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenGPS");
console.log("web socketリレーサービスに接続しました");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 数秒間隔で、直近に受信した位置情報をブラウザへ送信する
while (true) {
  if (!latestFix || latestFix.quality == null) {
    channel.send({ fix: false });
    console.log("GPS: 衛星を捕捉できていません");
  } else {
    const { time, lat, lon, alt, satellites, quality } = latestFix;
    channel.send({ fix: true, time, lat, lon, alt, satellites, quality });
    console.log(`緯度:${lat} 経度:${lon} 高度:${alt}m 衛星数:${satellites}`);
  }
  // データを送る間隔 (ミリ秒)
  await sleep(3000);
}

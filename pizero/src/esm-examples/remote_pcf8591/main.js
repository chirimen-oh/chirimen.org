// Remote PCF8591 8bit AD/DA Converter - receiver

import { requestI2CAccess } from "node-web-i2c";
import PCF8591 from "@chirimen/pcf8591";
import { RelayServer } from "./RelayServer.js";

const ADC_CHANNEL_COUNT = 4; // PCF8591は4chのADCを持つ

// ブラウザからのDA出力電圧指定を受信する
async function controlDAC(message) {
  const { voltage } = message.data ?? {};
  if (typeof voltage !== "number") return;
  await pcf8591.setDAC(voltage);
  channel.send({ type: "dac", voltage });
}

// ADCの値(電圧)を読み取ってブラウザへ送信する
async function sendADCValues() {
  const values = [];
  for (let ch = 0; ch < ADC_CHANNEL_COUNT; ch++) {
    values.push(await pcf8591.readADC(ch));
  }
  channel.send({ type: "adc", values });
}

// I2C PCF8591の初期化
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const pcf8591 = new PCF8591(i2cPort, 0x48);
await pcf8591.init();
await pcf8591.setDAC(0); // DA出力は0Vから開始

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenPCF8591");
console.log("web socketリレーサービスに接続しました");
channel.onmessage = controlDAC;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 一定間隔でADC値を送信し続ける
while (true) {
  await sendADCValues();
  // データを送る間隔 (ミリ秒)
  await sleep(2000);
}

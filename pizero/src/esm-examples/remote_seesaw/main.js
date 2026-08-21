// Remote seesaw (多目的インターフェース: アナログ入力・デジタル出力)
import { requestI2CAccess } from "node-web-i2c";
import Seesaw from "@chirimen/seesaw";
import { RelayServer } from "./RelayServer.js";

const ANALOG_PIN = 2; // seesaw基板の A0 (可変抵抗などアナログ入力を接続)
const LED_PIN = 15; // seesaw基板のデジタル出力ピン (LEDを接続)

// I2Cポートと、I2Cデバイスseesawの初期化
const i2cAccess = await requestI2CAccess();
const seesaw = new Seesaw(i2cAccess.ports.get(1));
await seesaw.init();
await seesaw.pin_mode(LED_PIN, seesaw.OUTPUT);

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenSeesaw");
console.log("web socketリレーサービスに接続しました");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

while (true) {
  const value = await seesaw.analog_read(ANALOG_PIN);
  const on = value > 512;
  await seesaw.digital_write(LED_PIN, on);
  channel.send({ value, led: on });
  console.log(`アナログ入力: ${value} → LED: ${on ? "ON" : "OFF"}`);
  // データを送る間隔 (ミリ秒)
  await sleep(500);
}

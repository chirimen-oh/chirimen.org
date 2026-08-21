// seesawは、デジタル入出力・アナログ入力・PWM出力・NeopixelLEDドライブ等の機能を持つ
// 多目的I2Cインターフェースボードです。このサンプルではアナログ入力とデジタル出力を使用します。

import { requestI2CAccess } from "node-web-i2c";
import Seesaw from "@chirimen/seesaw";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ANALOG_PIN = 2; // seesaw基板の A0 (可変抵抗などアナログ入力を接続)
const LED_PIN = 15; // seesaw基板のデジタル出力ピン (LEDを接続)

const i2cAccess = await requestI2CAccess();
const seesaw = new Seesaw(i2cAccess.ports.get(1));
await seesaw.init();
await seesaw.pin_mode(LED_PIN, seesaw.OUTPUT);

while (true) {
  const value = await seesaw.analog_read(ANALOG_PIN); // 0-1023
  const on = value > 512;
  await seesaw.digital_write(LED_PIN, on);
  console.log(`アナログ入力: ${value} → LED: ${on ? "ON" : "OFF"}`);
  await sleep(500);
}

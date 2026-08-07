// Remote I2C 1602 LCD - receiver

import { requestI2CAccess } from "node-web-i2c";
import I2C1602LCD from "@chirimen/i2c1602lcd";
import { RelayServer } from "./RelayServer.js";

const LCD_ADDRESS = 0x27; // アドレスが違う場合は 0x3f 等に変更
const BLANK_LINE = " ".repeat(16);

async function controlDisplay(message) {
  const { line1 = "", line2 = "" } = message.data ?? {};
  await lcd.print((line1 || BLANK_LINE).padEnd(16), lcd.line1);
  await lcd.print((line2 || BLANK_LINE).padEnd(16), lcd.line2);
  channel.send({ status: "ok", line1, line2 });
}

// I2C 1602LCDの初期化
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const lcd = new I2C1602LCD(i2cPort, LCD_ADDRESS);
await lcd.init();
await lcd.print("Remote LCD", lcd.line1);
await lcd.print("Ready", lcd.line2);

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenLCD");
console.log("web socketリレーサービスに接続しました");
channel.onmessage = controlDisplay;

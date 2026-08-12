// Remote SSD1306 OLED Display - receiver

import { requestI2CAccess } from "node-web-i2c";
import OledDisplay from "@chirimen/grove-oled-display";
import { RelayServer } from "./RelayServer.js";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const MAX_ROWS = 8; // 128x64pxのOLEDは8px角フォントで8行分表示できる

async function controlDisplay(message) {
  const { text = "" } = message.data ?? {};
  display.clearDisplayQ();
  text
    .split("\n")
    .slice(0, MAX_ROWS)
    .forEach((line, row) => display.drawStringQ(row, 0, line));
  await display.playSequence();
  channel.send({ status: "ok", text });
}

// I2C SSD1306 OLEDディスプレイの初期化
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const display = new OledDisplay(i2cPort);
await display.init(true); // SSD1306(grove-oled-display)の場合はtrueを設定
display.clearDisplayQ();
display.drawStringQ(0, 0, "Remote OLED");
display.drawStringQ(1, 0, "Ready");
await display.playSequence();

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenSSD1306");
console.log("web socketリレーサービスに接続しました");
channel.onmessage = controlDisplay;

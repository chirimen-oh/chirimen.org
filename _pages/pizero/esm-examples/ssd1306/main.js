import { requestI2CAccess } from "node-web-i2c";
import OledDisplay from "@chirimen/grove-oled-display";

const i2cAccess = await requestI2CAccess();
console.log("initializing...");
const i2cPort = i2cAccess.ports.get(1);
const display = new OledDisplay(i2cPort);
await display.init(true); // SSD1306(grove-oled-display)の場合はtrueを設定(SSD1308の場合はパラメータ不要)
display.clearDisplayQ();
await display.playSequence();
console.log("drawing text...");
display.drawStringQ(0, 0, "Hello");
display.drawStringQ(1, 0, "Real");
display.drawStringQ(2, 0, "World");
await display.playSequence();
console.log("completed");

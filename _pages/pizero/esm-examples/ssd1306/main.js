import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import OledDisplay from "@chirimen/grove-oled-display";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  console.log("initializing...");
  const port = i2cAccess.ports.get(1);
  const display = new OledDisplay(port);
  await display.init(true); // SSD1306(grove-oled-display)の場合はtrueを設定(SSD1308の場合はパラメータ不要)
  display.clearDisplayQ();
  await display.playSequence();
  console.log("drawing text...");
  display.drawStringQ(0, 0, "Hello");
  display.drawStringQ(1, 0, "Real");
  display.drawStringQ(2, 0, "World");
  await display.playSequence();
  console.log("completed");
}

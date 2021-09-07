import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import Neopixel from "@chirimen/neopixel-i2c";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const neopixel = new Neopixel(port, 0x41);
  await neopixel.init();

  while (true) {
    await neopixel.setGlobal(64, 0, 0); // Red
    await sleep(200);
    await neopixel.setGlobal(0, 64, 0); // Green
    await sleep(200);
    await neopixel.setGlobal(0, 0, 64); // Blue
    await sleep(200);
  }
}

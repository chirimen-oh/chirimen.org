// Example for Aitendo 14 segment 4char LED  ht16k33 module kit
// https://www.aitendo.com/product/20812
// https://www.aitendo.com/product/20811

import { requestI2CAccess } from "node-web-i2c";
import HT16K33 from "@chirimen/ht16k33";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const ht = new HT16K33(i2cPort);
await ht.init();

//await ht.set_blink(ht.HT16K33_BLINK_1HZ);
//await ht.set_brightness(6);

while (true) {
  // 使用できる文字は、アルファベット、数字、ピリオド
  ht.set4chr14segLED("How");
  await ht.write_display();
  await sleep(1000);
  ht.set4chr14segLED("are");
  await ht.write_display();
  await sleep(1000);
  ht.set4chr14segLED("you.");
  await ht.write_display();
  await sleep(1000);
  ht.set4chr14segLED("3.14");
  await ht.write_display();
  await sleep(1000);
}

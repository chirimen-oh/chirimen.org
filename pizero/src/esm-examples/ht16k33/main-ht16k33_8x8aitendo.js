// Example for Aitendo  8x8 LED Matrix LED ht16k33 module kit
// https://www.aitendo.com/product/12822
// https://www.aitendo.com/product/12850
// https://www.aitendo.com/product/12823

import { requestI2CAccess } from "node-web-i2c";
import HT16K33 from "@chirimen/ht16k33";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// スマイルマーク
const iconPattern = `
    _ _ # # # # _ _
    _ # _ _ _ _ # _
    # _ # _ _ # _ #
    # _ _ _ _ _ _ #
    # _ # _ _ # _ #
    # _ _ # # _ _ #
    _ # _ _ _ _ # _
    _ _ # # # # _ _
  `
  .replace(/[^#_]/g, "")
  .split("")
  .map((c) => c === "#");

// インベーダー
const iconPattern2 = `
    # _ _ _ _ _ _ #
    _ # _ _ _ _ # _
    _ _ # # # # _ _
    _ # # # # # # _
    # # _ # # _ # #
    _ # # # # # # _
    _ _ # _ _ # _ _
    # # _ _ _ _ # #
  `
  .replace(/[^#_]/g, "")
  .split("")
  .map((c) => c === "#");

// 犬
const iconPattern3 = `
    _ # _ _ _ _ # _
    # # # # # # # _
    # _ _ # _ _ # _
    # # _ # # _ # _
    # _ _ # _ _ # _
    # # # # # # # _
    _ # # # # # # #
    _ # _ # _ # _ #
  `
  .replace(/[^#_]/g, "")
  .split("")
  .map((c) => c === "#");

const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const ht = new HT16K33(i2cPort);
await ht.init();
ht.setAitendo8x8(); // この関数でaitendoの8x8LEDモジュールの配線に切り替える

//await ht.set_blink(ht.HT16K33_BLINK_1HZ);
//await ht.set_brightness(6);

while (true) {
  ht.set_8x8_array(iconPattern);
  await ht.write_display();
  await sleep(1000);

  ht.set_8x8_array(iconPattern2);
  await ht.write_display();
  await sleep(1000);

  ht.set_8x8_array(iconPattern3);
  await ht.write_display();
  await sleep(1000);

  /** LEDを一個づつ設定する関数の使用例
  for (let i = 0; i < 128; i++ ){
    ht.set_led(i, 1);
  }
  await ht.write_display();
  await sleep(1000);
  **/
}

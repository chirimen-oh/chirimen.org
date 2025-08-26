import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import RC522 from "@chirimen/rc522_ws1850s";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const rc522 = new RC522(port);
  await rc522.init();
  for (;;) {
    try {
      // カードがリーダー上にあるかを確認
      const isNewCard = await rc522.PICC_IsNewCardPresent();
      if (isNewCard) {
        const uid = await rc522.PICC_ReadCardSerial();
        console.log(uid);
        var stat = await rc522.PICC_HaltA();
      }
    } catch (error) {
      console.error("READ ERROR:" + error);
    }
    await sleep(1000);
  }
}

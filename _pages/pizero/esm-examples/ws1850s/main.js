import { requestI2CAccess } from "node-web-i2c";
import RC522 from "@chirimen/rc522_ws1850s";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const rc522 = new RC522(i2cPort);
await rc522.init();
while (true) {
  try {
    // カードがリーダー上にあるかを確認
    const isNewCard = await rc522.PICC_IsNewCardPresent();
    if (isNewCard) {
      const uid = await rc522.PICC_ReadCardSerial();
      console.log(uid);
      const stat = await rc522.PICC_HaltA();
      console.log(stat);
    }
  } catch (error) {
    console.error("READ ERROR:" + error);
  }
  await sleep(1000);
}

import { requestI2CAccess } from "node-web-i2c";
import ADS1015 from "@chirimen/ads1015";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const ads1015 = new ADS1015(i2cPort, 0x48);
await ads1015.init();
while (true) {
  try {
    const value = await ads1015.read(0);
    console.log("value:", value);
  } catch (error) {
    console.error("error: code:" + error.code + " message:" + error.message);
  }
  await sleep(100);
}

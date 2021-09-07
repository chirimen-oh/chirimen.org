import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import GROVEACCELEROMETER from "@chirimen/grove-accelerometer";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));


main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const groveaccelerometer = new GROVEACCELEROMETER(port, 0x53);
  await groveaccelerometer.init();
  for (;;) {
    try {
      const values = await groveaccelerometer.read();
      console.log(`ax: ${values.x}, ax: ${values.y}, ax: ${values.z}`)
    } catch (err) {
      console.error("READ ERROR:" + err);
    }
    await sleep(1000);
  }
}

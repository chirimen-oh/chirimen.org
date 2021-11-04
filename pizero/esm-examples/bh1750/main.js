import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import BH1750 from "@chirimen/bh1750";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const bh1750 = new BH1750(port, 0x23);
  await bh1750.init();

  while (true) {
    const lux = await bh1750.measure_high_res();
    console.log(lux.toFixed(3) + "lx");

    await sleep(500);
  }
}

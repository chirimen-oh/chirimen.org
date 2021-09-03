import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import ADT7410 from "@chirimen/adt7410";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
async function measure() {
  const i2cAccess = await requestI2CAccess();
  const i2c1 = i2cAccess.ports.get(1);
  const adt7410 = new ADT7410(i2c1, 0x48);
  await adt7410.init();

  console.log("start measurement")

  while(true){
    const temperature = await adt7410.read();
    console.log(`Temperature: ${temperature} ℃`);
    await sleep(1000);
  }
}

measure();

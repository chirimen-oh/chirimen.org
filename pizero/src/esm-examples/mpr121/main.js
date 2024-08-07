import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import GroveTouch from "@chirimen/grove-touch";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  var i2cAccess = await requestI2CAccess();
  var port = i2cAccess.ports.get(1);
  var touchSensor = new GroveTouch(port, 0x5a);
  await touchSensor.init();
  for (;;) {
    var ch = await touchSensor.read();
    console.log(JSON.stringify(ch));
    await sleep(100);
  }
}

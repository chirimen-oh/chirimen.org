import { requestI2CAccess } from "node-web-i2c";
import TMP117 from "@chirimen/tmp117";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const tmp117 = new TMP117(i2cPort, 0x48);
await tmp117.init();
while (true) {
  const data = await tmp117.read();
  console.log(`${data.temperature} degree`);
  await sleep(1000);
}

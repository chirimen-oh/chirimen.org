import { requestI2CAccess } from "node-web-i2c";
import STHS34PF80 from "@chirimen/sths34pf80";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);

const sths34pf80 = new STHS34PF80(i2cPort, 0x5A);

await sths34pf80.init();

while (true) {
  const data = await sths34pf80.read();

  console.log(data);

  await sleep(1000);
}

import { requestI2CAccess } from "node-web-i2c";
import APDS9930 from "@chirimen/apds9930";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const i2cAccess = await requestI2CAccess();
const apds9930 = new APDS9930(i2cAccess.ports.get(1));
await apds9930.init();

while (true) {
  const { lux, proximity } = await apds9930.read();
  console.log(`照度: ${lux.toFixed(2)} lx, 近接: ${proximity}`);
  await sleep(500);
}

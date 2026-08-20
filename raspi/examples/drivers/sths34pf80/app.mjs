import { requestI2CAccess } from "node-web-i2c";
import STHS34PF80 from "@chirimen/sths34pf80";

const I2CADDR_STHS34PF80 = 0x5A;

const i2cAccess = await requestI2CAccess();

const i2cPort = i2cAccess.ports.get(1);

const sths34pf80 = new STHS34PF80(
  i2cPort,
  I2CADDR_STHS34PF80
);

await sths34pf80.init();

console.log("STHS34PF80 initialized");

const whoAmI = await sths34pf80.readWhoAmI();
console.log("WHO_AM_I:", "0x" + whoAmI.toString(16));

setInterval(async () => {
  try {
    const data = await sths34pf80.read();

    console.dir(data);
  } catch (error) {
    console.error(error);
  }
}, 1000);
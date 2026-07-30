import { requestI2CAccess } from "node-web-i2c";
import AS7341 from "@chirimen/as7341";

const I2CADDR_AS7341 = 0x39;

const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const as7341 = new AS7341(i2cPort, I2CADDR_AS7341);

await as7341.init();

setInterval(async () => {
  const data = await as7341.read();
  console.dir(data);
}, 1000);

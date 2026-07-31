import { requestI2CAccess } from "node-web-i2c";
import AS7341 from "@chirimen/as7341";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

const I2CADDR_AS7341 = 0x39;

const i2cAccess = await requestI2CAccess();
const as7341 = new AS7341(i2cAccess.ports.get(1), I2CADDR_AS7341);

await as7341.init();

while (true) {
  // f1〜f8（各波長の強度）、clear（全可視光）、nir（近赤外）
  const { f1, f2, f3, f4, f5, f6, f7, f8, clear, nir } = await as7341.read();
  console.dir({ f1, f2, f3, f4, f5, f6, f7, f8, clear, nir });
  await sleep(1000);
}

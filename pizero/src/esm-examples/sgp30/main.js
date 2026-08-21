import { requestI2CAccess } from "node-web-i2c";
import SGP30 from "@chirimen/sgp30";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const sgp30 = new SGP30(i2cPort, 0x58);
await sgp30.init();
console.log(`serial number: ${await sgp30.readSerialNumber()}`);

// init() 直後から約15秒間は初期化フェーズのため、
// eCO2 = 400ppm / tvoc = 0ppb の固定値が返ります。
// また動的ベースライン補正のため、約1秒間隔で read() を呼び続ける必要があります。
while (true) {
  const { eCO2, tvoc } = await sgp30.read();
  const { h2, ethanol } = await sgp30.readRaw();
  console.log(
    `eCO2: ${eCO2} ppm, TVOC: ${tvoc} ppb, raw H2: ${h2}, raw Ethanol: ${ethanol}`,
  );

  await sleep(1000);
}

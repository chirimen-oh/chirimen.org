import { requestI2CAccess } from "node-web-i2c";
import BMP180 from "@chirimen/bmp180";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

const readInterval = 1000;

const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const bmp180 = new BMP180(i2cPort, 0x77);
await bmp180.init();
while (true) {
  const pressure = await bmp180.readPressure();
  const temperature = await bmp180.readTemperature();
  console.log(
    `Pressure: ${pressure.toFixed(2)} Pa, Temperature: ${temperature} degree.`
  );
  await sleep(readInterval);
}

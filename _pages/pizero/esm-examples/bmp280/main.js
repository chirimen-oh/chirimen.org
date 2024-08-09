import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import BMP280 from "@chirimen/bmp280";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const bmp280 = new BMP280(port, 0x76);
  await bmp280.init();

  while (true) {
    const data = await bmp280.readData();
    const pressure = data.pressure.toFixed(2);
    const temperature = data.temperature.toFixed(2);
    console.log(
      [`Temperature: ${temperature} degree`, `Pressure: ${pressure} hPa`].join(
        ", "
      )
    );

    await sleep(500);
  }
}

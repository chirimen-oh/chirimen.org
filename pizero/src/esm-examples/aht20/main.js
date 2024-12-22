import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import AHT20 from "@chirimen/ahtx0";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const aht20 = new AHT20(port, 0x38);
  await aht20.init();

  while (true) {
    const { humidity, temperature } = await aht20.readData();
    console.log(
      [
        `Humidity: ${humidity.toFixed(2)}%`,
        `Temperature: ${temperature.toFixed(2)} degree`
      ].join(", ")
    );

    await sleep(500);
  }
}

import { requestI2CAccess } from "node-web-i2c";
import TCA9548A from "@chirimen/tca9548a";
import SHT30 from "@chirimen/sht30";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const i2cAccess = await requestI2CAccess();
const mux = new TCA9548A(i2cAccess.ports.get(1));

const sht30Ch0 = new SHT30(mux.get(0));
const sht30Ch1 = new SHT30(mux.get(1));
await sht30Ch0.init();
await sht30Ch1.init();

while (true) {
  const dataCh0 = await sht30Ch0.readData();
  const dataCh1 = await sht30Ch1.readData();
  console.log(
    [
      `CH0 Humidity: ${dataCh0.humidity.toFixed(2)}%`,
      `Temperature: ${dataCh0.temperature.toFixed(2)} degree`,
    ].join(", "),
  );
  console.log(
    [
      `CH1 Humidity: ${dataCh1.humidity.toFixed(2)}%`,
      `Temperature: ${dataCh1.temperature.toFixed(2)} degree`,
    ].join(", "),
  );

  await sleep(500);
}

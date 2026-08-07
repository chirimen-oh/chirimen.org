import { requestI2CAccess, BME680 } from "chirimen";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const i2cAccess = await requestI2CAccess();
const bme680 = new BME680(i2cAccess.ports.get(1));
await bme680.init();

while (true) {
  const data = await bme680.readData();
  const temperature = data.temperature.toFixed(2);
  const humidity = data.humidity.toFixed(2);
  const pressure = data.pressure.toFixed(2);
  console.log(
    [
      `Temperature: ${temperature} degree`,
      `Humidity: ${humidity} %`,
      `Pressure: ${pressure} hPa`,
      `Gas: ${data.gas} ohm`,
    ].join(", "),
  );
  await sleep(1000);
}

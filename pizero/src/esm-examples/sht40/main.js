import { requestI2CAccess } from "node-web-i2c";
import SHT40 from "@chirimen/sht40";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const sht40 = new SHT40(i2cPort, 0x44);
await sht40.init();

while (true) {
    const { humidity, temperature } = await sht40.readData();
    console.log(
        [
            `Humidity: ${humidity.toFixed(2)}%`,
            `Temperature: ${temperature.toFixed(2)} degree`
        ].join(", ")
    );

    await sleep(500);
}

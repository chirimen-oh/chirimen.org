import { requestI2CAccess } from "./node_modules/node-web-i2c/index.js";
import SHT40 from "@chirimen/sht40";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
    const i2cAccess = await requestI2CAccess();
    const port = i2cAccess.ports.get(1);
    const sht40 = new SHT40(port, 0x44);
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
}
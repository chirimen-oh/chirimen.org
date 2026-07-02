import { requestI2CAccess } from "node-web-i2c";
import HTU21D from "@chirimen/htu21d";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const htu21d = new HTU21D(i2cPort, 0x40);
await htu21d.init();

while (true) {
		const temp = await htu21d.readTemperature();
		const humi = await htu21d.readHumidity();
		console.log("Temperature:", temp, " Humidity", humi);
		await sleep(1000);
	}

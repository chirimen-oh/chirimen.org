import { requestI2CAccess } from "node-web-i2c";
import BME280 from "@chirimen/bme280";
import ICM20948 from "@chirimen/icm20948";
import LTR390 from "@chirimen/ltr390";
import TSL2591 from "@chirimen/tsl2591";
import SGP40 from "@chirimen/sgp40";

const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));
let sgp40, tsl2591, ltr390, icm20948, bme280;

const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);

sgp40 = new SGP40(i2cPort);
tsl2591 = new TSL2591(i2cPort);
ltr390 = new LTR390(i2cPort);
icm20948 = new ICM20948(i2cPort);
bme280 = new BME280(i2cPort, 0x76); // これだけ0x76忘れずに

await sgp40.init();
await tsl2591.init();
await ltr390.init();
await icm20948.init();
await bme280.init();

while (true) {
		const sgp = await sgp40.measureRaw(25, 50);
		const tsl = await tsl2591.Lux();
		const ltr = await ltr390.UVS();
		const icm = await icm20948.getdata();
		const bme = await bme280.readData();

		console.log("=======================================================");
		console.log("Pressure: ",bme.pressure);
		console.log("Temperature: ",bme.temperature);
		console.log("Humidity: ",bme.humidity);
		console.log("Lux: ",tsl);
		console.log("UV: ",ltr);
		console.log("Gas: ", sgp );
		console.log(`Roll = ${icm[0].toFixed(2)} , Pitch = ${icm[1].toFixed(2)} , Yaw = ${icm[2].toFixed(2)}`);
		console.log(`Acceleration:  X = ${icm[3]}, Y = ${icm[4]}, Z = ${icm[5]}`);
		console.log(`Gyroscope:     X = ${icm[6]} , Y = ${icm[7]} , Z = ${icm[8]}`);
		console.log(`Magnetic:      X = ${icm[9]} , Y = ${icm[10]} , Z = ${icm[11]}`);

		await sleep(1000);
	}

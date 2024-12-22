import { requestI2CAccess } from "./node_modules/node-web-i2c/index.js";
import ENS160 from "@chirimen/ens160";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

main();

async function main() {
	const i2cAccess = await requestI2CAccess();
	const port = i2cAccess.ports.get(1);
	const ens160 = new ENS160(port, 0x53);
	await ens160.init();

	await ens160.set_temperature(22); // 温度を設定する(℃)
	await ens160.set_humidity(52); // 湿度を設定する(％)
	await sleep(1500);
	console.log(
		`setT:${(await ens160.get_temperature()).toFixed(2)} [deg.] setH:${(await ens160.get_humidity()).toFixed(2)} [%]`
	);

	while (true) {
		const { AQI, TVOC, eCO2 } = await ens160.get_data();
		const mode = await ens160.get_mode();
		console.log(
			[
				`AQI(1-5):${AQI}`,
				`TVOC:${TVOC}ppb`,
				`eCO2:${eCO2}ppm`,
				`mode:${mode}(0:sleep,1:idle,2:standard)`,
			].join(", ")
		);

		await sleep(500);
	}
}

/* 各種ライブラリをインポート */
import { requestGPIOAccess } from "node-web-gpio";
import { requestI2CAccess } from "node-web-i2c";
import SGP40 from "@chirimen/sgp40";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

let sgp40;

const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
sgp40 = new SGP40(i2cPort);
await sgp40.init();
while (true) {
		// const sgp = await sgp40.raw(); // 温度・湿度　内部で決め打ち・・(25℃,50%)
		let sgp = await sgp40.measureRaw(25, 50); // 温度・湿度決め打ち・・
		console.log("Gas:", sgp );
		await sleep(1000);
	}

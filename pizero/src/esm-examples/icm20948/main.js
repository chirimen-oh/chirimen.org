/* 各種ライブラリをインポート */
import { requestGPIOAccess } from "node-web-gpio";
import { requestI2CAccess } from "node-web-i2c";
import ICM20948 from "@chirimen/icm20948";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

let icm20948;

/* センサー初期化 */
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
icm20948 = new ICM20948(i2cPort);
await icm20948.init();
while (true) {
		const icm = await icm20948.getdata();
		console.log("/-------------------------------------------------------------/");
		console.log(`Roll = ${icm[0].toFixed(2)} , Pitch = ${icm[1].toFixed(2)} , Yaw = ${icm[2].toFixed(2)}`);
		console.log(`Acceleration: X = ${icm[3]}, Y = ${icm[4]}, Z = ${icm[5]}`);
		console.log(`Gyroscope:     X = ${icm[6]} , Y = ${icm[7]} , Z = ${icm[8]}`);
		console.log(`Magnetic:      X = ${icm[9]} , Y = ${icm[10]} , Z = ${icm[11]}`);
		await sleep(1000);
	}

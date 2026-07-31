/* 各種ライブラリをインポート */
import { requestGPIOAccess } from "node-web-gpio";
import { requestI2CAccess } from "node-web-i2c";
import TSL2591 from "@chirimen/tsl2591";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

let tsl2591;

/* センサー初期化 */
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
tsl2591 = new TSL2591(i2cPort);
await tsl2591.init();
while (true) {
		const lux = await tsl2591.Lux();
		console.log(lux , " Lux");
		await sleep(1000);
	}

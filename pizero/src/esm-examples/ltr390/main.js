/* 各種ライブラリをインポート */
import { requestGPIOAccess } from "node-web-gpio";
import { requestI2CAccess } from "node-web-i2c";
import LTR390 from "@chirimen/ltr390";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

let ltr390;

/* センサー初期化 */
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
ltr390 = new LTR390(i2cPort);
await ltr390.init();
while (true) {
		const UVS = await ltr390.UVS();
		console.log(UVS , " UVS");
		await sleep(1000);
	}

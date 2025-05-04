# sgp40
# SGP40 ガスセンサー

## 配線図

![配線図](./schematic.png "schematic")

## サンプルコード (main.js)

```javascript
/* 各種ライブラリをインポート */
import { requestGPIOAccess } from "./node_modules/node-web-gpio/dist/index.js"; // WebGPIO
import { requestI2CAccess } from "./node_modules/node-web-i2c/index.js"; // WebI2C
import SGP40 from "@chirimen/sgp40"; // SGP40
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

main();

var sgp40;
async function main() {
	const i2cAccess = await requestI2CAccess();
	const ic2Port = i2cAccess.ports.get(1);
	sgp40 = new SGP40(ic2Port);
	await sgp40.init();
	while (true) {
		// var sgp = await sgp40.raw(); // 温度・湿度　内部で決め打ち・・(25℃,50%)
		var sgp = await sgp40.measureRaw(25, 50); // 温度・湿度決め打ち・・
		console.log("Gas:", sgp );
		await sleep(1000);
	}
}
```


---
[← 目次に戻る](../index.md)

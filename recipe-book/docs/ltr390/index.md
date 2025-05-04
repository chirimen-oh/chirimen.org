# LTR390 UVセンサー

## 配線図

![配線図](./schematic.png "schematic")

## サンプルコード (main.js)

```javascript
/* 各種ライブラリをインポート */
import { requestGPIOAccess } from "./node_modules/node-web-gpio/dist/index.js"; // WebGPIO
import { requestI2CAccess } from "./node_modules/node-web-i2c/index.js"; // WebI2C
import LTR390 from "@chirimen/ltr390"; // LTR390
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

main();

var ltr390;
async function main() {
	/* センサー初期化 */
	const i2cAccess = await requestI2CAccess();
	const ic2Port = i2cAccess.ports.get(1);
	ltr390 = new LTR390(ic2Port);
	await ltr390.init();
	while (true) {
		var UVS = await ltr390.UVS();
		console.log(UVS , " UVS");
		await sleep(1000);
	}
}
```


---
[← 目次に戻る](../index.md)

### LTR390 UVセンサー

#### 概要

* 高感度なデジタル紫外線（UV）および環境光センサー
* 小型で低消費電力、I²C 通信に対応しており、UV 強度や周囲の明るさを正確に測定可能

#### 配線図

![](./schematic.png "schematic"){width=250px height=250px}

#### CHIRIMEN 用ドライバのインストール

```shell
npm i @chirimen/ltr390
```

#### サンプルコード (main.js)

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

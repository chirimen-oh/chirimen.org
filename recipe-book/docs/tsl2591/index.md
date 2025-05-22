### TSL2591照度センサー

#### 概要

* 高感度・広ダイナミックレンジのデジタル光センサー
* 光強度をデジタル信号に変換し、照度（lux）を高精度に測定可能

#### 配線図

![](./schematic.png "schematic"){width=253px height=227px}

#### CHIRIMEN 用ドライバのインストール

```shell
npm i @chirimen/tsl2591
```

#### サンプルコード (main.js)

```javascript
/* 各種ライブラリをインポート */
import { requestGPIOAccess } from "./node_modules/node-web-gpio/dist/index.js"; // WebGPIO
import { requestI2CAccess } from "./node_modules/node-web-i2c/index.js"; // WebI2C
import TSL2591 from "@chirimen/tsl2591"; // TSL2591
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

main();

var tsl2591;
async function main() {
	/* センサー初期化 */
	const i2cAccess = await requestI2CAccess();
	const ic2Port = i2cAccess.ports.get(1);
	tsl2591 = new TSL2591(ic2Port);
	await tsl2591.init();
	while (true) {
		var lux = await tsl2591.Lux();
		console.log(lux , " Lux");
		await sleep(1000);
	}
}
```

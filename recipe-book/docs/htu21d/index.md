### HTU21D 温湿度センサー

#### 概要

* 高精度の温度・湿度センサーで、I²C 接続により簡単に利用可能
* コンパクトで応答速度も速く、さまざまな環境モニタリング用途に最適

#### 配線図

![](./schematic.png "schematic"){width=250px height=250px}

#### CHIRIMEN 用ドライバのインストール

```shell
npm i @chirimen/htu21d
```

#### サンプルコード (main.js)

```javascript
import { requestI2CAccess } from "./node_modules/node-web-i2c/index.js";
import HTU21D from "@chirimen/htu21d";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

main();

async function main() {
	const i2cAccess = await requestI2CAccess();
	const port = i2cAccess.ports.get(1);
	const htu21d = new HTU21D(port, 0x40);
	await htu21d.init();

	while (true) {
		var temp = await htu21d.readTemperature();
		var humi = await htu21d.readHumidity();
		console.log("Temperature:", temp, " Humidity", humi);
		await sleep(1000);
	}
}
```

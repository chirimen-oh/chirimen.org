## 空気品質センサー

### ENS160 空気質センサー

#### 概要

* デジタルマルチガスセンサーで、室内空気質（IAQ）のモニタリングに特化
* 金属酸化物（MOX）技術を採用し、揮発性有機化合物（VOCs）や酸化性ガスの検出に優れた性能を発揮

#### 配線図

![](./schematic.png "schematic"){width=170px height=170px}

#### CHIRIMEN 用ドライバのインストール

```shell
npm i @chirimen/ens160
```

#### サンプルコード (main.js)

```javascript
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
```

#### 特記事項

Note: 配線図のモジュールは、ENS160に加えてAHT20(温度湿度センサ)も載っている複合センサボードです。(ENS160は温度と湿度の設定が必要)　<a href="https://www.amazon.co.jp/dp/B0D41R4V3Z">Amazonの商品例</a>

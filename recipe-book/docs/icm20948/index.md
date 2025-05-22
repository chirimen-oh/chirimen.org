### ICM20948 9軸センサー

#### 概要

* 超低消費電力 9 軸モーショントラッキングデバイスで、スマートフォン、ウェアラブルデバイス、IoT機器などに最適
* 3 軸加速度計、3 軸ジャイロスコープ、3 軸磁力計（AK09916）を統合し、さらにオンボードのデジタルモーションプロセッサ（DMP™）を装備

#### 配線図

![](./schematic.png "schematic"){width=220px height=220px}

#### CHIRIMEN 用ドライバのインストール

```shell
npm i @chirimen/icm20948
```

#### サンプルコード (main.js)

```javascript
/* 各種ライブラリをインポート */
import { requestGPIOAccess } from "./node_modules/node-web-gpio/dist/index.js"; // WebGPIO
import { requestI2CAccess } from "./node_modules/node-web-i2c/index.js"; // WebI2C
import ICM20948 from "@chirimen/icm20948"; // ICM20948
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

main();

var icm20948;
async function main() {
	/* センサー初期化 */
	const i2cAccess = await requestI2CAccess();
	const ic2Port = i2cAccess.ports.get(1);
	icm20948 = new ICM20948(ic2Port);
	await icm20948.init();
	while (true) {
		var icm = await icm20948.getdata();
		console.log("/-------------------------------------------------------------/");
		console.log(`Roll = ${icm[0].toFixed(2)} , Pitch = ${icm[1].toFixed(2)} , Yaw = ${icm[2].toFixed(2)}`);
		console.log(`Acceleration: X = ${icm[3]}, Y = ${icm[4]}, Z = ${icm[5]}`);
		console.log(`Gyroscope:     X = ${icm[6]} , Y = ${icm[7]} , Z = ${icm[8]}`);
		console.log(`Magnetic:      X = ${icm[9]} , Y = ${icm[10]} , Z = ${icm[11]}`);
		await sleep(1000);
	}
}
```

# HTU21D 温湿度センサー

## 配線図

![配線図](./schematic.png "schematic")

## サンプルコード (main.js)

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


---
[← 目次に戻る](../index.md)

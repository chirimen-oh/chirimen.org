# SCD40 CO2センサー

## 配線図

![配線図](./schematic.png "schematic")

## サンプルコード (main.js)

```javascript
import { requestI2CAccess } from "./node_modules/node-web-i2c/index.js";
import SCD40 from "@chirimen/scd40";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

main();

async function main() {
	const i2cAccess = await requestI2CAccess();
	const port = i2cAccess.ports.get(1);
	const scd40 = new SCD40(port, 0x62);
	await scd40.init();
	console.log(await scd40.serial_number());
	await scd40.start_periodic_measurement();

	// 値が出てくるまで数秒かかります
	// 測定が更新されると、updatedフラグがtrueになります
	while (true) {
		var data = await scd40.getData();
		console.log(data);
		await sleep(1000);
	}
}
```


---
[← 目次に戻る](../index.md)

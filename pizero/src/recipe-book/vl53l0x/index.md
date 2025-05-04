# VL53L0X レーザー測距センサー 30 mm - 2 m

## 配線図

![配線図](./schematic.png "schematic")

## サンプルコード (main.js)

```javascript
import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import VL53L0X from "@chirimen/vl53l0x";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const vl = new VL53L0X(port, 0x29);
  await vl.init(); // for Long Range Mode (<2m) : await vl.init(true);
  for (;;) {
    const distance = await vl.getRange();
    console.log(`${distance} [mm]`);
    await sleep(500);
  }
}


```


---
[← 目次に戻る](../index.md)

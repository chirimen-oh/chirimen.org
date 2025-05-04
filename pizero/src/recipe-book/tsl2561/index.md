# TSL2561 Grove Digital Light Sensor 光センサー

## 配線図

![配線図](./schematic.png "schematic")

## サンプルコード (main.js)

```javascript
import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import GROVELIGHT from "@chirimen/grove-light";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const grovelight = new GROVELIGHT(port, 0x29);
  await grovelight.init();
  for (;;) {
    try {
      const value = await grovelight.read();
      console.log(value);
    } catch (error) {
      console.error(" Error : ", error);
    }
    await sleep(200);
  }
}
```


---
[← 目次に戻る](../index.md)

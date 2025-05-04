# amg8833
# AMG8833 サーモグラフィー

## 配線図

![配線図](./schematic.png "schematic")

## サンプルコード (main.js)

```javascript
import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import AMG8833 from "@chirimen/amg8833";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const amg8833 = new AMG8833(port, 0x69);
  await amg8833.init();

  while (true) {
    const data = await amg8833.readData();
    for (const row of data) {
      // degree Celsius
      console.log(row.map(value => value.toFixed(2)).join(" "));
    }

    console.log();
    await sleep(500);
  }
}
```


---
[← 目次に戻る](../index.md)

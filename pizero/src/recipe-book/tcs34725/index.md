# tcs34725
# TCS34725 カラーセンサー

## 配線図

![配線図](./schematic.png "schematic")

## サンプルコード (main.js)

```javascript
import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import TCS34725 from "@chirimen/tcs34725";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const tcs34725 = new TCS34725(port, 0x29);
  await tcs34725.init();

  // You can select the value of gain from 1, 4, 16 or 60.
  await tcs34725.gain(4);

  while (true) {
    const data = await tcs34725.read();
    console.log(
      [
        `R: ${data.r}`,
        `G: ${data.g}`,
        `B: ${data.b}`,
        `Clear Light: ${data.c}`
      ].join(", ")
    );

    await sleep(500);
  }
}
```


---
[← 目次に戻る](../index.md)

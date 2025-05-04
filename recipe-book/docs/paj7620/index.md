# PAJ7620 Grove Gesture ジェスチャー認識センサー

## 配線図

![配線図](./schematic.png "schematic")

## サンプルコード (main.js)

```javascript
import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import PAJ7620 from "@chirimen/grove-gesture";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const gesture = new PAJ7620(port, 0x73);
  await gesture.init();

  for (;;) {
    const v = await gesture.read();
    console.log(v);
    await sleep(1000);
  }
}
```


---
[← 目次に戻る](../index.md)

# ads1015
# ADS1015 12 ビット AD コンバータ

## 配線図

![配線図](./schematic.png "schematic")

## サンプルコード (main.js)

```javascript
import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import ADS1015 from "@chirimen/ads1015";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  var i2cAccess = await requestI2CAccess();
  var port = i2cAccess.ports.get(1);
  var ads1015 = new ADS1015(port, 0x48);
  await ads1015.init();
  for (;;) {
    try {
      var value = await ads1015.read(0);
      console.log("value:", value);
    } catch (error) {
      console.error("error: code:" + error.code + " message:" + error.message);
    }
    await sleep(100);
  }
}
```


---
[← 目次に戻る](../index.md)

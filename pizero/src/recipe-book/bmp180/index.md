# bmp180
# BMP180 大気圧温度センサー

## 配線図

![配線図](./schematic.png "schematic")

## サンプルコード (main.js)

```javascript
import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import BMP180 from "@chirimen/bmp180";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  const readInterval = 1000;

  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const bmp180 = new BMP180(port, 0x77);
  await bmp180.init();
  for (;;) {
    const pressure = await bmp180.readPressure();
    const temperature = await bmp180.readTemperature();
    console.log(
      `Pressure: ${pressure.toFixed(2)} Pa, Temperature: ${temperature} degree.`
    );
    await sleep(readInterval);
  }
}
```


---
[← 目次に戻る](../index.md)

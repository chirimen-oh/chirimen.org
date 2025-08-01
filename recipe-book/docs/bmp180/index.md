## 気圧センサー

### BMP180 大気圧・温度センサー

#### 概要

* 温度・気圧を 1 チップで計測可能な高性能センサー

#### 配線図

![](./schematic.png "schematic"){width=250px height=250px}

#### CHIRIMEN 用ドライバのインストール

```shell
npm i @chirimen/bmp180
```

#### サンプルコード (main.js)

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

### AHT10 温湿度センサー

#### 概要

* 温度と湿度を同時に計測可能なデジタルセンサー

#### 配線図

![](./schematic.png "schematic"){width=233px height=246px}

#### CHIRIMEN 用ドライバのインストール

```shell
npm i @chirimen/aht10
```

#### サンプルコード (main.js)

```javascript
import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import AHT10 from "@chirimen/aht10";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const aht10 = new AHT10(port, 0x38);
  await aht10.init();

  while (true) {
    const { humidity, temperature } = await aht10.readData();
    console.log(
      [
        `Humidity: ${humidity.toFixed(2)}%`,
        `Temperature: ${temperature.toFixed(2)} degree`
      ].join(", ")
    );

    await sleep(500);
  }
}
```

### SHT30 温湿度センサー

#### 概要

* I²C 接続のデジタル温湿度センサー
* 高精度かつ応答性が良く、空調や室内環境モニタリングに最適

#### 配線図

![](./schematic.png "schematic"){width=250px height=250px}

#### CHIRIMEN 用ドライバのインストール

```shell
npm i @chirimen/sht30
```

#### サンプルコード (main.js)

```javascript
import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import SHT30 from "@chirimen/sht30";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const sht30 = new SHT30(port, 0x44);
  await sht30.init();

  while (true) {
    const { humidity, temperature } = await sht30.readData();
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

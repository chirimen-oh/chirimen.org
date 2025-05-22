## 距離センサー

### GP2Y0E03 測距センサー 40 mm - 0.1 m

#### 概要

* 小型・高精度な赤外線測距センサーモジュールで、アナログおよびI²C出力に対応
* 三角測量の原理を利用し、赤外線 LED と CMOS イメージセンサを組み合わせて、対象物までの距離を 4cm から 50cm の範囲で測定可能

#### 配線図

![](./schematic.png "schematic"){width=333px height=201px}

#### CHIRIMEN 用ドライバのインストール

```shell
npm i @chirimen/gp2y0e03
```

#### サンプルコード (main.js)

```javascript
import {requestI2CAccess} from "node-web-i2c";
import GP2Y0E03 from "@chirimen/gp2y0e03";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  try {
    const i2cAccess = await requestI2CAccess();
    const port = i2cAccess.ports.get(1);
    const sensor_unit = new GP2Y0E03(port, 0x40);
    await sensor_unit.init();

    while (1) {
      try {
        const distance = await sensor_unit.read();
        if (distance != null) {
          console.log("Distance:" + distance + "cm");
        } else {
          console.log("out of range");
        }
      } catch (err) {
        console.error("READ ERROR:" + err);
      }
      await sleep(500);
    }
  } catch (err) {
    console.error("GP2Y0E03 init error");
  }
}
```

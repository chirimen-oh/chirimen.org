## 色センサー

### TCS34725 RGB カラーセンサー

#### 概要

* 赤（Red）、緑（Green）、青（Blue）、および透明光（Clear）の4つのチャネルを装備
* 赤外線（IR）ブロッキングフィルターを内蔵しており、正確な色測定が可能


#### 配線図

![](./schematic.png "schematic"){width=210px height=210px}

#### CHIRIMEN 用ドライバのインストール

```shell
npm i @chirimen/tcs34725
```

#### サンプルコード (main.js)

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

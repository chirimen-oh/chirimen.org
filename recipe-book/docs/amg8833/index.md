## サーマルカメラ

### AMG8833 サーモグラフィー

#### 概要

* 赤外線アレイセンサー Grid-EYE シリーズの高性能モデル
* 8×8（64 ピクセル）の熱センサーを搭載し、非接触で温度分布を 2 次元的に測定可能

#### 配線図

![](./schematic.png "schematic"){width=208px height=226px}

#### CHIRIMEN 用ドライバのインストール

```shell
npm i @chirimen/amg8833
```

#### サンプルコード (main.js)

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

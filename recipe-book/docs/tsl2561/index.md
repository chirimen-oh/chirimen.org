### TSL2561 Grove Digital Light Sensor 光センサー

#### 概要

* デジタル光センサーモジュール
* 屋内外の光環境のモニタリングや自動明るさ制御などに最適

#### 配線図

![](./schematic.png "schematic"){width=353px height=249px}

#### CHIRIMEN 用ドライバのインストール

```shell
npm i @chirimen/grove-light
```

#### サンプルコード (main.js)

```javascript
import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import GROVELIGHT from "@chirimen/grove-light";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const grovelight = new GROVELIGHT(port, 0x29);
  await grovelight.init();
  for (;;) {
    try {
      const value = await grovelight.read();
      console.log(value);
    } catch (error) {
      console.error(" Error : ", error);
    }
    await sleep(200);
  }
}
```

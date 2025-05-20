### VEML6070 UV センサー

#### 概要

* 高感度な紫外線（UV）センサー
* 特に UVA 領域（波長 320〜410nm、ピーク感度 355nm）の検出に特化

#### 配線図

![](./schematic.png "schematic"){width=283px height=215px}

#### CHIRIMEN 用ドライバのインストール

```shell
npm i @chirimen/veml6070
```

#### サンプルコード (main.js)

```javascript
import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import VEML6070 from "@chirimen/veml6070";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const veml6070 = new VEML6070(port);
  await veml6070.init();
  for (;;) {
    const value = await veml6070.read();
    console.log(value);
    await sleep(200);
  }
}
```

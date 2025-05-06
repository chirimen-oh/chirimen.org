### VEML6070 UV センサー

#### 概要

高感度な紫外線（UV）センサーです。  
特にUVA領域（波長320〜410nm、ピーク感度355nm）の検出に優れています。

#### 配線図

![配線図](./schematic.png "schematic")

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

### VL53L1X レーザー距離センサー

#### 概要

* ToF（Time of Flight）方式で、距離を非接触で測定可能

#### 配線図

![](./schematic.png "schematic"){width=208px height=251px}

#### CHIRIMEN 用ドライバのインストール

```shell
npm i @chirimen/vl53l1x
```

#### サンプルコード (main.js)

```javascript
import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import VL53L1X from "@chirimen/vl53l1x";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const vl53l1x = new VL53L1X(port, 0x29);

  // Mode: short, medium, long
  await vl53l1x.init("short");

  // Necessary to start measurement
  await vl53l1x.startContinuous();

  while (true) {
    const distance = await vl53l1x.read();
    console.log(distance.toFixed(2) + " mm");
    await sleep(500);
  }
}
```

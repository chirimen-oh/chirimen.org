## PWM コントローラー

### PCA9685 16 チャンネルサーボモーター PWM ドライバー

#### 概要

* PWM 制御 IC で、最大 16 個のサーボモーターや LED を個別に制御可能

#### 配線図

![](./schematic.png "schematic"){width=230px height=230px}

#### CHIRIMEN 用ドライバのインストール

```shell
npm i @chirimen/pca9685
```

#### サンプルコード (main.js)

```javascript
import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import PCA9685 from "@chirimen/pca9685";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const pca9685 = new PCA9685(port, 0x40);
  // servo setting for sg90
  // Servo PWM pulse: min=0.0011[sec], max=0.0019[sec] angle=+-60[deg]
  await pca9685.init(0.001, 0.002, 30);
  for (;;) {
    await pca9685.setServo(0, -30);
    console.log("-30 deg");
    await sleep(1000);
    await pca9685.setServo(0, 30);
    console.log("30 deg");
    await sleep(1000);
  }
}
```

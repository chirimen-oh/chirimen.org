# hbridge2-pca9685pwm
# PCA9685 16 チャンネルPWM ドライバ + HBridgeモーターコントローラ
* PCA9685 16 チャンネルPWM ドライバーとHBridgeモータードライバーで、DCモーターを正転・逆転・速度コントロールします。
* HBridgeコントローラはL298N以外にもL9110S、MX1508等も同様に使用できます。
  * ただし、これらのドライバでは+5Vと+12V端子の代わりに、一個のVCCや電源(+)端子だけのものが多いので、モーター電源はそこに繋げます。

## 配線図

![配線図](./schematic.png "schematic")

## サンプルコード (main.js)

```javascript
import { requestI2CAccess } from "./node_modules/node-web-i2c/index.js";
import PCA9685_PWM from "@chirimen/pca9685-pwm";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

let pca9685pwm;

main();

async function main() {
    await init();

    let direction = -1;
    for (; ;) {
        direction = (direction == 1) ? -1 : 1; // 三項演算子でdirectionを反転
        console.log("direction:", direction);
        console.log("speedUp");
        for (let speed = 0; speed <= 1; speed += 0.1) {
            await setMotor(direction, speed);
            await sleep(200);
        }
        await sleep(500);
        console.log("speedDown");
        for (let speed = 1; speed >= 0; speed -= 0.1) {
            await setMotor(direction, speed);
            await sleep(200);
        }
        console.log("stop");
        await setMotor(0, 0);
        await sleep(1000);
    }
}

async function init() {
    const i2cAccess = await requestI2CAccess();
    const port = i2cAccess.ports.get(1);
    pca9685pwm = new PCA9685_PWM(port, 0x40);
    await pca9685pwm.init(100);
}

async function setMotor(direction, speed) {
    // direction: モーターの回転方向 正転:1,逆転:-1,停止:0
    // speed: モーターのスピード 0:停止....1.0:全速
    if (direction == 1) {
        await pca9685pwm.setPWM(1, 0);
        await pca9685pwm.setPWM(0, speed);
    } else if (direction == -1) {
        await pca9685pwm.setPWM(0, 0);
        await pca9685pwm.setPWM(1, speed);
    } else {
        await pca9685pwm.setPWM(0, 0);
        await pca9685pwm.setPWM(1, 0);
    }
}
```


---
[← 目次に戻る](../index.md)

### ギヤードモーター part1

#### 概要

* ギヤードモーターの回転・停止

#### 配線図

![](./PiZero_gpio0Motor_2.png "schematic")

GPIO ポート 26 にモーター制御回路を繋ぎます。
※このセクションのコードは「L チカ」と共通のため、配線のみ異なる点にご注意ください。

#### CHIRIMEN 用ドライバのインストール

- 不要

#### サンプルコード (main.js)

```javascript
import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

async function blink() {
  const gpioAccess = await requestGPIOAccess();
  const port = gpioAccess.ports.get(26);

  await port.export("out");

  for (;;) {
    await port.write(1);
    await sleep(1000);
    await port.write(0);
    await sleep(1000);
  }
}

blink();
```

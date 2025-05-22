# 入門用

## hello-real-world

### Lチカ (GPIO OUTPUT)

#### 概要

* LED を点滅させます。

#### 配線図

![](./PiZero_gpio0.png "schematic"){width=200px height=200px}

GPIO ポート 26 に LED と抵抗を直列に接続します。

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

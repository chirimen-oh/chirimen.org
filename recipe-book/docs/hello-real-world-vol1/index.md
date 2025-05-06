# 入門用

## hello-real-world

### Lチカ (GPIO OUTPUT)

#### 配線図

![配線図](./PiZero_gpio0.png "schematic")

GPIO ポート 26 に LED と抵抗を直列に接続します。

#### CHIRIMEN 用ドライバのインストール

- 不要です。

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

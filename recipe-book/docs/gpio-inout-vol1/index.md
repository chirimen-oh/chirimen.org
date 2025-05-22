### GPIO スイッチと LED

#### 概要

* スイッチを押すと LED を点灯、離すと消灯させる基本的な動作です。

#### 配線図

![](./PiZero_gpio-inout.png "schematic"){width=210px height=210px}

GPIO ポート 5 にスイッチ、GPIO ポート 26 に抵抗と LED を繋ぎます。

#### CHIRIMEN 用ドライバのインストール

- 不要

#### サンプルコード (main.js)

```javascript
import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
let port2;

async function startGpio() {
  const gpioAccess = await requestGPIOAccess();
  
  port2 = gpioAccess.ports.get(26);
  await port2.export("out");

  const port = gpioAccess.ports.get(5);
  await port.export("in");
  port.onchange = showPort;
}

function showPort(ev){
	console.log(ev.value);
    if (ev.value==0){
        port2.write(1);
    } else {
        port2.write(0);
    }
}

startGpio();
```

## タッチセンサー

### GPIOタッチセンサー

#### 配線図

![配線図](./PiZero_gpio_TTP223.png "schematic TP223")

GPIO PORT5に繋ぎます。3.3V電源を用います。指でのタッチだけでなく金属の近接も感知します。(1~2mmに接近すると検知)。
金属がセンサーのピンに触れてショートしないよう、テープで被覆して絶縁しましょう。

#### CHIRIMEN 用ドライバのインストール

- 不要です。

#### サンプルコード (main.js)

```javascript
import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

async function switchCheck() {
  const gpioAccess = await requestGPIOAccess();
  const port = gpioAccess.ports.get(5);

  await port.export("in");
  port.onchange = showPort;

}

function showPort(ev){
	console.log(ev.value);
}

switchCheck();
```

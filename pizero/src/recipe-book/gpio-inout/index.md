# GPIO スイッチ + (LED又はギヤードモーター) (GPIO INPUT/OUTPUT)

## 配線図１ (スイッチ+LED)

![配線図](./PiZero_gpio-inout.png "schematic")

GPIO PORT5にスイッチ、GPIOPORT26に抵抗とLEDを繋ぎます

## 配線図２ (スイッチ+ギヤードモーター)

![配線図](./PiZero_gpio-inoutMotor.png "schematic")

GPIO PORT5にスイッチ、GPIOPORT26にモーター制御回路を繋ぎます

## サンプルコード (main.js)

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


---
[← 目次に戻る](../index.md)

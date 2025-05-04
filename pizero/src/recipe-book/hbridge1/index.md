# HBridge1 

Hブリッジモータードライバは正転[1,0]・逆転[0,1]・ブレーキ[1,1]・フリー[0,0]の4状態をGPIOの２つの信号線を使って指示します

## 配線図

![配線図](schematic.png "schematic")

## サンプルコード (main.js)

```javascript
// Hブリッジモータードライバは正転[1,0]・逆転[0,1]・ブレーキ[1,1]・フリー[0,0]の4状態を
// GPIOの２つの信号線を使って指示します

import { requestGPIOAccess } from "./node_modules/node-web-gpio/dist/index.js";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

const portAddrs = [20, 21]; // HブリッジコントローラをつなぐGPIOポート番号
let ports;

main();

async function main() {
    await init();

    for (; ;) {
        console.log("fwd");
        await fwd();
        await sleep(1000);
        console.log("rev");
        await rev();
        await sleep(1000);
        console.log("brake");
        await brake();
        await sleep(1000);
    }
}

async function init() {
    // ポートを初期化するための非同期関数
    const gpioAccess = await requestGPIOAccess(); // thenの前の関数をawait接頭辞をつけて呼び出します。
    ports = [];

    for (let i = 0; i < 2; i++) {
        ports[i] = gpioAccess.ports.get(portAddrs[i]);
        await ports[i].export("out");
    }
    for (let i = 0; i < 2; i++) {
        ports[i].write(0);
    }
}

async function free() {
    ports[0].write(0);
    ports[1].write(0);
}

async function brake() {
    ports[0].write(1);
    ports[1].write(1);
    await sleep(300); // 300ms待機してフリー状態にします
    ports[0].write(0);
    ports[1].write(0);
}

async function fwd() {
    ports[0].write(1);
    ports[1].write(0);
}

async function rev() {
    ports[0].write(0);
    ports[1].write(1);
}
```


---
[← 目次に戻る](../index.md)

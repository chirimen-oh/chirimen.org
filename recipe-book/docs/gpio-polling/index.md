# GPIO 関連

## 基本的な GPIO 操作

### GPIO タクトスイッチ

#### 概要

GPIO に接続されたタクトスイッチの状態（ON/OFF）を監視して、ログ出力します。

#### 配線図

![配線図](./PiZero_gpio1.png "schematic"){width=300px height=300px}

GPIO ポート 5 に接続します。

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

  for(;;){
    const v = await port.read();
	console.log(v);
    await sleep(300);
  }

}

switchCheck();
```

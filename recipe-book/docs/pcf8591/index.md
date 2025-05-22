### PCF8591 8bit AD,DA コンバーター

#### 概要

- I²C インターフェース対応 8 ビット A/D or D/A コンバータ IC
- この IC は、4 つのアナログ入力チャンネルと 1 つのアナログ出力チャンネルを装備
- マイコンボード（Arduino、Raspberry Piなど）と組み合わせて、アナログ信号の読み取りや出力に利用可能

#### 配線図

![](./schematic.png "schematic"){width=252px height=230px}

#### CHIRIMEN 用ドライバのインストール

```shell
npm i @chirimen/pcf8591
```

#### サンプルコード (main.js)

```javascript
import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import PCF8591 from "@chirimen/pcf8591";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const pcf8591 = new PCF8591(port, 0x48);
  await pcf8591.init();

  // Set DAC voltage (Range: 0V - 3.3V)
  await pcf8591.setDAC(3.3);

  while (true) {
    let output = "";

    // PCF8591 has 4 channels
    for (let channel = 0; channel < 4; channel++) {
      const voltage = await pcf8591.readADC(channel);
      output += `CH${channel}:${voltage.toFixed(3)}V `;
    }
    console.log(output);

    await sleep(500);
  }
}
```

### ADS1115 16bit ADC 差動入力によるロードセルの使用

#### 概要

* 16 ビットの高精度アナログ-デジタルコンバータ（ADC）
* I²C インターフェースを介してマイコンと接続し、アナログ信号をデジタル化することが可能

#### 配線図

![](./schematic.png "schematic"){width=318px height=254px}

#### CHIRIMEN 用ドライバのインストール

```shell
npm i @chirimen/ads1x15
```

#### サンプルコード (main.js)

```javascript
import { requestI2CAccess } from "./node_modules/node-web-i2c/index.js";
import ADS1X15 from "@chirimen/ads1x15";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
    const i2cAccess = await requestI2CAccess();
    const port = i2cAccess.ports.get(1);
    const ads1115 = new ADS1X15(port, 0x48);
    // If you uses ADS1115, you have to select "true", otherwise select "false".
    await ads1115.init(true, 7); // High Gain
    console.log("init complete");
    var firstTime = true;
    var tare;
    while (true) {
        var difA = await ads1115.read("0,1");  // p0-p1 differential mode
        console.log("dif chA(0-1):" + difA.toString(16) + " : " + ads1115.getVoltage(difA).toFixed(6) + "V");
        if (firstTime) {
            tare = difA;
            firstTime = false;
        }
        var weight = difA - tare;
        console.log("rawData - Tare:" + weight.toString(16) + " : " + ads1115.getVoltage(weight).toFixed(6) + "V");
        await sleep(500);
    }
}
```

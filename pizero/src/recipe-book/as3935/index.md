# AS3935 雷センサー

## 概要
AS3935は、雷センサーICです。ICに内蔵された雷検出アルゴリズムが入力信号をチェックし暴風雨の頭部までの距離を推定します。

このサンプルでは、I2Cバスに加えて、GPIOポート5を雷検出のトリガーとして使用しています。

## 特記事項
しっかりと動作確認ができていません。（雷検出の機会が少ないため）　動作確認にご協力ください。（ISSUEにレポートを記載いただけると幸いです）

## 使用するブレークアウトボード

- I2Cスレーブアドレス、```0x03```が設定されているものを使用しています。
- 秋月電子通商 AE-AS3935 がこれに相当します。: [製品ページ](https://akizukidenshi.com/catalog/g/gK-08685/)　

## I2Cデバイスの検出

- I2Cアドレス ```0x03```のデバイスは、通常のi2cdetectコマンドでは検出できません（標準範囲外アドレス） ```-a``` オプションが必要です。コマンドプロンプトから、以下のコマンドで検出してください。
- ```i2cdetect -y -a 1```

## 配線図

![配線図](./schematic.png "schematic")

## サンプルコード (main.js)

```javascript
/* 各種ライブラリをインポート */
import { requestGPIOAccess } from "./node_modules/node-web-gpio/dist/index.js"; // WebGPIO 
import { requestI2CAccess } from "./node_modules/node-web-i2c/index.js"; // WebI2C
import AS3935 from "@chirimen/as3935"; // AS3935
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

var as3935;
async function main() {
    /* 雷センサー初期化 */
    const i2cAccess = await requestI2CAccess();
    const ic2Port = i2cAccess.ports.get(1);
    as3935 = new AS3935(ic2Port);
    await as3935.init();
    await as3935.reset();
    await sleep(100);
    await as3935.set_indoors(true);
    await as3935.set_noise_floor(0);
    await as3935.calibrate(0x0f);

    /* 雷センサーインタラプト用GPIO初期化 */
    const gpioAccess = await requestGPIOAccess();
    const as3935_interruptPort = gpioAccess.ports.get(5);
    await as3935_interruptPort.export("in");
    as3935_interruptPort.onchange = as3935_sens;

}

async function as3935_sens(ev) {
    if (ev.value == 0) { return }
    console.log("interruptPort:", ev.value);
    await sleep(10);
    var reason = await as3935.get_interrupt();
    if (reason == 0x01) {
        console.log("Noise level too high - adjusting");
        await as3935.raise_noise_floor();
    } else if (reason == 0x04) {
        console.log("Disturber detected - masking");
        await as3935.set_mask_disturber(true);
    } else if (reason == 0x08) {
        var now = new Date().toLocaleString();
        var distance = await as3935.get_distance();
        console.log(`Detect lightinig! It was ${distance} Km away. (${now}) `);
    }
}```


---
[← 目次に戻る](../index.md)

# DRV8830 DCモータードライバ

DRV8830を使用して、I2C経由でブラシ付きDCモーター1個を駆動するサンプルです。

DRV8830はPWMのデューティ比ではなく出力電圧を指定するICです。
指定した電圧になるよう内蔵のPWMレギュレーターが自動調整するため、電源電圧が変動してもモーター速度を一定に保てます。

## 使用するデバイス

- Raspberry Pi Zero 2 W
- DRV8830 低電圧モータードライバー
- ブラシ付きDCモーター

## 仕様

- 動作電源電圧: 2.75V〜6.8V
- 出力電圧範囲: 約0V〜5.06V(64段階、約0.08V刻み)
- 最大出力電流: 1A(連続)
- I2Cスレーブアドレス: `0x64`(デフォルト。A0・A1ピンの配線により`0x60`〜`0x68`の範囲で変更可能)

詳細な仕様は[データシート](https://www.ti.com/lit/ds/symlink/drv8830.pdf)を参照してください。

## 配線

![](./schematic.excalidraw.svg)

DRV8830をRasbperryPiとDCモーターに接続します。

| DRV8830 | 接続先       |
| ------- | ------------ |
| OUT2    | DCモーター - |
| ISENSE  | GND          |
| OUT1    | DCモーター + |
| VCC     | 5V           |
| GND     | GND          |
| FAULT   | -            |
| A0      | -            |
| A1      | -            |
| SDA     | SDA          |
| SCL     | SCL          |

ISENSEは電流制限のしきい値を設定する端子です。
このサンプルでは電流制限機能を使わないため、電流検出抵抗を挟まずISENSEをGNDへ直接接続します。

VCCはモーター駆動用の電源も兼ねます。
モーターの消費電流がRaspberry Piの許容量を超える場合は、2.75V〜6.8Vの外部電源をVCCに接続してください。

## インストール方法

```bash
npm i node-web-i2c @chirimen/drv8830
```

## 実行方法

```bash
node main.js
```

## サンプルコードの解説

```js
import { requestI2CAccess } from "node-web-i2c";
import DRV8830 from "@chirimen/drv8830";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const i2cAccess = await requestI2CAccess();
const motor = new DRV8830(i2cAccess.ports.get(1));

await motor.init();

console.log("Forward");
await motor.forward(3);
await sleep(1000);

console.log("Brake");
await motor.brake();
await sleep(300);

console.log("Reverse");
await motor.reverse(3);
await sleep(1000);

console.log("Stop");
await motor.stop();
await motor.clearFault();
```

`init()` でI2C接続を開始したあと、正転(`forward`)、ブレーキ(`brake`)、逆転(`reverse`)、停止(`stop`)の順にモーターを動作させ、最後に`clearFault()`でフォルト状態をクリアします。

- `forward(voltage)` / `reverse(voltage)`: 指定した電圧(V)で正転・逆転します。値は最大出力電圧(約5.06V)にクランプされます。
- `brake()`: 両出力をHighにしてショートブレーキをかけます。
- `stop()`: 出力をハイインピーダンス状態にして停止(コースト)します。
- `clearFault()`: FAULTレジスタのフォルト状態をクリアします。

## ドライバ

このサンプルでは `@chirimen/drv8830` を使用します。

## 参考リンク

- DRV8830 データシート(Texas Instruments社)
  - https://www.ti.com/lit/ds/symlink/drv8830.pdf

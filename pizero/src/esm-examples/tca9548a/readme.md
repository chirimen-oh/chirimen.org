# TCA9548A I2Cマルチプレクサ

TCA9548Aは、1本のI2CバスのSDA/SCLを8系統(CH0〜CH7)に切り替えるスイッチICです。スレーブアドレスが同じI2Cデバイスを複数台使いたいとき、デバイスごとに別のチャンネルへつなぎ、TCA9548A側でチャンネルを切り替えることで衝突を避けられます。このサンプルでは、同じアドレス(`0x44`)のSHT30温湿度センサーを2個用意し、CH0とCH1にそれぞれ接続して同時に読み出します。

## 使用するデバイス

- Raspberry Pi Zero 2 W
- TCA9548A I2Cマルチプレクサ
- SHT30 温湿度センサー ×2

## 仕様

- 動作電源電圧: 1.65V〜5.5V(VINピン。接続するI2Cバスの電圧レベルに合わせる)
- チャンネル数: 8(CH0〜CH7)
- I2Cスレーブアドレス: `0x70`(デフォルト。A0〜A2ピンの配線により`0x70`〜`0x77`の範囲で変更可能)

詳細な仕様は[データシート](https://www.ti.com/lit/ds/symlink/tca9548a.pdf)を参照してください。

## 配線

Raspberry PiとTCA9548Aの上流側(バス側)をI2Cで接続します。

| Raspberry Pi | TCA9548A |
| ------------ | -------- |
| 3.3V         | VIN      |
| GND          | GND      |
| SDA          | SDA      |
| SCL          | SCL      |

TCA9548Aの下流側(チャンネル側)に、SHT30を1台ずつ接続します。

| TCA9548A  | 接続先                  |
| --------- | ----------------------- |
| SD0 / SC0 | SHT30(1台目)のSDA / SCL |
| SD1 / SC1 | SHT30(2台目)のSDA / SCL |

SHT30側のVCC/GNDは、TCA9548Aを経由せずRaspberry Piの3.3V/GNDに直接つなぎます。TCA9548Aが切り替えるのはSDA/SCLだけで、電源ラインはチャンネルごとに分かれていません。

## インストール方法

```bash
npm i node-web-i2c @chirimen/sht30 @chirimen/tca9548a
```

## 実行方法

```bash
node main.js
```

## サンプルコードの解説

```js
import { requestI2CAccess } from "node-web-i2c";
import TCA9548A from "@chirimen/tca9548a";
import SHT30 from "@chirimen/sht30";

const i2cAccess = await requestI2CAccess();
const mux = new TCA9548A(i2cAccess.ports.get(1));

const sht30Ch0 = new SHT30(mux.get(0));
const sht30Ch1 = new SHT30(mux.get(1));
await sht30Ch0.init();
await sht30Ch1.init();
```

`new TCA9548A(i2cAccess.ports.get(1))` でマルチプレクサ本体を用意したあと、`mux.get(0)` や `mux.get(1)` を呼ぶと、そのチャンネルに固定された`I2CPort`相当のオブジェクトが返ります。これをそのまま`SHT30`のコンストラクタに渡せば、`sht30Ch0`と`sht30Ch1`はそれぞれ専用のチャンネルだけを見ているかのように振る舞います。呼び出し側で`mux.write(channel)`を挟んでチャンネルを切り替える必要はありません。

`sht30Ch0`と`sht30Ch1`は同じスレーブアドレス`0x44`のSHT30ですが、配線上は別のチャンネル(CH0とCH1)につながっているため衝突しません。`get(channel)`が返すオブジェクトは、チャンネルの切り替えとその後のI2C通信を1つのロックの中で直列に実行するので、`readData()`の呼び出しをawaitし忘れて同時に発行してしまっても、チャンネルの取り違えは起きません。

## ドライバ

このサンプルでは `@chirimen/tca9548a` と `@chirimen/sht30` を使用します。

## 参考リンク

- TCA9548A データシート(Texas Instruments社)
  - https://www.ti.com/lit/ds/symlink/tca9548a.pdf
- [@chirimen/tca9548a](https://github.com/chirimen-oh/chirimen-drivers/tree/master/packages/tca9548a) ドライバのREADME(`get(channel)`の詳しい仕様)

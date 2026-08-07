# seesaw 多目的インターフェース

Adafruitのseesaw(ATSAMD09搭載)は、デジタル入出力・アナログ入力・PWM出力・NeopixelLEDドライブ等の機能を1つのI2Cデバイスとして扱える多目的インターフェースボードです。このサンプルではNeopixelLED以外の機能(アナログ入力・デジタル出力)を動かしています。

## 配線図

![配線図](./schematic.png "schematic")

VCC(3.3V)・GND・SDA・SCL の4本をRaspberry PiのI2Cピンに接続します。I2Cアドレスは `0x49` 固定です。

さらに、

- seesaw基板のピン `2`(A0) に可変抵抗(ボリューム)の中点を接続(両端はVCC・GNDへ)
- seesaw基板のピン `15` にLED(と保護抵抗)を接続

します。

## ドライバのインストール

```sh
npm i node-web-i2c @chirimen/seesaw
```

## サンプルコード

同ディレクトリの [main.js](main.js) と同じ内容です。

```javascript
import { requestI2CAccess } from "node-web-i2c";
import Seesaw from "@chirimen/seesaw";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ANALOG_PIN = 2; // seesaw基板の A0 (可変抵抗などアナログ入力を接続)
const LED_PIN = 15; // seesaw基板のデジタル出力ピン (LEDを接続)

const i2cAccess = await requestI2CAccess();
const seesaw = new Seesaw(i2cAccess.ports.get(1));
await seesaw.init();
await seesaw.pin_mode(LED_PIN, seesaw.OUTPUT);

while (true) {
  const value = await seesaw.analog_read(ANALOG_PIN); // 0-1023
  const on = value > 512;
  await seesaw.digital_write(LED_PIN, on);
  console.log(`アナログ入力: ${value} → LED: ${on ? "ON" : "OFF"}`);
  await sleep(500);
}
```

Note: seesawはRaspberry Pi自身のGPIOではなく、seesaw基板上のピンをI2C経由でデジタル入出力・アナログ入力として使う点が特徴です。`pin_mode`/`digital_write`/`digital_read`/`analog_read`等のメソッドで、まるでRaspberry PiのGPIOのようにseesaw基板のピンを操作できます。

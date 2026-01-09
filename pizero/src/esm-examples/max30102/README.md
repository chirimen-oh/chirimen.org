# MAX30102 心拍センサーモジュール

## 配線表

| Raspberry Pi Zero | MAX30102 |
|-------------------|----------|
| 3.3V (Pin 1)      | VIN      |
| SDA/GPIO2 (Pin 3) | SDA      |
| SCL/GPIO3 (Pin 5) | SCL      |
| GND (Pin 6)       | GND      |

## インストール

```
$ npm i @chirimen/max30102
```

## サンプルコード

```js
import { requestI2CAccess } from "node-web-i2c";
import MAX30102 from "@chirimen/max30102";

const i2cAccess = await requestI2CAccess();
const max30102 = new MAX30102(i2cAccess.ports.get(1));
await max30102.init();

while (true) {
  const { heartRate } = await max30102.read();
  console.log(`Heart Rate: ${heartRate} bpm`);
}
```

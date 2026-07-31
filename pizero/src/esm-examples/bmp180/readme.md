# BMP180 大気圧温度センサー

## 配線図

![配線図](./schematic.png "schematic")

## ドライバのインストール

```sh
npm i node-web-i2c @chirimen/bmp180
```

## サンプルコード

同ディレクトリの [main.js](main.js) と同じ内容です。

```javascript
import { requestI2CAccess } from "node-web-i2c";
import BMP180 from "@chirimen/bmp180";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

const readInterval = 1000;

const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const bmp180 = new BMP180(i2cPort, 0x77);
await bmp180.init();
while (true) {
  const pressure = await bmp180.readPressure();
  const temperature = await bmp180.readTemperature();
  console.log(
    `Pressure: ${pressure.toFixed(2)} Pa, Temperature: ${temperature} degree.`,
  );
  await sleep(readInterval);
}
```

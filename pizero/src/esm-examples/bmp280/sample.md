# BMP280 温度・気圧センサー

## 配線図

![配線図](./schematic.png "schematic")

# ドライバのインストール

```
npm i @chirimen/bmp280
```

# サンプルコード

```javascript
const { requestI2CAccess } = require("node-web-i2c");
const BMP280 = require("@chirimen/bmp280");
const { promisify } = require("util");
const sleep = promisify(setTimeout);

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const bmp280 = new BMP280(port, 0x76);
  await bmp280.init();

  while (true) {
    const data = await bmp280.readData();
    const pressure = data.pressure.toFixed(2);
    const temperature = data.temperature.toFixed(2);
    console.log(
      [`Temperature: ${temperature} degree`, `Pressure: ${pressure} hPa`].join(
        ", "
      )
    );

    await sleep(500);
  }
}
```

# AHT10 温湿度センサー

## 配線図

![配線図](./schematic.png "schematic")

# ドライバのインストール

```
npm i @chirimen/aht10
```

# サンプルコード

```javascript
const { requestI2CAccess } = require("node-web-i2c");
const AHT10 = require("@chirimen/aht10");
const { promisify } = require("util");
const sleep = promisify(setTimeout);

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const aht10 = new AHT10(port, 0x38);
  await aht10.init();

  while (true) {
    const { humidity, temperature } = await aht10.readData();
    console.log(
      [
        `Humidity: ${humidity.toFixed(2)}%`,
        `Temperature: ${temperature.toFixed(2)} degree`
      ].join(", ")
    );

    await sleep(500);
  }
}
```


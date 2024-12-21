# SHT40 温湿度センサー

## 配線図

![配線図](./schematic.png "schematic")

# ドライバのインストール

```
npm i @chirimen/sht40
```

# サンプルコード

```javascript
const { requestI2CAccess } = require("node-web-i2c");
const SHT40 = require("@chirimen/sht40");
const { promisify } = require("util");
const sleep = promisify(setTimeout);

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const sht40 = new SHT40(port, 0x44);
  await sht40.init();

  while (true) {
    const { humidity, temperature } = await sht40.readData();
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


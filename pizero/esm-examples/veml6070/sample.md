# VEML6070 UV センサー

## 配線図

![配線図](./schematic.png "schematic")

# ドライバのインストール

```
npm i @chirimen/veml6070
```

# サンプルコード

```javascript
const { requestI2CAccess } = require("node-web-i2c");
const VEML6070 = require("@chirimen/veml6070");
const { promisify } = require("util");
const sleep = promisify(setTimeout);

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const veml6070 = new VEML6070(port);
  await veml6070.init();
  for (;;) {
    const value = await veml6070.read();
    console.log(value);
    await sleep(200);
  }
}
```


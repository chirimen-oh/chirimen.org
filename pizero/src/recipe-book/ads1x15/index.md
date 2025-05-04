# ADS1115 16bit ADC

## 配線図

![配線図](./schematic.png "schematic")

## サンプルコード (main.js)

```javascript
import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import ADS1X15 from "@chirimen/ads1x15";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const ads1x15 = new ADS1X15(port, 0x48);
  // If you uses ADS1115, you have to select "true", otherwise select "false".
  await ads1x15.init(true);
  console.log("init complete");
  while (true) {
    let output = "";
    // ADS1115 has 4 channels.
    for (let channel = 0; channel < 4; channel++) {
      const rawData = await ads1x15.read(channel);
      const voltage = ads1x15.getVoltage(rawData);
      output += `CH${channel}:${voltage.toFixed(3)}V `;
    }
    console.log(output);

    await sleep(500);
  }
}
```


---
[← 目次に戻る](../index.md)

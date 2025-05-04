# MLX90614 赤外線温度センサー

## 配線図

![配線図](./schematic.png "schematic")

## サンプルコード (main.js)

```javascript
import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import MLX90614 from "@chirimen/mlx90614";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const mlx90614 = new MLX90614(port, 0x5a);
  await mlx90614.init();

  while (true) {
    // Temperature of object that the sensor looking at. (Measured by IR sensor)
    const objectTemperature = await mlx90614.get_obj_temp();
    // Temperature measured by the chip. (The package temperature)
    const ambientTemperature = await mlx90614.get_amb_temp();
    console.log(
      [
        `Object temperature: ${objectTemperature.toFixed(2)} degree`,
        `Ambient temperature: ${ambientTemperature.toFixed(2)} degree`
      ].join(", ")
    );

    await sleep(500);
  }
}
```


---
[← 目次に戻る](../index.md)

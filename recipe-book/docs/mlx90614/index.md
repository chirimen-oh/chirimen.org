## 赤外線温度センサー

### MLX90614 赤外線温度センサー

#### 概要

* 高精度な非接触型赤外線温度センサー
* 赤外線サーモパイル検出器と信号処理用の ASIC を一体化した TO-39 パッケージに収められており、物体や環境の温度を非接触で測定可能

#### 配線図

![](./schematic.png "schematic"){width=173px height=212px}

#### CHIRIMEN 用ドライバのインストール

```shell
npm i @chirimen/mlx90614
```

#### サンプルコード (main.js)

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

### MPU6050 3 軸ジャイロ 3 軸加速度 複合センサー

#### 概要

* 6 軸モーションセンサーで、3 軸加速度計と 3 軸ジャイロスコープを 1 チップに統合
* デバイスの動きや傾きを高精度に検出可能、ドローン、ロボット、ウェアラブルデバイスなど、さまざまなアプリケーションで広く利用

#### 回路図

![](./schematic.png "schematic"){width=200px height=200px}

#### CHIRIMEN 用ドライバのインストール

```shell
npm i @chirimen/mpu6050
```

#### サンプルコード (main.js)

```javascript
import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import MPU6050 from "@chirimen/mpu6050";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  var i2cAccess = await requestI2CAccess();
  var port = i2cAccess.ports.get(1);
  var mpu6050 = new MPU6050(port, 0x68);
  await mpu6050.init();
  while (true) {
    const data = await mpu6050.readAll();
    const temperature = data.temperature.toFixed(2);
    const g = [data.gx, data.gy, data.gz];
    const r = [data.rx, data.ry, data.rz];
    console.log(
      [
        `Temperature: ${temperature} degree`,
        `Gx: ${g[0]}, Gy: ${g[1]}, Gz: ${g[2]}`,
        `Rx: ${r[0]}, Ry: ${r[1]}, Rz: ${r[2]}`
      ].join("\n")
    );

    await sleep(500);
  }
}
```

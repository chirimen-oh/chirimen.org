# MPU6050 ３軸ジャイロ＋ ３軸加速度 複合センサー

## 回路図

![回路図](./schematic.png "schematic")

## サンプルコード (main.js)

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


---
[← 目次に戻る](../index.md)

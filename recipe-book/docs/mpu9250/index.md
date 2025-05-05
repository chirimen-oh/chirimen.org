### MPU9250 3 軸ジャイロ 3 軸加速度 3 軸 磁気複合センサー

#### 配線図

![配線図](./schematic.png "schematic"){width=300px height=300px}

#### CHIRIMEN ドライバのインストール

```shell
npm i @chirimen/ak8963
```

#### サンプルコード (main.js)

```javascript
import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import MPU6500 from "@chirimen/mpu6500";
import AK8963 from "@chirimen/ak8963";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const mpu6500 = new MPU6500(port, 0x68);
  const ak8963 = new AK8963(port, 0x0c);
  await mpu6500.init();
  await ak8963.init();

  while (true) {
    const g = await mpu6500.getGyro();
    const r = await mpu6500.getAcceleration();
    const h = await ak8963.readData();
    console.log(
      [
        `Gx: ${g.x}, Gy: ${g.y}, Gz: ${g.z}`,
        `Rx: ${r.x}, Ry: ${r.y}, Rz: ${r.z}`,
        `Hx: ${h.x}, Hy: ${h.y}, Hz: ${h.z}`
      ].join("\n")
    );

    await sleep(500);
  }
}
```

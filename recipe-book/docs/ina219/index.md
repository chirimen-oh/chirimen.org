## 電流センサー

### INA219 電流センサー

#### 概要

* 高精度なデジタル電流・電圧・電力センサー
* I²C インターフェースを介してマイコンと通信し、シャント抵抗を用いて電流を測定

#### 配線図

![](./schematic.png "schematic"){width=230px height=230px}

#### CHIRIMEN 用ドライバのインストール

```shell
npm i @chirimen/ina219
```

#### サンプルコード (main.js)

```javascript
import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import INA219 from "@chirimen/ina219";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const ina219 = new INA219(port, 0x40);
  await ina219.init();
  await ina219.configure();

  while (true) {
    const voltage = await ina219.voltage();
    const supplyVoltage = await ina219.supply_voltage();
    const current = await ina219.current();
    const power = await ina219.power();
    const shuntVoltage = await ina219.shunt_voltage();

    console.log(
      [
        `Voltage: ${voltage.toFixed(3)}V`,
        `Supply voltage: ${supplyVoltage.toFixed(3)}V`,
        `Current: ${current.toFixed(2)}mA`,
        `Power: ${power.toFixed(2)}mW`,
        `Shunt voltage: ${shuntVoltage.toFixed(2)}mV`
      ].join(", ")
    );

    await sleep(500);
  }
}
```

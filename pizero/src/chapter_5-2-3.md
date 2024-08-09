# 5.2.3 SHT30 のコードを読む

* ターミナルウィンドの右側のファイルマネージャでmain-sht30.js⇒表示 を選び、ソースコードを読んでみましょう

```js
import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import SHT30 from "@chirimen/sht30";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const sht30 = new SHT30(port, 0x44);
  await sht30.init();

  while (true) {
    const { humidity, temperature } = await sht30.readData();
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

* [WebI2CライブラリとSHT30デバイスドライバを読み込み](../chirimenGeneric/#webi2c)
  * I2Cインターフェースに接続されたスレーブデバイスは[Web I2C API](http://browserobo.github.io/WebI2C)と呼ぶAPIによって使用することができます。
```js
import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import SHT30 from "@chirimen/sht30";
```
* [JavaScript module](./chapter_10-3-1.md) に基づいてWebI2Cライブラリを読み込みます。
* [I2C 温湿度センサー (SHT30, SHT31)の初期化と使用](./chapter_5-2-4.md)
  * 次のページでコードの流れを詳細に解説します
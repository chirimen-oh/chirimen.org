# 5.2.3 SHT30 のコードを読む

- ターミナルウィンドウ右側のファイルマネージャで `main-sht30.js` を選択し、「表示」を実行してソースコードを開きます。

```js
import { requestI2CAccess } from "node-web-i2c";
import SHT30 from "@chirimen/sht30";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const i2cAccess = await requestI2CAccess();
const sht30 = new SHT30(i2cAccess.ports.get(1), 0x44);
await sht30.init();

while (true) {
  const { humidity, temperature } = await sht30.readData();
  console.log(
    [
      `Humidity: ${humidity.toFixed(2)}%`,
      `Temperature: ${temperature.toFixed(2)} degree`,
    ].join(", "),
  );

  await sleep(500);
}
```

- [WebI2CライブラリとSHT30デバイスドライバを読み込み](../chirimenGeneric/#webi2c)
  - I2C インターフェースに接続されたスレーブデバイスは、[Web I2C API](http://browserobo.github.io/WebI2C) と呼ばれる API を通じて操作できます。

```js
import { requestI2CAccess } from "node-web-i2c";
import SHT30 from "@chirimen/sht30";
```

- [JavaScript module](./chapter_10-3-1.md) の仕組みを使って、WebI2C ライブラリを読み込んでいます。
- [I2C 温湿度センサー (SHT30, SHT31)の初期化と使用](./chapter_5-2-4.md)
  - コードが実際に何をしているかを、次のページで一行ずつ確認します。

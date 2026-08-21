# CCS811 CO2・TVOCセンサー

## 配線図

VCC(3.3V)・GND・SDA・SCL の4本をRaspberry PiのI2Cピンに接続します。I2Cアドレスは基板の`ADDR`ピンの状態により `0x5A`（未接続/GND、既定）または `0x5B`（3.3Vに接続）になります。

Note: CCS811には`nWAKE`ピンがあり、通信時はLowにする必要があります。多くのブレイクアウト基板ではGNDに直結済みですが、動作しない場合は基板の回路図で`nWAKE`(または`WAK`)がGNDに接続されているか確認してください。

## ドライバのインストール

```sh
npm i chirimen
```

## サンプルコード

同ディレクトリの [main.js](main.js) と同じ内容です。

```js
import { requestI2CAccess, CCS811 } from "chirimen";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const i2cAccess = await requestI2CAccess();
const ccs811 = new CCS811(i2cAccess.ports.get(1));
await ccs811.init();

while (true) {
  const { CO2, TVOC, error } = await ccs811.readData();
  if (!error) {
    console.log(`CO2: ${CO2} ppm, TVOC: ${TVOC} ppb`);
  }
  await sleep(1000);
}
```

Note: 起動直後は新しい測定値がまだ準備できておらず、`readData()`が`error`付きの結果（`CO2`/`TVOC`は`null`）を返すことがあります。また、センサー自体もヒーターが安定するまで数分、精度が安定するまでは（データシート上は）数十時間の慣らし運転が必要です。

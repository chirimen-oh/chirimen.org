# APDS9930 近接・環境光センサー

## 配線図

VCC(3.3V)・GND・SDA・SCL の4本をRaspberry PiのI2Cピンに接続します。I2Cアドレスは `0x39` 固定です。

## ドライバのインストール

```sh
npm i node-web-i2c @chirimen/apds9930
```

## サンプルコード

同ディレクトリの [main.js](main.js) と同じ内容です。

```javascript
import { requestI2CAccess } from "node-web-i2c";
import APDS9930 from "@chirimen/apds9930";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const i2cAccess = await requestI2CAccess();
const apds9930 = new APDS9930(i2cAccess.ports.get(1));
await apds9930.init();

while (true) {
  const { lux, proximity } = await apds9930.read();
  console.log(`照度: ${lux.toFixed(2)} lx, 近接: ${proximity}`);
  await sleep(500);
}
```

Note: `proximity`はcmやmmなどの距離の単位を持たない、赤外LEDの反射光量に基づく無単位の相対値（目安0〜1023）です。何も近づけていないのに常に`1023`になる場合は、`await apds9930.setPGain(1)` や `await apds9930.setLEDDrive(25)` でゲイン・LED電流を下げてクロストークを軽減してください。

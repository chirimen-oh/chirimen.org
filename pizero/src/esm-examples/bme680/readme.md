# BME680 温度・湿度・気圧・ガスセンサー

## 配線図

VCC(3.3V)・GND・SDA・SCL の4本をRaspberry PiのI2Cピンに接続します。スレーブアドレスが `0x76` のものと `0x77` のものがあるので注意してください（このサンプルでは `0x77` を使用しています）。

## ドライバのインストール

```sh
npm i chirimen
```

## サンプルコード

同ディレクトリの [main.js](main.js) と同じ内容です。

```javascript
import { requestI2CAccess, BME680 } from "chirimen";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const i2cAccess = await requestI2CAccess();
const bme680 = new BME680(i2cAccess.ports.get(1));
await bme680.init();

while (true) {
  const data = await bme680.readData();
  const temperature = data.temperature.toFixed(2);
  const humidity = data.humidity.toFixed(2);
  const pressure = data.pressure.toFixed(2);
  console.log(
    [
      `Temperature: ${temperature} degree`,
      `Humidity: ${humidity} %`,
      `Pressure: ${pressure} hPa`,
      `Gas: ${data.gas} ohm`,
    ].join(", "),
  );
  await sleep(1000);
}
```

Note: `gas`はガスセンサー部の抵抗値(Ω)の生値です。空気質指数などに変換するには、別途キャリブレーションやライブラリでの補正が必要です。またヒーターが安定するまで、起動直後は値が大きく変動することがあります。

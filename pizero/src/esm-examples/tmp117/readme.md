# TMP117 温度センサー

## 仕様

- 動作・測定可能温度: -55℃ ～ +150℃
- 温度精度: ±0.1℃(-20℃ ～ +50℃ の環境下)
- 温度解像度: 0.0078125℃
- I2C スレーブアドレス: 0x48(デフォルト)、0x49/0x4A/0x4B(ADD0ピンの配線により変更可能)

詳細な仕様は[データシート](https://www.ti.com/lit/ds/symlink/tmp117.pdf)を参照してください。

## 配線図

![TMP117 wiring diagram](schematic.png)

| TMP117 | Raspberry Pi |
|---|---|
| GND | GND |
| 3.3V | 3.3V |
| SDA | SDA |
| SCL | SCL |

## インストール方法

```
npm install node-web-i2c @chirimen/tmp117
```

## ファイル説明

| ファイル | 内容 |
|---|---|
| `main.js` | サンプルコード本体 |
| `package.json` | 使用ライブラリの一覧 |
| `schematic.png` | 配線図 |
| `TMP117.svg` / `TMP117.fzpz` / `TMP117.fzz` | Fritzing設計ファイル一式 |

## 実行方法

```
node main.js
```

停止は `Ctrl+C` です。

## サンプルコードの解説

```js
import { requestI2CAccess } from "node-web-i2c";
import TMP117 from "@chirimen/tmp117";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const tmp117 = new TMP117(i2cPort, 0x48);
await tmp117.init();
while (true) {
  const data = await tmp117.read();
  console.log(`${data.temperature} degree`);
  await sleep(1000);
}
```

`init()` でセンサーを初期化し、`read()` を1秒ごとに呼び出して `{ temperature }` オブジェクトを取得、コンソールに表示します。


## 参考リンク

- TMP117 データシート(Texas Instruments社)
  - https://www.ti.com/lit/ds/symlink/tmp117.pdf
- 製品ページ(SparkFun Qwiic Temperature Sensor - TMP117)
  - https://www.switch-science.com/products/5963

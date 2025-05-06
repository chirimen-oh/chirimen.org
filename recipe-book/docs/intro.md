# CHIRIMEN 対応デバイスレシピ集

## 本書について

本書は、Raspberry Pi と各種センサー（温度・湿度・加速度など）を活用した電子工作やプログラミングに関心のある方を対象とした技術同人誌です。
CHIRIMEN コミュニティで動作確認済みのサンプルコードや回路図を豊富に掲載しており、初心者から経験者まで幅広くご活用いただけます。

- 公式サイト：[CHIRIMEN Raspberry Pi Zero W チュートリアル](https://tutorial.chirimen.org/pizero/)
- 書籍：[ちりめんぱいぜろちゅーとりある](https://x.gd/OmMZJ)

上記いずれかと併せて読んでいただくとより一層理解が深まります。

### 本書の特徴とおすすめポイント

- 各センサーごとに分かりやすい電子回路図を掲載しています。
- 動作確認済みで、コピー＆ペーストですぐに試せるサンプルコードを掲載しています。
- コミュニティで検証された信頼性の高いパーツを紹介しています。
- 電子工作や IoT に興味のある方、Raspberry Pi を使ってみたい方、センサーの基礎から実践まで学びたい方に最適です。

### 前提条件

本書の内容をお試しいただくには、以下の環境を推奨します。

#### デバイス

- Raspberry Pi Zero W（Wi-Fi 搭載モデル）

#### 主な購入先：

- KSY：[Raspberry Pi Zero WH [RASPIZWHSC0065]](https://x.gd/HytS7)
- SWITCH SCIENCE：[Raspberry Pi Zero WH [RPI-ZERO-WH]](https://x.gd/KF2aF)

#### 必要な Node.js ライブラリ

- I2C 制御用ライブラリ： [node-web-i2c](https://www.npmjs.com/package/node-web-i2c)
- GPIO 制御用ライブラリ： [node-web-gpio](https://www.npmjs.com/package/node-web-gpio)
- [Node.js のバージョン](https://nodejs.org/ja/about/previous-releases)は、v22.x 以上を推奨します。

#### OS

- Raspbian OS をカスタマイズした[CHIRIMEN Lite](https://github.com/chirimen-oh/chirimen-lite) を使用します。
- ダウンロードは[公式サイト](https://github.com/chirimen-oh/chirimen-lite/releases)をご参照ください。

### すぐに開発を始めたい方へ

- 公式サイト：[CHIRIMEN Raspberry Pi Zero W チュートリアル](https://tutorial.chirimen.org/pizero/) にアクセスして下さい。
- 書籍：[ちりめんぱいぜろちゅーとりある](https://x.gd/OmMZJ)をご購入ください。

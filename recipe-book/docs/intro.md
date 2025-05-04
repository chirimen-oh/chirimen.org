# CHIRIMEN 対応デバイスレシピ集

## 本書について

本書は、Raspberry Pi と各種センサー（温度・湿度・加速度など）を活用した電子工作やプログラミングに興味のある方のための技術同人誌です。
センサーの動作に必要なサンプルコードや回路図を豊富に掲載しており、初心者から経験者まで幅広くご活用いただけます。

- 公式サイト：[CHIRIMEN Raspberry Pi Zero W チュートリアル](https://tutorial.chirimen.org/pizero/)
- 書籍：[ちりめんぱいぜろちゅーとりある](https://techbookfest.org/product/xmqdikrtEeFfyVxawvJKJf?productVariantID=6VgwkjJMzi5isuEeJLhEyk)

上記と併せて読んで頂くとより一層理解が深まります。

### 本書の特徴とおすすめポイント

- 各センサーごとに分かりやすい電子回路図を掲載しています。
- 動作確認済みで、コピー＆ペーストですぐに試せるサンプルコードを掲載しています。
- コミュニティで検証された信頼性の高いパーツを紹介しています。
- 電子工作や IoT に興味のある方、Raspberry Pi を使ってみたい方、センサーの基礎から実践まで学びたい方に最適です。

### 前提条件

本書の内容をお試し頂くには、以下の環境を推奨します。

#### デバイス

- Raspberry Pi Zero W（Wi-Fi 搭載モデル）

#### 主な購入先：

- KSY：[Raspberry Pi Zero WH [RASPIZWHSC0065]](https://raspberry-pi.ksyic.com/main/index/pdp.id/406,407,408,409,410,219,222/pdp.open/219)
- SWITCH SCIENCE：[Raspberry Pi Zero WH [RPI-ZERO-WH]](https://www.switch-science.com/products/3646?_pos=1&_sid=e9fd90251&_ss=r)

#### 必要な Node.js ライブラリ

- I2C 制御用ライブラリ： [node-web-i2c](https://www.npmjs.com/package/node-web-i2c)
- GPIO 制御用ライブラリ： [node-web-gpio](https://www.npmjs.com/package/node-web-gpio)
- [Node.js のバージョン](https://nodejs.org/ja/about/previous-releases)は、v22.x 以上を推奨します。

#### OS

- Raspbian OS をカスタマイズした[CHIRIMEN Lite](https://github.com/chirimen-oh/chirimen-lite) を使用します。
- ダウンロードは[公式サイト](https://github.com/chirimen-oh/chirimen-lite/releases)をご参照ください。

### 直ぐに開発を始めたい方

- [CHIRIMEN Raspberry Pi Zero W チュートリアル](https://tutorial.chirimen.org/pizero/) にアクセスして下さい。
  - [物品準備、PC を WiFi に接続](https://tutorial.chirimen.org/pizero/chapter_2-1)
  - [ターミナル接続](https://tutorial.chirimen.org/pizero/chapter_2-2)
    - [接続先：Pi Zero Web Serial Console](https://chirimen.org/PiZeroWebSerialConsole/PiZeroWebSerialConsole.html)
  - [Pi Zero Web Serial Console の使い方](https://tutorial.chirimen.org/pizero/chapter_2-2-1)
  - [Wi-fi 設定](https://tutorial.chirimen.org/pizero/chapter_2-3)

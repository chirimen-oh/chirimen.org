# 本書について

本書は、Raspberry Pi と各種センサー（温度・湿度・加速度など）を活用した電子工作やプログラミングに関心のある方を対象とした技術同人誌です。  
CHIRIMEN コミュニティで動作確認済みのサンプルコードや回路図を豊富に掲載しており、初心者から経験者まで幅広くご活用いただけます。

## 本書の特徴とおすすめポイント

- 各センサーごとに、わかりやすい回路図を掲載
- コピー＆ペーストですぐ使える動作確認済みコードを収録
- コミュニティで検証された信頼性の高い部品を紹介

## 前提条件

本書の内容を試すには、以下の環境を推奨。

- デバイス： Raspberry Pi Zero W（Wi-Fi 搭載モデル）
- 主な購入先： [KSY](https://x.gd/HytS7), [SWITCH SCIENCE](https://x.gd/KF2aF) にて購入可能
- OS： [CHIRIMEN Lite](https://github.com/chirimen-oh/chirimen-lite) （Raspbianベース）
  - [ダウンロード](https://github.com/chirimen-oh/chirimen-lite/releases)
- [Node.js のバージョン](https://nodejs.org/ja/about/previous-releases)は、v22.x 以上を推奨します。
- 必要なライブラリ
  - I2C 制御用ライブラリ： [node-web-i2c](https://www.npmjs.com/package/node-web-i2c)
  - GPIO 制御用ライブラリ： [node-web-gpio](https://www.npmjs.com/package/node-web-gpio)

## すぐに開発を始めたい方へ

まずは以下の公式資料を参照又は購入してください

- 公式サイト：[CHIRIMEN Raspberry Pi Zero W チュートリアル](https://tutorial.chirimen.org/pizero/)
- 書籍：[ちりめんぱいぜろちゅーとりある](https://x.gd/OmMZJ)

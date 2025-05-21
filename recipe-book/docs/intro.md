# 本書について

本書は、Node.js 上で WebGPIO や WebI2C を使って CHIRIMEN 対応デバイスを制御するためのレシピ集です。  
デバイスの概要、配線、ドライバ導入、動作確認コードを順に掲載しています。実機を使いながら、Node.js によるデバイス制御を体験できます。

## 本書の特徴とおすすめポイント

- 各センサーごとに、わかりやすい回路図を掲載
- コピー＆ペーストですぐ使える動作確認済みコードを収録
- コミュニティで検証された信頼性の高い部品を紹介

## 前提条件

本書の内容を試すには、以下の環境を推奨。

- デバイス： Raspberry Pi Zero W（Wi-Fi 搭載モデル）
- 主な購入先
  - KSY：[Raspberry Pi Zero WH [RASPIZWHSC0065]](https://x.gd/HytS7)
  - SWITCH SCIENCE：[Raspberry Pi Zero WH [RPI-ZERO-WH]](https://x.gd/KF2aF)
- OS： [CHIRIMEN Lite](https://github.com/chirimen-oh/chirimen-lite) （Raspbianベース）
  - [ダウンロード](https://github.com/chirimen-oh/chirimen-lite/releases)
- [Node.js のバージョン](https://nodejs.org/ja/about/previous-releases)
  - v22.x 以上を推奨
- 必要なライブラリ
  - I²C 制御用ライブラリ： [node-web-i2c](https://www.npmjs.com/package/node-web-i2c)
  - GPIO 制御用ライブラリ： [node-web-gpio](https://www.npmjs.com/package/node-web-gpio)

## すぐに開発を始めたい方へ

まずは以下の公式資料を参照又は購入してください

- 公式サイト：[CHIRIMEN Raspberry Pi Zero W チュートリアル](https://tutorial.chirimen.org/pizero/)
- 書籍：[ちりめんぱいぜろちゅーとりある](https://x.gd/OmMZJ)

---
layout: tutorial
---

# 講師の皆さんへ

## はじめに

CHIRIMEN for Raspberry Pi (以下、CHIRIMEN RasPi) と本チュートリアル (以下、本教材) を用いて IoT プロトタイピングやプログラミングの教育をする講師の皆さんに注意して頂きたいことをまとめています。

学校での講義・ハッカソンイベント・プログラミング塾などで利用する際には、先生やメンター・チューターなどのスタッフの皆さんはこちらもご覧ください。

## Raspberry Pi と micro:bit 共通のポイント

まず、CHIRIMEN for Raspberry Pi と CHIRIMEN with micro:bit で共通するポイントについては [CHIRIMEN for Raspberry Pi 講師向けページ](../raspi/teacher.md) を参照してください。

その上で以下の CHIRIMEN with micro:bit 固有のポイントについてご確認ください。

## CHIRIMEN with micro:bit 利用前の準備

CHIRIMEN with micro:bit を利用する際には、**ワークッショップ開始前に以下の準備が必要です**。

- 機材の準備
  - micro:bit 本体以外に **通信可能な** micro USB ケーブル、micro:bit の給電コネクタに対応した電池ボックス、電池、ブレイクアウトボードなどの準備が必要です。
  - firmware の書き換え忘れや、Bluetooth 通信が使えない・安定しない場合に備えて、必ず USB 通信ケーブルを用意してください。
  - 最近の Mac など、Type-C 端子はあるが Type-A 端子がない PC を持ち込まれる場合に備えて、Type-A / Type-C 変換アダプタもあると安心です
- micro:bit のファームウェアバージョンを最新にアップデートする
  - micro:bit の Bluetooth, USB についてはファームウェアバージョンが古いと安定動作しません
  - **必ず全ての micro:bit のファームウェアを事前に最新版にしてください**。手順は [公式サイトの Firmware ページ](https://microbit.org/get-started/user-guide/firmware/) をご覧ください。
- CHIRIMEN with micro:bit のプログラムを書き込む
  - mico:bit のプログラムの書き換えは最初に参加者にさせると Web Bluetooth の
- 地磁気センサー (コンパス) のキャリブレーションを事前に実施しておく
  - 地磁気センサー初回利用時には `TILT TO FILL SCREEN` とメッセージが流れ、キャリプレーション操作を求められます。これは毎回ではなく初回だけですので、利用している micro:bit 毎に発生するかどうかが分かれ、ワークショップが混乱してしまいがちです。
    講師側で全端末の地磁気センサーを一度は利用して、キャリブレーション操作を行ってください
  - 地磁気センサーの校正方法はこちらを参照: https://tinkering-mbit.github.io/microbit-workshop-guide/devices/compass.html
  - 地磁気センサー (全内蔵センサー) を使うテストコードはこちら: https://chirimen.org/chirimen-micro-bit/examples/Embed/index.html

## CHIRIMEN with micro:bit の注意事項

以下の点に注意してください。

- ブラウザは Chrome (または Chromium エンジンを利用した Edge, Brave などのブラウザ) を利用する
  - Web Bluetooth/USB は標準化されておらず (Google 以外のブラウザベンダーから賛同が得られておらず)、Chromium でしかサポートされていないため、Firefox や Safari では使えないためです。
- 内蔵のジャイロセンサーの初回利用時にキャリブレーションが必要であることに注意
- I2C が不安定であれば USB での通信に切り替える
- I2C デバイスは同じ型番のセンサーであっても個体 (基盤設計) によってデフォルト I2C アドレスが異なります。そのセンサーだけ動かない場合は I2C アドレスを [I2C detect](https://chirimen.org/chirimen-micro-bit/examples/i2cdetect/index.html) で確認するようにしてください。
  - micro:bit は最初から I2C アドレスを持っているセンサーが 2 つ内蔵されています。そのアドレスではないことに注意。
- Bluettooth/USB 対応で micro:bit に書き込むプログラムが変わるが、起動時にハートマークか V マークがでるかで区別してください
- I2C デバイスの動作が不安定なときは I2C デバイスへの電源共有も切断・再起動させてみましょう (RasPi でも同じ)
  - 電源オフ、ブラウザリロード、電源オン、ブラウザから Connect の順番でリセット・リトライ操作をします

## 講師向けリンク集

- micro:bit firmware: https://microbit.org/get-started/user-guide/firmware/
- CHIRIMEN with micro:bit ブログラム
  - コミュニティで随時開発してバージョンアップ、URL が変わるので注意 (近日、固定 URL からのリダイレクトに変えます)
  - Bluetooth 向け
    - MakeCode: https://makecode.microbit.org/_Jh51P7beW6Kb
  - USB 向け: https://github.com/chirimen-oh/chirimen-micro-bit/tree/master/alpha
    - MakeCode https://makecode.microbit.org/_XPuM8WFsKR2E
- CHIRIMEN with micro:bit チュートリアル https://tutorial.chirimen.org/microbit/
  - example 集 https://chirimen.org/chirimen-micro-bit/examples/
    - 内蔵センサー: https://chirimen.org/chirimen-micro-bit/examples/Embed/index.html
    - I2C detect: https://chirimen.org/chirimen-micro-bit/examples/i2cdetect/index.html



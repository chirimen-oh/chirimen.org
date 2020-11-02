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

### 0. 機材の準備

- micro:bit 本体以外に **通信可能な** micro USB ケーブル、micro:bit の給電コネクタに対応した電池ボックス、電池、ブレイクアウトボードなどの準備が必要です。
- firmware の書き換え忘れや、Bluetooth 通信が使えない・安定しない場合に備えて、必ず USB 通信ケーブルを用意してください。
- 最近の Mac など、Type-C 端子はあるが Type-A 端子がない PC を持ち込まれる場合に備えて、Type-A / Type-C 変換アダプタもあると安心です
- 2010 年頃までの PC は Bluetooth の対応バージョンが古く、サポート対象外です。Bluetooth 4.0 (BLE) をサポートする PC または Bluetooth ドングルを用意してください。

### 1. micro:bit のファームウェアバージョンを最新にアップデートする

- **必ず全ての micro:bit のファームウェアを事前に更新してください**。
- 手順は [公式サイトの Firmware ページ](https://microbit.org/get-started/user-guide/firmware/) をご覧ください。
  - 裏側のスイッチを押しながら USB ケーブルを接続、PC から `MAINTENANCE` ドライブとして認識されている状態でファームウェアの `hex` ファイルを保存すると自動的にファームウェアバージョンの差し替え、再起動が行われます。
- micro:bit の Bluetooth, USB 処理についてはファームウェアバージョンが古いと全く動作しない、または安定動作しません。
- 2020年10月の CHIRIMEN with micro:bit の動作試験には micro:bit firmware version 253 を利用しました。

### 2. CHIRIMEN with micro:bit のプログラムを書き込む

- mico:bit のプログラムの書き換えは PC 環境・ブラウザによって WebUSB の動作状況が異なるため、ユーザによって振る舞い・手順が違い初心者は意外と手間取ります。
- まず最初に L チカなどを試すところまでが簡単であることはやる気を保ち愉しさを感じてもらう為に大切ですので、主催者側で事前に書き込みをしておきましょう。
- [MakeCode の CHIRIMEN with micro:bit ブリッジプログラム](https://r.chirimen.org/makecode-chirimen)
- 勿論、十分な時間と個別サポートが出来る場合には参加者全員が自ら書き換えできるようになる、何をしているか分かるようになることは有意義です

### 3. 地磁気センサー (コンパス) のキャリブレーションを事前に実施しておく

- 地磁気センサー初回利用時には `TILT TO FILL SCREEN` とメッセージが流れ、校正(キャリプレーション)操作を求められます。
- ワークショップを円滑に進めるためには、講師側で全端末の地磁気センサーを一度は利用して、校正操作を行ってください
  - 校正結果はボードに保存されるため、毎回ではなく初回だけ必要です。
  - 一度試験した micro:bit では発生しない手順ですし、メッセージに気付きその意味を理解するのも意外と難しいため、ワークショップが混乱してしまいがちです。
- 地磁気センサーの校正方法は下記の動画をご覧ください。
  - 校正作業は全方向に傾ける必要があるため、結構コツのいる操作ですが、一定時間内に行う必要があります。
  - 最初は戸惑い一度では出来ないことが多いですが、慣れて頂くしかありません。そういう意味でも参加者にさせず、講師側での準備が必要な手順です。
- 地磁気センサーを使うには [内蔵センサーの読み取りテストコード](https://chirimen.org/chirimen-micro-bit/examples/Embed/index.html) がご利用頂けます。
  - CHIRIMEN のコードに限らず、micro:bit で内蔵地磁気センサーを利用するコードを実行するものであれば何でも構いません。

<div style="width:100%;height:0px;position:relative;padding-bottom:75.000%;"><iframe src="https://streamable.com/e/5c9ppl?loop=0" frameborder="0" width="100%" height="100%" allowfullscreen="" style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;" loading="lazy"></iframe></div>

### 4. Bluetooth デバイス ID をメモして micro:bit に貼り付けておく

{% cloudinary small imgs/microbit_with_blue_id.JPG alt="micro:bit裏面にBLE IDを貼り付けた写真" class="right" style="width: 35%; margin: 0 0 0 1em;" %}

- CHIRIMEN with micro:bit ブリッジブログラムを書き込んだ複数の micro:bit を同時に起動すると、ブラウザから `Connect` ボタンを押して接続する際に選択するデバイスリストに micro:bit (`BBC micro:bit [xxxxx]`) が複数表示されてしまいます。今のところ、自分が接続しようとしている micro:bit を区別するには、事前にその個体の ID を知っておく以外に方法はありません。
- 一人で複数台を同時利用する場合、複数人が同一会場で利用する場合、いずれの場合であってもそれぞれの個体の ID を記載したシールを micro:bit 本体の裏面にシールで貼り付けるなどしてください。上記、地磁気センサーの校正作業と同時にしておくと良いかと思います。

## CHIRIMEN with micro:bit の注意事項

以下の点に注意してください。

- ブラウザは Chrome (または Chromium エンジンを利用した Edge, Brave などのブラウザ) を利用する
  - Web Bluetooth/USB は標準化されておらず (Google 以外のブラウザベンダーから賛同が得られておらず)、Chromium でしかサポートされていないため、Firefox や Safari では使えないためです。
- 内蔵のジャイロセンサーの初回利用時にキャリブレーションが必要であることに注意
- I2C が不安定であれば USB での通信に切り替える
  - [i2c detect USB版](https://chirimen.org/chirimen-micro-bit/alpha/i2cdetect_usb/index.html)
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
    - MakeCode: https://r.chirimen.org/makecode-chirimen
  - USB 向け: https://github.com/chirimen-oh/chirimen-micro-bit/tree/master/alpha
    - MakeCode: https://r.chirimen.org/makecode-chirimen-alpha
- CHIRIMEN with micro:bit チュートリアル: https://tutorial.chirimen.org/microbit/
  - example 集 https://chirimen.org/chirimen-micro-bit/examples/
    - 内蔵センサー: https://chirimen.org/chirimen-micro-bit/examples/Embed/index.html
    - I2C detect: https://chirimen.org/chirimen-micro-bit/examples/i2cdetect/index.html
- micro:bit 標準搭載機能利用時の注意: https://chirimen.org/chirimen-micro-bit/guidebooks/features.html


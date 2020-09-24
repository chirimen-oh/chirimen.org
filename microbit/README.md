---
lang: ja
permalink: /microbit/
---

## CHIRIMEN with micro:bit チュートリアル

CHIRIMEN with micro:bit を用いた IoT システムプロトタイピングスキル習得のためのチュートリアル資料です。

JavaScript プログラミング未経験者は、ページ下部で紹介している資料・サイトも参照しつつご覧ください。

補足: 本チュートリアルは鋭意改善中です。今後デザインや URL も変更されますが、各ページは現URLからリダイレクトされるよう設定します。

## 準備編

micro:bit を Web アプリでコントロールするための準備と最初の動作確認を行います。

- [Hello micro:bit](hello_microbit.md)
  - 動作確認を兼ねて、micro:bit の内蔵センサーや LED 等を操作します。

これが出来たらチュートリアルを順にじっくり学ぶか、初めての GPIO/I2C だけ学ぶか、Examples 集をみてどんどん試すかしていきましょう。

## デバイス操作～基礎編

まずはシンプルな GPIO 入出力や I2C センサーの操作方法を学びます。

- [1. L チカしてみよう (初めての GPIO)](GPIO_starter.md)<!-- section0.md -->
  - [WebGPIO API](http://browserobo.github.io/WebGPIO) を使い LED を点滅するサンプルを動かしてみます。
- [2. GPIO の使い方](GPIO_basic.md)<!-- section1.md -->
  - マウスクリックで操作するブラウザ画面のボタンと物理スイッチ (タクトスイッチ) の両方で LED やモーターを制御するサンプルで GPIO の使い方を学びます。
- 3. センサーを使ってみよう (初めての I2C) [ADT7410編](I2C_starter.md)、　[SHT31編](I2C_starter_sht.md)<!-- section2.md -->
  - センサーの値をドライバーを使ったり [WebI2C API](http://browserobo.github.io/WebI2C) で直接制御したりして読み取ってみます。

## デバイス操作～応用編

いろいろな I2C デバイスを繋いだり組み合わせたりすることで IoT プロトタイピングを体験しましょう。

- [4. I2C の使い方](I2C_basic.md)<!-- section3.md -->
  - いろいろな I2C デバイスを接続したり、複数の I2C デバイスの同時操作をするサンプルで I2C の使い方を学びます。
  - Grove モジュールを使う場合は [I2C の使い方 Grove 編](grove.md) をご覧ください。 **Grove 編は準備中です**
- [5. GPIO/I2C のまとめ](device_summary.md)<!-- section4.md -->
  - これまでの総括として GPIO と I2C の両方を組み合わせて動かしてみます。

もっと色々なデバイスで試したい場合、余裕がある場合は下記の Example 集を見て気になるものを試したり書き換えたりしてみましょう。

## IoT 編

いよいよインターネットを介してデバイスをリモートで操作したりセンシングしたりする、Internet of Things (IoT)の基礎を体験しましょう。

- [6. リモートから温度を測定してみよう](IoT_sensing.md)
  - micro:bit内蔵温度センサを使って遠隔から温度を測定してみます。
- [7. モーターを回してしてみよう](IoT_actuate.md)
  - micro:bitのGPIOに繋いだモータを遠隔からコントロールします。

ここまでできたら下記の Example 集を見ていろいろなデバイスを試したり自分で好きなものを作ってみましょう。

## 発展編

ここまでの例では飽き足らない人のための発展的な使い方を紹介します。興味のあるものがあればお試しください。
**注意: 学校や講習会などで参加者全員で学習する場合は応用編までで十分です。**

- PCなしでIoTデバイスをつくる
  - [CHIRIMEN for Raspberry PIを使う](../raspi/readme.md)
  - [WebGPIO API や WebI2C API を Node.js から使う](../raspi/nodejs.md)


## 対応デバイスと Example 集

CHIRIMEN with micro:bit 対応デバイスのドライバ・回路図・サンプルコードをセットにした Example 集を用意しています。

チュートリアルで基本が分かったら、どんなことが出来るか色々なデバイスを使ったサンプルを見て、書き換えて、試してみましょう。

- [対応デバイスのリスト](../raspi/partslist.md)
  - **このページは Raspberry Pi 用、micro:bit 用は準備中です**
- [GPIO Example](https://chirimen.org/chirimen-micro-bit/examples/#gpio)
  - GPIO を使ったサンプル集です。L チカやボタンは勿論、人感センサーやモーター制御等にも使います
- [I2C Example](https://chirimen.org/chirimen-micro-bit/examples/#i2c)
  - I2C を使ったサンプル集です。一般的な機材に広く対応しています。
- [micro:bit 標準搭載デバイス Example](https://chirimen.org/chirimen-micro-bit/examples/#内蔵デバイス)
  - micro:bit 標準搭載の LED、スイッチと加速度、温度、明るさ、磁気センサーを使うサンプルです。
  - [micro:bit 標準搭載デバイス利用時の注意](https://chirimen.org/chirimen-micro-bit/guidebooks/features.html) も合わせてご覧ください。
- [拡張 GPIO Example](https://chirimen.org/chirimen-micro-bit/examples/#拡張gpio)
  - Raspberry Pi ではサポートされていない、アナログ GPIO 入出力を micro:bit では拡張 API を使って操作します。
- [Remote Control Example](https://chirimen.org/chirimen-micro-bit/examples/#リモートコントロール-relayserverjsを使います)
  - インターネットを介して通信して動作させるサンプルです。

サンプルコードは [GitHub のこちら](https://github.com/chirimen-oh/chirimen-micro-bit/tree/master/examples) に収録されています。

## 予備知識

CHIRIMEN with micro:bit を利用するに際して、知っておくと良い予備知識やツールの使い方が学べるドキュメントです。

- [GitHub ハンズオン](https://github.com/webiotmakers/github-handson)
  - GitHub の基本的な使い方の分かるハンズオン資料です。
- [CodeSandbox ガイド](https://csb-jp.github.io/)
  - ブラウザ上で開発する CodeSandbox の使い方を確認しましょう。
- [JavaScript 初学者向け資料集](/js/)
  - JavaScript 1 Day 講習資料、JavaScript 本格入門書、チートシートなどはこちら

## Appendix, Tips, FAQ, Links etc...

良くある質問、よく使うテクニック、困ったときのデバッグとトラブルシューティングや教える側が知っておくべきことなどをまとめています。

- [良くある質問](../raspi/faq.md)
- [Tips・テクニック集](../raspi/tips.md)
- [デバッグ・トラブルシューティング](../raspi/debug.md)
- [講師向けページ](../raspi/teacher.md)

<div class="hide-on-production">
  <!-- tutorial.chirimen.org では hide-on-production クラスの中は表示されない -->

  ## Latest Version / 最新版

  Latest version of this document is hosted on https://tutorial.chirimen.org/microbit/

  このサイトの最新オンライン版は https://tutorial.chirimen.org/microbit/ でご覧頂けます
</div>


<!-- 今後、マルチリンガル対応は、webトランスレーションサービスを使うことにしたい
このディレクトリは、CHIRIMEN for microbit 用のチュートリアルが格納されています。
- [ENGLISH](en)
- [日本語](ja)
-->

---
lang: ja
permalink: /microbit/
---

## CHIRIMEN with micro:bit チュートリアル

CHIRIMEN with micro:bit を用いた IoT システムプロトタイピングスキル習得のためのチュートリアル資料です。

JavaScript プログラミング未経験者は、ページ下部で紹介している資料・サイトも参照しつつご覧ください。

## 準備編

micro:bitをwebアプリでコントロールするための準備と最初の動作確認を行います

- [0. Hello web micro:bit](hello_microbit.md)

動作確認を兼ねて、micro:bitの内蔵センサーやLED等を操作できます。

## デバイス操作～基礎編

シンプルな GPIO 入出力や I2C センサーの操作方法を学びましょう。

- [1. L チカしてみよう (初めての GPIO)](GPIO_starter.md)<!-- section0.md -->
  - [WebGPIO API](http://browserobo.github.io/WebGPIO) を使って定期的に LED を点滅するサンプルを動かしてみます。
- [2. GPIO の使い方](GPIO_basic.md)<!-- section1.md -->
  - マウスクリックで操作するブラウザ画面のボタンと物理スイッチ (タクトスイッチ) の両方で LED やモーターを制御するサンプルを通じて GPIO の基本を学びます。
- [3. センサーを使ってみよう (初めての I2C)](I2C_starter.md)<!-- section2.md -->
  - 温度センサーの値をドライバーを使う場合と [WebI2C API](http://browserobo.github.io/WebI2C) を直接操作する場合の 2 パターンで読み取ることで、I2C デバイス操作の基本を学びます。

## デバイス操作～応用編

いろいろな I2C デバイスを繋いだり組み合わせたりすることで IoT プロトタイピングを体験しましょう。

- [4. I2C の使い方](I2C_basic.md)<!-- section3.md -->
  - いろいろな I2C デバイスを接続したり、複数の I2C デバイスの同時操作について学びます。
  - [Grove 編](grove.md)では、Grove を利用したI2C デバイスの同時操作について学べます。
- [5. GPIO/I2C のまとめ](section4.md)<!-- section4.md -->
  - これまでの総括として GPIO と I2C の両方を組み合わせて動かしてみます。


## IoT編

いよいよインターネットを介してデバイスをリモートで操作したりセンシングしたりする、Internet of Things (IoT)の基礎を体験しましょう。

- [6. リモートから温度を測定してみよう](IoT_sensing.md)
  - micro:bit内蔵温度センサを使って遠隔から温度を測定してみます。
- [7. モーターを回してしてみよう](IoT_actuate.md)
  - micro:bitのGPIOに繋いだモータを遠隔からコントロールします。

ここまでできたら Example 集を見ていろいろなデバイスを試したり自分で好きなものを作ってみましょう。

## 発展編
ここまでの例では飽き足らない人のための発展的な使い方を紹介します。興味のあるものがあればお試しください。
**注意: 学校や講習会などで参加者全員で学習する場合は応用編までで十分です。**
- PCなしでIoTデバイスをつくる
  - [CHIRIMEN for Raspberry PIを使う](../raspi/readme.md)
  - [WebGPIO API や WebI2C API を Node.js から使う](../raspi/nodejs.md)


## 対応デバイスと Example 集

CHIRIMEN with micro:bit 対応デバイスのドライバ・回路図・サンプルコードをセットにした Example 集を用意しています。

[対応デバイスのリスト](partslist.md) : 下記サンプルへのリンク付き

- [GPIO Example](https://chirimen.org/chirimen-micro-bit/examples/#gpio)
- [I2C Example](https://chirimen.org/chirimen-micro-bit/examples/#i2c)
- [Remote Control Example](https://chirimen.org/chirimen-micro-bit/examples/#リモートコントロール-relayserverjsを使います)
- [拡張 GPIO Example](https://chirimen.org/chirimen-micro-bit/examples/#拡張gpio)
- [内蔵デバイス Example](https://chirimen.org/chirimen-micro-bit/examples/#内蔵デバイス)

いずれのExamplesも、元のソースコードは [こちら](https://github.com/chirimen-oh/chirimen-micro-bit/tree/master/examples) に収録されています。

## Appendix, Tips, FAQ, Links etc...

JavaScript 未経験者・初心者向けの資料集や、良くある質問、Tips やテクニック、デバッグとトラブルシューティングのページを用意しています。

- [JavaScript 初学者向け資料集](/js/)
  - JavaScript 1 Day 講習資料、JavaScript 本格入門書、チートシートなどはこちら
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
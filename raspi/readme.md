---
lang: ja
permalink: /raspi/
---

## CHIRIMEN for Raspberry Pi チュートリアル

CHIRIMEN for Raspberry Pi を用いた IoT システムプロトタイピングスキル習得のためのチュートリアル資料です。

JavaScript プログラミング未経験者は、ページ下部で紹介している資料・サイトも参照しつつご覧ください。

## Hello Real World

短時間でさっと CHIRIMEN を体験するときにはこちらをご覧ください。

- [Hello Real World](hellorealworld.md)
- [Hello Real World 印刷用 PDF](hellorealworld.pdf)

LED と温度センサーを使ってみる最小限のお試しページです。より詳しくは以下のチュートリアルをご覧ください。

## 基礎編

まずはシンプルな GPIO 入出力や I2C センサーの操作方法を学びましょう。

- [0. L チカしてみよう (初めての GPIO)](section0.md)
  - [WebGPIO API](http://browserobo.github.io/WebGPIO) を使って定期的に LED を点滅するサンプルを動かしてみます。
- [1. GPIO の使い方](section1.md)
  - マウスクリックで操作するブラウザ画面のボタンと物理スイッチ (タクトスイッチ) の両方で LED やモーターを制御するサンプルを通じて GPIO の基本を学びます。
- [2. センサーを使ってみよう (初めての I2C)](section2.md)
  - 温度センサーの値をドライバーを使う場合と [WebI2C API](http://browserobo.github.io/WebI2C) を直接操作する場合の 2 パターンで読み取ることで、I2C デバイス操作の基本を学びます。

## 応用編

いろいろな I2C デバイスを繋いだり組み合わせたりすることで IoT プロトタイピングを体験しましょう。

- [3. I2C の使い方](section3.md)
  - いろいろな I2C デバイスを接続したり、複数の I2C デバイスの同時操作について学びます。
  - [Grove 編](grove.md)では、Grove を利用したI2C デバイスの同時操作について学べます。
- [4. GPIO/I2C のまとめ](section4.md)
  - これまでの総括として GPIO と I2C の両方を組み合わせて動かしてみます。

ここまでできたら Example 集を見ていろいろなデバイスを試したり自分で好きなものを作ってみましょう。

## 発展編
ここまでの例では飽き足らない人のための発展的な使い方を紹介します。興味のあるものがあればお試しください。  
**注意: 学校や講習会などで参加者全員で学習する場合は応用編までで十分です。**

- 5. Web Bluetooth を使って他のデバイスと無線通信する
  - [CHIRIMEN with micro:bit](https://chirimen.org/chirimen-micro-bit/)
    - micro:bit には CHIRIMEN サポートプログラムを書き込み、RasPi の Chromium から Web Bluetooth を使って通信します
    - micro:bit 内蔵デバイス: 加速度・磁気・温度センサー、タクトスイッチ、5x5 マトリクス LED
    - GPIO, I2C 外部デバイス: CHIRIMEN RasPi と同様に micro:bit に接続したデバイスを操作できます。
  - [PLAYBULB (LED 電球) を使う](section5.md)
    - CHIRIMEN for Raspberry Pi 環境で Web Bluetooth API を使ってデバイス制御するサンプルです。
    - Web I2C API や Web Audio API と組み合わせて PLAYBULB (Bluetooth 接続の LED 電球) を制御します。
- 6. Arduino と連携する
  - [ステッピングモーターの制御](section6.md)
    - CHIRIMEN for Raspberry Pi と Arduino を組み合わせてステップピングモーターを制御します。I2C 接続した Arduino を利用することで μ 秒単位でモータードライバの制御を行います。

## 対応デバイスと Example 集

CHIRIMEN for Raspberry Pi 対応デバイスのドライバ・回路図・サンプルコードをセットにした Example 集を用意しています。

[対応デバイスのリスト](partslist.md) : 下記サンプルへのリンク付き

- [Basic GPIO Example](https://r.chirimen.org/examples#gpioExamples)
- [Basic I2C Example](https://r.chirimen.org/examples#i2cExamples)
- [Advanced Example](https://r.chirimen.org/examples#advanced)

Basic GPIO/I2C Examle のデバイスは CHIRIMEN Raspi の OS イメージ公開前に動作検証をしている CHIRIMEN Certified デバイスです。
Advanced Example は個人レベルで動作確認して追加されている contrib デバイスです。いずれも元のソースコードは [こちら](https://github.com/chirimen-oh/chirimen/tree/master/gc) に収録されています。

## Appendix, Tips, FAQ, Links etc...

JavaScript 未経験者・初心者向けの資料集や、良くある質問、Tips やテクニック、デバッグとトラブルシューティングのページを用意しています。

- [JavaScript 初学者向け資料集](/js/)
  - JavaScript 1 Day 講習資料、JavaScript 本格入門書、チートシートなどはこちら
- [良くある質問](faq.md)
- [Tips・テクニック集](tips.md)
- [デバッグ・トラブルシューティング](debug.md)
- [講師向けページ](teacher.md)

## 以前のチュートリアル

本チュートリアルは日々更新していますが、使用機材や手順を大きく変更することもあります。お手持ちの機材が古い場合や、以前学習したときのものを参照したい場合、アーカイブサイトをご覧ください。

- [2018 年度のスターターキットを利用するチュートリアル](https://webiot-2018--tutorial-chirimen-org.netlify.com/raspi3/ja/)
  - DC Fan を含む、初期スターターキットを使うチュートリアルです。
  - [Web x IoT Makers Challenge 2018-19](https://webiotmakers.github.io/) で採用されていたバージョンです。
- [オリジナルチュートリアル (Qiita 版)](deprecated.md)
  - 本チュートリアルサイトの元となる、CHIRIMEN コミュニティメンバーが当初 Qiita などで執筆していた記事のリンク集です。

<div class="hide-on-production">
  <!-- tutorial.chirimen.org では hide-on-production クラスの中は表示されない -->

  ## Latest Version / 最新版

  Latest version of this document is hosted on https://tutorial.chirimen.org/raspi/

  このサイトの最新オンライン版は https://tutorial.chirimen.org/raspi/ でご覧頂けます
</div>


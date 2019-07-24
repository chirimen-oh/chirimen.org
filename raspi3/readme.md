---
lang: ja
permalink: /raspi3/
---

## CHIRIMEN for Raspberry Pi3 チュートリアル

CHIRIMEN for Raspberry Pi 3を用いた IoT システムプロトタイピングスキル習得のためのチュートリアル資料です。

JavaScript プログラミング未経験者は、ページ下部で紹介している資料・サイトも参照しつつご覧ください。

## Hello Real World
短時間でさっと CHIRIMEN を体験するときにはこちらをご覧ください。

- [Hello Real World](hellorealworld.md)

LED と温度センサーを使ってみる最小限のお試しページです。より詳しくは以下のチュートリアルをご覧ください。

## 基礎編
まずはシンプルな GPIO 入出力や I2C センサーの操作方法を学びましょう。

- [0. L チカしてみよう (初めての GPIO)](section0.md)
  - [WebGPIO API](http://browserobo.github.io/WebGPIO) を使って定期的に LED を点滅するサンプルを動かしてみます。
- [1. GPIO の使い方](section1.md)
  - マウスクリックで操作するブラウザ画面のボタンと物理スイッチ (タクトスイッチ) の両方で LED やモーターを制御するサンプルを通じて GPIO の基本を学びます。
- [2. センサーを使ってみよう (初めての I2C)](section2.md)
  - 温度センサーの値をドライバーを使う場合と [WebGPIO API](http://browserobo.github.io/WebI2C) を直接操作する場合の 2 パターンで読み取ることで、I2C デバイス操作の基本を学びます。

## 応用編
いろいろな I2C デバイスを繋いだり組み合わせたりすることで IoT プロトタイピングを体験しましょう。

- [3. I2C の使い方](section3.md)
  - いろいろな I2C デバイスを接続したり、複数の I2C デバイスの同時操作について学びます。
- [4. GPIO/I2C のまとめ](section4.md)
  - これまでの総括として GPIO と I2C の両方を組み合わせて動かしてみます。

ここまでできたら Example 集を見ていろいろなデバイスを試したり自分で好きなものを作ってみましょう。

## 発展編
ここまでの例では飽き足らない人のための発展的な使い方を紹介します。興味のあるものがあればお試しください。  
**注意: 学校や講習会などで参加者全員で学習する場合は応用編までで十分です。**

- 5. WebBluetooth の使い方
  - CHIRIMEN for Raspberry Pi 3 環境で Web Bluetooth API を使って制御するチュートリアルです。
  - [PLAYBULB制御](section5.md)
    - Web I2C API や Web Audio API と組み合わせて PLAYBULB (Bluetooth 接続の LED 電球) を制御します。
  - [micro:bitを使う](http://chirimen.org/webGPIO-etc-on-microbit-via-webBluetooth/)
    - 専用ライブラリ使い、micro:bitに搭載されたデバイスやインターフェースを利用します。
    - micro:bit 内蔵デバイス
      - 3 軸加速度センサー、3 軸磁気センサー、温度センサー、タクトスイッチ 2個、5x5 マトリクス LED
    - 外部デバイス (GPIO ポート)
      - micro:bit 用の WebGPIO API ライブラリを使えば、Raspberry Pi3 と同様に操作できます。
- [6. ステッピングモーターを制御する](section6.md)
  - CHIRIMEN for Raspberry Pi 3 と Arduino を組み合わせてステップピングモーターを制御します。I2C 接続した Arduino を利用することで μ 秒単位でモータードライバの制御を行います。

## 対応デバイスと Example 集
CHIRIMEN for Raspberry Pi 3 対応デバイスのドライバ・回路図・サンプルコードをセットにした Example 集を用意しています。

- [Basic GPIO Example](http://chirimen.org/chirimen-raspi3/gc/top/examples/#gpioExamples)
- [Basic I2C Example](http://chirimen.org/chirimen-raspi3/gc/top/examples/#i2cExamples)
- [Advanced Example](http://chirimen.org/chirimen-raspi3/gc/top/examples/#advanced)

Basic GPIO/I2C Examle のデバイスは CHIRIMEN Raspi3 の OS イメージ公開前に動作検証をしている CHIRIMEN Certified デバイスです。
Advanced Example は個人レベルで動作確認して追加されている contrib デバイスです。いずれも元のソースコードは [こちら](https://github.com/chirimen-oh/chirimen-raspi3/tree/master/gc) に収録されています。

## Appendix, Tips, FAQ, Links etc...
JavaScript 未経験者や非同期処理に慣れていない方向けの解説はこちらをご覧ください:

- [JavaScript 1 Day 講習 (PDF)](https://webiotmakers.github.io/static/docs/2017/maebashi-js.pdf)
  - 初めてプログラミングする人に 1 日で JavaScript を教えるときにちょうど良いボリューム・内容の資料です
- [JavaScript Primer - ECMAScript 2019時代のJavaScript入門書](https://jsprimer.net/)
  - 最新言語仕様も考慮した本格的な JavaScript 入門書です
  - 開発ツールなどについても [付録: 参考リンク集](https://jsprimer.net/appendix/links/) が参考になります
- [非同期処理 (async await版)](appendix0.md)
  - ハード制御で必ず必要だが引っかかる人が多い非同期処理についての解説です
  - 非同期処理についてより詳しくは [JS Primer の非同期処理説明ページ](https://jsprimer.net/basic/async/) が参考になります

良くある質問、Tips やテクニック、デバッグとトラブルシューティングについてはこちらをご覧ください:

- [良くある質問](faq.md)
- [Tips・テクニック集](tips.md)
- [デバッグ・トラブルシューティング](debug.md)
- [講師向けページ](teacher.md)

## 以前のチュートリアル
本チュートリアルは CHIRIMEN コミュニティで日々更新していますが、使用機材や手順を変更することもあります。お手持ちの機材が古い場合や、以前学習したときのものを参照したい場合など、必要に応じてこちらのアーカイブをご覧ください。

- [2018 年度のスターターキットを利用するチュートリアル](https://webiot-2018--tutorial-chirimen-org.netlify.com/raspi3/ja/)
  - DC Fan を含む、初期スターターキットを使うチュートリアルです。
  - [Web x IoT Makers Challenge 2018-19](https://webiotmakers.github.io/) で採用されていたバージョンです。
- [オリジナルチュートリアル (Qiita 版)](deprecated.md)
  - 本チュートリアルサイトの元となる、CHIRIMEN コミュニティメンバーが当初 Qiita などで執筆していた記事のリンク集です。

<div class="hide-on-production">
  <!-- tutorial.chirimen.org では hide-on-production クラスの中は表示されない -->

  ## Latest Version / 最新版

  Latest version of this document is hosted on https://tutorial.chirimen.org/raspi3/ja/

  このサイトの最新オンライン版は https://tutorial.chirimen.org/raspi3/ja/ でご覧頂けます
</div>


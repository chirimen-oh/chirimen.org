## [CHIRIMEN for Raspberry Pi3 チュートリアル](https://tutorial.chirimen.org/raspi3/ja/)

CHIRIMEN for Raspberry Pi 3を用いた IoT システムプロトタイピングスキル習得のためのチュートリアル資料です。

JavaScript プログラミング未経験者は、まず Appendix の「[JavaScript 1 Day 講習](https://webiotmakers.github.io/static/docs/2017/maebashi-js.pdf)」などで JavaScript の基本を学んでおくことをオススメします。

## [Hello Real World](hellorealworld.md)
L チカと温度センサーで GPIO と I2C の基本を試す[簡易版チュートリアル](hellorealworld.md)です。CHIRIMEN を手早く試してみたい方はこちらをご覧ください。
詳細を知りたい方やプロトタイピングに慣れていないのでステップバイステップで説明が欲しい方は、以下のチュートリアルをご覧ください。

## 基礎編
まずはシンプルな GPIO 入出力や I2C センサーの操作方法を学びましょう。

* [0. Hello World](section0.md)
  * [WebGPIO API](http://browserobo.github.io/WebGPIO/) を使って定期的に LED を点滅するサンプルを動かしてみます。
* [1. GPIO編](section1.md)
  * マウスクリックで操作するブラウザ画面のボタンと物理スイッチ (タクトスイッチ) の両方で LED やモーターを制御するサンプルを通じて GPIO の基本を学びます。
* [2. I2C 基本編 (ADT7410温度センサー)](section2.md)
  * 温度センサーの値をドライバーを使う場合と [WebGPIO API](http://browserobo.github.io/WebI2C/) を直接操作する場合の 2 パターンで読み取ることで、I2C デバイス操作の基本を学びます。

## 応用編
いろいろな I2C デバイスを繋いだり組み合わせたりすることで IoT プロトタイピングを体験しましょう。

* [3. I2C 応用編 (その他のセンサー)](section3.md)
  * いろいろな I2C デバイスを接続したり、複数の I2C デバイスの同時操作について学びます。
* [4. GPIO/I2C編 まとめ](section4.md)
  * これまでの総括として GPIO と I2C の両方を組み合わせてエアコンのプロトタイプ (？) を作成します。

## 発展編
ここまでの例では飽き足らない人のための発展的な使い方を紹介します (チュートリアルというより作例に近いです。鋭意執筆・改善中)。

* 5 . WebBluetooth編
  * CHIRIMEN for Raspberry Pi 3 環境で Web Bluetooth API を使って制御するチュートリアルです。
  * [PLAYBULB制御](section5.md)
    * Web I2C API や Web Audio API と組み合わせて PLAYBULB (Bluetooth経由で制御可能なLEDライト) の制御を行います。
  * [micro:bitを使う](http://chirimen.org/webGPIO-etc-on-microbit-via-webBluetooth/)
    * 専用ライブラリ使い、micro:bitに搭載されたデバイスやインターフェースを利用します。
    * 搭載デバイス
      * ３軸加速度センサー、３軸磁気センサー、温度センサー、タクトスイッチ２個、５ｘ５のマトリクスLED
    * GPIOポート
      * ライブラリにmicro:bit用のWebGPIO APIが用意されているので、Raspberry Pi3のGPIOポートと同様に操作できます。
* [6. ステッピングモーター編](section6.md)
  * CHIRIMEN for Raspberry Pi 3 と Arduino を組み合わせてステップピングモーターを制御するチュートリアルです。I2C 接続した Arduino を利用することで μ 秒単位でモータードライバの制御を行います。
  
## Example 編
CHIRIMEN for Raspberry Pi 3 対応デバイスのドライバ・回路図・サンプルコードをセットにした Example 集を用意しています。
* [Basic GPIO Example](http://chirimen.org/chirimen-raspi3/gc/top/examples/#gpioExamples)
* [Basic I2C Example](http://chirimen.org/chirimen-raspi3/gc/top/examples/#i2cExamples)
* [Advanced Example](http://chirimen.org/chirimen-raspi3/gc/top/examples/#advanced)

## Appendix / FAQ
JavaScript 未経験者や非同期処理の未経験者はチュートリアルと合わせてこちらをご覧ください:

* [JavaScript 1 Day 講習 (外部 PDF)](https://webiotmakers.github.io/static/docs/2017/maebashi-js.pdf)
* [非同期処理 (async await版)](appendix0.md)
* [CHIRIMEN for Raspberry Pi3のExamplesページ最新版](https://chirimen.org/chirimen-raspi3/gc/top/examples/)(多くのデバイスの利用例が追加されています)

良くある質問、知っておくと良い Tips やテクニック、デバッグとトラブルシューティングの仕方はそれぞれまとめたページがあるので参考にしてください:

* [良くある質問](faq.md)
* [Tips・テクニック集](tips.md)
* [デバッグ・トラブルシューティング](debug.md)
* [講師向けページ](teacher.md)

## 旧チュートリアル (Qiita 版)

本チュートリアルは当初 CHIRIMEN コミュニティメンバーが Qiita などで作成していたページを元に作成されています。当時のオリジナル版へのリンクは[こちら](deprecated.md)にまとめてあります。

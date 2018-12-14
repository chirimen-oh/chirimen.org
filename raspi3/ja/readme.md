## CHIRIMEN for Raspberry Pi3 チュートリアル

CHIRIMEN for Raspberry Pi 3を用いた IoT システムプロトタイピングスキル習得のためのチュートリアル資料です。

JavaScript プログラミング未経験者は、まず Appendix の「[JavaScript 1 Day 講習](https://webiotmakers.github.io/static/docs/2017/maebashi-js.pdf)」などで JavaScript の基本を学んでおくことをオススメします。

## 基礎編
まずはシンプルな GPIO 入出力や I2C センサーの操作方法を学びましょう。

* [0. Hello World](section0.md)
  * [WebGPIO API](https://rawgit.com/browserobo/WebGPIO/master/) を使って定期的に LED を点滅するサンプルを動かしてみます。
* [1. GPIO編](section1.md)
  * マウスクリックで操作するブラウザ画面のボタンと物理スイッチ (タクトスイッチ) の両方で LED やモーターを制御するサンプルを通じて GPIO の基本を学びます。
* [2. I2C 基本編 (ADT7410温度センサー)](section2.md)
  * 温度センサーの値をドライバーを使う場合と WebI2C API を直接操作する場合の 2 パターンで読み取ることで、I2C デバイス操作の基本を学びます。

## 応用編
いろいろな I2C デバイスを繋いだり組み合わせたりすることで IoT プロトタイピングを体験しましょう。

* [3. I2C 応用編 (その他のセンサー)](section3.md)
  * いろいろな I2C デバイスを接続したり、複数の I2C デバイスの同時操作について学びます。
* [4. GPIO/I2C編 まとめ](section4.md)
  * これまでの総括として GPIO と I2C の両方を組み合わせてエアコンのプロトタイプ (？) を作成します。

## 発展編
ここまでの例では飽き足らない人のための発展的な使い方を紹介します (鋭意執筆・改善中)。

* [5. WebBluetooth 編](section5.md)
  * CHIRIMEN for Raspberry Pi 3 環境で Web Bluetooth API を制御するチュートリアルです。Web I2C API や Web Audio API と組み合わせて PLAYBULB (Bluetooth経由で制御可能なLEDライト) の制御を行います。
* [6. ステッピングモーター編](section6.md)
  * CHIRIMEN for Raspberry Pi 3 と Arduino を組み合わせてステップピングモーターを制御するチュートリアルです。I2C 接続した Arduino を利用することで μ 秒単位でモータードライバの制御を行います。

## Appendix / FAQ
JavaScript 未経験者や非同期処理の未経験者はチュートリアルと合わせてこちらをご覧ください:

* [JavaScript 1 Day 講習 (外部 PDF)](https://webiotmakers.github.io/static/docs/2017/maebashi-js.pdf)
* [非同期処理 (async await版)](appendix0.md)

知っておくと良い Tips 集やよくある質問はそれぞれまとめたページがあるので参考にしてください:

* [Tips 集](tips.md)
* [良くある質問](faq.md)

## 旧チュートリアル (Qiita 版)

本チュートリアルは当初 CHIRIMEN コミュニティメンバーが Qiita などで作成していたページを元に作成されています。当時のオリジナル版へのリンクはこちらとなります:

* 基礎編
  * [0. Hello World](https://qiita.com/tadfmac/items/82817476615fdc7394b3)
  * [1. GPIO編](https://qiita.com/tadfmac/items/ebd01cfe46e30de70f3d)
  * [2. I2C 基本編 (ADT7410温度センサー)](https://qiita.com/tadfmac/items/36d5467f79b6fd3114fb)
* 応用編
  * [3. I2C 応用編 (その他のセンサー)](https://qiita.com/tadfmac/items/b17d8c6a35b31c495a36)
  * [4. GPIO/I2C編 まとめ](https://qiita.com/tadfmac/items/d627f8d2fec3c5f8711b)
* 発展編
  * [5. WebBluetooth 編](https://qiita.com/g200kg/items/28b3cc8c058bb49673a2)
  * [6. ステッピングモーター編](https://qiita.com/g200kg/items/cfb737c07b9b6edced3e)
* その他
  * [SDカードへ CHIRIMEN for Raspberry Pi 3 環境を構築する (暫定手順)](https://gist.github.com/tadfmac/527b31a463df0c9de8c30a598872344d)

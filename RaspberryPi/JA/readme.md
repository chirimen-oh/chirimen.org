## CHIRIMEN for Raspberry Pi3 チュートリアル

CHIRIMEN for raspberry pi 3を用いた IoT システムプロトタイピングスキル習得のためのチュートリアル資料です。

JavaScript プログラミング未経験者は、Appendix の「[JavaScript 1 Day 講習](https://webiotmakers.github.io/static/docs/2017/maebashi-js.pdf)」を履修しましょう。

Note: CHIRIMENコミュニティメンバーがQiita上で作成したチュートリアルコンテンツ(Originのリンク参照)を、gitHubに移行して共同編集することになりました。

## 基礎編
* [0. Hello World](/raspberrypi/ja/section0)
  * [WebGPIO API](https://rawgit.com/browserobo/WebGPIO/master/) を使って `setInterval()` で定期的に LED を点滅するサンプルを動かしてみます。
* [1. GPIO編](/raspberrypi/ja/section1)
  * マウスクリックで操作するブラウザ画面のボタンと物理スイッチ (タクトスイッチ) の両方で LED やモーターを制御するサンプルで GPIO の基本を学びます。
* [2. I2C 基本編 (ADT7410温度センサー)](/raspberrypi/ja/section2)
  * 光センサーの値をドライバーを使う場合と WebI2C API を直接操作する場合の 2 パターンで読み取ることで、I2C デバイス操作の基本を学びます。

## 応用編
* [3. I2C 応用編 (その他のセンサー)](/raspberrypi/ja/section3)
  * いろいろな I2C デバイスを接続したり、複数の I2C デバイスの同時操作について学びます。
* [4. GPIO/I2C編 まとめ](/raspberrypi/ja/section4)
  * これまでの総括として GPIO と I2C の両方を組み合わせてエアコンのプロトタイプ (？) を作成します。
* [5. WebBluetooth 編](/raspberrypi/ja/section5)
  * CHIRIMEN for Raspberry Pi 3 環境で Web Bluetooth API を制御するチュートリアルです。Web I2C API や Web Audio API と組み合わせて PLAYBULB (Bluetooth経由で制御可能なLEDライト) の制御を行います。
* [6. ステッピングモーター編](/raspberrypi/ja/section6)
  * CHIRIMEN for Raspberry Pi 3 と Arduino を組み合わせてステップピングモーターを制御するチュートリアルです。I2C 接続した Arduino を利用することで μ 秒単位でモータードライバの制御を行います。

## Appendix
* [JavaScript 1 Day 講習 (外部 PDF)](https://webiotmakers.github.io/static/docs/2017/maebashi-js.pdf)
* [非同期処理 (async await版)](/raspberrypi/ja/appendix0)


## 旧チュートリアル (Qiita 版)

本チュートリアルは当初 CHIRIMEN コミュニティメンバーが Qiita 上で作成していたページを元に作成されています。当時のオリジナル版へのリンクはこちらとなります:

* 基礎編
  * [0. Hello World](https://qiita.com/tadfmac/items/82817476615fdc7394b3)
  * [1. GPIO編](https://qiita.com/tadfmac/items/ebd01cfe46e30de70f3d)
  * [2. I2C 基本編 (ADT7410温度センサー)](https://qiita.com/tadfmac/items/36d5467f79b6fd3114fb)
* 応用編
  * [3. I2C 応用編 (その他のセンサー)](https://qiita.com/tadfmac/items/b17d8c6a35b31c495a36)
  * [4. GPIO/I2C編 まとめ](https://qiita.com/tadfmac/items/d627f8d2fec3c5f8711b)
  * [5. WebBluetooth 編](https://qiita.com/g200kg/items/28b3cc8c058bb49673a2)
  * [6. ステッピングモーター編](https://qiita.com/g200kg/items/cfb737c07b9b6edced3e)

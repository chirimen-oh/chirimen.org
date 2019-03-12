## CHIRIMEN for  TY51822r3 チュートリアル

CHIRIMEN for TY51822r3 を用いた IoT システムプロトタイピングスキル習得のためのチュートリアル資料です。

JavaScript プログラミング未経験者は、まず Appendix の「[JavaScript 1 Day 講習](https://webiotmakers.github.io/static/docs/2017/maebashi-js.pdf)」などで JavaScript の基本を学んでおくことをお勧めします。

また CHIRIMEN for Raspberry Pi 3 について既に知識があり、CHIRIMEN for TY51822r3 での相違点について知りたい場合は「[CHIRIMEN for Raspberry Pi 3 との違い](ble/ja/diff.md)」を参照してください。

## [事前準備編](setting.md)

CHIRIMEN for TY51822r3 を使用するには、TY51822r3 にファームウェアの書き込みやブラウザの設定変更などを行う必要があります。

ファームウェアの書き込み方やブラウザの設定変更方法などを紹介します。

## [Hello Real World](hellorealworld.md)
L チカと I2C 温度計の使い方を簡単に説明します。詳細を知りたい場合は、以下のチュートリアルを参照してください。

## [0. Hello World 編](section0.md)
 [Web GPIO API](https://rawgit.com/browserobo/WebGPIO/master/) を使って定期的に LED を点滅するサンプルを動かしてみます。

## [1. GPIO 編](section1.md)
 マウスクリックで操作するブラウザ画面のボタンと物理スイッチ (タクトスイッチ) の両方で LED やモーターを制御するサンプルを通じて GPIO の基本を学びます。

## [2. I2C 基礎編](section2.md)
 温度センサー ADT7410 を例に I2C デバイスの使い方を学びます。

## [3. I2C 応用編](section3.md)
 その他の色々な I2C デバイス操作を学びます。

## Appendix / FAQ
JavaScript 未経験者や非同期処理の未経験者はチュートリアルと合わせてこちらをご覧ください:

* [JavaScript 1 Day 講習 (外部 PDF)](https://webiotmakers.github.io/static/docs/2017/maebashi-js.pdf)
* [非同期処理 (async await版)](appendix0.md)
* [CHIRIMEN for TY51822r3 のピン配置と GPIO について](pins.md)

FAQ やその他関連資料です:

* [CHIRIMEN for Raspberry Pi 3 との違い](diff.md)
* [i2cdetect について](i2cdetect.md)
* [TY51822r3 の ファームウェアをビルドする](bridge.md)
* [良くある質問](faq.md)
* [Tips 集](tips.md)

# CHIRIMEN 対応デバイスリスト

市販されているセンサーやアクチュエータなどのうち、CHIRIMEN 環境での利用を検証しサンプルコード一式 (I2C デバイスについては CHIRIMEN 用ドライバーを含む) を用意しているデバイス一覧です。

こちらに掲載がないデバイスについても、デジタル GPIO デバイスであればそのまま、アナログ GPIO デバイスであれば ADC を経由で簡単に利用頂けます (I2C デバイスについてはドライバーの用意も必要です)。

## I2C センサー

{% include partslist.html interface='I2C' %}

## GPIO センサー・アクチュエータコントローラー

{% include partslist.html interface='GPIO' %}

## アナログセンサー (利用にはI2C ADCが必要です)

{% include partslist.html interface='アナログ' %}

## アクチュエータ

{% include partslist.html interface='アクチュエータ' %}

## その他

{% include partslist.html interface='その他' %}

## ボードコンピューター

{% include partslist.html interface='ボードコンピューター' %}

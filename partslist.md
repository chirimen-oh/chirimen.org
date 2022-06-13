# CHIRIMEN 対応デバイスリスト

市販のセンサーやアクチュエータなどのうち、CHIRIMEN 環境での利用を検証し配線図とサンプルコード一式 (I2C デバイスは CHIRIMEN 用ドライバー含む) を用意しているデバイスの一覧です。

こちらに掲載がないデバイスについても、デジタル GPIO デバイスであればそのまま、アナログ GPIO デバイスであれば ADC を経由で簡単に利用頂けます (I2C デバイスについてはドライバーの用意も必要です)。

Raspberry Pi などの CHIRIMEN の動作環境とそれぞれのチュートリアルは [CHIRIMEN について](about) をご覧ください。

<!-- 以下 https://github.com/chirimen-oh/chirimen.org/blob/master/_data/partslist.csv から表を生成 -->

## I2C センサー

{% include partslist.html interface='I2C' %}

## GPIO センサー・アクチュエータコントローラー

{% include partslist.html interface='GPIO' %}

## アナログセンサー (I2C ADC で読み取り)

{% include partslist.html interface='アナログ' %}

## アクチュエータ

{% include partslist.html interface='アクチュエータ' %}

## その他

{% include partslist.html interface='その他' %}

## ボードコンピューター

{% include partslist.html interface='ボードコンピューター' %}

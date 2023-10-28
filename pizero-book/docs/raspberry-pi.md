# Raspberry Pi について

* 教育・学習用として設計されたシングルボードコンピュータ<span class="footnote">https://elchika.com/dic/シングルボードコンピュータ/</span>
* Linux が動作するシングルボードコンピュータとして、安価でとても高いシェアを持ち世界中で容易に入手できる
* 今回使用する Raspberry Pi Zero W は、その中でも特に安価([2000円以下](https://www.switch-science.com/catalog/3200/))で小型・低消費電力の機種、HDMI 出力はあるもののブラウザを動かすだけの処理能力がありませんが、 IoT のエッジデバイス（センサーやアクチュエータが載ったデバイスでディスプレイはあるとしても簡易のもの）には適しています。
  * フルセットのブラウザが内蔵されたデバイスを作りたい場合は[CHIRIMEN Raspberry Pi版](https://tutorial.chirimen.org/raspi/)が使用できます。
  * インターネットを経由してPCやスマホのブラウザから遠隔操作するシステムは　このPi ZeroW版でつくれます。第 12 章 IoT まで進めましょう。

## Raspberry Pi Zero のピン配列

GPIO, 電源, GND, I2C 信号線などのピン配列を記載します。

* 白い文字で書かれたピンだけが使えます
* GND、3.3V、5V はそれぞれ電源とグランドです
* 数字 + PD||PU と書かれているピンは GPIO 端子
  * PD:プルダウン, PU:プルアップ
* SCL, SDA は I2C インターフェースのピンです


![Raspberry Pi Pinout](https://chirimen.org/PiZeroWebSerialConsole/wallpaperS.png){height=305}

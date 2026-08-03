# 4.1 GPIOを理解する
[GPIO](https://ja.wikipedia.org/wiki/GPIO)という略語だけを見ると、何を指しているのか見当がつかないかもしれません。正体は単純で、「General-purpose input/output」、つまり汎用的な入出力インタフェースのことです。

Raspi に実装されている 40 本のピンヘッダから、このGPIOを利用できます。ただし、40本すべてが自由に使えるわけではありません。CHIRIMEN Raspi、Raspi Zero では、Raspi が提供する 40 本のピンヘッダのうち、下記緑色のピン(合計 17 本)だけが利用可能です。

* 白い文字で書かれたピンだけが使えます
* GND、3.3V、5Vはそれぞれ電源とグランドです
* 数字 + PD||PUと書かれているピンは GPIO端子です
  * PD:プルダウン, PU:プルアップ
* SCL, SDAはI2Cインターフェースのピンです(詳細は [I2Cデバイスを試す](./chapter_5.md)にて)

![Raspberry Pi Pinout](https://chirimen.org/PiZeroWebSerialConsole/wallpaperS.png)

Raspi の GPIO 端子は、GND 端子との間に、0V もしくは 3.3V の電圧を印加(出力)したり、逆に 0V もしくは 3.3V の電圧を検知(入力)したりできます。この二値の切り替えだけで、何ができるのでしょうか。LED は数 mA の電流を流すことによって点灯する電子部品です。印加する電圧を 3.3V(点灯)、0V(消灯) と切り替えるだけで、L チカが実現できます。

詳しくは[こちらのサイトの解説](https://tool-lab.com/make/raspberrypi-startup-22/)を参考にしてください。
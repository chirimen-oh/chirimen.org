# 3.1 配線
PiZero とパーツを使って下の図の通りに配線します。

![PiZero配線図](./imgs/pizero_led.png)

**！！注意！！**
* 間違ったピンに差し込むと場合によってはPiZeroが停止したり故障することもあります。（たとえば3.3V端子とGND端子を接続してしまうなど。）
* そのため、慣れるまでは一旦PiZeroをシャットダウン、USBケーブルも外し電源OFFにしてから配線すると安全です
   * シャットダウンコマンド：```sudo shutdown -h now```
![LEDイラスト](./imgs/led.jpg)
* [LEDの極性に注意！](https://tutorial.chirimen.org/raspi/hellorealworld#section-1)
  * LED には極性 (方向) があり、足が長い方 (アノード) を GPIO 出力ピンに、足が短い方 (カソード) を GND 側に繋いでください。
  * [LEDの説明](./chapter_10-2-1.md)
* [ブレッドボードの使い方](./chapter_10-2-2.md)
* [抵抗値の読み方](./chapter_10-2-3.md)
* [その他、配線の基礎知識](https://tutorial.chirimen.org/reference#section-1)
* 配線に使うケーブルの色に厳密な決まりはありませんが、一般的にGNDは黒(や黒っぽい色)、電源(VCC, +3.3V, +5V)には赤(や赤っぽい色)が用いられます。配線間違いを防ぐためにもなるべく合わせましょう。
* 抵抗や LED の足(リード線)は手で簡単に曲げられます。ブレッドボードに差し込めるように適当に成型してください。
* 上図の PiZero は上から見たものです

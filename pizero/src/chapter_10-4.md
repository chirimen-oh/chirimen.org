# 11.4 GPIO
## GPIOとは

[GPIO](https://ja.wikipedia.org/wiki/GPIO) は「General-purpose input/output」の略で、汎用的な入出力インタフェースを指します。

Raspi には 40 本のピンヘッダが実装されており、ここから GPIO を利用できます。

CHIRIMEN Raspi、Raspi Zero では、この 40 本のうち下記緑色で示したピン(合計 17 本)が利用可能です。CHIRIMEN micro:bit では利用できる端子が異なり、[こちらのページ](https://chirimen.org/chirimen-micro-bit/guidebooks/diff_rpi3.html#%E4%BD%BF%E7%94%A8%E3%81%A7%E3%81%8D%E3%82%8Bgpio%E3%83%9D%E3%83%BC%E3%83%88)にまとめられています。

Raspi や micro:bit の GPIO 端子は、GND との間に 0V または 3.3V の電圧をかける(出力)か、逆にその電圧を検知する(入力)かのどちらかで動作します。LED は数 mA の電流を流すだけで点灯する部品です。だから、GPIO 端子にかける電圧を 3.3V(点灯) と 0V(消灯) の間で切り替えるだけで、L チカが実現できます。

詳しくは[こちらのサイトの解説](https://tool-lab.com/make/raspberrypi-startup-22/)にまとまっています。

### Raspberry Piのピン配置図
![Raspi PIN配置図](https://chirimen.org/PiZeroWebSerialConsole/wallpaperS.png)
<!--
![Raspi PIN配置図](../raspi/imgs/section0/Raspi3PIN.png)
{% cloudinary ../raspi/imgs/section0/Raspi3PIN.png alt="Raspi PIN配置図" %}
-->
### Raspberry Pi Zeroのピン配置図
端子の配列は、Raspberry Pi と同じです。

### micro:bitのピン配置図
![micro:bitのI端子](https://tech.microbit.org/docs/hardware/assets/edge_connector.svg)

### プルアップ(PU)、プルダウン(PD)
GPIO ポートを入力モードで使うとき、何も接続されていない解放状態(電気的に切り離された状態)でも、ポートは 0 か 1 かの値を返します。この値をあらかじめ決めておく仕組みが、プルアップとプルダウンです。プルアップに設定されたポートは 1 を、プルダウンに設定されたポートは 0 を返します。Raspberry Pi のピン配置図に記載されている PU、PD は、各ピンがどちらに設定されているかを示す表記です。micro:bit ではすべてのピンがプルダウンに設定されていますが、GPIO ポートの初期化時にプルアップへ変更することもできます。

* [より詳しく知る(voltechno)](https://voltechno.com/blog/pullup-pulldown/)

# 10.4 GPIO
## GPIOとは

[GPIO](https://ja.wikipedia.org/wiki/GPIO)は、「General-purpose input/output」の略で汎用的な入出力インタフェースのことです。

Raspi に実装されている 40 本のピンヘッダから GPIO を利用することができます。

CHIRIMEN Raspi、Raspi Zero では Raspi が提供する 40 本のピンヘッダのうち、下記緑色のピン(合計 17 本)が利用可能です。CHIRIMEN micro:bitでは[こちらのページ](https://chirimen.org/chirimen-micro-bit/guidebooks/diff_rpi3.html#%E4%BD%BF%E7%94%A8%E3%81%A7%E3%81%8D%E3%82%8Bgpio%E3%83%9D%E3%83%BC%E3%83%88)に記載されている端子が利用可能です。

Raspiやmicro:bit の GPIO 端子は、GND 端子との間に、0V もしくは 3.3V の電圧を印加(出力)したり、逆に 0V もしくは 3.3V の電圧を検知(入力)したりすることができます。LED は数 mA の電流を流すことによって点灯できる電子部品のため、印加する電圧を 3.3V(点灯)、0V(消灯) と変化させることで L チカが実現できるのです。

詳しくは[こちらのサイトの解説](https://tool-lab.com/make/raspberrypi-startup-22/)などを参考にしてみましょう。

### Raspberry Piのピン配置図
![Raspi PIN配置図](https://chirimen.org/PiZeroWebSerialConsole/wallpaperS.png)
<!--
![Raspi PIN配置図](../raspi/imgs/section0/Raspi3PIN.png)
{% cloudinary ../raspi/imgs/section0/Raspi3PIN.png alt="Raspi PIN配置図" %}
-->
### Raspverry Pi Zeroのピン配置図
Raspberry Piの端子と同じ配列です。

### micro:bitのピン配置図
![micro:bitのI端子](https://tech.microbit.org/docs/hardware/assets/edge_connector.svg)

### プルアップ(PU)、プルダウン(PD)
GPIOポートを入力モードで使用する場合、ポートが解放状態(電気的に切り離されている状態)のときに設定される値があります。
プルアップは1、プルダウンは0になります。　Raspberry Piのピン配置図に書かれているPU,PDがその設定値です。micro:bitではすべてプルダウンに設定されていますが、GPIOポート初期化時にプルアップに設定することもできます。

* [より詳しく知る(voltechno)](https://voltechno.com/blog/pullup-pulldown/)

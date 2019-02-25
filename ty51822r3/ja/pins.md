---
layout: tutorial
---


## TY51822r3 のピン配置

ここで CHIRIMEN for TY51822r3 で使用される TY51822r3 のピン配置について説明しておきます。

TY51822r3 には全部で 32 本のピンがありますが、CHIRIMEN for TY51822r3 の環境では下の図で明るい緑で書かれた名前のようにピンが使われます。

![TY51822r3 PIN 配置図](imgs/section0/ty51822r3.png)

CHIRIMEN for TY51822r3 では、BLE ボード の TY51822r3 が持っているピンの内、P0_0 から P0_7 の 8 本のピン、上の図で 0 から 7 の数字が振られたピンを [Web GPIO API](http://browserobo.github.io/WebGPIO/) が扱う [GPIO (General-purpose input/output)](https://ja.wikipedia.org/wiki/GPIO) ピンとして汎用的な入出力インタフェースに利用する事ができます。

CHIRIMEN for TY51822r3 の GPIO 端子は、GND 端子との間に、0V もしくは 3.3V の電圧を印加(出力)したり、逆に 0V もしくは 3.3V の電圧を検知(入力)したりすることができます。ここに接続した LED は数 mA の電流を流すことによって点灯できる電子部品です。LED は一定以上の電圧 (赤色 LED だと概ね 1.8V 程度、青色 LED だと 3.1V 程度) 以上になると点灯する性質を持っており、印加する電圧を 3.3V (点灯)、0V (消灯) と変化させることで L チカを実現します。

また、上の図で LED1 と書かれているピンがこのサンプルで青い LED を接続したピンで、CHIRIMEN for TY51822r3 の環境では BLE の接続状態を表す専用の出力ピンとして使用されます。

なお、SCL、SDA のピンは [Web I2C API](https://rawgit.com/browserobo/WebI2C/master/index.html) で使用するピンです。このピンの配置は CHIRIMEN for TY51822r3 環境でのもので、`MBED 公式の TY51822r3 のピン配置とは異なる事に注意してください。`

## GPIO のドライブ能力

GPIO 端子に LED 等の部品を接続する際には端子がどれくらいまで電流を流せるかというドライブ能力にも注意する必要があります。TY51822r3 は Raspberry Pi や Arduino などの IoT 関係でよく使われるボードに比べてドライブ能力の制限が厳しくなっています。  

TY51822r3 の公式の仕様では GPIO 端子が (標準の設定では) ドライブできる電流は 0.5 mA までとなっており、LED を直接繋ぐにはそもそも心もとない数字です。CHIRIMEN for TY51822r3 の環境では GPIO 端子の high drive 設定という特別な機能を利用して、GPIO の端子 1 本あたり 5 mA までの電流をドライブできる設定になっています。

ただしもう一つ、デバイス全体での電流が 15 mA までという制限があり、この範囲内で使用する必要があります。つまり、LED に 5 mA の電流を流すのであれば `LED を同時に 3 個光らせるのが限界`という事に注意してください。


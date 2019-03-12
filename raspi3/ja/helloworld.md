
# スターターキットを使った HelloWorld 編

CCHIRIMEN for Raspberry Pi 3 のスターターキットを使用して L チカと I2C 温度計で気温を計測してみよう。

<div style="page-break-before:always"></div>

# 1. L チカをやってみよう
<p>
  <a href="imgs/section0/Raspi3.jpg">
    <img src="imgs/section0/Raspi3.jpg" alt="Hardware" height="250" style = "float:right;padding-left:2em;">
  </a>

## 用意するもの

* スターターキット<br>
* PC

注意<br>
スターターキットの中身を確認しよう。<br>
足りなかったり、多くあった場合は、近くの大人に知らせよう。

## 配線

<p>
  <a href="imgs/section0/h.jpg">
    <img src="imgs/section0/h.jpg" alt="Browser"  height="250" style="float:right;padding-left:2em;">
  </a>

右図と同じように配線してみよう。

配線が終わったら、BLE 接続をクリックしよう。

注意<br>
LED には方向がある。アノードが足が長い方。反対の足が短い方をカソードと言い GND 側に繋ぐ。抵抗はどちらかに繋ぐ。
</p>

## Example を実行しよう

<p>
  <a href="imgs/section0/browser.png">
    <img src="imgs/section0/browser.png" alt="Browser" height="250" style="float:right;padding-left:2em;">
  </a>

`/home/pi/Desktop/gc/gpio/LEDblink/index.html`

をダブルクリックすると、ブラウザが起動し、先ほど配線した LED が点滅しているはずです！

ブレッドボード上では LED が点滅して L チカが動作しはじめます。

[オンライン Example はこちら](https://r.chirimen.org/gpio-blink)

これで L チカは完了です。

</p>

<!--
<div style="page-break-before:always"></div>
-->

## コード

[今回使用したコードはこちら](https://r.chirimen.org/gpio-blink)

* [その他の GPIO の例はこちら](http://chirimen.org/chirimen-raspi3/gc/top/examples/#gpioExamples)

L チカ編はこれで終了です

<div style="page-break-before:always"></div>

# 2. I2C 温度センサー使ってみよう

<p>
  <a href="imgs/section2/parts.jpg">
    <img src="imgs/section2/parts.jpg" alt="Browser" height="200" style="float:right;padding-left:2em;">
  </a>
  
## 用意するもの

* L チカを行った回路

* 右図に書いてあるもの

ジャンパーワイヤー (メス-メス) x 4

ADT7410使用 I2C 温度センサーモジュール

</p>

<p>
  <a href="imgs/section2/schematic.png">
    <img src="imgs/section2/schematic.png" alt="Browser" height="200" style="float:right;padding-left:2em;">
  </a>
  
## 配線

右図と同じように配線してみよう。

配線が終わったら、ターミナルを起動して下記コマンドを入力してみてください。

` $ i2cdetect -y -r 1 `

 <a href="imgs/section2/ADT7410.png">
  <img src="imgs/section2/ADT7410.png" alt="Browser" height="200" style="float:right;padding-left:2em;margin-bottom:2em;">
 </a>
 
すると、右図のような画面が表示されるはずです。

</p>
  
## Example を実行しよう
<p>
  
実際に動かしてみましょう。

`/home/pi/Desktop/gc/i2c/i2c-ADT7410/index.html`

ダブルクリックすると、ブラウザが起動し下記のような画面になります。

[オンライン Example はこちら](https://r.chirimen.org/i2c-adt7410)

 
<a href="imgs/section2/browser.png">
  <img src="imgs/section2/browser.png" alt="Browser" height="180" style="float:right;padding-left:2em;">
</a>

右下に数字がでていますね。

これが温度センサーから取得した現在の温度 (摂氏) の表示になります。

これで I2C 温度計編は完了です。

</p>

## コード

[今回使用したコードはこちら](https://r.chirimen.org/i2c-adt7410)

* [その他の I2C の例はこちら](http://chirimen.org/chirimen-raspi3/gc/top/examples/#i2cExamples)
* [応用例はこちら](http://chirimen.org/chirimen-raspi3/gc/top/examples/#advanced)

I2C 温度計編はこれで終了です。


<!--
<div style="page-break-before:always"></div>
-->

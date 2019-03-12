
# Hello Real World

CHIRIMEN for Raspberry Pi 3 のスターターキットを使用して L チカと I2C 温度計で気温を計測してみよう。

<div style="page-break-before:always"></div>

# 1. L チカをやってみよう
<p>
  <a href="imgs/section0/raspi3.png">
    <img src="imgs/section0/raspi3.jpg" alt="Hardware" height="250" style = "float:right;padding-left:2em;">
  </a>

## 用意するもの

* Raspberry Pi 3 Model B もしくは Raspberry Pi 3 Model B+ × 1
* AC アダプタ + micro B USB 電源ケーブル × 1
* HDMI 入力つきのモニタ × 1
* HDMI ケーブル (モニタ側の端子と合うものを選んでください) × 1
* USB マウス × 1
* USB キーボード (日本語配列) × 1
* micro SD カード (8GB 以上必須、Class 10 以上で高速なものを推奨) × 1
* ブレッドボード × 1
* リード付き LED × 1
* リード付き抵抗器 (150-470Ω ※お使いの LED により。スターターキットは 150Ω を使用します。) × 1
* ジャンパーワイヤー (オス-メス) x 2

## 配線

<p>
  <a href="imgs/section0/h.jpg">
    <img src="imgs/section0/h.jpg" alt="Browser"  height="250" style="float:right;padding-left:2em;">
  </a>

右図と同じように配線してみよう。

注意<br>
LED には方向がある。アノードが足が長い方。反対の足が短い方をカソードと言い GND 側に繋ぐ。抵抗はどちらかに繋ぐ。
</p>

## Example を実行しよう

<p>
  <a href="imgs/section0/browser.png">
    <img src="imgs/section0/browser.png" alt="Browser" height="250" style="float:right;padding-left:1em;">
  </a>

`/home/pi/Desktop/gc/gpio/LEDblink/index.html`

をダブルクリックすると、ブラウザが起動し、先ほど配線した LED が点滅しているはずです！
ブレッドボード上では LED が点滅して L チカが動作しはじめます。

[オンライン Example はこちら](https://r.chirimen.org/gpio-blink)

[今回使用したコードはこちら](https://r.chirimen.org/gpio-blink)

* [その他の GPIO の例はこちら](http://chirimen.org/chirimen-raspi3/gc/top/examples/#gpioExamples)

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

---
layout: tutorial
---

# スターターキットを使った HelloWorld 編

CCHIRIMEN for Raspberry Pi 3 のスターターキットを使用して L チカと I2C 温度計で気温を計測してみよう。

<div style="page-break-before:always"></div>

# 1. L チカをやってみよう
<p>
  <img src="imgs/section0/Raspi3.jpg" alt="Hardware" height="250" style = "float:right;padding-left:2em;">

## 用意するもの

* スターターキット<br>
* PC

注意<br>
スターターキットの中身を確認しよう。<br>
足りなかったり、多くあった場合は、近くの大人に知らせよう。

## 配線
<p>
<img src="imgs/section0/h.jpg" alt="Browser"  height="250" style="float:right;padding-left:2em;">

右図と同じように配線してみよう。

配線が終わったら、BLE 接続をクリックしよう。

注意<br>
LED には方向がある。アノードが足が長い方。反対の足が短い方をカソードと言い GND 側に繋ぐ。抵抗はどちらかに繋ぐ。
</p>

## Example を実行しよう
<p>
<img src="imgs/section0/browser.png" alt="Browser" height="250" style="float:right;padding-left:2em;">

` /home/pi/Desktop/gc/gpio/LEDblink/index.html
index.html `

をダブルクリックすると、ブラウザが起動し、先ほど配線した LED が点滅しているはずです！

ブレッドボード上では LED が点滅して L チカが動作しはじめます。

これで L チカは完了です。

</p>

<div style="page-break-before:always"></div>



# 2. I2C 温度センサー使ってみよう

  <p>
  <img src="imgs/section2/parts.jpg" alt="Browser" height="200" style="float:right;padding-left:2em;">

## 用意するもの

* L チカを行った回路

* 右図に書いてあるもの

ジャンパーワイヤー (メス-メス) x 4

ADT7410使用 I2C 温度センサーモジュール

</p>

<p>
  <img src="imgs/section2/schematic.png" alt="Browser" height="200" style="float:right;padding-left:2em;">
  
## 配線

右図と同じように配線してみよう。

配線が終わったら、ターミナルを起動して下記コマンドを入力してみてください。

` $ i2cdetect -y -r 1 `

 <img src="imgs/section2/ADT7410.png" alt="Browser" height="200" style="float:right;padding-left:2em;">
 
すると、右図のような画面が表示されるはずです。

</p>
  
## Example を実行しよう
<p>
  
実際に動かしてみましょう。

` /home/pi/Desktop/gc/i2c/i2c-ADT7410/index.html `

ダブルクリックすると、ブラウザが起動し下記のような画面になります。
  
右下に数字がでていますね。

<img src="imgs/section2/browser.png" alt="Browser" height="180" style="float:right;padding-left:2em;">

これが温度センサーから取得した現在の温度 (摂氏) の表示になります。

これで I2C 温度計は完了です。

</p>

<div style="page-break-before:always"></div>

# まとめ

このページでは、L チカと I2C の温度センサー ADT7410 の制御方法を学びました。

このページは本来のチュートリアルの簡易版です。

詳しく知りたい方や学びたい方は、下記をご覧ください。

* 『[チュートリアル 0. HelloWorld編](./section0.md)』では Web GPIO API の学習をします。

* 『[チュートリアル 1. GPIO編](./section1.md)』では GPIO の入力方法について学びます。

* 『[チュートリアル 2. I2C 基礎編](./section2.md)』では Web I2C API の学習をします。

* 『[チュートリアル 3. I2C 応用編（その他のセンサー）](./section3.md)』では測距センサーや光センサーなど他のセンサーも触っていきます。

* 『[チュートリアル 4. GPIO/I2C編 まとめ](./section4.md)』 では、これまでの総括として GPIO と I2C の両方を組み合わせてエアコンのプロトタイプ (？) を作成します。

* 『[チュートリアル 5 . WebBluetooth編](./section3.md)』 ではCHIRIMEN for Raspberry Pi 3 環境で Web Bluetooth API を使って制御します。

* 『[チュートリアル 6. ステッピングモーター編](./section3.md)』 ではCHIRIMEN for Raspberry Pi 3 と Arduino を組み合わせてステップピングモーターを制御します。


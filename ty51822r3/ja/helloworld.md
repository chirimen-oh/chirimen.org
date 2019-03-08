---
layout: tutorial
---

# スターターキットを使った HelloWorld 編

CHIRIMEN for TY51822r3 のスターターキットを使用して L チカと I2C 温度計で気温を計測してみよう。

<div style="page-break-before:always"></div>

# 1. L チカをやってみよう
<p>
  <img src="imgs/section0/hardware.jpg" alt="Hardware" height="250" style = "float:right;padding-left:2em;">

## 用意するもの

* スターターキット<br>
* PC

注意<br>
スターターキットの中身を確認しよう。<br>
足りなかったり、多くあった場合は、近くの大人に知らせよう。

## 配線
<p>
<img src="imgs/section0/ledblink_2.png" alt="Browser"  height="250" style="float:right;padding-left:2em;">
右図と同じように配線してみよう。

配線が終わったら、BLE 接続をクリックしよう。

注意<br>
LED には方向がある。アノードが足が長い方。反対の足が短い方をカソードと言い GND 側に繋ぐ。抵抗はどちらかに繋ぐ。
</p>

## Example を実行しよう
<p>
<img src="imgs/section0/ledblink_3.png" alt="Browser" height="250" style="float:right;padding-left:2em;">

BLE 接続をクリックすると、右図のようになります。

Y51822r3 がちゃんと動作していれば、リストに「btGPIO2」 という名前のデバイスが見つかるはずです。<br>
これが CHIRIMEN for TY51822r3 用のデバイスになります。
それを選択して「ペア設定」のボタンを押すとダイアログと青いバーが消え、接続が確立します。

ブレッドボード上では LED が点滅して L チカが動作しはじめます。

これで L チカは完了です。

</p>

<div style="page-break-before:always"></div>



# 2. I2C 温度センサー使ってみよう

  <p>
  <img src="imgs/section2/adt7410_parts.jpg" alt="Browser" height="200" style="float:right;padding-left:2em;">
  
## 用意するもの

* L チカを行った回路

* 右図に書いてあるもの

抵抗 10kΩ * 2 個 

ADT7410使用 I2C 温度センサーモジュール

</p>

<p>
  <img src="imgs/section2/adt7410_1.png" alt="Browser" height="200" style="float:right;padding-left:2em;">
  
## 配線

右図と同じように配線してみよう。

配線が終わったら、BLE 接続をクリック。

</p>
  
## Example を実行しよう
<p>
  <img src="imgs/section2/adt7410_3.png" alt="Browser" height="180" style="float:right;padding-left:2em;">
  
BLE 接続をクリックすると、右図のようになります。

ターゲットの gtGPIO2 を選択して「ペア設定」を押してください。

BLE の接続が正常にできれば、青いバーが消え動作を開始します。
  
右下の図に数字がでていますね。

これが温度センサーから取得した現在の温度 (摂氏) の表示になります。

<img src="imgs/section2/adt7410_4.png" alt ="Browser" height="180" style="float:right;padding-left:2em;">

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

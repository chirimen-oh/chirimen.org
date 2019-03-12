
# スターターキットを使った HelloWorld 編

CHIRIMEN for TY51822r3 のスターターキットを使用して L チカと I2C 温度計で気温を計測してみよう。

<div style="page-break-before:always"></div>

# 1. L チカをやってみよう
<p>
  <a href="imgs/section0/hardware.jpg">
    <img src="imgs/section0/hardware.jpg" alt="Hardware" height="250" style = "float:right;padding-left:2em;">
  </a>
</p>

## 用意するもの

* スターターキット<br>
* PC

注意<br>
スターターキットの中身を確認しよう。<br>
足りなかったり、多くあった場合は、近くの大人に知らせよう。

## 配線

<p>
  <a href="https://github.com/chirimen-oh/chirimen-TY51822r3/blob/master/bc/gpio/LEDblink/schematic.png">
    <img src="https://github.com/chirimen-oh/chirimen-TY51822r3/blob/master/bc/gpio/LEDblink/schematic.png" alt="Browser"  height="250" style="float:right;padding-left:2em;">
  </a>
  
右図と同じように配線してみよう。

配線が終わったら、BLE 接続をクリックしよう。

注意<br>
LED には方向がある。アノードが足が長い方。反対の足が短い方をカソードと言い GND 側に繋ぐ。抵抗はどちらかに繋ぐ。
</p>

## Example を実行しよう
<p>
  <a href="imgs/section0/ledblink_3.png">
    <img src="imgs/section0/ledblink_3.png" alt="Browser" height="250" style="float:right;padding-left:2em;">
  </a>
  
BLE 接続をクリックすると、右図のようになります。

Y51822r3 がちゃんと動作していれば、リストに「btGPIO2」 という名前のデバイスが見つかるはずです。<br>
これが CHIRIMEN for TY51822r3 用のデバイスになります。
それを選択して「ペア設定」のボタンを押すとダイアログと青いバーが消え、接続が確立します。

ブレッドボード上では LED が点滅して L チカが動作しはじめます。

これで L チカは完了です。

</p>

<div style="page-break-before:always"></div>

## コード

[今回使用したコードはこちら](https://github.com/chirimen-oh/chirimen-TY51822r3/tree/master/bc/gpio/LEDblink)


* [その他の GPIO の例はこちら](http://chirimen.org/chirimen-raspi3/gc/top/examples/#gpioExamples)

L チカ編はこれで終了です

<div style="page-break-before:always"></div>

# 2. I2C 温度センサー使ってみよう

<p>
  <a href="imgs/section2/adt7410_parts.jpg">
    <img src="imgs/section2/adt7410_parts.jpg" alt="Browser" height="200" style="float:right;padding-left:2em;">
  </a>
  
## 用意するもの

* L チカを行った回路

* 右図に書いてあるもの

抵抗 10kΩ x 2 個 

ADT7410使用 I2C 温度センサーモジュール

</p>

<p>
  <a href="https://chirimen.org/chirimen-TY51822r3/bc/i2c/i2c-ADT7410/schematic.png">
    <img src="https://chirimen.org/chirimen-TY51822r3/bc/i2c/i2c-ADT7410/schematic.png" height="200" style="float:right;padding-left:2em;">
  </a>
  
## 配線

右図と同じように配線してみよう。

配線が終わったら、BLE 接続をクリック。

</p>
  
## Example を実行しよう

<p>
  <a href="imgs/section2/adt7410_3.png">
    <img src="imgs/section2/adt7410_3.png" alt="Browser" height="180" style="float:right;padding-left:2em;">
  </a>
  
BLE 接続をクリックすると、右図のようになります。

ターゲットの gtGPIO2 を選択して「ペア設定」を押してください。

BLE の接続が正常にできれば、青いバーが消え動作を開始します。
  
右下の図に数字がでていますね。

これが温度センサーから取得した現在の温度 (摂氏) の表示になります。

<a href="imgs/section2/adt7410_4.png">
  <img src="imgs/section2/adt7410_4.png" alt ="Browser" height="180" style="float:right;padding-left:2em;">
</a>

これで I2C 温度計は完了です。

## コード

[今回使用したコードはこちら](https://github.com/chirimen-oh/chirimen-TY51822r3/tree/master/bc/i2c/i2c-ADT7410)


* [その他の I2C の例はこちら](http://chirimen.org/chirimen-raspi3/gc/top/examples/#i2cExamples)
* [応用例はこちら](http://chirimen.org/chirimen-raspi3/gc/top/examples/#advanced)

</p>

I2C 温度計編はこれで終了です

<div style="page-break-before:always"></div>


# Hello Real World

CHIRIMEN for Raspberry Pi 3 を使用して L チカと I2C 温度計で気温を計測してみよう。


# 1. L チカをやってみよう


## 用意するもの
| CHIRIMEN for Raspi3 基本ハードウェア | L チカで使用する部品 | I2C 温度計で使用する部品|
|---|---|---|
| ![Hardware](imgs/section0/raspi3.jpg) |![LED_Bling](imgs/section0/l.jpg) | ![ADT7410](imgs/section2/parts.jpg) |

- [Raspberry Pi 3 Model B](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/) もしくは [Raspberry Pi 3 Model B+](https://www.raspberrypi.org/products/raspberry-pi-3-model-b-plus/) × 1
- AC アダプタ + micro B USB 電源ケーブル × 1
  - 例:[Raspberry Pi 用電源セット(5V 3.0A) - Pi3 フル負荷検証済](https://www.physical-computing.jp/product/1171)
- HDMI 入力つきのモニタ × 1
- HDMI ケーブル (モニタ側の端子と合うものを選んでください) × 1
- USB マウス × 1
- USB キーボード (日本語配列) × 1
- micro SD カード (8GB 以上必須、Class 10 以上で高速なものを推奨) × 1
- ブレッドボード × 1
- リード付き LED × 1
- リード付き抵抗器 (150-470Ω) × 1
- ジャンパーワイヤー (オス-メス) x 2
- ジャンパーワイヤー (メス-メス) x 4
- [ADT7410使用 I2C 温度センサーモジュール](http://akizukidenshi.com/catalog/g/gM-06675/)

## 配線

<p>
  <a href="imgs/section0/example_LEDblink.png">
    <img src="imgs/section0/example_LEDblink.png" alt="Lチカに必要なパーツ一覧" height="250" style="float:right;padding-left:2em;">
  </a>

右図と同じように配線してみよう。
[実際に配線した図](imgs/section0/h.jpg)

注意<br>
LED には極性 (方向) があり、足が長い方 (アノード) を GPIO 出力ピンに、足が短い方 (カソード) を GND 側に繋いでください。抵抗は LED のどちらの足の側に繋いでも構いません。
<br>
[詳しくはこちらをご覧ください: LED の使い方](https://www.marutsu.co.jp/pc/static/large_order/led)
</p>

## Example を実行しよう
`/home/pi/Desktop/gc/gpio/LEDblink/index.html`ファイル (デスクトップの gc ディレクトリを開き、gpio, LEDblink ディレクトリを開くとあります) をダブルクリックで開くと、ブラウザが起動し、先ほど配線した LED が点滅しているはずです！
[詳しくはこの図をご覧ください。](imgs/section0/example-files.png)

[Lチカ成功動画はこちら](imgs/section0/L.gif)

[オンライン Example はこちら](https://r.chirimen.org/gpio-blink)

* [その他の GPIO の例(スイッチのオンオフや人感センサーを使うなど)はこちら](http://chirimen.org/chirimen-raspi3/gc/top/examples/#gpioExamples)

# 2. I2C 温度センサー使ってみよう
  
<p>
  <a href="imgs/section2/schematic.png">
    <img src="imgs/section2/schematic.png" alt="Browser" height="200" style="float:right;padding-left:2em;">
  </a>
  
## 配線

[右図](imgs/section2/schematic.png)と同じように配線してみよう。

配線が終わったら、ターミナルを起動して下記コマンドを入力してみてください。

` $ i2cdetect -y -r 1 `

 <a href="imgs/section2/ADT7410.png">
  <img src="imgs/section2/ADT7410.png" alt="Browser" height="200" style="float:right;padding-left:2em;margin-bottom:2em;">
 </a>
 
すると、[右図](imgs/section2/ADT7410.png)のような画面が表示されるはずです。
`i2cdetect`コマンドでは I2C バスに接続されている SlaveAddress を確認することができます。

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


* [その他の I2C の例(光センサー、測距センサー等)はこちら](http://chirimen.org/chirimen-raspi3/gc/top/examples/#i2cExamples)

I2C 温度計編はこれで終了です。

<!--
<div style="page-break-before:always"></div>
-->

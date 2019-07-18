
# Hello Real World

CHIRIMEN for Raspberry Pi 3 (Raspi3) を使用して L チカと I2C 温度計で気温を計測してみよう。


# 1. L チカをやってみよう

## 機材の準備
| CHIRIMEN for Raspi3 基本セット                                    | L チカで使用する部品                                     | I2C 温度計で使用する部品                                       |
| ----------------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------- |
| [![Hardware](imgs/section0/raspi3.jpg)](imgs/section0/raspi3.jpg) | [![LED_Bling](imgs/section0/l.jpg)](imgs/section0/l.jpg) | [![ADT7410](imgs/section2/parts.jpg)](imgs/section2/parts.jpg) |

- [Raspberry Pi 3 Model B](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/) もしくは [Raspberry Pi 3 Model B+](https://www.raspberrypi.org/products/raspberry-pi-3-model-b-plus/) × 1
- 5V3A 対応 AC アダプタ + micro B USB 電源ケーブル (例: [Raspberry Pi 用電源セット](https://www.physical-computing.jp/product/1171)) × 1 セット
- HDMI 入力つきのモニタ + HDMI ケーブル (モニタ側の端子の種類に注意) × 1 セット
- USB マウス、キーボード (日本語配列) × 1 セット
- micro SD カード (8GB 以上必須、Class 10 以上で高速なものを推奨) × 1
- ブレッドボード (通常サイズまたはミニサイズ) × 1
- リード付き LED × 1
- リード付き抵抗器 (150-470Ω) x 1
- ジャンパーワイヤー (オス-メス) x 2
- ジャンパーワイヤー (メス-メス) x 4
- [ADT7410 使用 I2C 温度センサーモジュール](http://akizukidenshi.com/catalog/g/gM-06675/) (ピンヘッダ半田付け済み)

## ボードと機材を配線しよう

<p>
  <a href="imgs/section0/example_LEDblink.png">
    <img src="imgs/section0/example_LEDblink.png" alt="Lチカに必要なパーツ一覧" height="250" style="float:right;padding-left:2em;">
  </a>

右図 (クリックすると拡大します) と同じように配線してみよう。
[配線した様子の写真はこちら](imgs/section0/h.jpg)

**注意**<br>
LED には極性 (方向) があり、足が長い方 (アノード) を GPIO 出力ピンに、足が短い方 (カソード) を GND 側に繋いでください。抵抗は LED のどちらの足の側に繋いでも構いません。[参考ページ: LED の使い方](https://www.marutsu.co.jp/pc/static/large_order/led)
</p>

## Example コードを実行しよう
`/home/pi/Desktop/gc/gpio/LEDblink/index.html` ファイル (デスクトップの gc ディレクトリから順に gpio, LEDblink ディレクトリを開いてください) をダブルクリックで開くとブラウザが起動し ([詳しくはこの図を参照](imgs/section0/example-files.png))、先ほど配線した LED が点滅し始めます！

[Lチカ成功動画はこちら](imgs/section0/L.gif)

[オンライン Example 版](https://r.chirimen.org/gpio-blink) でも試せます。同時に複数のタブで同じ GPIO ポートは操作できないので注意してください。

L チカが出来たら、スイッチのオンオフや人感センサーを使う場合など [他の GPIO の例]((http://chirimen.org/chirimen-raspi3/gc/top/examples/#gpioExamples) にもチャレンジしてみてください。

# 2. I2C 温度センサーを使ってみよう
  
[<img src="imgs/section2/schematic.png" alt="Browser" height="200" style="float:right;padding-left:2em;">](imgs/section2/schematic.png)
  
## ボードと機材を配線しよう

[右図](imgs/section2/schematic.png)と同じように配線してみよう。  
配線が終わったら、ターミナルを起動して下記コマンドを入力してみてください。

```sh
$ i2cdetect -y -r 1
```

[<img src="imgs/section2/ADT7410.png" alt="Browser" height="200" style="float:right;padding-left:2em;margin-bottom:2em;">](imgs/section2/ADT7410.png)
 
すると、[右図](imgs/section2/ADT7410.png) のような画面が表示されるはずです。
`i2cdetect` コマンドでは I2C バスに接続されている SlaveAddress (デバイス毎に割り当てられている番号) を確認できます。アドレスが表示されない場合は配線の間違いなどでセンサーを認識できていません。

## Example コードを実行しよう

`/home/pi/Desktop/gc/i2c/i2c-ADT7410/index.html` ファイルを開いて実際に動かしてみよう。ブラウザが起動し下記のような画面になります。

[<img src="imgs/section2/browser.png" alt="Browser" height="180" style="float:right;padding-left:2em;">](imgs/section2/browser.png)

右下に数字がでていますね。これが温度センサーから取得した現在の温度 (摂氏) の表示になります。

[オンライン Example](https://r.chirimen.org/i2c-adt7410) でも試せます。温度センサーが使えたら、光センサー、距離センサーなど [いろいな I2C デバイスの例](http://chirimen.org/chirimen-raspi3/gc/top/examples/#i2cExamples) にもチャレンジしてみてください。


<!--
<div style="page-break-before:always"></div>
-->

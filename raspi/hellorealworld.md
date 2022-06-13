
# Hello Real World

CHIRIMEN for Raspberry Pi (Raspi) を使って L チカ (LED を点滅) したりセンサー (温度計) を使ってみよう。

# 機材の準備
| CHIRIMEN for Raspi 基本セット                                                                                                                                                                              | L チカセット                                                                                                                                                                                 | 温度センサーセット                                                                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [<img src="https://res.cloudinary.com/chirimen/image/fetch/c_limit,f_auto,q_auto,w_400/https://tutorial.chirimen.org/raspi/imgs/section0/Raspi3.jpg" alt="基本セットの画像">](imgs/section0/Raspi3.jpg) | [<img src="https://res.cloudinary.com/chirimen/image/fetch/c_limit,f_auto,q_auto,w_400/https://tutorial.chirimen.org/raspi/imgs/section0/L.jpg" alt="L チカセット">](imgs/section0/L.jpg) | [<img src="https://res.cloudinary.com/chirimen/image/fetch/c_limit,f_auto,q_auto,w_400/https://tutorial.chirimen.org/raspi/imgs/section2/parts.jpg" alt="温度センサーセット">](imgs/section2/parts.jpg) |

- CHIRIMEN for Raspi 基本セット
  - Raspberry Pi と電源 × 1 セット
    - [3 Model B](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/) または [3 Model B+](https://www.raspberrypi.org/products/raspberry-pi-3-model-b-plus/) と 5V2.5A 以上の AC アダプタ + **micro B** USB ケーブル (例: [5V 3.0A Micro USB電源セット](https://www.physical-computing.jp/product/1171))
    - [4 Model B](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/) と 5V3A 以上の AC アダプタ + **type-C** USB ケーブル (例: [5V 3.0A Type-C電源セット](https://www.physical-computing.jp/product/2087))× 1
  - HDMI 入力モニタ + HDMI ケーブル (RasPi4 はボード側の端子が microHDMI であることに注意) × 1 セット
  - USB マウス、キーボード (日本語配列) × 1 セット
  - [CHIRIMEN 起動イメージ](sdcard.md)入りの micro SD カード (8GB 以上、Class 10 以上で高速なもの推奨) × 1
- L チカセット
  - ブレッドボード (通常サイズまたはミニサイズ) × 1
  - リード付き LED × 1
  - リード付き抵抗器 (150-470Ω) × 1
  - ジャンパーワイヤー (オス-メス) × 2
- 温(湿)度センサーセット
  - [温度センサー ADT7410](http://akizukidenshi.com/catalog/g/gM-06675/) または 温湿度センサー SHT30 × 1 (ピンヘッダ半田付け済み)
  - ジャンパーワイヤー (メス-メス) × 4

-----

# 1. GPIO: L チカしよう

## ボードと機材を配線しよう

[{% cloudinary small imgs/section1/k.png alt="Lチカ起動画面" class="right" style="width: 40%; margin: 0;" %}](imgs/section1/k.png)

[右図](imgs/section1/k.png)と同じように配線しよう (クリックすると拡大します。[写真はこちら](imgs/section0/h.jpg))。

**注意**: LED には極性 (方向) があり、**足が長い方 (アノード) を GPIO 出力ピンに**、足が短い方 (カソード) を GND 側に繋いでください。抵抗は LED のどちらの足の側に繋いでも構いません。[参考ページ: LED の使い方](https://www.marutsu.co.jp/pc/static/large_order/led)

## 実際に動かそう

`/home/pi/Desktop/gc/gpio/LEDblink/index.html` ファイル (デスクトップの gc フォルダから順に gpio, LEDblink フォルダを開く) をダブルクリックで開く ([手順説明図参照](imgs/section0/example-files.png)) を開くとブラウザが起動し、先ほど配線した LED が点滅 (Lチカ） し始めます！ [Lチカ成功動画参照](imgs/section0/L.gif) [オンライン版](https://r.chirimen.org/gpio-blink) でも同じコードを試せます。

**注意**: ローカル版とオンライン版など、**同時に複数のタブで同じ GPIO ポートは操作できません**。

続けてスイッチのオンオフや人感センサーを使う場合など [他の GPIO 利用例](https://r.chirimen.org/examples#gpioExamples) にもチャレンジしてみてください。詳しくはチュートリアルの [L チカしてみよう](section0.md) と [GPIO の使い方](section1.md) をご覧ください。

-----

[{% cloudinary small imgs/section2/schematic_warning.png alt="温度センサーの配線図" class="right" style="width: 35%; margin: 0 0 0 1em;" %}](imgs/section2/schematic_warning.png)

# 2. I2C: 温度センサーを使おう

## ボードと機材を配線しよう

温度センサー ADT7410 を用意した場合 [右図](imgs/section2/schematic_warning.png) と同じように配線します。配線(特に電源線)を間違えるとセンサーが高熱になり火傷・破損するので注意してください。

配線できたらターミナルを開いて下記コマンドを入力してみてください。

```sh
$ i2cdetect -y -r 1
```

[{% cloudinary small imgs/section2/ADT7410.png alt="i2cdetect実行例" class="right" style="width: 33%; margin: 0 2% 5px 1em;" %}](imgs/section2/ADT7410.png)

[右図](imgs/section2/ADT7410.png) のような画面が表示されるはずです。`i2cdetect` コマンドでは I2C バスに接続されている Slave アドレス (デバイス毎の割り当て番号) を確認できます。[i2cdetect WebI2C 版](http://r.chirimen.org/i2cdetect) でも確認できます。アドレスが表示されない場合は配線などの間違いがないか確認してください。

## 実際に動かそう

`/home/pi/Desktop/gc/i2c/i2c-ADT7410/index.html` ファイル。ブラウザが起動し[右図](imgs/section2/browser.png) のような画面になります。[オンライン版](https://r.chirimen.org/csb-adt7410) でも同じコードを試せます。

[{% cloudinary small imgs/section2/browser.png alt="温度センサー利用画面" class="right" style="width: 33%; margin: 0 2%;" %}](imgs/section2/browser.png)

画面下部に数字がでていますね。これが温度センサーから取得した現在の温度 (摂氏) の表示になります。

温度センサー ATD7410 ではなく温湿度センサー SHT30 を用意した場合、[配線図](https://chirimen.org/chirimen/gc/i2c/i2c-SHT30/schematic.png) を見ながら `/home/pi/Desktop/gc/i2c/i2c-SHT30/index.html` ファイルまたはその [オンライン版](https://r.chirimen.org/csb-sht30) で試してください。

温(湿)度センサーが使えたら、光センサー、距離センサーなど [いろいな I2C デバイスの例](https://r.chirimen.org/examples#i2cExamples) にもチャレンジしてみてください。詳しくはチュートリアルの [センサーを使ってみよう](section2.md) と [I2C の使い方](section3.md) をご覧ください。

-----

# 3. もっといろいろしてみよう

詳しく説明している [チュートリアル](readme.md) を読みつつコードを書き換えてみたり、[対応デバイス](/partslist) の説明と回路図、サンプルコードをまとめた [Example 集ページ](https://r.chirimen.org/examples) を参考に、色々なデバイスを繋いで自由なアイデアを形にしてみてください。

---
layout: tutorial
---

# 2. I2C センサーを使ってみよう (初めての I2C)

# 概要

CHIRIMEN for Raspberry Pi （以下「CHIRIMEN RasPi」）を使ったプログラミングを通じて、[Web I2C API](http://browserobo.github.io/WebI2C) の使い方を学びます。

## 前回までのおさらい

本チュートリアルを進める前に「[L チカしてみよう](section0.md)」と、「[GPIO の使い方](section1.md)」で CHIRIMEN RasPi の基本的な操作方法とプログラミング方法を確認しておいてください。

前回までのチュートリアルで学んだことは下記のとおりです。

- 利用可能な GPIO Port 番号・種類と位置は壁紙を見よう
- Web アプリからの GPIO の制御には [Web GPIO API](http://browserobo.github.io/WebGPIO) を利用する
- GPIO ポートは「出力モード」で LED の ON/OFF などが行え「入力モード」では GPIO ポートの状態を読み取れる
- デバイスの初期化などは非同期処理であり [async と await を用いて処理する](/js/async.md)

# 1. 準備

## 用意するもの

このチュートリアル全体で必要になるハードウエア・部品は下記の通りです。

- [L チカしてみよう](section0.md) に記載の「基本ハードウエア」
- ジャンパーワイヤー (メス-メス) x 4
- 温湿度センサー (SHT30 または SHT31、SHT35) x 1
  - あらかじめピンヘッダーが取り付けられているものを想定

# 2. I2C とは

[I2C](https://ja.wikipedia.org/wiki/I2C) とは 2 線式の同期式シリアル通信インタフェースです。「アイ・スクエア・シー」や「アイ・ ツー・シー」と読みます。I2C では SDA（シリアルデータ）と SCL（シリアルクロック）の 2 本の線で通信を行います。

{% cloudinary half imgs/section2/i2c-bus.png alt="i2c-bus" %}

上図のように、I2C の SDA、SCL は複数のデバイス間で共有され、これを「I2C バス」と言います。I2C ではマスターとスレーブの間で通信が行われます。常にマスター側からスレーブ側に要求が行われ、スレーブ側からマスター側へ要求を行うことはできません。

マスターは、スレーブが持つ「SlaveAddress (スレーブアドレス)」を指定して、特定のスレーブとの通信を行います。このため、同じ I2C バス上に同じ SlaveAddress のスレーブを繋ぐことはできません。

{% cloudinary imgs/section2/i2c-bus2.png alt="i2c-bus2" %}

通信するデバイス同士が同一基板上にない場合には、SDA、SCL の 2 本の通信線に加え電源や GND の線を加えて 4 本のケーブルを用いて接続するのが一般的です。電源電圧はデバイスに応じたものを繋ぐ必要があります。

#### ヒント: I2C について

I2C に関する詳細は下記をご参照ください。

- [I2C](https://ja.wikipedia.org/wiki/I2C) - Wikipedia
- I2C バス仕様書 最新版（[日本語](https://www.nxp.com/docs/ja/user-guide/UM10204.pdf)、[English](http://www.nxp.com/documents/user_manual/UM10204.pdf)）
- [I2C の使い方](http://www.picfun.com/i2cframe.html)（後閑哲也氏サイト)

## ポイント

I2C の概要として下記を押さえておきましょう。

- I2C バスを介して複数のデバイスが繋がる
- I2C デバイスにはマスターとスレーブがある
- I2C ではマスターからスレーブに対して通信要求が行われる
- I2C スレーブは SlaveAddress を持つ
- 同じ I2C バスに同じ SlaveAddress のデバイスは繋げない

# 3. 温湿度センサー (SHT30)を使ってみる

それでは実際に I2C に対応したデバイスを使ってみましょう。CHIRIMEN RasPi では [https://r.chirimen.org/examples](https://r.chirimen.org/examples#i2cExamples) にセンサーなど、いくつかの I2C デバイスを使うサンプルコードと Raspi との接続方法を示す回路図が提供されています。

この中から、SHT30 という温度センサーデバイスを使ってみたいと思います。

I2C バス上では、RasPi がマスター、SHT30 がスレーブになります。

## a. 部品と配線について

まずは、[配線図の画像](https://chirimen.org/chirimen/gc/i2c/i2c-SHT30/schematic.png) を開いてください。

![[配線図](https://chirimen.org/chirimen/gc/i2c/i2c-SHT30/schematic.png)](https://chirimen.org/chirimen/gc/i2c/i2c-SHT30/schematic.png)

{% cloudinary imgs/section2/sht3x.jpg alt="sht3x" %}

#### 注意: 配線時のポイント

配線の接続先やデバイスの基板の表裏など間違えないように注意してください。
配線を間違えると、故障や怪我などの原因になることがあります。おかしいなと思ったら、すぐに外して、配線をきちんと確認しましょう。

## b. 接続がうまくいったか確認する

`i2cdetect` を使って SlaveAddress を確認し、正しく接続・認識できているか確かめてみましょう。ターミナルを起動して下記コマンドを入力してみてください。

```sh
i2cdetect -y -r 1
```

正しく接続できていれば下記のように表示されるはずです。

```
$ i2cdetect -y -r 1
     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
00:          -- -- -- -- -- -- -- -- -- -- -- -- --
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
40: -- -- -- -- 44 -- -- -- -- -- -- -- -- -- -- --
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
70: -- -- -- -- -- -- -- --
```

`44`という表示が見えます。これは 16 進数表示であり、 `0x44` は SHT30 の SlaveAddress です。

念のためデータシートも確認してみましょう。

> | SHT3x-DIS     | I2C Address in Hex. representation | Condition                            |
> | ------------- | ---------------------------------- | ------------------------------------ |
> | I2C address A | 0x44 (default)                     | ADDR (pin 2) connected to logic low  |
> | I2C address B | 0x45                               | ADDR (pin 2) connected to logic high |
>
> **Table 8 I2C device addresses.**
>
> [SHT30 のデータシート p.9](https://www.sensirion.com/fileadmin/user_upload/customers/sensirion/Dokumente/2_Humidity_Sensors/Datasheets/Sensirion_Humidity_Sensors_SHT3x_Datasheet_digital.pdf)より引用

SHT30 は`0x44`がデフォルトの SlaveAddress で、ADDR ピンの HIGH/LOW により SlaveAddeess を `0x44` か `0x45` に変更できることがわかります。

### 認識されないとき

試しに I2C デバイスへの電源供給を止めて、認識されないケースをあえて確かめてみます。
一度 RasPi の 3.3V に接続している線を抜いて、もう一度 `i2cdetect -y -r 1` を実行してみてください。

```
$ i2cdetect -y -r 1
     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
00:          -- -- -- -- -- -- -- -- -- -- -- -- --
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
40: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
70: -- -- -- -- -- -- -- --
```

`44` という表示が見つからなくなりました。このことによって間違いなく SHT30 の SlaveAddress が `0x44` となっていることを確認できました。
確認できたら、先ほど外した 3.3V の線を戻して再び SHT30 に電源を供給して認識されるようにしておきましょう。

#### ヒント: WebI2C 版 i2cdetect

SlaveAddress を確認する i2cdetect には WebI2C を使って実装したものもあります。[https://r.chirimen.org/i2cdetect](https://r.chirimen.org/i2cdetect) をご利用ください。ただし、WebI2C 版 i2cdetect を利用中は他のページから I2C デバイスを操作できません。確認が済んだらタブを閉じるようにしましょう。

## c. example を実行してみる

配線と SlaveAddress が確認できましたので、さっそく動かしてみましょう。

[https://r.chirimen.org/examples](https://r.chirimen.org/examples#i2cExamples) にある [CodeSandbox で SHT30 のサンプルコード](https://r.chirimen.org/csb-sht30)を開きます。

{% cloudinary imgs/section2/codesandbox.png alt="codesandbox" %}

画面の数値が温度（℃）と湿度（％）になります。SHT30 のセンサーの部分に触ると、ゆっくりと温度が上がるはずです。

SHT30 は I2C という通信方式でセンサーデータを送出するデバイスです。この情報を Web I2C API 経由で Web アプリが読み取り、画面に情報を表示しているわけです。

# 4. 温湿度センサー (SHT30) サンプルコードを読んでみる

それでは、コードを見てみましょう。
`index.html`、`main.js` を見てみます。

## d-1. index.html

下記が index.html の中から主要な部分を抜き出したコードです。

<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2Fchirimen-oh%2Fchirimen%2Fblob%2F8d14c8a35319c1df287126eef1aa41c1f3b8c856%2Fgc%2Fi2c%2Fi2c-SHT30%2Findex.html%23L7-L9&style=github&showBorder=on&showFileMeta=on"></script>

最初に読み込んでいるのが `polyfill.js`。Web GPIO API の時に出てきたものと同じ `https://r.chirimen.org/polyfill.js` です。

次に読み込んでいるのが、`https://cdn.jsdelivr.net/npm/@chirimen/sht30`。このファイルは、Web I2C API を使って SHT30 との通信を行うためのドライバー (ハードウェアを操作する為のライブラリ) です。

最後に読み込んでいる `main.js` が、ドライバーライブラリを使ってこのアプリケーションの動作を記述している部分です。

## d-2. main.js

次に、`main.js` を見てみましょう。

<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2Fchirimen-oh%2Fchirimen%2Fblob%2F8d14c8a35319c1df287126eef1aa41c1f3b8c856%2Fgc%2Fi2c%2Fi2c-SHT30%2Fmain.js&style=github&showBorder=on&showFileMeta=on"></script>

ここで温度センサーの情報を定期的に取得し、画面に出力する処理が行われています。
少し詳し解説してみます。

### await navigator.requestI2CAccess()

Web I2C API を利用するための **`I2CAccess` インタフェースを取得** するための最初の API 呼び出しです。この関数も非同期処理ですので `await` で処理完了を待機し、その結果正しくインタフェースが取得されたら `i2cAccess` オブジェクトに保持します。

### i2cAccess.ports.get()

`I2CAccess.ports` は、利用可能な I2C ポートの一覧です。

<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2Fchirimen-oh%2Fchirimen%2Fblob%2F8d14c8a35319c1df287126eef1aa41c1f3b8c856%2Fgc%2Fi2c%2Fi2c-SHT30%2Fmain.js%23L7-L7&style=github&showBorder=on&showFileMeta=on"></script>

CHIRIMEN RasPi で利用可能な I2C ポート番号は`1`番だけです。ポート番号に`1` を指定して **`port` オブジェクトを取得** しています。

### new SHT30(port, 0x44)

ドライバーライブラリを使い **SHT30 を操作する為のインスタンスを生成** しています。

<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2Fchirimen-oh%2Fchirimen%2Fblob%2F8d14c8a35319c1df287126eef1aa41c1f3b8c856%2Fgc%2Fi2c%2Fi2c-SHT30%2Fmain.js%23L8-L8&style=github&showBorder=on&showFileMeta=on"></script>

### await sht30.init()

ドライバーライブラリのインスタンス (`sht30`) の `init()` メソッドを通じて **I2C ポートを開いてセンサーを初期化** しています。

<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2Fchirimen-oh%2Fchirimen%2Fblob%2F8d14c8a35319c1df287126eef1aa41c1f3b8c856%2Fgc%2Fi2c%2Fi2c-SHT30%2Fmain.js%23L9-L9&style=github&showBorder=on&showFileMeta=on"></script>

具体的に内部では、インスタンス生成時に指定した `port` オブジェクトと `slaveAddress(0x44)` を用いて `I2CPort.open()` を行なっています。`I2CPort.open()` が成功すると、`I2CSlaveDevice` という I2C ポートへデータ書き込みや読み込みなどを行うインタフェースが返されます。`I2CSlaveDevice` インタフェースは、ライブラリ内に保存され、その後の処理でこのインターフェイスを使って I2C デバイス SHT30 との通信が可能になります。

### await sht30.readData()

**SHT30 の仕様に基づくデータ読み出し処理です**。

<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2Fchirimen-oh%2Fchirimen%2Fblob%2F8d14c8a35319c1df287126eef1aa41c1f3b8c856%2Fgc%2Fi2c%2Fi2c-SHT30%2Fmain.js%23L12-L12&style=github&showBorder=on&showFileMeta=on"></script>

ドライバーライブラリ内部では、SHT30 から得られる温度と湿度それぞれ 16bit の数値を、温度・湿度の物理量の数値に変換して返却しています。

[ドライバーライブラリを GitHub で見てみる](https://github.com/chirimen-oh/chirimen-drivers/tree/master/packages/sht30/sht30.mjs)

### Web I2C API に着目して流れをまとめると

ドライバーライブラリの内部の処理も含めて流れをまとめると次の通りです。

1. **I2C の準備:** `await navigator.requestI2CAccess()` で I2CAccess インタフェースを取得
2. **ポートの準備:** `await i2cAccess.ports.get(1)` で、1 番ポートの `port` オブジェクトを取得
3. **デバイス初期化:** `await port.open(0x44)` で、SlaveAddress `0x44` 番の I2CSlaveDevice インタフェースを取得
4. **データ読み込み・書き込み:** デバイスに応じて値の取得と物理量への変換

この流れは他の I2C デバイスでも基本的に同様になります。

I2C デバイスにより変わるのは、`port.open()`に指定する SlaveAddress とデータ読み込み・書き込み処理になります。

CHIRIMEN RasPi ではいろいろなデバイスのサンプルコードとドライバーを回路図と共に [Examples として用意されています](https://r.chirimen.org/examples)。Examples にない I2C デバイスでも、上記流れを押さえておけば対応するコードを書くのはそれほど難しくありません。

新たな I2C デバイスへの対応方法については、「[CHIRIMEN で I2C デバイスを使ってみる](https://qiita.com/tadfmac/items/04257bfe982ba0f050bb)」も参考にしてください (CHIRIMEN RasPi ではなく、CHIRIMEN 専用ボード向けの記事ですが、Web I2C API への対応観点では同じ方法論で対応が可能です)

# まとめ

このチュートリアルでは下記について学びました。

- I2C の基礎知識
- i2cdetect を使った Raspi に接続された I2C モジュールの SlaveAddress 確認方法
- SHT30 温湿度センサーを取り扱う方法

このチュートリアルで書いたコードは以下のページで参照できます。

- [GitHub リポジトリで参照](https://github.com/chirimen-oh/chirimen/tree/master/gc/i2c/i2c-SHT30)
- [CodeSandbox で参照](https://r.chirimen.org/csb-sht30)

次の『[チュートリアル 3. I2C の使い方](section3.md)』では加速度センサーなど他のセンサーも触っていきます。

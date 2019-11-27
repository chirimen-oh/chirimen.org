---
layout: tutorial
---

# 2. I2C センサーを使ってみよう (初めての I2C)

# 概要

CHIRIMEN for Raspberry Pi （以下「CHIRIMEN RasPi」）を使ったプログラミングを通じて、[Web I2C API](http://browserobo.github.io/WebI2C) の使い方を学びます。

## 前回までのおさらい

本チュートリアルを進める前に「[L チカしてみよう](section0.md)」と、「[GPIO の使い方](section1.md)」で CHIRIMEN RasPi の基本的な操作方法とプログラミング方法を確認しておいてください。

前回までのチュートリアルで学んだことは下記のとおりです。

- 各種 example が `~/Desktop/gc/` 配下に配線図と一緒に置いてある ([オンライン版もある](https://r.chirimen.org/examples))
- 利用可能な GPIO Port 番号・種類と位置は壁紙を見よう
- Web アプリからの GPIO の制御には [Web GPIO API](http://browserobo.github.io/WebGPIO) を利用する
- GPIO ポートは「出力モード」で LED の ON/OFF などが行え「入力モード」では GPIO ポートの状態を読み取れる
- デバイスの初期化などは非同期処理であり [async と await を用いて処理する](appendix0.md)

# 1. 準備

## 用意するもの

このチュートリアル全体で必要になるハードウエア・部品は下記の通りです。

- [L チカしてみよう](section0.md) に記載の「基本ハードウエア」
- ジャンパーワイヤー (メス-メス) x 4
- [温度センサ (ADT7410)](http://akizukidenshi.com/catalog/g/gM-06675/) x 1

**注意:** 秋月電子の ADT7410 モジュール付属の細いピンヘッダはブレッドボードへの差し込み専用で、ジャンパーワイヤのソケットに刺すと接触不良となります。 **通常の太さのピンヘッダをハンダ付けしてください。**

# 2. I2C とは

[I2C](https://ja.wikipedia.org/wiki/I2C) とは 2 線式の同期式シリアル通信インタフェースです。「アイ・スクエア・シー」とか「アイ・ ツー・シー」などと読みます。I2C では SDA（シリアルデータ）と SCL（シリアルクロック）の 2 本の線で通信を行います。

{% cloudinary half imgs/section2/i2c-bus.png alt="i2c-bus" %}

上図のように、i2c の SDA、SCLは複数のモジュール間で共有され、これを「I2C バス」と言います。I2C ではマスターとスレーブの間で通信が行われます。常にマスター側からスレーブ側に要求が行われ、スレーブ側からマスター側へ要求を行うことはできません。

マスターは、スレーブが持つ「SlaveAddress (スレーブアドレス)」を指定して、特定のスレーブとの通信を行います。このため、同じ I2C バス上に同じ SlaveAddress のスレーブを繋ぐことはできません。

{% cloudinary imgs/section2/i2c-bus2.png alt="i2c-bus2" %}

通信するモジュール同士が同一基板上にない場合には、SDA、SCL の 2 本の通信線に加え電源や GND の線を加えて 4 本のケーブルを用いて接続するのが一般的です。電源電圧はデバイスに応じたものを繋ぐ必要があります。

詳細は下記をご参照ください。

- [I2C](https://ja.wikipedia.org/wiki/I2C) - Wikipedia
- I2C バス仕様書 最新版（[日本語](https://www.nxp.com/docs/ja/user-guide/UM10204.pdf)、[English](http://www.nxp.com/documents/user_manual/UM10204.pdf)）
- [I2C の使い方](http://www.picfun.com/i2cframe.html)（後閑哲也氏サイト)

ここでは I2C の概要として下記を押さえておきましょう。

- I2C には複数のモジュールが繋がる（I2C バス）
- I2C に繋がるモジュールにはマスターとスレーブがある
- I2C では必ずマスターからスレーブに対して通信要求が行われる
- I2C スレーブは SlaveAddress を持っている
- 同じ I2C バスに同じ SlaveAddress のスレーブは繋げない

# 3. 温度センサー(ADT7410)を使ってみる

それでは実際に I2C に対応したモジュールを使ってみましょう。CHIRIMEN RasPi では `/home/pi/Desktop/gc/i2c/` フォルダにセンサーなど、いくつかの I2C モジュールを使うサンプルがプリインストールされています。

この中から、ADT7410 という温度センサーモジュールを使ってみたいと思います。Raspberry Pi と ADT7410 との接続方法(回路図)と example コードは `/home/pi/Desktop/gc/i2c/i2c-ADT7410/` フォルダに格納されています。

> I2C バス上、RasPi がマスター、ADT7410 がスレーブになります。

## a. 部品と配線について

まずは、回路図の画像 `/home/pi/Desktop/gc/i2c/i2c-ADT7410/schematic.png` を開いてください。

{% cloudinary imgs/section2/parts.jpg alt="parts" %}

図を見ながらジャンパーワイヤ 4 本で ATD7410 を接続します。 **ADT7410 は 4 本のジャンパーピンを左右逆に繋いでしまうと、短時間で非常に高温になり故障するだけでなく火傷してしまいます** ので、配線には注意してください。

[{% cloudinary imgs/section2/schematic_warning.png alt="schematic" %}](imgs/section2/schematic_warning.png)

下記が RasPi 側の接続ピンの位置を拡大した図になります。間違えないよう接続してください。

{% cloudinary imgs/section2/I2C.png alt="I2Cで利用するピンの位置" %}

実際に配線した写真は以下の通りです。ADT7410 の表裏にも注意してください。

{% cloudinary imgs/section2/temperature_real.jpg alt="実際の配線写真" %}

## b. 接続がうまくいったか確認する

ここで、`i2cdetect` を使って ADT7410 が正しく接続・認識できているか、その SlaveAddress は何か確認してみましょう。ターミナルを起動して下記コマンドを入力してみてください。

`$ i2cdetect -y -r 1`

正しく接続できていれば (配線を誤ってセンサーを壊してない限り) 下記のような画面が表示されるはずです。

[{% cloudinary imgs/section2/ADT7410.png alt="ADT7410接続中" %}](imgs/section2/ADT7410.png)

`48`という表示が見えます。これは 16 進数表示であり `0x48` という意味です。`0x48` は、ADT7410 の SlaveAddress と思われますが、念のためデータシートも確認してみましょう。

> [ADT7410 のデータシート](http://www.analog.com/media/en/technical-documentation/data-sheets/ADT7410.pdf)

データシートの P.17 に「SERIAL BUS ADDRESS」の項があり、ここに SlaveAddress の記載があります。ADT7410 は`0x48`がデフォルトの SlaveAddress で、A0,A1 ピンの HIGH/LOW により SlaveAddeess の下位 2bit を変更できることがわかります。

{% cloudinary imgs/section2/I2CBusAddressOptions.png alt="I2C Bus Address Options" %}
(ADT7410 Data Sheet より抜粋)

[秋月電子の ADT7410 モジュール](http://akizukidenshi.com/catalog/g/gM-06675/) の場合、3.3V に接続している端子側に A0A1 と書かれた端子に半田を付けてショートさせることで SlaveAddress を変更できます。他のデバイスと SlaveAddress が被ってしまった場合や複数の温度センサーを同時に接続したい場合に変更してください。

試しに、一度 RasPi の 3.3V に接続している線を抜いて、もう一度 `i2cdetect -y -r 1` を実行してみてください。

{% cloudinary imgs/section2/ADT7410OFF.png alt="ADT7410の電源OFF" %}

`0x48` が見つからなくなりました。これで、間違いなく ADT7410 の SlaveAddress が`0x48`となっていることが確認できました。再度、先ほど外した 3.3V の線を戻して ADT7410 に電源を供給しておいてください。

SlaveAddress を確認する i2cdetect には WebI2C を使って実装したものもあります。`/home/pi/Desktop/gc/i2c/i2c-detect/index.html` を開くか [オンライン版](http://r.chirimen.org/i2cdetect) をご利用ください。但し、WebI2C 版の i2c-detect を利用中は他のページから I2C デバイスを操作できません。確認が済んだらタブを閉じるようにしましょう。

## c. example を実行してみる

配線と SlaveAddress が確認できましたので、さっそく動かしてみましょう。ADT7410 のためのサンプルコードは先ほどの配線図と同じフォルダ (`/home/pi/Desktop/gc/i2c/i2c-ADT7410/index.html`) に格納されています。ダブルクリックすると、ブラウザが起動し下記のような画面になります。

{% cloudinary imgs/section2/browser.png alt="browser" %}

画面の回路図の下の数値が温度（摂氏）になります。ADT7410 センサに触ると、ゆっくりと温度が上がるはずです。

ADT7410 は I2C という通信方式でセンサーデータを送出するモジュールです。この情報を Web I2C API 経由で Web アプリが読み取り、画面に情報を表示しているわけです。

# 4. 温度センサー (ADT7410) example のコードを読んでみる

それでは、コードを見てみましょう。

`/home/pi/Desktop/gc/i2c/i2c-ADT7410/` 配下の `index.html`、`main.js` をみてみます。

## d-1. index.html

下記が index.html の中から主要な部分を抜き出したコードです。

index.html

```html
  :
  <script src="node_modules/@chirimen-raspi/polyfill/polyfill.js"></script>
  <script src="node_modules/@chirimen-raspi/chirimen-driver-i2c-adt7410/ADT7410.js"></script>
  <script src="./main.js" defer></script>
  :
  <body>
    :
    <p id="head">TEST</p>
  </body>
```

まず最初に読み込んでいるのが `polyfill.js`。Web GPIO API の時に出てきた `https://r.chirimen.org/polyfill.js` と同じ Web GPIO API と Web I2C API の Polyfill です。

次に読み込んでいるのが、`ADT7410.js`。このファイルは、Web I2C API を使って ADT7410 との通信を行うためのドライバー (ハードウェアを操作する為のライブラリ) です。オンラインの最新版を使う場合は `https://r.chirimen.org/adt7410.js` を指定してください。

最後に読み込んでいる `main.js` が、ドライバーライブラリを使ってこのアプリケーションの動作を記述している部分です。

## d-2. main.js

次に、`main.js` を見てみましょう。

main.js

```js
{% include_relative examples/section2/s2_1.js -%}
```

ここで温度センサーの情報を定期的に取得し、画面に出力する処理が行われています。
少し詳し解説してみます。

### await navigator.requestI2CAccess()

Web I2C API を利用するための **`I2CAccess` インタフェースを取得** するための最初の API 呼び出しです。この関数も非同期処理ですので `await` で処理完了を待機し、その結果正しくインタフェースが取得されたら `i2cAccess` オブジェクトに保持します。

### i2cAccess.ports.get()

`I2CAccess.ports` は、利用可能な I2C ポートの一覧です。

```js
var port = i2cAccess.ports.get(1);
```

CHIRIMEN RasPi で利用可能な I2C ポート番号は`1`番だけです。ポート番号に`1` を指定して **`port` オブジェクトを取得** しています。

### var adt7410 = new ADT7410(port,0x48)

ドライバーライブラリを使い **ATD7410 を操作する為のインスタンスを生成** しています。

### await adt7410.init()

ドライバーライブラリのインスタンス (adt7410) の `init()` メソッドを通じて **I2C ポートを開いてセンサーを初期化** しています。

具体的に内部では、インスタンス生成時に指定した `port` オブジェクトと `slaveAddress(0x48)` を用いて `I2CPort.open()` を行なっています。`I2CPort.open()` が成功すると、`I2CSlaveDevice` という I2C ポートへデータ書き込みや読み込みなどを行うインタフェースが返されます。`I2CSlaveDevice` インタフェースは、ライブラリ内に保存され、その後の処理でこのインターフェースを使って I2C デバイスである adt7410 と通信可能になります。

### await adt7410.read()

**ADT7410 の仕様に基づくデータ読み出し処理です**。

内部では、`I2CSlaveDevice.read8()` という API を 2 回呼び出すことで、温度データの [MSB](https://ja.wikipedia.org/wiki/最上位ビット), [LSB](https://ja.wikipedia.org/wiki/最下位ビット) を 8bit ずつ読み出し、両方の読み出しが終わった時点で MSB と LSB を合成、16bit データとしたのちに、温度データに変換して返却しています。

### Web I2C API に着目して流れをまとめると

ADT7410 ドライバーライブラリの内部の処理をまとめると次の通りです。

1. **I2C の準備:** await navigator.requestI2CAccess() で I2CAccess インタフェースを取得
2. **ポートの準備:** i2cAccess.ports.get(1) で、1 番ポートの `port` オブジェクトを取得
3. **デバイス初期化:** await port.open(0x48) で、SlaveAddress 0x48 番の I2CSlaveDevice インタフェースを取得
4. **データ読み込み:** i2cSlave.read8() で 温度データ を読み込み (ADT7410 の場合、常に 2 回セット)

この流れは、ADT7410 以外の他の I2C デバイスでも基本的に同様になります。

I2C デバイスにより変わるのは、`port.open()`に指定する SlaveAddress と、[4.の実際の処理](#4温度センサーadt7410の値をドライバーを使わずに読むコードを書いてみる) になります。

CHIRIMEN RasPi ではいろいろなデバイスのサンプルコードとドライバーを回路図と共に [example として用意されています](https://r.chirimen.org/examples)。Examples に無い I2C デバイスでも、上記流れを押さえておけば対応するコードを書くのはそれほど難しくありません。

新たな I2C デバイスへの対応方法については、「[CHIRIMEN で I2C デバイスを使ってみる](https://qiita.com/tadfmac/items/04257bfe982ba0f050bb)」も参考にしてください (CHIRIMEN RasPi ではなく、CHIRIMEN 専用ボード向けの記事ですが、Web I2C API への対応観点では同じ方法論で対応が可能です)

# 5. 温度センサーの値をドライバーを使わずに読んでみる

それでは、ADT7410 ドライバー内部での処理の流れがだいたいわかったところで、ドライバーを使わずに自力で値を読み込むコードを一応書いてみましょう。

example と同じコードを書いても面白くないので、今回は`i2c-ADT7410.js`は使わずに、[JSFiddle](https://jsfiddle.net/) を使って一通り温度を読み込む処理を書いてみましょう。

もし、ブラウザで `/home/pi/Desktop/gc/i2c/i2c-ADT7410/index.html` 開いている場合、一度閉じておいてください。

## JSFiddle で HTML を書く

それでは始めましょう。JSFiddle の HTML ペインに Polyfill の読み込みと、温度表示用のタグだけ書きます。

```html
<div id="ADT7410value">---</div>
<script src="https://r.chirimen.org/polyfill.js"></script>
```

こんな感じで良いでしょう。

## JavaScript を書いてみる

次に JavaScript です。今回は定期的なポーリング処理が必要になるので、[GPIO の使い方 c. スイッチに反応するようにする (port.read()を使ってみる)](section1.md#c--portread) の時に書いたコードが参考になります。JSFiddle では `LOAD TYPE` の設定を `On Load` 以外にするのをお忘れなく。

```js
{% include_relative examples/section2/s2_2.js -%}
```

JavaScript を書いたら、`▷ Run` を押して実行してみましょう。温度センサーの値が表示されるはずです。

ADT7410 を指で触って温度が変わることを確認してみてください。

# まとめ

このチュートリアルでは下記について学びました。

- I2C の基礎知識
- i2cdetect を使った Raspi に接続された I2C モジュールの SlaveAddress 確認方法
- Web I2C API を使った処理の流れ
- ADT7410 温度センサーの制御方法

このチュートリアルで書いたコードは以下のページで参照できます:

- [GitHub リポジトリで参照](https://github.com/chirimen-oh/tutorials/tree/master/raspi/examples/section2)
- ブラウザで開くページ (各ステップ)
  - [ADT7410 温度センサー (ドライバを使ったコード例)](examples/section2/s2_1.html)
  - [ADT7410 温度センサー (ドライバを使わないコード例)](examples/section2/s2_2.html)

次の『[チュートリアル 3. I2C の使い方](section3.md)』では加速度センサーなど他のセンサーも触っていきます。

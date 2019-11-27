---
layout: tutorial
lang: ja
permalink: /raspi/section0
---

# L チカしてみよう (初めての GPIO)

# 1. はじめに

まずは CHIRIMEN for Raspberry Pi (以下 CHIRIMEN Raspi) を使って Web アプリから「L チカ」(LED を点けたり消したり) するプログラミングをしてみましょう。CHIRIMEN Raspi の基本的な操作方法を学び、実際に L チカするコードを読み書きします。

## CHIRIMEN for Raspberry Pi とは

CHIRIMEN for Raspberry Pi は、Raspberry Pi (以下 Raspi) で動作する IoT プログラミング環境です。[Web GPIO API](http://browserobo.github.io/WebGPIO) や [Web I2C API](http://browserobo.github.io/WebI2C) といった JavaScript でハードを制御する API を活用したプログラミングにより、Web アプリ上で Raspi に接続した電子パーツを直接制御できます。

{% cloudinary imgs/section0/CHIRIMENforRaspberryPi3.png alt="CHIRIMEN for Raspberry Pi の活用イメージ" %}

# 2. 事前準備 (機材確認)

## 用意するもの

### 基本ハードウエア

CHIRIMEN for Raspberry Pi の起動に最低限必要となる基本ハードウエアは次の通りです。

[{% cloudinary imgs/section0/Raspi3.jpg alt="Raspi の起動に必要なハードウエア一覧" %}](imgs/section0/Raspi3.jpg)

- Raspberry Pi本体 × 1
  - CHIRIMEN for Raspberry Pi は [Raspberry Pi 3 Model B](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/) 、 [Raspberry Pi 3 Model B+](https://www.raspberrypi.org/products/raspberry-pi-3-model-b-plus/) 、 [Raspberry Pi 4 Model B](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/) の3モデルに対応しています。
  - 補足: Raspberry Pi 3 Model A+ も対応見込みですが執筆時点では未検証です
- AC アダプタ + micro B USB 電源ケーブル × 1
  - 例: [Raspberry Pi 用電源セット(5V 3.0A) - Pi3 フル負荷検証済](https://www.physical-computing.jp/product/1171)
  - 注意: 一般的なスマホ向けのもの (1.0〜2.0A 程度の出力) でも起動できますが、公式には 3.0A を必要としており、PC からの給電などでは電力不足で性能低下や不安定な原因になります。microUSB 端子は強度が高くないためスイッチ付きで抜き差し回数を少なくできるケーブル付のものがオススメです
  - 注意2: Raspi 4 の一部初期ロットでは E-marked チップを搭載している USB(Type C) ケーブルでの給電ができないことが判明しています。詳しくは[こちら](https://jp.techcrunch.com/2019/07/10/2019-07-10-the-raspberry-pi-4-doesnt-work-with-all-usb-c-cables/)をご覧ください。
- HDMI 入力つきのモニタ (720P の解像度に対応したもの) × 1
  - モバイルモニタでも文字が見やすいようデフォルト解像度を 720p としています
- HDMI ケーブル (モニタ側の端子と合うものを選んでください) × 1
  - Raspi 4 では 通常の HDMI 端子 (HDMI Type A) ではなく、マイクロ HDMI 端子 (HDMI Type D) が搭載されているため、対応するケーブルにご注意ください。
- USB マウス × 1
- USB キーボード (日本語配列) × 1
  - 初期設定の日本語 (JIS) 配列以外のキーボードを利用する際は [raspi-config コマンド](http://igarashi-systems.com/sample/translation/raspberry-pi/configuration/raspi-config.html) で変更してください
- [CHIRIMEN 起動イメージ](sdcard.md)入りの micro SD カード (8GB 以上必須、Class 10 以上で高速なものを推奨) × 1

### L チカに必要となるパーツ

基本ハードウエアに加え「L チカ (えるちか)」を実施するには下記パーツも追加で必要です。

{% cloudinary imgs/section0/L.jpg alt="Lチカに必要なパーツ一覧" %}

- ブレッドボード × 1
- リード付き LED × 1
- リード付き抵抗器 (150-470Ω ※お使いの LED により。スターターキットは 150Ω を使用します。) × 1
- ジャンパーワイヤー (オス-メス) x 2

## SD カードへ CHIRIMEN for Raspberry Pi 環境を書き込む

起動する前に、SD カードへ CHIRIMEN Raspi 環境（[起動イメージファイル](https://r.chirimen.org/sdimage)） を書き込んでおく必要があります。

手順は [CHIRIMEN for Raspberry Pi 3 の SD カードを作成する](sdcard.md) を参照してください。
- raspi 4 対応版については現在準備中です

# 3. CHIRIMEN for Raspberry Pi を起動してみよう

## 接続方法

機材が揃ったら、いよいよ Raspi を接続して起動してみましょう。基本ハードウエアを下図のように接続してください。(Raspi への電源ケーブルの接続は最後にしましょう)
- Raspi 4 では電源ケーブルが USB Type C ケーブルとなりますが、基本的な接続方法は以下と同様です

[{% cloudinary imgs/section0/h2.jpg alt="接続方法" %}](imgs/section0/h2.jpg)

もしよくわからない場合には、[Raspberry Pi Hardware Guide](https://www.raspberrypi.org/learning/hardware-guide/) なども参照してみると良いでしょう。

電源ケーブルの接続、あるいは、スイッチ付きケーブルの場合はスイッチの ON により Raspi が起動します。

## 起動確認

電源を入れると Raspi の microSD コネクタ横の赤い LED が点灯し、OS の起動後、下記のようなデスクトップ画面が表示されたら CHIRIMEN Raspi の起動に成功しています (OS イメージや画面サイズにより細部は異なることがあります)。おめでとうございます！

<!-- TODO: デスクトップ画面のスクリーンショット古い -->
{% cloudinary imgs/screenshots/20191002_desktop.png alt="CHIRIMEN for Raspberry Pi desktop 画面" %}

## 残念ながら上記画面が表示されなかった！？

違う画面が表示される場合には、CHIRIMEN Raspi とは異なる SD カードで起動された可能性があります。その場合は、[SD カードの作成手順](sdcard.md) に従って CHIRIMEN 用のイメージを作成してください。

電源を入れても何も画面に映らないような場合には、配線が誤っている可能性があります。配線を再度確認してみましょう。LED が点灯していない場合、AC アダプタまで電気が来ていないかも知れません。[トラブルシューティングページ](debug.md) も参考にしてください。

## WiFi の設定

デスクトップ画面が表示されたら、さっそく WiFi を設定して、インターネットに繋げてみましょう。
CHIRIMEN Raspi では、ネットワークに繋がずローカルファイルでプログラミングも可能ですが、[JS Bin](https://jsbin.com/) や [JSFiddle](https://jsfiddle.net/) あるいは [CodeSandbox](https://codesandbox.io/) などブラウザ上で動くエディタを活用することで、より簡単にプログラミングできます。

ぜひ、最初にインターネットに接続しておきましょう。WiFi の設定は、タスクバーの右上の WiFi アイコンから行えます。

{% cloudinary imgs/section0/wifi.png alt="WiFi設定" %}

# 4. 「L チカ」をやってみよう

無事、Raspi の起動と WiFi の設定が行えたら、いよいよ L チカに挑戦してみましょう。

## そもそも「L チカ」って何？

「L チカ」とは、LED を点けたり消したりチカチカ点滅させることです。今回は「LED を点ける」「LED を消す」をプログラムで繰り返し実行することで実現します。

- 参考：[LED（発光ダイオード）](https://ja.wikipedia.org/wiki/%E7%99%BA%E5%85%89%E3%83%80%E3%82%A4%E3%82%AA%E3%83%BC%E3%83%89)

## 配線してみよう

LED を点けたり消したりするためには、Raspi と正しく配線する必要があります。
LED は 2 本のリード線が出ていますが、長い方がアノード（+側）、短い側がカソード（-側）です。

L チカのための配線図は、基本的な作例集（examples）と一緒に、下記にプリインストールされています。

```
/home/pi/Desktop/gc/gpio/LEDblink/schematic.png
```

{% cloudinary imgs/section0/example-files.png alt="example-files" %}

それでは、まず先に回路図の画像 `schematic.png` をダブルクリックして見てみましょう。

{% cloudinary imgs/section0/example_LEDblink.png alt="example: LEDblink の配線図" %}

LED のリード線の方向に注意しながら、この図の通りにジャンパーワイヤやブレッドボードを使って配線してみましょう。

配線図では LED の下側のリード線が折れ曲がり長い方がアノード (+側) です。`schematic.png`で使用されている抵抗は"120Ω"です。使用する抵抗は、LED にあったものを使用してください。

実際に配線してみると、こんな感じになりました。

{% cloudinary imgs/section0/h.jpg alt="配線してみました" %}

### 参考

- [ブレッドボードの使い方](https://www.sunhayato.co.jp/blog/2015/03/04/7)
- [LED の使い方](https://www.marutsu.co.jp/pc/static/large_order/led)
- [抵抗値の読み方](http://www.jarl.org/Japanese/7_Technical/lib1/teikou.htm)
- [Raspberry Pi の GPIO](https://tool-lab.com/make/raspberrypi-startup-22/)
- [テスターを使って抵抗値を確かめる](http://startelc.com/elcLink/tester/elc_nArtcTester2.html#chapter-2)

## example を実行してみる

配線がうまくできたら、さっそく動かしてみましょう。
L チカのためのサンプルコードは先ほどの配線図と同じフォルダに格納されています。

```
/home/pi/Desktop/gc/gpio/LEDblink/index.html
```

`index.html` をダブルクリックすると、ブラウザが起動し、先ほど配線した LED が点滅しているはずです！

## ブラウザ画面

[{% cloudinary imgs/section0/browser.png alt="browser" %}](imgs/section0/browser.png)

## L チカの様子

{% cloudinary imgs/section0/L.gif alt="Lチカ成功" %}

<!-- TODO: ファイルサイズの小さい WebM 動画などに -->

L チカに成功しましたか？！

## うまくいかなかったら?

配線に誤りがないか (特にジャンパーワイヤを指す Raspi 側のピン)、複数のタブで同じ L チカコードを開いていないかなどを確認しても原因が分からない場合、`F12` キーやブラウザのメニュー → 「その他のツール」→「デベロッパーツール」で `Console` を開いて何かエラーメッセージが出ていないか確認してください。詳しくは [トラブルシューティングページ](debug.md) を参考にしてください。

# 5. コードを眺めてみよう

さきほどは、L チカをデスクトップにある example から実行してみました。実は、CHIRIMEN Raspi にはもうひとつ、「オンラインの example」が用意されており、オンライン版ではコードを書き換えながら学習を進められます。

今度はオンラインの example からさきほどと同じ L チカを実行してコードを眺めてみましょう。

その前に一つ注意です。CHIRIMEN Raspi での GPIO などの操作には排他制御があり、同一の GPIO ピンを複数のプログラムから同時操作はできません。同一ページもしくは同一ピンを使うページを同時に開くと正しく動作しません。

**オンラインの example を起動する前に、必ず先ほど開いた `file:///home/pi/Desktop/gc/gpio/LEDblink/index.html` のブラウザウィンドウ (タブ) は閉じてください。先に既存ウィンドウを閉じておかないと、サンプルが正常に動作しなくなります。**

既に開いているウィンドウを確実に閉じるには、一度ブラウザを閉じてから、再度ブラウザを起動すると確実です (通常はタブだけ消しても十分です)。

{% cloudinary imgs/section0/b.png alt="ブラウザの再起動" %}

## オンラインの example の実行

それでは、さっそくオンラインの example を実行してみます。
配線は、さきほどのままで OK です。

[オンラインの example へのリンク](https://r.chirimen.org/gpio-blink)は、ブラウザを起動後、ブックマークバーにある[Examples](https://r.chirimen.org/examples)のページの中にあります。

{% cloudinary imgs/section0/gpio-blink-online-example.png alt="https://r.chirimen.org/gpio-blink へのリンク" %}

そのまま起動すると下記のような画面になります。(下記スクリーンショットはアクセス直後の画面から JS Bin のタイトルバー部の「Output」タブを 1 回押して非表示にしています)

<!-- TODO: 古いコードの画像になってる -->

{% cloudinary imgs/section0/JSBinLexample.png alt="JS BinでのLチカexample画面" %}

それでは、コードを眺めてみましょう。

## HTML

```html
{% include_relative examples/section0/s0.html -%}
```

`polyfill.js` という JavaScript ライブラリを読み込んでいます。これは [Web GPIO API](http://browserobo.github.io/WebGPIO) と、[Web I2C API](http://browserobo.github.io/WebI2C) という W3C でドラフト提案中の 2 つの API への [Polyfill (新しい API を未実装のブラウザでも同じコードが書けるようにするためのライブラリ)](https://developer.mozilla.org/ja/docs/Glossary/Polyfill) で、最初に読み込むとそれ以降のコードで GPIO や I2C を操作する JavaScript API が使えるようになります。

** `/home/pi/Desktop/gc/gpio/LEDblink/index.html` などの example では、インターネット未接続時にも動作するよう Polyfill を含めたコード一式をローカルにコピーしてあるので `node_modules/@chirimen-raspi/polyfill/polyfill.js` のようなパスで読み込みます。オンラインにホストされている最新版を読み込む場合には `https://r.chirimen.org/polyfill.js` を指定します。**

## JavaScript

```javascript
{% include_relative examples/section0/s0.js -%}
```

### 注記

CHIRIMEN Raspi はウェブブラウザをプログラムの実行環境として用いてシステムを構築します。ウェブブラウザが実行できるプログラムのプログラミング言語は JavaScript です。JavaScript を学んだことのない人は、まず[こちらの資料「JavaScript 1 Day 講習」](https://r.chirimen.org/1dayjs)を履修しましょう。

## 非同期処理について

物理デバイス制御やネットワーク通信などを行う際には、応答待ち中にブラウザが停止しないよう非同期処理を使う必要があります。
本チュートリアルではこれを [async 関数](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/async_function) で記述しています。非同期処理を知らない人や async 関数を使ったことがない人は、必要に応じて[こちらの資料「非同期処理 (async await 版)」](appendix0.md) も参照してください。

非同期処理を使いこなすのは難しいですが、本チュートリアルでは次のルールでコードを書けば大丈夫です:

- **非同期関数の呼び出し時には前に `await` を付けて呼び出す**
  - 非同期関数呼び出し前に `await` を付けるとその処理が終わってから次のコードが実行されます
  - GPIO や I2C の初期化、ポートの設定などは非同期関数なので `await` キーワードを付けて呼び出します
- **非同期処理を含む関数は前に `async` を付けて非同期関数として定義する**
  - `async function 関数名() { ... }` のように頭に `async` を付けると非同期関数となります

非同期関数を `await` なしで呼び出すと返り値は Promise オブジェクトとなるため Promise について理解しておかなければ返り値の判断や実行順序が入れ替わって意図せぬ挙動になります。例えば、ポートの初期化を `await` なしで呼び出すと、初期化完了前に次の行の処理を続け、初期化未完了のハードを操作しようとして失敗したり、ネットワーク通信完了前に受信データを読みだそうとして失敗します。

ハードを触るときは常に非同期呼び出しをする (その処理を含む関数も入れ子で非同期呼び出しする) と決めておけば迷うことなく、コードの実行順序も上から下に見たとおりの順番で実行されて読みやすくなります。

### Note:

本チュートリアルで非同期処理を async 関数に統一している理由は、記述がシンプルで初心者も読み書きしやすいコードになるからです。この機能は比較的新しい JavaScript 言語機能 (ECMASCript 2017) ですが、Raspi 上で使う上で問題はありません ([様々なウェブブラウザでのサポート状況](https://caniuse.com/#feat=async-functions))。

## 処理の解説

今回の JavaScript ファイルで、最初に呼び出されるコードは `await navigator.requestGPIOAccess()` です。
ここで先ほど出て来た [Web GPIO API](http://browserobo.github.io/WebGPIO) を使い、`gpioAccess` という GPIO にアクセスするためのインタフェースを取得しています。

**関数の呼び出しに `await` 接頭詞を付けることに注意してください。** この関数は非同期関数ですが、その処理の完了を待ってから次の処理をする必要があります。そして `await` 接頭詞を使うので、それを含む関数(`mainFunction()`)は async 接頭詞を付けて非同期関数として定義しなければなりません。

コードを読み進める前に、ここで少し GPIO について記載しておきたいと思います。

## GPIO とは

[GPIO](https://ja.wikipedia.org/wiki/GPIO)は、「General-purpose input/output」の略で汎用的な入出力インタフェースのことです。

Raspi に実装されている 40 本のピンヘッダから GPIO を利用することができます。（40 本全てのピンが GPIO として利用できるわけではありません）

CHIRIMEN Raspi では Raspi が提供する 40 本のピンヘッダのうち、下記緑色のピン(合計 17 本)を Web アプリから利用可能な GPIO として設定しています。

Raspi の GPIO 端子は、GND 端子との間に、0V もしくは 3.3V の電圧を印加(出力)したり、逆に 0V もしくは 3.3V の電圧を検知(入力)したりすることができます。LED は数 mA の電流を流すことによって点灯できる電子部品のため、印加する電圧を 3.3V(点灯)、0V(消灯) と変化させることで L チカが実現できるのです。

詳しくは[こちらのサイトの解説](https://tool-lab.com/make/raspberrypi-startup-22/)などを参考にしてみましょう。

{% cloudinary imgs/section0/Raspi3PIN.png alt="Raspi PIN配置図" %}

## GPIOPort の処理

さて、コードに戻りましょう。 **`var port = gpioAccess.ports.get(26);` で GPIO の 26 番ポートにアクセスするためのオブジェクト** を取得しています。続いて、 **`await port.export("out")` で GPIO の 26 番を「出力設定」にしています**。これにより LED への電圧の切り替えが可能になっています。

最後に `await sleep(1000)` で 1000ms = 1 秒 待機させて無限ループをつくることで、 1 秒毎に `port.write(1)` と `port.write(0)` を交互に呼び出し、GPIO 26 番に対する電圧を 3.3V → 0V → 3.3V → 0V と繰り返し設定しています。

LED は一定以上の電圧 (赤色 LED だと概ね 1.8V 程度、青色 LED だと 3.1V 程度) 以上になると点灯する性質を持っていますので、3.3V になったときに点灯、0V になったときに消灯を繰り返すことになります。

まとめると下図のような流れになります。

{% cloudinary imgs/section0/s.png alt="シーケンス" %}

## example を修正してみよう

JS Bin の JavaScript のペイン (コードが表示されているところ) をクリックするとカーソルが表示されコード修正も可能です。
試しにいろいろ変えてみましょう。

- 点滅周期を早くしたり遅くしたりしてみる
- 点灯する時間と消灯する時間を変えてみる
- GPIO ポートを他のポートに変えてみる (ジャンパーワイヤも指定番号の GPIO ピンに配線する)
- index.html にボタンなどのインターフェースを作ってみて、押すと LED が反応するようにする
- などなど...

# まとめ

このチュートリアルでは、下記を実践してみました。

- CHIRIMEN for Raspberry Pi の起動
- L チカのサンプルを動かしてみた
- JS Bin で L チカのコードを変更してみた

このチュートリアルで書いたコードは以下のページで参照できます:

- [GitHub リポジトリで参照](https://github.com/chirimen-oh/tutorials/tree/master/raspi/examples/section0)
- ブラウザで開くページ
  - [L チカコード (画面は空白です)](examples/section0/s0.html)

次の『[チュートリアル 1. GPIO の使い方](section1.md)』では GPIO の入力方法について学びます。

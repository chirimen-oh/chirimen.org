---
layout: tutorial
lang: ja
permalink: /raspi/section0
---

# L チカしてみよう (初めての GPIO)

# 1. はじめに

まずは CHIRIMEN for Raspberry Pi (以下 CHIRIMEN Raspi) を使って Web アプリから「L チカ」(LED を点けたり消したり) するプログラミングをしてみましょう。CHIRIMEN Raspi の基本的な操作方法を学び、実際に L チカするコードを読み書きします。

## CHIRIMEN for Raspberry Pi とは

CHIRIMEN for Raspberry Pi は、Raspberry Pi (以下 Raspi) で動作する IoT プログラミング環境です。[Web GPIO API](http://browserobo.github.io/WebGPIO) や [Web I2C API](http://browserobo.github.io/WebI2C) といった JavaScript でハードウェアを制御する API を活用したプログラミングにより、Web アプリ上で Raspi に接続した電子パーツを直接制御できます。

{% cloudinary imgs/section0/CHIRIMENforRaspberryPi3.png alt="CHIRIMEN for Raspberry Pi の活用イメージ" %}

# 2. 事前準備 (機材確認)

## 用意するもの

### 基本ハードウェア

CHIRIMEN for Raspberry Pi の起動に最低限必要となる基本ハードウェアは次の通りです。

[{% cloudinary imgs/section0/Raspi3.jpg alt="Raspi の起動に必要なハードウェア一覧" %}](imgs/section0/Raspi3.jpg)

- Raspberry Pi 本体 × 1
  - CHIRIMEN for Raspberry Pi は [Raspberry Pi 3 Model B](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/) 、 [Raspberry Pi 3 Model B+](https://www.raspberrypi.org/products/raspberry-pi-3-model-b-plus/) 、 [Raspberry Pi 4 Model B](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/) の 3 モデルに対応しています。
  - 補足: Raspberry Pi 3 Model A+ も対応見込みですが執筆時点では未検証です
- AC アダプタ + micro B USB 電源ケーブル または Type-C USB 電源ケーブル × 1
  - 例: [Raspberry Pi 3 用電源セット(5V 3.0A) - Pi3 フル負荷検証済](https://www.physical-computing.jp/product/1171)
  - 例: [Raspberry Pi 4 用電源セット(5V 3.0A) - Pi4 フル負荷検証済](https://www.physical-computing.jp/product/2088)
  - 注意 1: 一般的なスマホ向けのもの (1.0〜2.0A 程度の出力) でも起動できますが、公式には 3.0A を必要としており、PC からの給電などでは電力不足で性能低下や不安定な原因になります。microUSB 端子は強度が高くないためスイッチ付きで抜き差し回数を少なくできるケーブル付のものがオススメです
  - 注意 2: Raspi 4 の一部初期ロットでは E-marked チップを搭載している USB(Type C) ケーブルでの給電ができないことが判明しています。詳しくは[こちら](https://jp.techcrunch.com/2019/07/10/2019-07-10-the-raspberry-pi-4-doesnt-work-with-all-usb-c-cables/)をご覧ください。
- HDMI 入力つきのモニタ × 1
- HDMI ケーブル (モニタ側の端子と合うものを選んでください) × 1
  - RasPi 4 では 通常の HDMI 端子 (HDMI Type A) ではなく、マイクロ HDMI 端子 (HDMI Type D) が搭載されているため、対応するケーブルにご注意ください。
- USB マウス × 1
- USB キーボード (日本語配列) × 1
  - 初期設定の日本語 (JIS) 配列以外のキーボードを利用する際は [raspi-config コマンド](http://igarashi-systems.com/sample/translation/raspberry-pi/configuration/raspi-config.html) で変更してください
- [CHIRIMEN 起動イメージ](sdcard.md)入りの micro SD カード (8GB 以上必須、Class 10 以上で高速なものを推奨) × 1

#### ヒント: Raspberry Pi とヒートシンク

[{% cloudinary imgs/section0/raspberry-pi-4-installation-of-heat-sink.png alt="ヒートシンクの取り付け" %}](imgs/section0/raspberry-pi-4-installation-of-heat-sink.png)

Raspberry Pi (特に Raspi 4) の CPU は非常に高温になるため冷却しなければなりません (冷却不足では高負荷時に CPU 速度が大幅に低下します)。
あらかじめ CPU には熱伝達シールでヒートシンクを取り付けておきましょう。

### L チカに必要となるパーツ

基本ハードウェアに加え「L チカ (えるちか)」を実施するには下記パーツも追加で必要です。

{% cloudinary imgs/section0/L.jpg alt="Lチカに必要なパーツ一覧" %}

- ブレッドボード × 1
- リード付き LED × 1
- リード付き抵抗器 (150-470Ω ※お使いの LED により。スターターキットは 150Ω を使用します。) × 1
- ジャンパーワイヤー (オス-メス) x 2

## SD カードへ CHIRIMEN for Raspberry Pi 環境を書き込む

起動する前に、SD カードへ CHIRIMEN Raspi 環境（[起動イメージファイル](https://r.chirimen.org/sdimage)）を書き込んでおく必要があります。

手順は [CHIRIMEN for Raspberry Pi の SD カードを作成する](sdcard.md) を参照してください。

# 3. CHIRIMEN for Raspberry Pi を起動してみよう

## 接続方法

機材が揃ったら、いよいよ Raspi を接続して起動してみましょう。基本ハードウェアを下図のように接続してください。(Raspi への電源ケーブルの接続は最後にしましょう)

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

電源を入れても何も画面に映らないような場合は配線も再確認してみましょう。Raspi ボード上の LED が点灯していない場合、AC アダプタまで電気が来ていないかも知れません。[トラブルシューティングページ](debug.md) も参考にしてください。

## WiFi の設定

画面が無事表示されたら、さっそく WiFi を設定して、インターネットに繋げましょう。
CHIRIMEN Raspi では、ネットワークに繋がずローカルファイルでプログラミングも可能ですが、[CodeSandbox](https://codesandbox.io/) などブラウザ上で動くエディターを活用することで、より簡単にプログラミングできます。

ぜひ、最初にインターネット接続しておきましょう。WiFi の設定は、タスクバーの右上の WiFi アイコンから行えます。

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

配線図では LED の下側のリード線が折れ曲がり長い方がアノード (+側) です。`schematic.png`で使用されている抵抗は "120Ω" ですが、LED に合わせたものであれば他の抵抗値でも構いません。抵抗値によって明るさも変わります。

{% cloudinary imgs/section0/h.jpg alt="配線してみた様子" %}

### 参考

ブレッドボード、LED や回路の基本はこちらも参考になります:

- [ブレッドボードの使い方](https://www.sunhayato.co.jp/blog/2015/03/04/7)
- [LED の使い方](https://www.marutsu.co.jp/pc/static/large_order/led)
- [抵抗値の読み方](http://www.jarl.org/Japanese/7_Technical/lib1/teikou.htm)
- [Raspberry Pi の GPIO](https://tool-lab.com/make/raspberrypi-startup-22/)
- [テスターを使って抵抗値を確かめる](http://startelc.com/elcLink/tester/elc_nArtcTester2.html#chapter-2)

## サンプルコードを実行してみる

配線ができたら、動かしてみましょう。 L チカのサンプルコードは配線図と同じフォルダに格納されています。

```
/home/pi/Desktop/gc/gpio/LEDblink/index.html
```

`index.html` をダブルクリックすると、ブラウザが起動し、先ほど配線した LED が点滅しはじめます！

## ブラウザ画面

[{% cloudinary imgs/section0/browser.png alt="browser" %}](imgs/section0/browser.png)

## L チカの様子

{% cloudinary imgs/section0/L.gif alt="Lチカ成功" %}

<!-- TODO: ファイルサイズの小さい WebM 動画などに -->

L チカに成功しましたか？！

## うまくいかなかったら?

配線に誤りがないか (特にジャンパーワイヤを刺す Raspi 側のピン)、複数のタブで同じ L チカコードを開いていないかなど確認してください。原因が分からない場合、`F12` キーやブラウザのメニュー → 「その他のツール」→「デベロッパーツール」で `Console` を開いてエラーメッセージが出ていないか確認してください。詳しくは [トラブルシューティングページ](debug.md) を参考にしてください。

# 5. コードを眺めてみよう

さきほどは、L チカをデスクトップ (オフライン・ローカル) の example から実行してみました。実は、CHIRIMEN Raspi にはもうひとつ、「オンラインの example」が用意されており、オンライン版ではブラウザ上でコードを書き換えながら試せます。

今度はオンラインの example からさきほどと同じ L チカを実行してコードを眺めてみましょう。

#### 注意: 複数のブラウザウィンドウやタブでは実行できない

CHIRIMEN Raspi での GPIO などの操作には排他制御があり、同一の GPIO ピンを複数のプログラム (ページ・タブ) から同時操作できません。同一ページもしくは同一ピンを使うページを同時に開くと正しく動作しません。

**サンプルコードを実行する前に、必ず先ほど開いた `file:///home/pi/Desktop/gc/gpio/LEDblink/index.html` のブラウザウィンドウ (タブ) は閉じてください。**

{% cloudinary imgs/section0/b.png alt="ブラウザの再起動" %}

## サンプルコードの実行

それでは、さっそくサンプルコードを実行してみます。配線は、さきほどのままで OK です。

[サンプルコードへのリンク](https://r.chirimen.org/csb-gpio-blink)は、ブラウザを起動後、ブックマークバーにある[Examples](https://r.chirimen.org/examples)のページ中にあります。

{% cloudinary imgs/section0/link-to-led-blink-csb.png alt="https://r.chirimen.org/csb-gpio-blink へのリンク" %}

そのまま起動すると下記のような画面になります。

{% cloudinary imgs/section0/led-blink-csb.png alt="CodeSandbox でのLチカサンプルコード画面" %}

それでは、コードを眺めてみましょう。

## HTML

<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2Fchirimen-oh%2Fchirimen%2Fblob%2F5c520c21820304901553f2adf22da1012f54722d%2Fgc%2Fgpio%2FLEDblink%2Findex.html&style=github&showBorder=on&showFileMeta=on"></script>

ポイントは `<script ...></script>` の部分です。

<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2Fchirimen-oh%2Fchirimen%2Fblob%2F5c520c21820304901553f2adf22da1012f54722d%2Fgc%2Fgpio%2FLEDblink%2Findex.html%23L7-L8&style=github&showBorder=on&showFileMeta=on"></script>

`polyfill.js` という JavaScript ライブラリを読み込んでいます。これは [Web GPIO API](http://browserobo.github.io/WebGPIO) と、[Web I2C API](http://browserobo.github.io/WebI2C) という W3C でドラフト提案中の 2 つの API への [Polyfill (新しい API を未実装のブラウザでも同じコードが書けるようにするためのライブラリ)](https://developer.mozilla.org/ja/docs/Glossary/Polyfill) で、最初に読み込むとそれ以降のコードで GPIO や I2C を操作する JavaScript API が使えるようになります。

次の行にある `main.js` は、JavaScript のプログラム本体です。

## JavaScript

<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2Fchirimen-oh%2Fchirimen%2Fblob%2F5c520c21820304901553f2adf22da1012f54722d%2Fgc%2Fgpio%2FLEDblink%2Fmain.js&style=github&showBorder=on&showFileMeta=on"></script>

### ヒント: JavaScript の基礎

CHIRIMEN Raspi はウェブブラウザ (または Node.js) をプログラムの実行環境に利用します。このときに使うプログラミング言語は JavaScript です。JavaScript に慣れていない人は、[こちらの資料「JavaScript 初学者向け資料集」](../js/readme.md)も参考にしてください。

## 非同期処理について

物理デバイス制御やネットワーク通信などでは、応答待ち中にブラウザが停止しないよう非同期処理を使う必要があります。
本チュートリアルではこれを [async 関数](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/async_function) で記述しています。async 関数による非同期処理に慣れていない人は、[こちらの資料「非同期処理 (async await 版)」](../js/async.md) も参考にしてください。

非同期処理を使いこなすのは難しいですが、本チュートリアルでは次のルールでコードを書けば大丈夫です:

- **非同期関数の呼び出し時には前に `await` を付けて呼び出す**
  - 非同期関数呼び出し前に `await` を付けると、その処理の完了を待ってから次のコードが実行されます
  - GPIO/I2C の初期化、ポートの設定などは非同期処理なので `await` キーワードを付けて呼び出します
- **非同期処理を含む関数は前に `async` を付けて非同期関数として定義する**
  - `async function 関数名() { ... }` のように頭に `async` を付けるだけで非同期関数になります

非同期関数を `await` なしで呼び出すと返り値が Promise オブジェクトとなり、Promise を理解しないと返り値の判断や実行順序が入れ替わり意図せぬ挙動になります。例えば、ポートの初期化を `await` なしで呼ぶと、ポート初期化前に初期化未完了のハードウェアを操作しようとして失敗したりします。

ハードウェアを制御するときは基本的に非同期呼び出しをする (その処理を含む関数もまた非同期で呼びす) と決めておけば迷うことなく、コードの実行順序も上から下に見たとおりの順番で実行され読み書きしやすくなります。

## 処理の解説

今回の JavaScript ファイルで、最初に呼び出されるコードは `await navigator.requestGPIOAccess()` です。
ここで先ほど出て来た [Web GPIO API](http://browserobo.github.io/WebGPIO) を使い、`gpioAccess` という GPIO にアクセスするためのインタフェースを取得しています。

<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2Fchirimen-oh%2Fchirimen%2Fblob%2F5c520c21820304901553f2adf22da1012f54722d%2Fgc%2Fgpio%2FLEDblink%2Fmain.js%23L4-L4&style=github&showBorder=on&showFileMeta=on"></script>

**関数の呼び出しに `await` 接頭詞を付けることに注意してください。** この関数は非同期関数で、その処理の完了を待ってから次の処理をする必要があります。また、`await` 接頭詞を使うコードを含むために、それを含む関数 `main()` は async 接頭詞付きの非同期関数として定義する必要があります。

コードを読み進める前に、ここで少し GPIO について説明します。

## GPIO とは

[GPIO](https://ja.wikipedia.org/wiki/GPIO)は、「General-purpose input/output」の略で汎用的な入出力インタフェースのことです。

Raspi に実装されている 40 本のピンヘッダから GPIO を利用することができます。

CHIRIMEN Raspi では Raspi が提供する 40 本のピンヘッダのうち、下記緑色のピン(合計 17 本)が利用可能です。

Raspi の GPIO 端子は、GND 端子との間に、0V もしくは 3.3V の電圧を印加(出力)したり、逆に 0V もしくは 3.3V の電圧を検知(入力)したりすることができます。LED は数 mA の電流を流すことによって点灯できる電子部品のため、印加する電圧を 3.3V(点灯)、0V(消灯) と変化させることで L チカが実現できるのです。

詳しくは[こちらのサイトの解説](https://tool-lab.com/make/raspberrypi-startup-22/)などを参考にしてみましょう。

{% cloudinary imgs/section0/Raspi3PIN.png alt="Raspi PIN配置図" %}

## GPIOPort の処理

さて、コードに戻りましょう。 **`const port = gpioAccess.ports.get(26)` で GPIO の 26 番ポートにアクセスするためのオブジェクト** を取得しています。

<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2Fchirimen-oh%2Fchirimen%2Fblob%2F5c520c21820304901553f2adf22da1012f54722d%2Fgc%2Fgpio%2FLEDblink%2Fmain.js%23L5-L5&style=github&showBorder=on&showFileMeta=on"></script>

続いて、 **`await port.export("out")` で GPIO の 26 番を「出力設定」にしています**。これにより LED への電圧の切り替えが可能になっています。

<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2Fchirimen-oh%2Fchirimen%2Fblob%2F5c520c21820304901553f2adf22da1012f54722d%2Fgc%2Fgpio%2FLEDblink%2Fmain.js%23L7-L7&style=github&showBorder=on&showFileMeta=on"></script>

最後に、無限ループのなかで `await sleep(1000)` によって 1000 ms (1 秒) 待機さ 1 秒ごとに `await port.write(1)` と `await port.write(0)` を交互に呼び出し、GPIO 26 番に加える電圧を 3.3V → 0V → 3.3V → 0V → … と繰り返しています。

<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2Fchirimen-oh%2Fchirimen%2Fblob%2F5c520c21820304901553f2adf22da1012f54722d%2Fgc%2Fgpio%2FLEDblink%2Fmain.js%23L9-L17&style=github&showBorder=on&showFileMeta=on"></script>

LED は一定以上の電圧を加え、電流を流すと点灯する性質を持っています。
つまり、3.3 V を加えたとき点灯し、0 V を加えたとき消灯、これを繰り返すことになります。

#### ヒント: LED の電圧

LED の順方向電圧は色により異なっており、赤色 LED は 1.8V 程度、青色 LED は 3.1V 程度とされています。

## プログラムの流れ

まとめると下図のような流れになります。

{% cloudinary imgs/section0/s.png alt="シーケンス" %}

## サンプルコードを編集してみよう

CodeSandbox では、中央のペインをクリックして編集画面にカーソルを置くと、プログラムを編集できます。

試しにいろいろ変えてみましょう。例としていくつか挙げてみます。

- 点滅周期を早く・遅く
- 点灯する時間と消灯する時間を変える
- GPIO ポートを他のポートに変える・配線を変える
- index.html を編集し、画面の見た目や振る舞いを変える

# まとめ

このチュートリアルでは、下記を実践してみました。

- CHIRIMEN for Raspberry Pi の起動
- L チカのサンプルコードを動かしてみた
- CodeSandbox でサンプルコードを編集してみた

このチュートリアルで書いたコードは以下のページで参照できます。

- [GitHub リポジトリで参照](https://github.com/chirimen-oh/chirimen/tree/master/gc/gpio/LEDblink)
- [CodeSandbox で参照](https://r.chirimen.org/csb-gpio-blink)

次の『[チュートリアル 1. GPIO の使い方](section1.md)』では GPIO の入力方法について学びます。

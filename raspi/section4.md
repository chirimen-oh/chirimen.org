---
layout: tutorial
---

# 4. GPIO/I2C のまとめ

# 概要

CHIRIMEN for Raspberry Pi（以下 「CHIRIMEN RasPi」） を使ったプログラミングを通じて、[Web GPIO API](https://rawgit.com/browserobo/WebGPIO/master/index.html) や [Web I2C API](http://browserobo.github.io/WebI2C) の使い方を学ぶチュートリアルです。

今回は、Web GPIO API と Web I2C API を組み合わせた Web アプリを作ってみます。

## 前回までのおさらい

本チュートリアルを進める前に前回までのチュートリアルを進めておいてください。

- [L チカしてみよう](section0.md)
- [1. GPIO の使い方](section1.md)
- [2. センサーを使ってみよう](section2.md)
- [3. I2C の使い方](section3.md)

前回までのチュートリアルで学んだことは下記のとおりです。

- 各種 example が `~/Desktop/gc/` 配下に配線図と一緒に置いてある ([オンライン版もある](https://r.chirimen.org/examples))
- 利用可能な GPIO Port 番号・種類と位置は壁紙を見よう
- Web アプリからの GPIO の制御には [Web GPIO API](http://browserobo.github.io/WebGPIO) を利用する
- GPIO ポートは「出力モード」で LED の ON/OFF などが行え「入力モード」では GPIO ポートの状態を読み取れる
- デバイスの初期化などは非同期処理であり [async と await を用いて処理する](appendix0.md)
- Webアプリからの I2C 制御には [Web I2C API](http://browserobo.github.io/WebI2C) を利用する
- I2C モジュールはドライバライブラリを使い SlaveAddress を指定して初期化してから操作する
- I2C モジュールは SlaveAddress が違えば 1 つの I2C バス上に複数接続することができる

# 今回つくるもの

シンプルに下記のような基本仕様にしてみます。

- 定期的に測定した温度を画面に表示する。
- 一定温度以上になったらちびギアモータを動かす。一定温度以下になったら止める。

[1. GPIO の使い方](section1.md) で使った MOSFET ＋ ちびギアモータと [2. I2C 基本編（ADT7410 温度センサー）](section2.md) で使った温度センサーがあればできそうですね。

# 1.準備

用意するもの

このチュートリアル全体で必要になるハードウエア・部品は下記の通りです。

- [L チカしてみよう](section0.md) に記載の「基本ハードウエア」
- ブレッドボード x 1
- ジャンパーワイヤー (オス-メス) x 3
- [Nch MOSFET (2SK4017)](http://akizukidenshi.com/catalog/g/gI-07597/) x 1
- リード抵抗 (1KΩ) x 1
- リード抵抗 (10KΩ) x 1
- [ちびギアモータ](https://tiisai.dip.jp/?p=2676) x 1
- [I2C 温度センサー (ADT7410)](http://akizukidenshi.com/catalog/g/gM-06675/) (ピンヘッダ半田付け済み)
- ジャンパーワイヤー (メス-メス) x 4

今回用意するものが多いですが、これまでのチュートリアルで使ったことがあるものばかりですので、ご安心ください。

{% cloudinary imgs/section4/parts-chibi.png alt="利用部品の写真" %}

# 2.まずは仕様通りにつくる

## a. 部品と配線について

Raspberry Pi との接続方法については、下記回路図を参照ください。

{% cloudinary imgs/section4/schematic_new.png alt="回路図" %}

## b. 接続確認

今回の回路用のコードはまだ書いていませんので、下記方法で配線の確認をおこなっておきましょう。

- L チカのサンプルを使って、ギアモータが回ったり止まったりすることを確認
- `i2cdetect`コマンドを使い、SlaveAddress `0x48` が見つかることを確認

## c.コードを書いてみる

[jsfiddle](https://jsfiddle.net/) を使ってコードを書いていきましょう。

今回は「あえて」記事中にコードを掲載しません！

これまでのチュートリアルで実施してきたことの復習です。頑張ってください！

## HTML

[jsfiddle](https://jsfiddle.net/) の`HTML`ペインには下記内容のコードを記載してください。

1. [Web GPIO API / Web I2C API の polyfill](https://r.chirimen.org/polyfill.js) を読み込むコード
2. [ADT7410 のドライバーライブラリ](https://r.chirimen.org/adt7410.js)を読み込むコード ※任意。[以前の記事](srction2.md) を参考に、ドライバーを使わずに書いても良いです。
3. 温度表示用の要素 (DIV タグなど)

## JavaScript

続いて`JavaScript`ペインには下記内容のコードを記載します。

1. Web GPIO API の初期化 (`navigator.requestGPIOAccess()`で`GPIOAccess`インタフェースの取得)
1. `GPIOAccess`の`ports.get()`で 26 番ポートの`port`オブジェクトを取得
1. 26 番ポートを「出力モード」に設定

1. Web I2C API の初期化 (`navigator.requestI2CAccess()`で`I2CAccess`インタフェースの取得)

1. `I2CAccess`の`ports.get()`で、1 番の I2C ポートの`I2CPort`オブジェクトを取得

1. `ADT7410`のインスタンスを生成し、`init()`による初期化を行なっておく

ここまでを実施しておきましょう。

> Note: 非同期処理の関数の呼び出しに関してはそれぞれ`await` を付け、「3. 26 番ポートを「出力モード」に設定」が終わってから、「4. Web I2C API の初期化」を開始するように書いてあることを確認しましょう。

1.〜 6. までの処理が全て終わってから、以降の処理が行われるように書いていきます。

- `adt7410.read()`を使い定期的(1 秒ごと)に温度を読み込む
- 温度データを HTML の表示用要素に反映させる。温度が 30 度以上なら、表示に変化をつける (文字を大きくする、赤くする、等)
- 温度が 32 度以上になったら GPIO 26 番ポートに`1 (HIGH)`を書き込むことでちびギアモータを動かす。温度が 32 度未満なら、GPIO 26 番ポートに`0 (LOW)` を書き込むことでギアモータを止める

> Note: ここでも同様に非同期処理の関数の呼び出しに関してはそれぞれ`await` を忘れずに。温度の読み取りが終わってから、その値に応じてギアモータを制御します。

ここまでできたら動くはずです！

# 3.完成度を上げるために

ここまでのチュートリアルで Web GPIO API や Web I2C API の使い方はもうお腹いっぱい！という状況かと思います。おつかれさまでした！

最後に、CHIRIMEN for Raspberry Pi を使って「楽しい作品」を仕上げるための Tips をいくつか書いてこのチュートリアルを締めくくりたいと思います。

## a. 全画面表示

[jsbin](http://jsbin.com/)や[jsfiddle](https://jsfiddle.net/)はコードの学習を進める上では便利なサービスですが、各サービスのメニューやコードが常に表示されてしまい「実行結果画面だけを表示する」ということが
できません。

このため、プログラミングを進める時は jsfiddle などで進め、ある程度コードが固まって来たら index.html ファイルなどに保存して、ブラウザで直接 index.html を表示する方が良いでしょう。

  > Jsbin や Jsfiddle と似たサービスとして、[Code Sandbox (以下 CSB)](https://codesandbox.io/) がありますが、こちらは実行結果画面を別タブとして開くことができるのでおすすめです (但し、上記2サービスと比べて CSB は多くのリソースを必要とするため、Raspberry Pi 3 以前の RasPi での動作は難があるかもしれません)。

さらに、サイネージのような作品の場合、ブラウザのメニューやタスクバーすらも表示せずに全画面表示にしたいケースもあるでしょう。

Raspberry Pi の Chromium Browser で全画面表示を行うには、コマンドラインから下記のように入力します。

`chromium --kiosk`

全画面表示を終了するには、`ctrl + F4` を押します。

## b. Web GPIO API / Web I2C API 以外の IoT 向け機能

今回は、CHIRIMEN for Raspberry Pi で拡張を行った Web GPIO API と Web I2C API の利用方法を学習してきましたが、他の方法でもブラウザと外部デバイスがコミュニケーションする方法がありますので、CHIRIMEN for Raspberry Pi で利用可能な他の手段を簡単にいくつか紹介しておきます。

- [Web Bluetooth API](https://webbluetoothcg.github.io/web-bluetooth/) : Web アプリから BLE を使った通信を行うための API です。無線で外部機器と通信することができます。入出力が可能です。
- [Web MIDI API](https://www.w3.org/TR/webmidi/) : Web アプリから MIDI 機器と通信するための API です。外部機器との入出力が可能です。
- key イベント/Mouse イベントの応用 : USB-HID デバイスを作成できる Arduino Leonardo などを利用することで、そういったボードからの入力をキーイベントやマウスイベントとして受け取ることができます。入力にしか使えませんが、USB 経由で Key イベントに対応するブラウザは非常に多いので、様々な環境への応用が必要な場合には選択肢になりうると思います。
> Note: これらのAPIは [Feature Policy](https://w3c.github.io/webappsec-feature-policy/) の制限（iframe 内からは埋め込み側で明示許可されていない API は利用不可）により、JSbin や JSfiddleは動作しません。ローカルで実行するか、上述の [CSB](https://codesandbox.io/) を利用してください。

また、将来的には USB 機器が直接ブラウザから制御可能になる Web USB API なども利用可能になる可能性がありますが、残念ながら現在のバージョンの CHIRIMEN for Raspberry Pi 環境で利用している Chromium Browser では利用できません。

## c. github の活用

現状の CHIRIMEN for Raspberry Pi には標準では Web サーバが含まれていません。
最近のセキュアドメイン からの実行でないと許可されない Web API も増えています。

index.html などのファイルができたら、[GitHub pages](https://pages.github.com/)などを使って公開すると良いでしょう。

GitHub Pages の使い方は、下記記事が参考になります。

- [GitHub を使って Web サイトを公開する](https://qiita.com/wifeofvillon/items/bed79dc85f956c8169a0)
- [無料で使える！GitHub Pages を使って Web ページを公開する方法](https://techacademy.jp/magazine/6445) (TechAcademy Magazine)

## d. Raspberry Pi で使えなかった機能 (WIP)

Raspberry Pi は非常に使いやすい SBC（シングルボードコンピュータ）ですが、一般的な PC と比べるとやはり非力です。(※Raspi4ではだいぶ改善されました！)


筆者が試してダメだー！ってなったポイントを書いてみたいと思います。(今後も追記予定)

> 他にもいろいろあると思うのでコメントいただけたら嬉しいです！

- WebGL がまともに動作しない → 諦めて Canvas を使おう
  - (追記) まだ検証できていませんが、Raspi4では重すぎないものであれば動かせそうです。
- Speech Synthesis API が動作しない

# さいごに

このチュートリアルでは 下記について学びました。

- Web GPIO API と Web I2C API を組み合わせたプログラミング

ここまでのチュートリアルでは一連の流れを通して GPIO, I2C のデバイスを使ってプロトタイピングを行うための基礎知識を広く学習してきました。ここから先は各自の興味関心や開発したいデバイスやサービスに応じて学習を深めていってください。本チュートリアルではこれ以降も「発展編」としていろいろな技術・題材を扱ったものを拡充していきますが、何をどのように学んでいくかは皆さんが何をしたいか、何を出来るようになりたいか次第です。

本チュートリアルをスタートとして、それぞれの目指す方向に合わせて技術習得を進めていって頂ければ幸いです。

また、CHIRIMEN for Raspberry Pi はまだ生まれたばかりです。いろいろと至らない点も多く、今後もオープンソースを前提にどんどん洗練していかなければなりません。課題は山積みです。

どうか、様々なご支援をいただきたく、よろしくお願いいたします。

# CHIRIMEN
![CHIRIMEN_pf](../../chirimenGeneric/CHIRIMEN_pf.png)

CHIRIMEN は Web ブラウザや Node.js の JavaScript からハードウェアを制御するプロトタイピング環境です。

CHIRIMEN コミュニティと W3C の [Browsers and Robotics コミュニティグループ](https://www.w3.org/community/browserobo/)では、JavaScript で Web アプリから電子パーツを直接制御できる低レベルハードウェア制御 API ([WebGPIO API](http://browserobo.github.io/WebGPIO) や [WebI2C API](http://browserobo.github.io/WebI2C) など) の標準化に向けての検討・提案と、それらの API を Raspberry Pi などの開発ボード上で使うプロトタイプ環境 (CHIRIMEN 環境) を実装しています。

電子パーツ制御のために専用のツールや開発環境を用意したり、複数の言語やプログラムを連携させたり、独特のフレームワークを学習・利用したりする必要はありません。Web 標準技術をベースとしており、素早いプロトタイピングやプログラミング初学者の IoT 学習に最適です。

[Raspberry Pi Zero を使う場合](pizero) のような低性能環境や、ブラウザ無しで動作させたいときは、ライブラリの読み込み部分だけを変えれば Node.js でも同じコードでハードを制御可能なユニバーサル環境です。

デジタルのソフトとフィジカルなハードをWWW上で連携するデバイスを Web標準技術、JavaScript だけで容易に実現できます。

## CHIRIMENのメリット
* 広く使われている標準技術を学習できるので
  * 学習のハードルが低い
  * 得たスキルが広く長く役立つ
  * インターネットでノウハウを検索しやすい
* Web技術を活用するので
  * WWWのサービスと簡単に連携できる
  * ユーザーインターフェースやコンテンツを簡単に作れる
  * Webブラウザを使って開発できる

<hr class="page-wrap" />

## CHIRIMEN の動作環境

CHIRIMEN が動作する環境は、以下の通りです。お手持ちのボードや用途に応じてご利用ください。

- [Raspberry Pi](raspi)
  - [Raspberry Pi](https://www.raspberrypi.org/) 3 以降をサポートしています。Raspberry Pi 上の Chrome ブラウザ (または Firefox など) でコードの実行もコードの編集もでき、Raspberry Pi 一式があれば、別途パソコンなどを用意する必要はありません。[ブラウザを使わず Node.js からも使えます。](raspi/nodejs)
- [Raspberry Pi Zero](pizero)
  - [Raspberry Pi Zero](https://www.raspberrypi.org/) をサポートしています。Raspberry Pi Zero上のNode.jsをjavascript処理系として動作します。Pi Zeroはブラウザ稼働には力不足ですが、典型的なIoTデバイス構築に適しています。コード編集や環境設定はPC上のブラウザからUSB経由で行え、Pi ZeroとPCがあれば別途開発環境は必要ありません。
- [micro:bit](microbit)
  - [micro:bit](https://microbit.org/) version 1.5 以降をサポートしています。パソコン (またはスマートフォンなど) の Chrome ブラウザ (または Chromium ベースの Edge や Braveなど) から Web Bluetooth を使って micro:bit に書き込むブリッジプログラムを通じてハードを制御します。別途パソコンが必要でペアリングの手間や通信速度に課題はありますが、安価かつ電池駆動可能で内蔵センサーもいくつか使える点はメリットです。
- [TY51822r3](ty51822r3)
  - Switch Scicence の mbed ボード [TY51822r3](https://www.switch-science.com/catalog/2574/) でも CHIRIMEN 環境をサポートしています。
  - 但し、販売元での在庫が切れているボードであることもあり、メンテナンス・テストを十分出来ていないところがありますがご容赦ください。

すべての CHIRIMEN 環境では各ボード毎のライブラリやブリッジプログラムが異なる以外、基本的には同じコード・同じドライバモジュールで各デバイス・パーツを制御できます。対応デバイス一覧ページをご覧ください。

## 予備知識

CHIRIMEN for Raspberry Pi を利用するに際して、知っておくと良い予備知識やツールの使い方が学べるドキュメントです。

- [GitHub ハンズオン](https://github.com/webiotmakers/github-handson)
  - GitHub の基本的な使い方の分かるハンズオン資料です。
- [CodeSandbox ガイド](https://csb-jp.github.io/)
  - ブラウザ上で開発する CodeSandbox の使い方を確認しましょう。
- [JavaScript 初学者向け資料集](/js/)
  - JavaScript 1 Day 講習資料、JavaScript 本格入門書、チートシートなどはこちら

その他、電子工作など一般的な知識は [予備知識・資料集](https://tutorial.chirimen.org/reference) や、[共通資料集](https://tutorial.chirimen.org/chirimengeneric/)を参照してください。

<hr class="page-wrap" />

## CHIRIMEN ブラウザー版との差異

| CHIRIMEN ブラウザー版       | Node.js                                                      |
| --------------------------- | ------------------------------------------------------------ |
| ライブラリ、ドライバーはhtmlで読み込む | jsの中で直接読み込む |
| `<script src="polyfill.js"></script >` | `import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js";`<br />`import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";` |
| `<script src="..../adt7410.js"></script >` | `import ADT7410 from "@chirimen/adt7410";`  |
| ー  | Sleep関数を宣言する<br />`const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));` |

## CHIRIMEN環境の任意のディレクトリへのセットアップ

以下のコマンド手順で~/myAppディレクトリ以外にも設定できます。

* ```mkdir [自分用の作業ディレクトリ]```  ([mkdir](https://atmarkit.itmedia.co.jp/ait/articles/1606/07/news015.html) コマンドとは)
* ```cd [自分用の作業ディレクトリ]``` ([cd](https://atmarkit.itmedia.co.jp/ait/articles/1712/14/news021.html)コマンドとは)
* ```wget https://tutorial.chirimen.org/pizero/package.json``` ([wget](https://atmarkit.itmedia.co.jp/ait/articles/1606/20/news024.html)コマンドとは)
* ```wget https://chirimen.org/remote-connection/js/beta/RelayServer.js``` ([RelayServer.js](https://chirimen.org/remote-connection/)を使う場合)
* ```npm install``` ([npm](https://atmarkit.itmedia.co.jp/ait/articles/1606/17/news030.html)とは)

## コミュニティについて

何か不明点や困ったことがあれば CHIRIMEN コミュニティの [Slack](http://chirimen-oh.slack.com/) や [Github](https://github.com/chirimen-oh/) の各リポジトリの issues でご連絡・ご相談ください。コミュニティの有志メンバーで

- [Slack](http://chirimen-oh.slack.com/) - 参加は[自己招待フォーム](https://docs.google.com/forms/d/e/1FAIpQLScyfyFZbe7uZbQQzSQq78tRqtRKWXvmDRR_dO39wtzYIQFV5g/viewform)をご利用ください
- [Github](https://github.com/chirimen-oh/)
- [Facebook](https://www.facebook.com/groups/chirimen/)
- [Twitter](https://twitter.com/chirimen_oh)

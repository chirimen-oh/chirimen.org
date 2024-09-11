## CHIRIMEN とは

CHIRIMEN は Web ブラウザや Node.js の JavaScript からハードウェアを制御するオープンソースのプロトタイピング環境です。

CHIRIMEN コミュニティと W3C の [Browsers and Robotics コミュニティグループ](https://www.w3.org/community/browserobo/)では、JavaScript で Web アプリから電子パーツを直接制御できる低レベルハードウェア制御 API ([WebGPIO API](http://browserobo.github.io/WebGPIO) や [WebI2C API](http://browserobo.github.io/WebI2C) など) の標準化に向けての検討・提案と、それらの API を Raspberry Pi などの開発ボード上で使うプロトタイプ環境 (CHIRIMEN 環境) を実装しています。

Web ページや Node.js の JavaScript から直接ハードを制御でき、既存の Web 関連の知識・環境・サービスをすべて活かしたまま、単一プログラムで簡単に画面やサービスと電子パーツを連携できます。　開発環境もローカルエディタだけでは無く Web ブラウザ上のオンラインエディタで動くようにしており、[サンプルコード集](https://chirimen.org/chirimen/gc/top/examples/)の通り配線しタブを開くだけですぐに[多数の電子パーツ](partslist)を試して頂けます。

電子パーツ制御のために専用のツールや開発環境を用意したり、複数の言語やプログラムを連携させたり、独特のフレームワークを学習・利用したりする必要はありません。Web 標準技術をベースとしており、素早いプロトタイピングやプログラミング初学者の IoT 学習に最適です。

[Raspberry Pi Zero を使う場合](pizero) のような低性能環境や、ブラウザ無しで動作させたいときは、ライブラリの読み込み部分だけを変えれば Node.js でも同じコードでハードを制御可能なユニバーサル環境です。

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

- [対応デバイス・パーツ一覧](partslist)

## CHIRIMEN Raspberry Pi 版

Raspberry Pi で CHIRIMEN 環境を使うには、[ビルドイメージ](https://r.chirimen.org/sdimage) を [Raspberry Pi Imager](raspi/sdcard2) や [Etcher で microSD カードに書き込み](raspi/sdcard)、Raspberry Pi を起動してください。CHIRIMEN を使ったプロトタイピングに必要な環境とサンプルコードが全てセットアップされた状態のイメージとなっており、チュートリアルをすぐにお試し頂けます。

- [CHIRIMEN for Raspberry Pi について](raspi)
- [Node.js から使うこともできます](raspi/nodejs)

## CHIRIMEN Raspberry Pi Zero 版
Raspberry Pi Zero　(ネットワーク環境が必要なため、Zero W　もしくは Zero WH (ピンヘッダはんだ付け済み品) 、Raspberry Pi Zero 2 W の使用を強く推奨します。)で CHIRIMEN 環境を使うには、[ビルドイメージ](https://github.com/chirimen-oh/chirimen-lite/releases/latest) を [microSD カードに書き込み](raspi/sdcard)、Raspberry Pi Zero を起動してください。

- [CHIRIMEN for Raspberry Zero について](pizero)

## CHIRIMEN micro:bit 版

micro:bit で CHIRIMEN を使うには、[Hello micro:bit - 準備編](microbit/hello_microbit)に従って micro:bit にサポートプログラムを書き込みます。その後は Raspberry Pi 向けの CHIRIMEN とほぼ同様にお試し頂けます。

- [CHIRIMEN with micro:bit について](microbit)

## CHIRIMEN TY51822r3版

TY51822r3 で CHIRIMEN を使うには、[ファームウェアの書き換え](ty51822r3/setting#ty51822r3--chirimen-with-ty51822r3-)を行ってください。Raspberry Pi 向けの CHIRIMEN とほぼ同様にお試し頂けます。

- [CHIRIMEN with ty51822r3 について](ty51822r3)

## コミュニティについて

何か不明点や困ったことがあれば CHIRIMEN コミュニティの [Slack](http://chirimen-oh.slack.com/) や [Github](https://github.com/chirimen-oh/) の各リポジトリの issues でご連絡・ご相談ください。コミュニティの有志メンバーで

- [Slack](http://chirimen-oh.slack.com/) - 参加は[自己招待フォーム](https://docs.google.com/forms/d/e/1FAIpQLScyfyFZbe7uZbQQzSQq78tRqtRKWXvmDRR_dO39wtzYIQFV5g/viewform)をご利用ください
- [Github](https://github.com/chirimen-oh/)
- [Facebook](https://www.facebook.com/groups/chirimen/)
- [Twitter](https://twitter.com/chirimen_oh)

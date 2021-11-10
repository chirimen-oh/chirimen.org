## CHIRIMEN について

CHIRIMEN とは、Web ブラウザや Node.js の JavaScript からハードウェアを制御するプロトタイピング環境です。

CHIRIMEN コミュニティと W3C の [Browsers and Robotics コミュニティグループ](https://www.w3.org/community/browserobo/)では、JavaScript で Web アプリから電子パーツを直接制御できる低レベルハードウェア制御 API ([WebGPIO API](http://browserobo.github.io/WebGPIO) や [WebI2C API](http://browserobo.github.io/WebI2C) など) の標準化に向けての検討・提案や、それらの API を実際の開発ボード上で試せるようにするプロトタイプ環境の実装を行っています。

Web ページ中の JavaScript で直接ハードを制御できる環境を実現することで、既存の Web 関連の知識・環境・サービスをすべて活かしたまま、同じプログラムの中で簡単に画面やサービスと電子パーツを制御可能になります。　また、開発環境についても なるべくWebブラウザ上で動くように工夫されています。

電子パーツの制御だけのために専用のツールや開発環境を用意したり、複数の言語やプログラムを連携した複雑な仕組みや、独特のフレームワークを理解して作る必要がなく、標準化されたWeb技術をベースとしているため、素早くプロトタイピングを行ったり、プログラミング初学者が IoT の基礎を学ぶ上で最適な環境です。

ブラウザが必要ないときは Node.js からも同じコードでハードを制御可能なよう全てのライブラリとドライバーを実装しています。

現在、CHIRIMEN コミュニティでは最新の CHIRIMEN 環境を Raspberry Pi や micro:bit などのデバイスに向けに公開・メンテナンスしており、このサイトではその使い方を学ぶためのチュートリアルを掲載しています。

## CHIRIMEN 環境

CHIRIMEN 環境を使ってハードとソフトを組み合わせたデバイスを作るには、まず CHIRIMEN 環境が動作する環境を用意して頂く必要があります。以下のようなボードコンピュータをサポートしているので、お好みの環境を選んでご利用ください。

- [Raspberry Pi](raspi)
  - [Raspberry Pi](https://www.raspberrypi.org/) 3 以降をサポートしています。Raspberry Pi 上の Chrome ブラウザ (または Firefox など) でコードの実行もコードの編集もでき、Raspberry Pi 一式があれば、別途パソコンなどを用意する必要はありません。[ブラウザを使わず Node.js からも使えます。](raspi/nodejs)
- [Raspberry Pi Zero](pizero)
  - [Raspberry Pi Zero](https://www.raspberrypi.org/) をサポートしています。Raspberry Pi Zero上のNode.jsをjavascript処理系として動作します。Pi Zeroはブラウザ稼働には力不足ですが、典型的なIoTデバイス構築に適しています。コード編集や環境設定はPC上のブラウザからUSB経由で行え、Pi ZeroとPCがあれば別途開発環境は必要ありません。
- [micro:bit](microbit)
  - [micro:bit](https://microbit.org/) version 1.5 以降をサポートしています。パソコン (またはスマートフォンなど) の Chrome ブラウザ (または Chromium ベースの Edge や Braveなど) から Web Bluetooth を使って micro:bit に書き込むブリッジプログラムを通じてハードを制御します。別途パソコンが必要でペアリングの手間や通信速度に課題はありますが、安価かつ電池駆動可能で内蔵センサーもいくつか使える点はメリットです。
- [TY51822r3](ty51822r3)
  - Switch Scicence の mbed ボード [TY51822r3](https://www.switch-science.com/catalog/2574/) でも CHIRIMEN 環境をサポートしています。
  - 但し、販売元での在庫が切れているボードであることもあり、メンテナンス・テストを十分出来ていないところがありますがご容赦ください。

各 CHIRIMEN 環境では各ボード毎の Polyfill やブリッジプログラムが異なる以外、基本的には同じコード・同じドライバモジュールで各デバイス・パーツを制御できます。対応デバイス一覧ページをご覧ください。

- [対応デバイス・パーツのリスト](partslist)

## CHIRIMEN Raspberry Pi版

Raspberry Pi 向けの CHIRIMEN 環境を試すには、[ビルドイメージ](https://r.chirimen.org/sdimage) をダウンロードして [Etcher](https://www.balena.io/etcher/) などを使って [microSD カードに焼き込み](raspi/sdcard.md)、Raspberry Pi 3/3B+/4 を起動してください。CHIRIMEN を使ったプロトタイピングに必要な環境とサンプルコードが全てセットアップされた状態のイメージとなっており、チュートリアルをすぐにお試し頂けます。

[CHIRIMEN for Raspberry Pi について](raspi)

Raspberry Pi では [Node.js から使うこともできます](raspi/nodejs)。

## CHIRIMEN Raspberry Pi Zero版
Raspberry Pi Zero　(ネットワーク環境が必要なため、Zero W　もしくは Zero WH (ピンヘッダはんだ付け済み品) の使用を強く推奨します。)の CHIRIMEN 環境を試すには、[ビルドイメージ](https://github.com/chirimen-oh/chirimen-lite/releases) をダウンロードして、 [こちら](raspi/sdcard2)や[こちら](raspi/sdcard)を参考にして[microSD カードに焼き込み](raspi/sdcard.md)、Raspberry Pi Zero を起動してください。その後は[こちら](pizero/)に従って使用を開始してください。


## CHIRIMEN micro:bit版

micro:bit 向けの CHIRIMEN を試すには、[Hello micro:bit - 準備編](microbit/hello_microbit)に従ってmicro:bitにサポートプログラムを書き込みます。その後はRaspberry Pi 向けの CHIRIMEN とほぼ同様にお試し頂けます。

[CHIRIMEN with micro:bit について](microbit)

## CHIRIMEN TY51822r3版

TY51822r3 向けの CHIRIMEN を試すには、[ファームウェアの書き換え](ty51822r3/setting#ty51822r3--chirimen-with-ty51822r3-)を行ってください。Raspberry Pi 3 向けの CHIRIMEN とほぼ同様にお試し頂けます。

[CHIRIMEN with ty51822r3 について](ty51822r3)

## コミュニティについて

何か不明点や困ったことがあれば CHIRIMEN コミュニティの [Slack](http://chirimen-oh.slack.com/) や [Github](https://github.com/chirimen-oh/) の各リポジトリの issues でご連絡・ご相談ください。コミュニティの有志メンバーで

- [Slack](http://chirimen-oh.slack.com/) - 参加は[自己招待フォーム](https://docs.google.com/forms/d/e/1FAIpQLScyfyFZbe7uZbQQzSQq78tRqtRKWXvmDRR_dO39wtzYIQFV5g/viewform)をご利用ください
- [Github](https://github.com/chirimen-oh/)
- [Facebook](https://www.facebook.com/groups/chirimen/)
- [Twitter](https://twitter.com/chirimen_oh)

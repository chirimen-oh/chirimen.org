## CHIRIMEN について

CHIRIMEN とは、Web ブラウザからハードウェアを制御するプロトタイピング環境です。

CHIRIMEN コミュニティと W3C の [Browsers and Robotics コミュニティグループ](https://www.w3.org/community/browserobo/)では、JavaScript で Web アプリから電子パーツを直接制御できる低レベルハードウェア制御 API ([WebGPIO API](http://browserobo.github.io/WebGPIO) や [WebI2C API](http://browserobo.github.io/WebI2C) など) の標準化に向けての検討や、それらの API を実際の開発ボード上で試せるようにするプロトタイプ環境の開発を行っています。

Web ページ中の JavaScript で直接ハードを制御できる環境を実現することで、既存の Web 関連の知識・環境・サービスをすべて活かしたまま、同じプログラムの中で簡単に画面やサービスと電子パーツを制御可能になります。電子パーツの制御だけのために専用のツールや開発環境を用意したり、複数の言語やプログラムを連携した複雑な仕組みを理解して作る必要がないため、素早くプロトタイピングを行ったり、プログラミング初学者が IoT の基礎を学ぶ上で最適な環境です。

現在、CHIRIMEN コミュニティでは最新の CHIRIMEN 環境を Raspberry Pi 3 などのデバイスに向けに公開・メンテナンスしており、このサイトではその使い方を学ぶためのチュートリアルを掲載しています。

## CHIRIMEN for Raspberry Pi 3 で試すには

Raspberry Pi 3 向けの CHIRIMEN 環境を試すには、[ビルドイメージ](https://r.chirimen.org/sdimage) をダウンロードして [Etcher](https://www.balena.io/etcher/) などを使って [microSD カードに焼き込み](raspi/sdcard.md)、Raspberry Pi 3 もしくは Raspberry Pi 3B+ を起動してください。CHIRIMEN Raspi3 を使ったプロトタイピングに必要な環境とサンプルコードが全てセットアップされた状態のイメージとなっており、このサイトのチュートリアルをすぐにお試し頂けます。

[CHIRIMEN for Raspberry Pi3 のチュートリアル](https://tutorial.chirimen.org/raspi/)

## CHIRIMEN を TY51822r3 で試すには

TY51822r3 向けの CHIRIMEN を試すには、[ファームウェアの書き換え](https://tutorial.chirimen.org/ty51822r3/setting#ty51822r3--chirimen-with-ty51822r3-)を行ってください。Raspberry Pi 3 向けの CHIRIMEN とほぼ同様にお試し頂けます。

[CHIRIMEN with ty51822r3 のチュートリアル](https://tutorial.chirimen.org/ty51822r3/)

# CHIRIMEN for Raspberry Pi 3 の SD カードを作成する

CHIRIMEN for Raspberry Pi 3 (以下 CHIRIMEN Raspi3) を利用するには Raspberry Pi 財団が配付する [Raspbian](https://www.raspberrypi.org/downloads/) をベースとして CHIRIMEN Raspi3 用に必要なソフトウェアやサンプルコードなどを同梱・設定変更などを行った専用の環境を用意した起動イメージを使用すると簡単です。

このページではご自身の microSD カードに CHIRIMEN Raspi3 用のイメージを焼き込みセットアップする手順を説明します。

## 1. 作業環境の準備

SD カードに起動イメージを焼き込むには Windows, macOS または Linux PC と SD カードリーダーが必要です。

また、高速かつ安全に焼き込みをするため [Etcher](https://etcher.io/) をダウンロード・インストールしてください (dd コマンドなどを使うことも出来ますが上級者向けのため割愛します)。

## 2. 起動イメージのダウンロード

SD カードの書き込みに使う PC で最新の起動イメージをダウンロードしてください。

* [CHIRIMEN for Raspberry Pi 3 リリース版のダウンロードディレクトリ](http://download.chirimen.org/release/raspberry_pi_3/)

古いバージョンのイメージも公開されていますが、特に理由がない限りはファイル名に含まれる日付が最新のイメージを選択しダウンロードしてください。

拡張子が `.zip` のファイルは zip 形式で圧縮されており、そのままでは焼き込みツール [Etcher](https://etcher.io/) から利用できないため、ダウンロード後に展開してください。

## 3. SD カードにイメージを焼き込む

イメージファイルの準備が出来たら microSD カード (8GB 以上必須、Class 10 以上で高速なものを推奨) をカードリーダーに指し込み、[Etcher](https://etcher.io/) を起動してください。

`Select Image` ボタンで先ほどダウンロード (と展開) したイメージファイルを選択、`Select drive` で指し込んだ SD カードのドライブを選択 (間違ったドライブを選択するとそのデータが消えてしまうため要注意) し、`Flash!` ボタンを押してください。

![Etcher の操作画面](https://etcher.io/static/screenshot.gif)

## 4. 起動を確認する

焼き込み終わったら microSD カードを抜き、(HDMI ディスプレイや AD アダプターを繋いだ) Raspberry Pi 3 に指し込んで電源を入れてみてください。

初回起動時には自動的にご利用の SD カードの容量に合わせたサイズにパーティーションが拡張されてから再起動します。暫く待って CHRIMEN のデスクトップが起動すれば無事焼き込み (と起動確認) 完了です。

なお、従来の2018 年 10 月より前に配付されていた起動イメージではパーティーションサイズの自動拡張などに対応しておりません。古いイメージファイルを使う場合のパーティーション拡張手順などは [こちらの記事](https://gist.github.com/tadfmac/527b31a463df0c9de8c30a598872344d) をご覧ください。


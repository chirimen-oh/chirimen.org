# CHIRIMEN for Raspberry Pi の SD カードを作成する

CHIRIMEN for Raspberry Pi (以下 CHIRIMEN Raspi) を利用するには Raspberry Pi 財団が配付する [Raspberry Pi OS](https://www.raspberrypi.org/downloads/) をベースとして CHIRIMEN Raspi 用に必要なソフトウェアやサンプルコードなどを同梱・設定変更などを行った専用の環境をセットアップ済みの起動イメージを使用すると簡単です。

このページではご自身の microSD カードに CHIRIMEN Raspi 用のイメージを焼き込みセットアップする手順を説明します。

## 1. 作業環境の準備

SD カードに起動イメージを焼き込むには Windows, macOS または Linux の PC と SD カードリーダーが必要です。

また、高速かつ安全に焼き込みをするため [Etcher](https://www.balena.io/etcher/) をダウンロード・インストールしてください。

## 1.1 別の方法: Raspberry Pi Imager のインストール

Raspberry Pi Imager は公式ツールで、簡単に Raspberry Pi OS や他のイメージを microSD カードに書き込むことができます。以下の手順でインストールしてください。

### Windows:

1. [Raspberry Pi Imager ダウンロードページ](https://www.raspberrypi.com/software/) にアクセスします。
2. "Download for Windows" をクリックし、インストーラーをダウンロードします。
3. ダウンロードしたファイルを実行し、インストールウィザードに従います。

### macOS:

1. [Raspberry Pi Imager ダウンロードページ](https://www.raspberrypi.com/software/) にアクセスします。
2. "Download for macOS" をクリックし、イメージファイルをダウンロードします。
3. ダウンロードした `.dmg` ファイルを開き、Raspberry Pi Imager をアプリケーションフォルダにドラッグ＆ドロップしてインストールします。

### Linux:

1. 端末を開き、以下のコマンドを実行して Raspberry Pi Imager をインストールします。

```bash
sudo apt install rpi-imager
```

## 2. 起動イメージのダウンロード

SD カードの書き込みに使う PC で最新の起動イメージをダウンロードしてください。

- [CHIRIMEN for Raspberry Pi](https://r.chirimen.org/sdimage)
- [CHIRIMEN for Raspberry Pi Zero](https://github.com/chirimen-oh/chirimen-lite/releases/latest)

古いバージョンのイメージやテスト用のイメージをお探しの場合は [イメージ配付ディレクトリ](https://r.chirimen.org/download) をご確認ください。

拡張子が `.zip` のファイルは zip 形式で圧縮されており、そのままでは焼き込みツールから利用できないため、ダウンロード後に展開してください。

## 3. SD カードにイメージを焼き込む

イメージファイルの準備が出来たら microSD カード (8GB 以上必須、Class 10 以上で高速なものを推奨) をカードリーダーに指し込み、[Etcher](https://www.balena.io/etcher/) を起動してください。

`Select Image` ボタンで先ほどダウンロード (と展開) したイメージファイルを選択、`Select drive` で指し込んだ SD カードのドライブを選択 (間違ったドライブを選択するとそのデータが消えてしまうため要注意) し、`Flash!` ボタンを押してください。

> ![Etcher の操作画面](https://blog.balena.io/wp-content/uploads/2021/01/etcher.png)\
> _画像: https://blog.balena.io より引用_

## 3.1 別の方法: Raspberry Pi Imager での SD カード書き込み

インストールが完了したら、次の手順で SD カードにイメージを書き込みます。

1. Raspberry Pi Imager を起動します。
2. "Operating System" をクリックし、「CHIRIMEN Raspi」用のダウンロードしたイメージを選択します。必要に応じて、"Use custom" からファイルを選ぶことができます。
3. "Storage" をクリックし、書き込み先の microSD カードを選択します。
4. "Write" ボタンをクリックし、書き込みを開始します。

これで、CHIRIMEN Raspi 用の microSD カードが作成されます。

## 4. 起動を確認する

焼き込み終わったら microSD カードを抜き、(HDMI ディスプレイや AD アダプターを繋いだ) Raspberry Pi に指し込んで電源を入れてみてください。

初回起動時には自動的にご利用の SD カードの容量に合わせたサイズにパーティーションが拡張されてから再起動します。暫く待って CHRIMEN のデスクトップが起動すれば無事焼き込み (と起動確認) 完了です。

なお、従来の 2018 年 10 月より前に配付されていた起動イメージではパーティーションサイズの自動拡張などに対応しておりません。古いイメージファイルを使う場合のパーティーション拡張手順などは [こちらの記事](https://gist.github.com/tadfmac/527b31a463df0c9de8c30a598872344d) をご覧ください。

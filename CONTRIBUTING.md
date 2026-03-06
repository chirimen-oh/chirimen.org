# chirimen.org へのコントリビュート

chirimen.org へのコントリビュートを歓迎します。以下の手順に従ってください。

## PC 環境事前準備

以下の環境が構築されていることを確認してください。

- npm / Node.js の環境が構築されていること
- OS に応じた手順で ruby をインストールし `gem install bundler` で bundler もインストールしてください (一般的な Ruby 開発環境構築と同じ)
  - ruby と bundler まで用意できていたら下記の手順でサイトをビルドできます
- Docker の環境が構築されていること（オプション）

### 記載時点の環境例

```
$ npm -v
11.6.2
$ node -v
v24.13.0
$ ruby -v
ruby 3.3.0 (2023-12-25 revision 5124f9ac75) [arm64-darwin24]
```

## 手順

1. [リポジトリ](https://github.com/chirimen-oh/chirimen.org) をフォークする
2. クローンして依存関係をインストールし、ローカルで起動する（下記「ローカル環境構築・起動」参照）
3. **作業前に** [Issues](https://github.com/chirimen-oh/chirimen.org/issues) で Issue を立てる
4. 作業ブランチを作成する
5. プルリクエストを作成する
6. レビューを待つ

## ローカル環境構築・起動

### 通常（clone から serve まで）

```sh
git clone git@github.com:chirimen-oh/chirimen.org.git
cd chirimen.org
npm install
bundle install --path vendor/bundle
bundle exec jekyll serve
```

`bundle install` は `--path vendor/bundle` を付けると gem をプロジェクト内に閉じてインストールし、再現性・権限のトラブルを避けられます。

ブラウザで **http://127.0.0.1:4000/** を開いて確認してください。編集・保存で即時リビルドされます（ライブリロードはないため、保存後にブラウザのリロードが必要です）。

### すでに clone 済みのとき（起動だけ）

必要に応じてクリーンやビルドのみ行う場合:

```bash
bundle exec jekyll clean   # 必要時
bundle exec jekyll build   # 必要時
bundle exec jekyll serve  # 起動
```

### Docker で起動する場合（オプション）

```bash
docker compose up
```

起動後、**http://127.0.0.1:4000/** で確認できます。

## 参考資料

- [chirimen.org wiki Home](https://github.com/chirimen-oh/chirimen.org/wiki)
- [コミュニティで公開しているサイト](https://github.com/chirimen-oh/chirimen.org/wiki/%E3%82%B3%E3%83%9F%E3%83%A5%E3%83%8B%E3%83%86%E3%82%A3%E3%81%A7%E5%85%AC%E9%96%8B%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B%E3%82%B5%E3%82%A4%E3%83%88)

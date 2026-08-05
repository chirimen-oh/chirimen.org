# chirimen.org へのコントリビュート

chirimen.org へのコントリビュートを歓迎します。以下の手順に従ってください。

## PC 環境事前準備

以下の環境が構築されていることを確認してください。

- [mise](https://mise.jdx.dev/) をインストール
  - OS 合わせて ruby と bundler をインストールしてください (一般的な Ruby 開発環境構築と同じ)
  - `mise install`

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
mise install
mise build
bundle exec jekyll serve
```

ブラウザで **http://127.0.0.1:4000/** を開いて確認してください。編集・保存で即時リビルドされます（ライブリロードはないため、保存後にブラウザのリロードが必要です）。

### すでに clone 済みのとき（起動だけ）

必要に応じてクリーンやビルドのみ行う場合:

```bash
bundle exec jekyll clean   # 必要時
bundle exec jekyll build   # 必要時
bundle exec jekyll serve  # 起動
```

## デプロイについて

`master` ブランチにマージされると、[GitHub Actions](https://github.com/chirimen-oh/chirimen.org/actions/workflows/deploy.yml) が自動的にサイトをビルドし [Cloudflare Pages](https://pages.cloudflare.com/) にデプロイします。ビルド・デプロイの状況は下記バッジや Actions のログから確認できます。

[![Deploy](https://github.com/chirimen-oh/chirimen.org/actions/workflows/deploy.yml/badge.svg)](https://github.com/chirimen-oh/chirimen.org/actions/workflows/deploy.yml)

## 参考資料

- [chirimen.org wiki Home](https://github.com/chirimen-oh/chirimen.org/wiki)
- [コミュニティで公開しているサイト](https://github.com/chirimen-oh/chirimen.org/wiki/%E3%82%B3%E3%83%9F%E3%83%A5%E3%83%8B%E3%83%86%E3%82%A3%E3%81%A7%E5%85%AC%E9%96%8B%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B%E3%82%B5%E3%82%A4%E3%83%88)

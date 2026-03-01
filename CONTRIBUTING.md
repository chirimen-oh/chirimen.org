# chirimen.org へのコントリビュート

chirimen.org へのコントリビュートを歓迎します。以下の手順に従ってください。

## PC 環境事前準備

以下の環境が構築されていることを確認してください。

- npm / Node.js の環境が構築されていること
- Ruby の環境が構築されていること
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

1. [https://github.com/chirimen-oh/chirimen.org](https://github.com/chirimen-oh/chirimen.org) をフォークする
2. リポジトリをクローンし、インストールする
3. ローカル環境を立ち上げる
4. **作業前に** [https://github.com/chirimen-oh/chirimen.org/issues](https://github.com/chirimen-oh/chirimen.org/issues) に Issue を立てる
5. 作業ブランチを作成する
6. プルリクエストを作成する
7. レビューを待つ

## ローカル環境構築

```bash
npm install
bundle install
```

## ローカル環境起動

### ローカル環境初期化

```bash
bundle exec jekyll clean
```

### ローカル環境ビルド

```bash
bundle exec jekyll build
```

### ローカル環境サーバー起動

```bash
bundle exec jekyll serve
```

## 参考資料

- [chirimen.org wiki Home](https://github.com/chirimen-oh/chirimen.org/wiki)
- [コミュニティで公開しているサイト](https://github.com/chirimen-oh/chirimen.org/wiki/%E3%82%B3%E3%83%9F%E3%83%A5%E3%83%8B%E3%83%86%E3%82%A3%E3%81%A7%E5%85%AC%E9%96%8B%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B%E3%82%B5%E3%82%A4%E3%83%88)

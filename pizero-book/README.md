# Pizero Book

tutoril for chirimen lite & raspberry pi zero

> created by [create-book](https://github.com/vivliostyle/create-book).

## References

- VFM <https://vivliostyle.github.io/vfm/#/vfm>
- Vivliostyle CLI <https://github.com/vivliostyle/vivliostyle-cli#readme>
- Vivliostyle Themes <https://github.com/vivliostyle/themes#readme>
- Awesome Vivliostyle <https://github.com/vivliostyle/awesome-vivliostyle#readme>
- Vivliostyle (GitHub) <https://github.com/vivliostyle>
- Vivliostyle <https://vivliostyle.org>

## how to build/preview

- for biuld
  ```
  $ cd your-directory/chirimen.org/pizero-book
  $ npm run build
  ```
- for preview
  ```
  $ npm run preview
  ```

## 目次の生成

```
$ npm run generate-toc
```

toc.md の最初に index.md の表紙行が出るので手動で削除する

### ページ番号が ?? になるとき

scripts/gfenerate-toc.js の replaceAll で変換処理を追加する

## 目次・ドキュメント一括出力
下記コマンドを実行

```sh
$ ./build.sh
```


## ディレクトリ構成

```sh
chirimen.org/pizero-book 
├── build.sh # ビルドシェル
├── docs # 各種ページ md
├── images # 各種ページ素材
├── package-lock.json
├── package.json
├── publication.json
├── scripts
│   └── generate-toc.js # 目次生成シェル
├── themes
│   ├── package-lock.json
│   ├── package.json
│   └── packages
│       └── @vivliostyle
│           ├── theme-base
│           └── theme-techbook
│               ├── theme.css # ドキュメント用スタイル
│               └── vivliostyle.config.js
└── vivliostyle.config.js # ドキュメント設定
```

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
  $ cd your-directory/chirimen.org/recipe-book
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
chirimen.org/recipe-book 
│   # ビルドシェル
├── build.sh
│   # 各種ページ md
├── docs
│   # 各種ページ素材
├── images
├── package-lock.json
├── package.json
├── publication.json
├── scripts
│   │   # 目次生成シェル
│   └── generate-toc.js
├── themes
│   ├── package-lock.json
│   ├── package.json
│   └── packages
│       └── @vivliostyle
│           ├── theme-base
│           └── theme-techbook
│               │   # ドキュメント用css
│               ├── theme.css
│               └── vivliostyle.config.js
│   # ドキュメント設定 js
└── vivliostyle.config.js
```

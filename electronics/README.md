> [!NOTE]
> electronics/src ディレクトリ以下のソースコードをもとに自動生成されているため、_site/electronics ディレクトリ以下を直接編集しないこと

## 確認方法

対象読者:

- コントリビューター

electronics 以下のページは mdBook によって生成されています。
[mdBook インストール](https://rust-lang.github.io/mdBook/guide/installation.html)して、以下のコマンドを実行して確認できます:

```
$ cd electronics
$ ls
README.md  book.toml  src  theme
$ mdbook build
… ../_site/electronics ディレクトリ以下のファイルが更新されます …
```

> [!NOTE]
> `bundle exec jekyll build`(または `jekyll serve`)を先に実行して `_site` を生成してから `mdbook build` を実行すること。
> Jekyll はビルド時に `_site` 内の未知のファイルを削除するため、逆の順序で実行すると mdbook の成果物が消えます。

## このディレクトリの内容について

ここに収録しているチュートリアルの多くは、[SparkFun Learn](https://learn.sparkfun.com/tutorials) の
記事を日本語に翻訳・再構成したものです。SparkFun Learn のチュートリアルは
[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) で公開されており、
翻訳記事にも元記事へのリンクとライセンス表示を明記しています（各ページ末尾の出典欄を参照）。

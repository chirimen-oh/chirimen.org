> [!NOTE]
> pizero/src ディレクトリ以下のソースコードをもとに自動生成されているため、_site/pizero ディレクトリ以下を直接編集しないこと
>
> - 2024-07-29: readme.md を pizero/src/index.md に移動

## 確認方法

対象読者:

- コントリビューター

pizero 以下のページは mdBook によって生成されています。
[mdBook インストール](https://rust-lang.github.io/mdBook/guide/installation.html)して、以下のコマンドを実行して確認できます:

```
$ cd pizero
$ ls
README.md  book.toml  src  theme
$ mdbook build
… ../_site/pizero ディレクトリ以下のファイルが更新されます …
```

> [!NOTE]
> `bundle exec jekyll build`(または `jekyll serve`)を先に実行して `_site` を生成してから `mdbook build` を実行すること。
> Jekyll はビルド時に `_site` 内の未知のファイルを削除するため、逆の順序で実行すると mdbook の成果物が消えます。

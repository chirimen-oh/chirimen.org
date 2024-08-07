> [!NOTE]
> pizero/src ディレクトリ以下のソースコードをもとに自動生成されているため、_pages ディレクトリ以下を直接編集しないこと
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
… _pages ディレクトリ以下のファイルが更新されます …
```

# Feedback

このサイトの内容への提案や誤りの指摘などがある場合は [Github Issues](https://github.com/chirimen-oh/tutorials/issues) からお願いします。Issues で提案などして頂く以外にも、プルリクを送っていただくなどでも勿論構いません。

サイトの**テキスト本文は Markdown で書かれており**、ウェブページの生成には GitHub Pages で使われている [Jekyll テンプレート (Cayman)](https://github.com/pages-themes/cayman) をベースにカスタマイズしたものを使っています。

また、CHIRIMEN コミュニティメンバーで [チュートリアル用リポジトリ](https://github.com/chirimen-oh/tutorials/) の書き込み権限を持っている方は、ページ末尾の「現在のページを GitHub で編集する」と書かれたリンクで [Github の編集画面](https://help.github.com/ja/articles/about-writing-and-formatting-on-github) を開きそのままブラウザで編集して頂けます。

GitHub の master ブランチでファイルを変更すると、自動的に Netlify でビルドされて数十秒程度で本番サイトに反映されます。ビルドの進捗や結果は次のバッチや [Netlify の Deploys](https://app.netlify.com/sites/tutorial-chirimen-org/deploys) で確認できます。

[![Netlify Status](https://api.netlify.com/api/v1/badges/c15b982d-99d8-471d-bbce-16b02399e255/deploy-status)](https://app.netlify.com/sites/tutorial-chirimen-org/deploys)

## 編集時の注意

Markdown の書き方は **Github のもの ([Github Flavored Markdown](https://help.github.com/ja/articles/basic-writing-and-formatting-syntax)) と基本的に同じ**です。[GitHub の執筆ヘルプ](https://help.github.com/ja/categories/writing-on-github) を参考に編集してください。但し、以下の点については注意して編集してください。

### ファイル名と相対リンク

**各ページの URL は元ファイル名に関わらず小文字に統一** (大文字を含む URL にアクセスすると 301 で小文字 URL にリダイレクトされる)、**末尾の `.html`, `.md` あるいは `/` もなしでアクセス** できるようになります。リポジトリのファイルと Web での URL が異なるのは望ましくないため、**ディレクトリ名や Markdown ファイル名には原則全て小文字を使用してください**。

また、Markdown ファイル内での **相対リンクについては GitHub Pages の時と同様 .md 付きの相対リンクで記述してください**。サイトのビルド時に自動的に .md なしの相対リンクに変換され、サイト上でのリンクが正しくなると同時に、GitHub Web 上でのリンクも維持される形に出来ます。

### 画像の埋め込み

Markdown で画像を埋め込む場合は普通そのファイルへのパスを `![画像の説明](path/to/image.png)` のように指定して埋め込みます。このサイトでもそれは可能ですが、ウィンドウサイズに応じた画像を読み込みできず、元画像が大きいとページが重たくなりすぎるし、元画像を小さくすると大画面や高解像度ディスプレイで見たときに荒く見えてしまいます。

そのため、オリジナル画像は大きなものを用意し [Cloudinary](https://cloudinary.com/) という画像変換・配信サービスを使い、表示に適切なサイズの画像を生成・読み込み出来るようにしています。Cloudinary を使って自動的に適切なサイズに変換した画像を表示させるには次のように [Cloudinary 用の Liquid tag](https://nhoizey.github.io/jekyll-cloudinary/) を使ってください。

**`{% raw %}{% cloudinary path/to/image.png alt="画像の説明" %}{% endraw %}`**

回路図などでクリックしたらオリジナルサイズの画像を拡大表示させたい場合はオリジナル画像へのリンクで囲います。

**`{% raw %}[{% cloudinary path/to/image.png alt="画像の説明" %}{% endraw %}](path/to/image.png)`**

但しこれはあくまでもサイト内の画像だけです。外部サイトの画像は通常通り `![画像の説明](https://example.org/image.png)` のようにして埋め込んでください (必要ない限り外部サイト画像埋め込みはしないでください)。

### コードサンプルの埋め込み

Markdown でコードブロックは次のように言語名を指定して記述できます:

`````md
```js
console.log("hello code block!")
```
`````

サンプルコードファイルを読み込んで埋め込むには次のように [Jekyll の `include_relative` タグ](https://jekyllrb.com/docs/includes/) を使用します。コードブロック末尾に空行が出来ないように [ホワイトスペースを削除する](https://shopify.github.io/liquid/basics/whitespace/) `-%}` で閉じていることに注意してください。

`````md
```js
{% raw %}{% include_relative path/to/script.js -%}{% endraw %}
```
`````

### 多言語対応

本サイトの他言語対応には [Polyglot](https://github.com/untra/polyglot) プラグインを利用しています。英語ページを作成するときは元のファイル名 `sample.md` 末尾に `-en` を付けて `sample-en.md` としたファイルを作成、全言語のファイルの冒頭に Front Matter と呼ばれる `---` で囲われたセクションにて最低限 `lang` と `permalink` を設定してください。詳しくは既存の対応済みページや [プラグインのドキュメント](https://polyglot.untra.io/) をご覧ください。

### 通知と反映の確認

Netlify でのサイトビルドログなどは Github のコミット通知と併せて下記コミュニティ Slack の #github チャンネルに通知されるようになっています。編集結果が反映されない場合などはビルドに失敗していないか確認してください。

## ファイル構成とテンプレート

[チュートリアル用リポジトリ](https://github.com/chirimen-oh/tutorials/) 配下にある全ての markdown (.md) ファイルに対してそれに対応する HTML ページが生成されるシンプルな仕組みです。このページは /feedback.md ファイルから生成されているし、その他もリポジトリ内の markdown ファイルは拡張子 .md を外して全て小文字に統一されたパスの URL でアクセス可能になります。

既存のページの編集は既存の markdown ファイルを編集、新規ページの作成は追加したい URL に対応する markdown ファイルを作るだけで可能です。それ以外の js/css/img ファイル群はそのままサイトに反映されるのでサンプルコードなどはそのまま必要なファイルを置いてください。

- [_config.yml](https://github.com/chirimen-oh/tutorials/blob/master/_config.yml) - サイトの設定ファイル。ベースとするテーマやテーマのテンプレート中で変数として参照されている変数の定義を行う。[詳細は Github のヘルプなどを参照](https://help.github.com/articles/configuring-jekyll/)
- [_layouts](https://github.com/chirimen-oh/tutorials/tree/master/_layouts) - カスタムテンプレートファイルを保存するディレクトリ
  - [default.html](https://github.com/chirimen-oh/tutorials/blob/master/_layouts/default.html) - デフォルトテンプレート。参照している変数はリポジトリのメタデータや _config.yml で定義しているもの。
  - [tutorial.html](https://github.com/chirimen-oh/tutorials/blob/master/_layouts/tutorial.html) - チュートリアル用テンプレート。目次が自動生成されるのがデフォルトとの違い。
- [_redirects](https://github.com/chirimen-oh/tutorials/blob/master/_redirects) - リダイレクトの定義ファイル。 [Netlify のドキュメント](https://www.netlify.com/docs/redirects/) を参照
- _site - リポジトリ上には存在しません。ビルド環境を構築して `jekyll build` コマンドでビルドを実行すると公開サイト用のファイルがこのディレクトリに生成され、それを Netlify の CDN でドキュメントルートとしてホストする設定になっています。
- .eslintrc.yml, .prettierrc, .stylelintrc - ESLint, StyleLint, Prettier で使用する JavaScript やスタイルシートのコーディングルール定義ファイル
- .ruby-version, Gemfile - Jekyll テンプレートでビルドするときに使う Ruby バージョンとパッケージ定義ファイル (Netlify でのビルド用)
- README.md - トップページ (https://tutorial.chirimen.org/) のファイル
- assets - サイト全体で利用する CSS や JavaScript ファイルを収めるディレクトリ。`_layouts` 配下の html ファイルから読み込む。 
- raspi3 - CHIRIMEN Raspi3 チュートリアル (https://tutorial.chirimen.org/raspi3) 用のファイルを収めたディレクトリ
- ty51822r3 - CHIRIMEN TY51822R3 チュートリアル (https://tutorial.chirimen.org/ty51822r3) 用のファイルを収めたディレクトリ
- feedback.md - このページの元となる markdown ファイル
- package-lock.json, package-json - ESLint や Prettier を使って VS Code で編集したいときに Node のパッケージ群を `npm i` でインストールできるようにするためのパッケージ定義ファイル

## Github Pages について

Github Pages は Jekyll テンプレートが使われており、詳細については以下のドキュメントが参考になります:

- [GitHub Pages のヘルプドキュメント](https://help.github.com/articles/using-jekyll-as-a-static-site-generator-with-github-pages/)
- [Jekyll のドキュメント](https://jekyllrb.com/docs/) 配下の各ページ
  - [Jekyll のファイル構成](https://jekyllrb.com/docs/structure/)
  - [Configuration Options](https://jekyllrb.com/docs/configuration/options/)
  - [Front matter](https://jekyllrb.com/docs/front-matter/) markdown 冒頭の `---` 行で囲まれたメタデータ定義セクション (YAML front matter block) の説明
  - [Includes](https://jekyllrb.com/docs/includes/) 使い回したいパーツがある場合に `_includes` ディレクトリ配下に定義をおいて読み込む方法

## ローカルビルド手順

手元の PC でサイトをビルドしながら編集したい場合、OS に応じた手順で ruby をインストールし `gem install bundler` で bundler もインストールしてください (一般的な Ruby 開発環境構築と同じ)。ruby と bundler まで用意できていたら次の手順でサイトをビルドできます:

```sh
git clone git@github.com:chirimen-oh/tutorials.git
cd tutorials
bundle install --path vendor/bundle
bundle exec jekyll serve
```

あとはブラウザで `http://127.0.0.1:4000/` を開いて出力を確認してください。

## コミュニティ Slack

その他、何か不明な点がある場合は [コミュニティの Slack](https://chirimen-oh.slack.com/) (未参加の場合は [自己登録フォーム](https://docs.google.com/forms/d/1GzkGfCcsRn4A6-uHPsLu2LszkqKcNJ3sFI4XRishHsE/viewform) から参加してください) にてご相談ください。宜しくお願いします。

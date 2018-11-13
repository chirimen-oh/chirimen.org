# Feedback

このサイトの内容への提案や誤りの指摘などがある場合は [Gibhub Issues](https://github.com/chirimen-oh/tutorials/issues) からお願いします。

サイトのテキスト本文は Markdown で書かれたファイルを GitHub Pages デフォルトで用意されているシンプルな [Jekyll テンプレート (Cayman)](https://github.com/pages-themes/cayman) で成形して出力しているものになります。

指摘や修正の提案を [Issues](https://github.com/chirimen-oh/tutorials/issues) で行って頂く以外にも、プルリクを送っていただくなどでも勿論構いません。

また、CHIRIMEN コミュニティメンバーで [チュートリアル用リポジトリ](https://github.com/chirimen-oh/tutorials/) の書き込み権限を持っている方は、Web ブラウザで Github にアクセスして各ページの markdown ファイルを直接編集していただくなどしても勿論構いません。

いずれかの方法でリポジトリの master ブランチのファイルを変更すると、自動的に Netlify でビルドされて数十秒程度で本番サイトに反映されます。ビルドの進捗や結果は [Netlify の Deploys](https://app.netlify.com/sites/tutorial-chirimen-org/deploys) で確認できます。

## 編集時の注意

本サイトは [GitHub Pages](https://help.github.com/articles/using-jekyll-as-a-static-site-generator-with-github-pages/) で使われている Jekyll テンプレートを使っていますが、実際のホスティングには GitHub Pages ではなく Netlify を利用しています。Markdown の変換は Github Pages となるべく互換になるようセットアップしていますが、全ての挙動が Github Pages と同様ではありません。

具体的には、Netlify 側の機能として、**各ページの URL は元ファイル名に関わらず小文字に統一** (大文字を含む URL にアクセスすると 301 で小文字 URL にリダイレクトされる)、**末尾の .html や .md あるいは / もなしでアクセス** できるようになります。リポジトリのファイルと Web での URL が異なるのは望ましくないため、**ディレクトリ名や Markdown ファイル名には原則全て小文字を使用してください**。また、Markdown ファイル内での **相対リンクについては GitHub Pages の時と同様 .md 付きの相対リンクで記述してください**。そうすることでサーバ側のビルド時に自動的に .md なしの相対リンクに変換されるので、サイト上でのリンクも GitHub Web 上でのリンクも両方が有効になります。

なお、Netlify でのビルドログなどは Github のコミット通知と併せて下記コミュニティ Slack の #github チャンネルに通知されるようになっています。編集結果が反映されない場合などはビルドに失敗していないか確認してください。

## ファイル構成とテンプレートの詳細

[チュートリアル用リポジトリ](https://github.com/chirimen-oh/tutorials/) 配下にある全ての markdown (.md) ファイルに対してそれに対応する HTML ページが生成されるシンプルな仕組みです。このページは /feedback.md ファイルから生成されているし、その他もリポジトリ内の markdown ファイルは拡張子 .md を外して全て小文字に統一されたパスの URL でアクセス可能になります。

既存のページの編集は既存の markdown ファイルを編集、新規ページの作成は追加したい URL に対応する markdown ファイルを作るだけで可能です。それ以外の js/css/img ファイル群はそのままサイトに反映されるのでサンプルコードなどはそのまま必要なファイルを置いてください。

* [_layouts](https://github.com/chirimen-oh/tutorials/tree/master/_layouts) - カスタムテンプレートファイルを保存するディレクトリ
  * [default.html](https://github.com/chirimen-oh/tutorials/blob/master/_layouts/default.html) - デフォルトテンプレート。参照している変数はリポジトリのメタデータや _config.yml で定義しているもの。
* raspi3 - CHIRIMEN Raspi3 チュートリアル (https://tutorial.chirimen.org/raspi3) 用のファイルを収めたディレクトリ。
* .eslintrc.yml, .prettierrc - ESLint や Prettier で使用する JavaScript のコーディングルール定義ファイル
* .ruby-version, Gemfile - Jekyll テンプレートでビルドするときに使う Ruby バージョンとパッケージ定義ファイル (Netlify でのビルド用)
* README.md - トップページ (https://tutorial.chirimen.org/) のファイル
* [_config.yml](https://github.com/chirimen-oh/tutorials/blob/master/_config.yml) - サイトの設定ファイル。ベースとするテーマやテーマのテンプレート中で変数として参照されている変数の定義を行う。[詳細は Github のヘルプなどを参照](https://help.github.com/articles/configuring-jekyll/)
* [_redirects](https://github.com/chirimen-oh/tutorials/blob/master/_redirects) - リダイレクトの定義ファイル。 [Netlify のドキュメント](https://www.netlify.com/docs/redirects/) を参照
* feedback.md - このページの元となる markdown ファイル
* package-lock.json, package-json - ESLint や Prettier を使って VS Code で編集したいときに Node のパッケージ群を `npm i` でインストールできるようにするためのパッケージ定義ファイル
* _site - リポジトリ上には存在しません。ビルド環境を構築して `jekyll build` コマンドでビルドを実行すると公開サイト用のファイルがこのディレクトリに生成され、それを Netlify の CDN でドキュメントルートとしてホストする設定になっています。

Jekyll で書かれた Github Pages の詳細については以下のドキュメントが参考になります:

* [GitHub Pages のヘルプドキュメント](https://help.github.com/articles/using-jekyll-as-a-static-site-generator-with-github-pages/)
* [Jekyll のドキュメント](https://jekyllrb.com/docs/) 配下の各ページ
  * [Jekyll のファイル構成](https://jekyllrb.com/docs/structure/)
  * [Configuration Options](https://jekyllrb.com/docs/configuration/options/)
  * [Front matter](https://jekyllrb.com/docs/front-matter/) markdown 冒頭の `---` 行で囲まれたメタデータ定義セクション (YAML front matter block) の説明
  * [Includes](https://jekyllrb.com/docs/includes/) 使い回したいパーツがある場合に `_includes` ディレクトリ配下に定義をおいて読み込む方法

## コミュニティ Slack

その他、何か不明な点がある場合は [コミュニティの Slack](https://chirimen-oh.slack.com/) (未参加の場合は [自己登録フォーム](https://docs.google.com/forms/d/1GzkGfCcsRn4A6-uHPsLu2LszkqKcNJ3sFI4XRishHsE/viewform) から参加してください) にてご相談ください。宜しくお願いします。

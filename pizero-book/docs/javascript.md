# JavaScript
標準化されたプログラミング言語の一種で、ウェブブラウザが代表的な実行環境です(プログラムコードを解釈して動作させるシステム)。CHIRIMENでもRasberry Pi及びmicro:bit版はウェブブラウザを実行環境として使用します。Raspberry Pi Zero版はNode.jsを実行環境として使っています。
別名としてECMA Scriptと呼ばれることもあります。
* [Mozilla Developer Networkの解説](https://developer.mozilla.org/ja/docs/Web/JavaScript)

## JavaScript の基礎
JavaScript に慣れていない人は、[「JavaScript 初学者向け資料集」](../js/readme.md)を参考にしてください。

* その他の情報：[予備知識・資料集の情報](../reference#javascript)

## javascriptコード・ライブラリの読み込み

### ウェブアプリ：HTMLで読み込み
Raspberry Pi Zero版以外のCHIRIMENはプログラムの起点はHTMLファイルです。（[ウェブアプリ](https://ja.wikipedia.org/wiki/%E3%82%A6%E3%82%A7%E3%83%96%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3)）ブラウザはまずHTMLファイルを読み込んだうえで、そこに書かれた内容で動きます。したがって作ったコードや必要なライブラリの読み込みは基本的に全てこのHTMLの中で指定します。（なお、javascript Moduleを有効化している場合はjavascriptコードの中でjsライブラリを読み込むことがある）

ポイントは `<script ...></script>` の部分です。
`polyfill.js` という JavaScript ライブラリを読み込んでいます。これは [Web GPIO API](http://browserobo.github.io/WebGPIO) と、[Web I2C API](http://browserobo.github.io/WebI2C) という W3C でドラフト提案中の 2 つの API への [Polyfill (新しい API を未実装のブラウザでも同じコードが書けるようにするためのライブラリ)](https://developer.mozilla.org/ja/docs/Glossary/Polyfill) で、最初に読み込むとそれ以降のコードで GPIO や I2C を操作する JavaScript API が使えるようになります。

次の行にある `main.js` は、JavaScript のプログラム本体です。

### Node.js (CHIRIMEN Raspberry Pi Zero版)
Raspberry Pi Zero版はプログラムの起点が自分が作ったjavascriptコード自体になります。ブラウザの代わりに[Node.js](https://ja.wikipedia.org/wiki/Node.js)というjavascriptコードだけを解釈するソフト（javascript [インタープリタ](https://ja.wikipedia.org/wiki/%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%97%E3%83%AA%E3%82%BF)）にコードを読み込ませて実行します。

CHIRIMEN環境のために必要なライブラリや、[I2Cデバイスのドライバ](#WebI2Cとデバイスドライバ)(後述)は次のECMA Script Moduleという仕組みを使って読み込みます。

<hr class="page-wrap" />

### javascript Module (ECMA Script Module)
* ウェブアプリでのModule有効化：HTMLのscript要素でjavascriptを読み込むとき、ttype="module"プロパティを設定する。
  * `<script type="module" src="main.js"></script>`
* import文で外部のライブラリを読み込む。
  *  `import {RelayServer} from "https://chirimen.org/remote-connection/js/beta/RelayServer.js";`
*  importされるライブラリ側には、importできるオブジェクトを指定するexport文を記述する。
  * `export {RelayServer};`
* [例を見てみる](https://codesandbox.io/s/github/chirimen-oh/chirimen.org/tree/master/pizero/esm-examples/remote_gpio_led/pc)
* [Mozilla Developer Networkの解説](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Modules)

## 非同期処理

物理デバイス制御やネットワーク通信などでは、応答待ち中にブラウザが停止しないよう非同期処理を使う必要があります。
本チュートリアルではこれを [async 関数](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/async_function) で記述しています。async 関数による非同期処理に慣れていない人は、[こちらの資料「非同期処理 (async await 版)」](../js/async.md) も参考にしてください。非同期処理についてより詳しくは [JS Primer の非同期処理説明ページ](https://jsprimer.net/basic/async/) をご覧ください。

非同期処理を使いこなすのは難しいですが、本チュートリアルでは次のルールでコードを書けば大丈夫です:

- **非同期関数の呼び出し時には前に `await` を付けて呼び出す**
  - 非同期関数呼び出し前に `await` を付けると、その処理の完了を待ってから次のコードが実行されます
  - GPIO/I2C の初期化、ポートの設定などは非同期処理なので `await` キーワードを付けて呼び出します
- **非同期処理を含む関数は前に `async` を付けて非同期関数として定義する**
  - `async function 関数名() { ... }` のように頭に `async` を付けるだけで非同期関数になります

非同期関数を `await` なしで呼び出すと返り値が Promise オブジェクトとなり、Promise を理解しないと返り値の判断や実行順序が入れ替わり意図せぬ挙動になります。例えば、ポートの初期化を `await` なしで呼ぶと、ポート初期化前に初期化未完了のハードウェアを操作しようとして失敗したりします。

ハードウェアを制御するときは基本的に非同期呼び出しをする (その処理を含む関数もまた非同期で呼びす) と決めておけば迷うことなく、コードの実行順序も上から下に見たとおりの順番で実行され読み書きしやすくなります。

<hr class="page-wrap" />

## 開発環境
### GitHub

* [予備知識・資料集を参照ください](../reference#github-)

### CodeSandbox

* [予備知識・資料集を参照ください](../reference#github-)
* ![CodeSandbox画面](../../pizero/imgs/RC_CSB.svg)

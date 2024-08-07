# 10.3.1 JavaScriptコード・ライブラリの読み込み
## ウェブアプリ：HTMLで読み込み
Raspberry Pi Zero 版以外の CHIRIMEN はプログラムの起点はHTMLファイルです。（[ウェブアプリ](https://ja.wikipedia.org/wiki/%E3%82%A6%E3%82%A7%E3%83%96%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3)）ブラウザはまずHTMLファイルを読み込んだうえで、そこに書かれた内容で動きます。したがって作ったコードや必要なライブラリの読み込みは基本的に全てこのHTMLの中で指定します。（なお、javascript Moduleを有効化している場合は JavaScriptコードの中で jsライブラリを読み込むことがある）

ポイントは `<script ...></script>` の部分です。
`polyfill.js` という JavaScript ライブラリを読み込んでいます。これは [Web GPIO API](http://browserobo.github.io/WebGPIO) と、[Web I2C API](http://browserobo.github.io/WebI2C) という W3C でドラフト提案中の 2 つの API への [Polyfill (新しい API を未実装のブラウザでも同じコードが書けるようにするためのライブラリ)](https://developer.mozilla.org/ja/docs/Glossary/Polyfill) で、最初に読み込むとそれ以降のコードで GPIO や I2C を操作する JavaScript API が使えるようになります。

次の行にある `main.js` は、JavaScript のプログラム本体です。

### Node.js (CHIRIMEN Raspberry Pi Zero版)
Raspberry Pi Zero版はプログラムの起点が自分が作ったjavascriptコード自体になります。ブラウザの代わりに[Node.js](https://ja.wikipedia.org/wiki/Node.js)というJavaScriptコードだけを解釈するソフト（JavaScript [インタープリタ](https://ja.wikipedia.org/wiki/%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%97%E3%83%AA%E3%82%BF)）にコードを読み込ませて実行します。

CHIRIMEN環境のために必要なライブラリや、[I2Cデバイスのドライバ](#WebI2Cとデバイスドライバ)(後述)は次の ECMA Script Module という仕組みを使って読み込みます。

### JavaScript Module (ECMA Script Module)
* ウェブアプリでのModule有効化：HTMLのscript要素でjavascriptを読み込むとき、ttype="module"プロパティを設定する。
  * `<script type="module" src="main.js"></script>`
* import文で外部のライブラリを読み込む。
  *  `import {RelayServer} from "https://chirimen.org/remote-connection/js/beta/RelayServer.js";`
*  importされるライブラリ側には、importできるオブジェクトを指定するexport文を記述する。
  * `export {RelayServer};`
* [例を見てみる](https://codesandbox.io/s/github/chirimen-oh/chirimen.org/tree/master/pizero/esm-examples/remote_gpio_led/pc)
* [Mozilla Developer Networkの解説](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Modules)

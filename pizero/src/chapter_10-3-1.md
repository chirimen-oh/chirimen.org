# 11.3.1 JavaScriptコードとライブラリの読み込み
## ウェブアプリはHTMLから読み込む
Raspberry Pi Zero 版以外の CHIRIMEN では、プログラムの起点がHTMLファイルです（[ウェブアプリ](https://ja.wikipedia.org/wiki/%E3%82%A6%E3%82%A7%E3%83%96%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3)）。ブラウザはまずHTMLファイルを読み込み、そこに書かれた内容にしたがって動き出します。作ったコードや必要なライブラリの読み込みも、基本的にはすべてこのHTMLの中で指定することになります(javascript Moduleを有効化している場合は、JavaScriptコードの中でさらにjsライブラリを読み込むこともあります)。

具体的には `<script ...></script>` の部分がその指定です。ここでは `polyfill.js` という JavaScript ライブラリを読み込んでいます。これは [Web GPIO API](http://browserobo.github.io/WebGPIO) と [Web I2C API](http://browserobo.github.io/WebI2C) という、W3C でドラフト提案中の 2 つの API への [Polyfill (新しい API を未実装のブラウザでも同じコードが書けるようにするためのライブラリ)](https://developer.mozilla.org/ja/docs/Glossary/Polyfill) です。これを最初に読み込んでおくことで、それ以降のコードから GPIO や I2C を操作する JavaScript API が使えるようになります。

次の行にある `main.js` が、実際のプログラム本体です。

### Node.js (CHIRIMEN Raspberry Pi Zero版)
Raspberry Pi Zero版のコードにHTMLファイルは登場しません。プログラムの起点そのものが、自分の書いたJavaScriptコードになるからです。ブラウザの代わりに、JavaScriptコードだけを解釈する[Node.js](https://ja.wikipedia.org/wiki/Node.js)というソフト（JavaScript [インタープリタ](https://ja.wikipedia.org/wiki/%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%97%E3%83%AA%E3%82%BF)）に、コードを直接読み込ませて実行します。

とはいえ、CHIRIMEN環境に必要なライブラリや[I2Cデバイスのドライバ](#WebI2Cとデバイスドライバ)(後述)を読み込む手段は必要です。HTMLがない以上、この読み込みは次の ECMA Script Module という仕組みが担います。

### JavaScript Module (ECMA Script Module)
* **ウェブアプリでのModule有効化**：HTMLのscript要素でJavaScriptを読み込むときに `type="module"` プロパティを設定します。
  * `<script type="module" src="main.js"></script>`
* **外部ライブラリの読み込み**：import文を使います。
  *  `import {RelayServer} from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";`
* **エクスポートの指定**：importされるライブラリ側には、importできるオブジェクトを指定するexport文を記述しておきます。
  * `export {RelayServer};`
* [例を見てみる](https://codesandbox.io/s/github/chirimen-oh/chirimen.org/tree/master/pizero/esm-examples/remote_gpio_led/pc)
* [Mozilla Developer Networkの解説](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Modules)

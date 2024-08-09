# 3.4 コードを読む
* 前提：CHIRIMEN Rasoberryu Pi Zero は Node.js をプログラム実行環境（インタープリタ）として使っています。
* Raspberry Pi Zero 版はプログラムの起点が自分が作った JavaScriptコード自体になります。
* ブラウザの代わりに[Node.js](https://ja.wikipedia.org/wiki/Node.js)という JavaScriptコードだけを解釈するソフト（JavaScript [インタープリタ](https://ja.wikipedia.org/wiki/%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%97%E3%83%AA%E3%82%BF)）にコードを読み込ませて実行します。

* ターミナルウィンドの右側のファイルマネージャで`hello.js` ⇒ 表示 を選び、ソースコードを読んでみましょう

```js
import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js"; // WebGPIO を使えるようにするためのライブラリをインポート
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec)); // sleep 関数を定義

async function blink() {
  const gpioAccess = await requestGPIOAccess(); // GPIO を操作する 
  const port = gpioAccess.ports.get(26); // 26 番ポートを操作する

  await port.export("out"); // ポートを出力モードに設定

  // 無限ループ
  for (;;) {
    // 1秒間隔で LED が点滅します
    await port.write(1); // LEDを点灯
    await sleep(1000);   // 1000 ms (1秒) 待機
    await port.write(0); // LEDを消灯
    await sleep(1000);   // 1000 ms (1秒) 待機
  }
}

blink();
```
* **1行目：WebGPIOライブラリを読み込み** ([JavaScript Module](./chapter_10-3-1.md)仕様に従って)

  ```js
  import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js";
  ```
  * [JavaScript module](./chapter_10-3-1.md) に基づいてWebGPIOライブラリを読み込みます。これで Web GPIO API が使えるようになりました。

* **5行目：GPIOポートの初期化処理**
  
  ```js
  const gpioAccess = await requestGPIOAccess();
  ```
  * 今回の JavaScript ファイルで、最初に呼び出されるコードは `await navigator.requestGPIOAccess()` です。
  * ここで先ほど出て来た [Web GPIO API](http://browserobo.github.io/WebGPIO) を使い、`gpioAccess` という GPIO にアクセスするためのインタフェースを取得しています。

**関数の呼び出しに `await` 接頭詞を付けることに注意してください。** この関数は非同期関数で、その処理の完了を待ってから次の処理をする必要があります。また、`await` 接頭詞を使うコードを含むために、それを含む関数 `main()` は async 接頭詞付きの非同期関数として定義する必要があります。

* **6-8行目：GPIOPortの出力処理**
  
  ```js
  const port = gpioAccess.ports.get(26);
  ```
  * GPIOの**出力**機能を使います。
  * **`const port = gpioAccess.ports.get(26)` で GPIO の 26 番ポートにアクセスするためのオブジェクト** を取得しています。
  
  ```js
  await port.export("out");
  ```
  * 続いて、 **`await port.export("out")` で GPIO の 26 番を「出力設定」にしています**。これにより LED への電圧の切り替えが可能になっています。

* **11行目以降：無限ループ部分**
  * 最後に、無限ループのなかで `await sleep(1000)` によって 1000 ms (1 秒) 待機させます。
  * 1 秒ごとに `await port.write(1)` と `await port.write(0)` を交互に呼び出し、GPIO 26 番に加える電圧を 3.3V → 0V → 3.3V → 0V → … と繰り返しています。
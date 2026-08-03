# 3.4 コードを読む
* 前提：CHIRIMEN Raspberry Pi Zero は Node.js をプログラム実行環境（インタープリタ）として使っています。
* Raspberry Pi Zero 版では、プログラムの起点は自分が書いた JavaScript コードそのものになります。
* ブラウザの代わりに、[Node.js](https://ja.wikipedia.org/wiki/Node.js) という JavaScript コードだけを解釈するソフト（JavaScript [インタープリタ](https://ja.wikipedia.org/wiki/%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%97%E3%83%AA%E3%82%BF)）にコードを読み込ませて実行します。

* ターミナルウィンドの右側のファイルマネージャで`hello.js` ⇒ 表示 を選び、ソースコードを読んでみましょう

```js
import { requestGPIOAccess } from "node-web-gpio"; // WebGPIO を使えるようにするためのライブラリをインポート
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
  import { requestGPIOAccess } from "node-web-gpio";
  ```
  * [JavaScript module](./chapter_10-3-1.md) の仕組みで WebGPIO ライブラリを読み込んでいます。これで Web GPIO API が使えるようになりました。

* **5行目：GPIOポートの初期化処理**
  
  ```js
  const gpioAccess = await requestGPIOAccess();
  ```
  * このファイルで最初に実行されるのが `await requestGPIOAccess()` です。[Web GPIO API](http://browserobo.github.io/WebGPIO) の関数で、GPIO にアクセスするためのインタフェース `gpioAccess` を取得しています。

**関数の呼び出しに `await` 接頭詞が付いていることに注目してください。** `requestGPIOAccess()` は非同期関数で、GPIO への準備が整うまで処理を待つ必要があります。`await` を使うコードを含む関数は、`blink()` のように `async` 接頭詞付きの非同期関数として定義しなければなりません。

* **6〜8行目：GPIOPortの出力処理**
  
  ```js
  const port = gpioAccess.ports.get(26);
  ```
  * GPIO の**出力**機能を使う準備として、`gpioAccess.ports.get(26)` で GPIO の 26 番ポートにアクセスするためのオブジェクトを取得しています。
  
  ```js
  await port.export("out");
  ```
  * 続いて `await port.export("out")` で GPIO の 26 番を「出力設定」にしています。これにより LED への電圧の切り替えが可能になります。

* **11行目以降：無限ループ部分**
  * ループの中身は、電圧の切り替えとその合間の待機の繰り返しにすぎません。`await port.write(1)` と `await port.write(0)` を交互に呼び出し、GPIO 26 番に加える電圧を 3.3V → 0V → 3.3V → 0V → … と切り替えています。切り替えの間隔を作っているのが `await sleep(1000)` で、1000 ms (1 秒) が経つまで次の書き込みを待たせています。
# 4.5.1 Lチカのコードを書き換える
- Lチカのコードを書き換えて、スイッチで動作するように変更します。
- 正しく回路を接続してコードを書き換えると、ボタンを押したときに LED やモーターが動作するようになります。
  - うまく動作しない方は、コピペで動作を確認してみましょう。
- port 変数を、初期化コードと showPort 関数の両方から使えるように宣言しなおします。

```js
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let port; // port 変数を初期化コードと showPort 関数の両方から使えるように宣言

const gpioAccess = await requestGPIOAccess();
port = gpioAccess.ports.get(26); // 26 番ポートを操作する、ここの変数は宣言済みなので const は削除する
```

- 無限ループの処理は削除します。

```js
/* ここは削除する
// 無限ループ
while (true) {
  // 1秒間隔で LED が点滅します
  await port.write(1); // LEDを点灯
  await sleep(1000);   // 1000 ms (1秒) 待機
  await port.write(0); // LEDを消灯
  await sleep(1000);   // 1000 ms (1秒) 待機
}
```

- ボタンの初期化処理を記述します。

```js
const port2 = gpioAccess.ports.get(5);
await port2.export("in");
port2.onchange = showPort;
```

- ボタンの処理を追記します。

```js
function showPort(ev){
	console.log(ev.value);
    if (ev.value==0){
        port.write(1);
    } else {
        port.write(0);
    }
}
```

- 全体のソースコードは以下のとおりです。

```js
import { requestGPIOAccess } from "node-web-gpio"; // WebGPIO を使えるようにするためのライブラリをインポート
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // sleep 関数を定義
let port; // port 変数を初期化コードと showPort 関数の両方から使えるように宣言

const gpioAccess = await requestGPIOAccess(); // GPIO を操作する
port = gpioAccess.ports.get(26); // 26 番ポートを操作する、ここの変数は宣言済みなので const 宣言は削除する

await port.export("out"); // ポートを出力モードに設定

// ここから記述する
const port2 = gpioAccess.ports.get(5);
await port2.export("in");
port2.onchange = showPort;

function showPort(ev){
	console.log(ev.value);
    if (ev.value==0){
        port.write(1);
    } else {
        port.write(0);
    }
}
// ここまで
```
このコードは、CHIRIMENパネルのID: **gpio-inout** と同じです。うまく動作しなかった場合は、そちらのコードと見比べて確認してください。

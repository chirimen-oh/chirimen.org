# 4.5.1 Lチカのコードを書き換える
- Lチカのコードを書き換えて、スイッチで動作するように変更します。
- 正しく回路を接続してコードを書き換えると、ボタンを押したときに LED やモーターが動作するようになります。
  - うまく動作しない方は、コピペで動作を確認してみましょう。

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
*/
```

- スイッチ用のポートを新しい変数 `port2` で取得し、入力モードに設定します。LED 用の `port` 変数は Lチカのコードのまま（`const` 宣言のまま）で構いません。あとで追加するコールバック関数の中から参照しても問題なく使えます。

```js
const port2 = gpioAccess.ports.get(5);
await port2.export("in");
```

- スイッチの状態が変化したときの処理を、コールバック関数として `port2.onchange` に追記します。

```js
port2.onchange = async (e) => {
  console.log(e.value);
  if (e.value == 0) {
    await port.write(1);
  } else {
    await port.write(0);
  }
};
```

- 全体のソースコードは以下のとおりです。

```js
import { requestGPIOAccess } from "node-web-gpio"; // WebGPIO を使えるようにするためのライブラリをインポート
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // sleep 関数を定義

const gpioAccess = await requestGPIOAccess(); // GPIO を操作する
const port = gpioAccess.ports.get(26); // 26 番ポートを操作する

await port.export("out"); // ポートを出力モードに設定

// ここから記述する
const port2 = gpioAccess.ports.get(5);
await port2.export("in");
port2.onchange = async (e) => {
  console.log(e.value);
  if (e.value == 0) {
    await port.write(1);
  } else {
    await port.write(0);
  }
};
// ここまで
```
このコードは、CHIRIMENパネルのID: **gpio-inout** と同じです。うまく動作しなかった場合は、そちらのコードと見比べて確認してください。

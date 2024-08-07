# 10.4.3 GPIOPortの入力処理（ポーリング）
### 単純入力＋ポーリング
こちらはGPIOポートの入力値を一回きり単発で取得する単純入力機能と、ポーリングの組み合わせです。

#### ポーリングとは
様々な情報や値の取得や入力のための基本的な機能・関数は、入力を指定した瞬間、一回きり取得するだけのものがほとんどです。そこで、無限ループをつくりこの中で一回きりの入力を定期的に繰り返すことで、入力の変化を読み取る　ということがよく行われます。このような処理を一般にポーリングと呼びます。 ([wikipedia:ポーリング](https://ja.wikipedia.org/wiki/%E3%83%9D%E3%83%BC%E3%83%AA%E3%83%B3%E3%82%B0_(%E6%83%85%E5%A0%B1)))
ポーリングはセンサーの情報入力だけでなく、たとえば電子メールの到着を通知するために定期的にメールサーバにメール着信数を確認する　といった、ネットワークサービスでの処理など様々なシステムで広く使われています。

#### GPIOの単純入力関数
単純に「GPIO ポートの状態を読み込む」には `port.read()` を使います。

`port.read()` で GPIO を読み込むコードは次のように書けます:

```js
const gpioAccess = await navigator.requestGPIOAccess();
const switchPort = gpioAccess.ports.get(5); // GPIO ポート 5 番を取得
await switchPort.export("in"); // 「入力モード」に
const state = await switchPort.read(); // GPIO ポート 5 番に接続したスイッチの状態を読み込む
```

##### await port.export()

`port.export("in")` により取得した **GPIO ポートを「入力モード」で初期化** しています。このモードは GPIO ポートにかかる電圧を Web アプリ側から読み取りたい時に使います。初期化は非同期処理であり `await` で完了を待つ必要があることに注意してください。

##### await port.read()

`port.export("in")` で入力モードに設定した **GPIO ポートの現時点の状態を読み取ります**。読み取りは非同期処理になるので `await` で完了を待つようにしてください。

##### ポーリングルーチン
上記コードで GPIO ポートの読み取りを 1 度だけ行えますが、今回は「スイッチが押され状態を監視する」必要がありますので、定期的に `await port.read()` を繰り返して GPIO ポートの状態を監視するポーリングのルーチンを組みます。

```js
const gpioAccess = await navigator.requestGPIOAccess();
const switchPort = gpioAccess.ports.get(5);
await switchPort.export("in");
// 無限ループ
while (true) {
  const state = await switchPort.read(); /
  //
  // ここにswitchの状態による処理を書き足す
  //
  await sleep(100); // 100 ms 待機
}

// sleep() は polyfill 内で定義済みなので省略可能:
function sleep(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
}
```
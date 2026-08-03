# 11.4.3 GPIOPortの入力処理（ポーリング）

### 単純入力＋ポーリング

GPIO ポートの値を読み取る関数は、呼び出された瞬間の状態を一回だけ返します。では、スイッチが押されたことをどう検知すればよいのでしょうか。答えは、この一回きりの読み取りと、後述するポーリングを組み合わせることにあります。

#### ポーリングとは

入力や値取得のための基本的な関数は、たいてい一回きりの値しか返しません。指定した瞬間の状態を読み取ったら、それで処理は終わりです。値の変化を追いたいなら、この一回きりの読み取りを自分で繰り返すしかありません。無限ループの中に読み取り処理を置き、一定間隔で呼び出し続けることで、変化を検知します。この手法は一般に**ポーリング**と呼ばれます（[wikipedia:ポーリング](<https://ja.wikipedia.org/wiki/%E3%83%9D%E3%83%BC%E3%83%AA%E3%83%B3%E3%82%B0_(%E6%83%85%E5%A0%B1)>)）。
ポーリングが使われるのは、センサーの入力に限りません。たとえば電子メールの着信通知も、メールサーバに着信数を定期的に問い合わせることで実現されている場合が多く、ネットワークサービス全般で広く使われている手法です。

#### GPIOの単純入力関数

GPIO ポートの状態を読み込むだけなら、`port.read()` を呼ぶだけで済みます。

`port.read()` で GPIO を読み込むコードは次のように書けます:

```js
const gpioAccess = await navigator.requestGPIOAccess();
const switchPort = gpioAccess.ports.get(5); // GPIO ポート 5 番を取得
await switchPort.export("in"); // 「入力モード」に
const state = await switchPort.read(); // GPIO ポート 5 番に接続したスイッチの状態を読み込む
```

##### await port.export()

`port.export("in")` は、**GPIO ポートを「入力モード」で初期化**する呼び出しです。入力モードは、ポートにかかる電圧を Web アプリ側から読み取りたいときに使います。初期化は非同期処理なので、`await` で完了を待つ必要があります。

##### await port.read()

`port.read()` は、入力モードに設定した **GPIO ポートの現時点の状態を読み取り**ます。これも非同期処理なので、`await` で完了を待つ必要があります。

##### ポーリングルーチン

ここまでのコードで読み取れるのは、呼び出した瞬間の状態一回分だけです。スイッチが押されたかどうかを監視するには、これでは足りません。そこで `await port.read()` を一定間隔で繰り返し呼び出し、GPIO ポートの状態を監視するポーリングのルーチンを組みます。

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
```

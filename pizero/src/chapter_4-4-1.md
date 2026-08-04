# 4.4.1 polling コードを読む
値の取得や入力のための基本的な関数は、呼び出した瞬間の値を一回だけ返すものがほとんどです。値そのものではなく値の変化を捉えたいなら、この一回きりの読み取りを無限ループの中で定期的に繰り返す必要があります。この繰り返しの手法を一般に**ポーリング**と呼びます（[wikipedia:ポーリング](https://ja.wikipedia.org/wiki/%E3%83%9D%E3%83%BC%E3%83%AA%E3%83%B3%E3%82%B0_(%E6%83%85%E5%A0%B1))）。

ターミナルウィンドの右側のファイルマネージャでmain-gpio-polling.js⇒表示 を選び、ソースコードを読んでみましょう

```js
import { requestGPIOAccess } from "node-web-gpio";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const gpioAccess = await requestGPIOAccess();
const port = gpioAccess.ports.get(5);

await port.export("in");

while (true) {
  const v = await port.read();
  console.log(v);
  await sleep(300);
}
```

GPIO ポートの初期化は、Lチカの [3.4 コードを読む](./chapter_3-4.md) と同じ手順です。`port.export("in")` で GPIO ポートを「入力モード」に初期化しており、この初期化は非同期処理なので `await` で完了を待つ必要があります。入力モードは、GPIO ポートにかかる電圧を Web アプリ側から読み取りたいときに使います。

読み取り自体は `port.read()` が一回分の値を返すだけの単純な関数です。しかしスイッチが押されたかどうかを監視するには、一回読んで終わりにはできません。そこで `await port.read()` を無限ループの中に置き、300 ms おきに読み直すことでポーリングのルーチンを組んでいます。
# 4.4.1 polling コードを読む
様々な情報や値の取得や入力のための基本的な機能・関数は、入力を指定した瞬間、一回きり取得するだけのものがほとんどです。そこで、無限ループをつくりこの中で一回きりの入力を定期的に繰り返すことで、入力の変化を読み取る　ということがよく行われます。このような処理を一般にポーリングと呼びます。 ([wikipedia:ポーリング](https://ja.wikipedia.org/wiki/%E3%83%9D%E3%83%BC%E3%83%AA%E3%83%B3%E3%82%B0_(%E6%83%85%E5%A0%B1)))

ターミナルウィンドの右側のファイルマネージャでmain-gpio-polling.js⇒表示 を選び、ソースコードを読んでみましょう

```js
import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

async function switchCheck() {
  const gpioAccess = await requestGPIOAccess();
  const port = gpioAccess.ports.get(5);

  await port.export("in");

  for(;;){
    const v = await port.read();
	console.log(v);
    await sleep(300);
  }

}

switchCheck();
```

GPIOポートの初期化は Lチカの [3.4 コードを読む](./chapter_3-4.md)と同様の処理を行っています。

`port.export("in")` により取得した **GPIO ポートを「入力モード」で初期化** しています。このモードは GPIO ポートにかかる電圧を Web アプリ側から読み取りたい時に使います。初期化は非同期処理であり `await` で完了を待つ必要があることに注意してください。
単純に「GPIO ポートの状態を読み込む」には `port.read()` を使います。

「スイッチが押された状態を監視する」必要がありますので、定期的に `await port.read()` を繰り返して GPIO ポートの状態を監視するポーリングのルーチンを無限ループで組んでいます。
# 11.4.1 GPIOポートの初期化と出力処理
## GPIOポートの初期化
このコードで最初に呼び出されるのが `await navigator.requestGPIOAccess()` です。
先に触れた [Web GPIO API](http://browserobo.github.io/WebGPIO) の関数で、GPIO にアクセスするためのインタフェース `gpioAccess` を取得しています。

```js
  const gpioAccess = await navigator.requestGPIOAccess(); // GPIO を操作する
```

呼び出しに `await` が付いているのは、`requestGPIOAccess()` が非同期関数であり、GPIO へのアクセス許可が下りるまで処理を待つ必要があるからです。`await` を使うコードを含む関数は、この後の `main()` のように `async` 接頭詞付きの非同期関数として定義しなければなりません。

## GPIOPort の出力処理
GPIO の**出力**機能を使うには、まず操作対象のポートを取得します。

```js
  const port = gpioAccess.ports.get(26); // 26 番ポートを操作する
```

`gpioAccess.ports.get(26)` は、GPIO の 26 番ポートにアクセスするためのオブジェクトを返します。ただしこの時点では、まだポートは入力にも出力にも使える状態になっていません。

```js
  await port.export("out"); // ポートを出力モードに設定
```

`await port.export("out")` で 26 番ポートを「出力設定」にすると、LED にかける電圧を切り替えられるようになります。

```js
  // 無限ループ
  while (true) {
    // 1秒間隔で LED が点滅します。
    await port.write(1); // LED を点灯
    await sleep(1000); // 1000 ms (1秒) 待機
    await port.write(0); // LED を消灯
    await sleep(1000); // 1000 ms (1秒) 待機
  }
```

あとは電圧の切り替えを繰り返すだけです。`await port.write(1)` と `await port.write(0)` を交互に呼び出し、GPIO 26 番に加える電圧を 3.3V → 0V → 3.3V → 0V → … と切り替えています。合間に挟んだ `await sleep(1000)` が 1000 ms (1 秒) の待ち時間を作り、切り替えの間隔を 1 秒に保っています。

LED は、一定以上の電圧を加えて電流を流すと点灯する部品です。3.3 V を加えれば点灯し、0 V に落とせば消灯します。このループがしているのは、その点灯と消灯をひたすら繰り返すことだけです。

### サンプルコードを編集してみよう
- 点滅周期を速くしたり遅くしたりしてみる（```sleep()```の引数を変更）
- 点灯する時間と消灯する時間を変えてみる（同上）
- GPIO ポートを別のポートに変え、配線もあわせて変えてみる（```gpioAccess.ports.get```の引数を変更）



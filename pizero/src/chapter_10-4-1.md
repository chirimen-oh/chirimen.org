# 10.4.1 GPIOポートの初期化と出力処理
## GPIOポートの初期化
今回の JavaScript ファイルで、最初に呼び出されるコードは `await navigator.requestGPIOAccess()` です。
ここで先ほど出て来た [Web GPIO API](http://browserobo.github.io/WebGPIO) を使い、`gpioAccess` という GPIO にアクセスするためのインタフェースを取得しています。

```js
  const gpioAccess = await navigator.requestGPIOAccess(); // GPIO を操作する
```

**関数の呼び出しに `await` 接頭詞を付けることに注意してください。** この関数は非同期関数で、その処理の完了を待ってから次の処理をする必要があります。また、`await` 接頭詞を使うコードを含むために、それを含む関数 `main()` は async 接頭詞付きの非同期関数として定義する必要があります。

## GPIOPort の出力処理
GPIOの**出力**機能を使います。
**`const port = gpioAccess.ports.get(26)` で GPIO の 26 番ポートにアクセスするためのオブジェクト** を取得しています。

```js
  const port = gpioAccess.ports.get(26); // 26 番ポートを操作する
```

続いて、 **`await port.export("out")` で GPIO の 26 番を「出力設定」にしています**。これにより LED への電圧の切り替えが可能になっています。

```js
  await port.export("out"); // ポートを出力モードに設定
```

最後に、無限ループのなかで `await sleep(1000)` によって 1000 ms (1 秒) 待機さ 1 秒ごとに `await port.write(1)` と `await port.write(0)` を交互に呼び出し、GPIO 26 番に加える電圧を 3.3V → 0V → 3.3V → 0V → … と繰り返しています。

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

LED は一定以上の電圧を加え、電流を流すと点灯する性質を持っています。
つまり、3.3 V を加えたとき点灯し、0 V を加えたとき消灯、これを繰り返すことになります。

### サンプルコードを編集してみよう
- 点滅周期を早く・遅く (```sleep()```の引数を変更)
- 点灯する時間と消灯する時間を変える (同上)
- GPIO ポートを他のポートに変える・配線を変える (```gpioAccess.ports.get```の引数を変更)



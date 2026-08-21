# 11.4.2 GPIOPortの入力処理（onchange）
GPIO ポートに繋いだスイッチやセンサーの状態を取得するには、GPIO の**入力**機能を使います。出力と違って、入力には onchange とポーリングという二つの方法があります。まずは onchange から見ていきます。

## onchange編
GPIO ポートの値が変化するたびに、指定した関数が実行されるコードです。

```js
async function main() {
  const button = document.getElementById("button");
  const ledView = document.getElementById("ledView");
  const gpioAccess = await navigator.requestGPIOAccess();
  const ledPort = gpioAccess.ports.get(26); // LED の GPIO ポート番号
  await ledPort.export("out");
  const switchPort = gpioAccess.ports.get(5); // タクトスイッチの GPIO ポート番号
  await switchPort.export("in");

  async function light(lit) {
    await ledPort.write(lit ? 1 : 0);
    const color = lit ? "red" : "black";
    ledView.style.backgroundColor = color;
  }

  button.onmousedown = async function() {
    await light(true);
  };

  button.onmouseup = async function() {
    await light(false);
  };

  // Pull-up なので押したとき 0、それ以外では 1 が得られる
  switchPort.onchange = async function(state) {
    const lit = state === 0;
    await light(lit);
  };
}

main();
```

`port.onchange` は、入力モードの GPIO ポートに「状態が変化したときに呼び出す関数」を設定する機能です。このように呼び出される関数を**コールバック関数**と呼びます。値を定期的に読みに行く `port.read()` を使ったポーリングのコード（後述）と異なり、自分でポーリング処理を書く必要がなくコードも簡潔になりますが、呼ばれるのは値が変化した瞬間だけなので、現在の値をいつでも取得したい用途にはあまり向きません。

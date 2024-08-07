# 10.4.2 GPIOPortの入力処理（onchange）
GPIOポートに繋いだスイッチやセンサーの状態を取得するには、GPIOの**入力**機能を使います。出力とは違って入力は二つの方法があります。onchangeとポーリングの二つの方法があります。

## onchange編
GPIOポートの値が変化するたびに、指定した関数が実行されます。

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

 `port.onchange` は **入力モードの GPIO ポートの「状態変化時に呼び出される関数を設定する」** 機能です。このような関数のことをコールバック関数と呼びます。下記の`port.read()` を使ったコードと異なりポーリング処理が不要でコードも簡潔ですが、値が変化したタイミング以外では読み取りができませんのでユースケースが少し限られます。

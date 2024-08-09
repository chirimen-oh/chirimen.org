# 4.3.1 onchange コードを読む
ターミナルウィンドの右側のファイルマネージャでmain-gpio-onchange.js⇒表示 を選び、ソースコードを読んでみましょう

* GPIOポートの値が変化するたびに、指定した関数が実行されます。

```js
import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

async function switchCheck() {
  const gpioAccess = await requestGPIOAccess();
  const port = gpioAccess.ports.get(5);

  await port.export("in");
  port.onchange = showPort;

}

function showPort(ev){
	console.log(ev.value);
}

switchCheck();
```

GPIOポートの初期化は Lチカの [3.4 コードを読む](./chapter_3-4.md)と同様の処理を行っています。今回のコードでは 5 番ポートにアクセスするためのオブジェクトを取得し、**GPIO入力**機能を使って 5番を「入力設定」にしています。

`port.onchange` は **入力モードの GPIO ポートの「状態変化時に呼び出される関数を設定する」** 機能です。このような関数のことをコールバック関数と呼びます。`port.read()` を使ったコードと異なり[ポーリング処理](./chapter_4-4.md)が不要でコードも簡潔ですが、値が変化したタイミング以外では読み取りができませんのでユースケースが少し限られます。
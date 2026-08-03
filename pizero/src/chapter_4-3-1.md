# 4.3.1 onchange コードを読む
ターミナルウィンドの右側のファイルマネージャでmain-gpio-onchange.js⇒表示 を選び、ソースコードを読んでみましょう

* GPIO ポートの値が変化するたびに、指定した関数が呼び出されるコードです。

```js
import { requestGPIOAccess } from "node-web-gpio";
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

GPIO ポートの初期化は、Lチカの [3.4 コードを読む](./chapter_3-4.md) で見た手順と同じです。ここでは 5 番ポートにアクセスするためのオブジェクトを取得し、GPIO **入力**機能を使って 5 番を「入力設定」にしています。

これだけでは、値を読み取ることはできても変化には気づけません。そこで使うのが `port.onchange` です。入力モードの GPIO ポートに「状態が変化したときに呼び出す関数」を設定する機能で、このように呼び出される関数を**コールバック関数**と呼びます。値を都度読みに行く `port.read()` のコードと違って[ポーリング処理](./chapter_4-4.md)を自分で書く必要がなく、コードは簡潔になります。ただし呼ばれるのは値が変化した瞬間だけなので、現在の値をいつでも取得したい用途にはあまり向きません。
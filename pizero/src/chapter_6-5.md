# 6.5 PiZero 側のコードを読む

## Raspberry Pi Zero側コード

- ターミナルウィンドの右側のファイルマネージャで `main-remote_gpio_led.js` を選び、[表示] からソースコードを開いてみましょう。

```js
import { requestGPIOAccess } from "node-web-gpio";
import nodeWebSocketLib from "websocket"; // https://www.npmjs.com/package/websocket
import { RelayServer } from "./RelayServer.js";

let channel;
let gpioPort0;

function controlLED(messge) {
  console.log(messge.data);
  switch (messge.data) {
    case "LED ON":
      gpioPort0.write(1);
      console.log("ON");
      channel.send("LEDをオンにしました");
      break;
    case "LED OFF":
      gpioPort0.write(0);
      console.log("OFF");
      channel.send("LEDをオフにしました");
      break;
  }
}

// GPIOポート0の初期化
const gpioAccess = await requestGPIOAccess();
const mbGpioPorts = gpioAccess.ports;
gpioPort0 = mbGpioPorts.get(26);
await gpioPort0.export("out");

// webSocketリレーの初期化
const relay = RelayServer(
  "chirimentest",
  "chirimenSocket",
  nodeWebSocketLib,
  "https://chirimen.org",
);
channel = await relay.subscribe("chirimenLED");
console.log("web socketリレーサービスに接続しました");
channel.onmessage = controlLED;
```

LEDを点けたり消したりする指示は、Raspberry Pi Zero自身が思いつくわけではありません。指示はネットワークの向こう、PC側から届きます。冒頭の `import` を見ると、これまで通りWebGPIOライブラリを読み込んだあとに、見慣れない2行が続いているのはそのためです。

```js
import nodeWebSocketLib from "websocket";
import { RelayServer } from "./RelayServer.js";
```

ブラウザにはWebSocketの機能が標準で組み込まれていますが、Node.jsにはありません。そのため[relayServer.js](./chapter_10-6.md)ライブラリに加えて、webSocket自体のライブラリも読み込んでおく必要があります。

あとの流れは単純です。[relayServer.js](./chapter_10-6.md)を使って接続を[初期化](./chapter_10-6.md)し、メッセージが届くたびに呼ばれる関数を[受信処理](./chapter_10-6.md)(コールバック関数)として登録します。届いた文字列をもとに[GPIO出力を操作](./chapter_10-6.md)するのは最後の一手間で、`"LED ON"` なら点灯、`"LED OFF"` なら消灯です。それ以外の文字列が届いても、コードは何もしません。

コードの詳細解説は[こちら](./chapter_10-6.md)を参照してください。

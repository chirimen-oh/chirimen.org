# 6.5 PiZero 側のコードを読む
## Raspberry Pi Zero側コード
* ターミナルウィンドの右側のファイルマネージャでmain-remote_gpio_led.js⇒表示 を選び、ソースコードを読んでみましょう

```js
import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
import nodeWebSocketLib from "websocket"; // https://www.npmjs.com/package/websocket
import {RelayServer} from "./RelayServer.js";

var channel;
var gpioPort0;

async function connect(){
	// GPIOポート0の初期化
	var gpioAccess = await requestGPIOAccess();
	var mbGpioPorts = gpioAccess.ports;
	gpioPort0 = mbGpioPorts.get(26);
	await gpioPort0.export("out"); //port0 out
	
	// webSocketリレーの初期化
	var relay = RelayServer("chirimentest", "chirimenSocket" , nodeWebSocketLib, "https://chirimen.org");
	channel = await relay.subscribe("chirimenLED");
	console.log("web socketリレーサービスに接続しました");
	channel.onmessage = controlLED;
}

function controlLED(messge){
	console.log(messge.data);
	if ( messge.data =="LED ON"){
		gpioPort0.write(1);
		console.log("ON");
		channel.send("LEDをオンにしました");
	} else if ( messge.data =="LED OFF"){
		gpioPort0.write(0);
		console.log("OFF");
		channel.send("LEDをオフにしました");
	}
}

connect();
```
プログラムは以下の流れで実行されています。
* これまで通りWebGPIOライブラリの読み込み
* [relayServer.js](./chapter_10-6.md)ライブラリの読み込み
  * Node.jsではrelayServerライブラリに加えて、webSocketライブラリの読み込みが必要です。

```js
import nodeWebSocketLib from "websocket";
import {RelayServer} from "./RelayServer.js";
```

* [relayServer.js](./chapter_10-6.md)を使って、PCからの操作指示を受信
  * [初期化](./chapter_10-6.md)
  * [受信処理](./chapter_10-6.md)(コールバック関数の設定)
* 受信した内容をもとに[GPIO出力を操作](./chapter_10-6.md)してLEDを点灯・消灯

コードの詳細解説は[こちら](./chapter_10-6.md)を参照してください
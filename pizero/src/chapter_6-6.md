# 6.6 PC 側のコードを読む
## PC側コード
* CodeSandboxで開いている `PC.js` を見てみましょう
```js
// Remote Example4 - controller
import {RelayServer} from "https://chirimen.org/remote-connection/js/beta/RelayServer.js";

window.OnLED = OnLED;
window.OffLED = OffLED;

var channel;
onload = async function(){
	// webSocketリレーの初期化
	var relay = RelayServer("chirimentest", "chirimenSocket" );
	channel = await relay.subscribe("chirimenLED");
	messageDiv.innerText="web socketリレーサービスに接続しました";
	channel.onmessage = getMessage;
}

function getMessage(msg){ // メッセージを受信したときに起動する関数
	messageDiv.innerText = msg.data;
}

function OnLED(){ // LED ON
	channel.send("LED ON");
}
function OffLED(){ // LED OFF
	channel.send("LED OFF");
}
```
プログラムは以下の流れで実行されています。
* [JavaScript Module](./chapter_10-3-1.md)仕様に基づいて `relayServer.js` を読み込み
```js
import {RelayServer} from "https://chirimen.org/remote-connection/js/beta/RelayServer.js";
```
* [relayServer.js](../chirimenGeneric/#relayserverjs)を使い、UIを通してユーザからの操作指示を送信
  * [初期化](./chapter_10-6.md)
  * [送信処理](./chapter_10-6.md)～（UI(ボタン)に設置したコールバック関数をもとに送信

コードの詳細解説は[こちら](./chapter_10-6.md)を参照してください
# 6.6 PC 側のコードを読む
## PC側コード
* CodeSandboxで開いている `PC.js` を見てみましょう。
```js
// Remote Example4 - controller
import {RelayServer} from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

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
さきほど読んだPiZero側のコードは、メッセージが届くのをひたすら待つだけでした。では、そのメッセージは誰が、どうやって送っているのでしょうか。答えはこのPC側のコードにあります。

冒頭のimport文を見ると、読み込んでいるのは同じ `relayServer.js` ですが、指定しているのはローカルのファイルパスではなくURLです。

```js
import {RelayServer} from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";
```

これは[JavaScript Module](./chapter_10-3-1.md)の仕様に基づいた読み込み方で、ネットワーク越しに公開されているライブラリもそのままimportできます。

[relayServer.js](../chirimenGeneric/#relayserverjs)の役割はPiZero側と同じく[初期化](./chapter_10-6.md)ですが、そのあとの動きは逆です。PiZero側はメッセージの受信をきっかけに動いていましたが、PC側は `OnLED` と `OffLED` という2つの関数を通じて[送信処理](./chapter_10-6.md)を行います。この2つはUI(ボタン)に設置したコールバックとして呼ばれ、呼ばれるたびに `"LED ON"` または `"LED OFF"` という文字列を送り出します。

コードの詳細解説は[こちら](./chapter_10-6.md)を参照してください。
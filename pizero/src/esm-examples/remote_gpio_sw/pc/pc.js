// Remote Example4 - controller
import {RelayServer} from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

var channel;
onload = async function(){
	// webSocketリレーの初期化
	var relay = RelayServer("chirimentest", "chirimenSocket" );
	channel = await relay.subscribe("chirimenSW");
	messageDiv.innerText="web socketリレーサービスに接続しました";
	channel.onmessage = getMessage;
}

function getMessage(msg){ // メッセージを受信したときに起動する関数
	messageDiv.innerText = "スイッチが、"+msg.data+"になりました。";
}


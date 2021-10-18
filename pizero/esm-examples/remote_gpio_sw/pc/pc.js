// Remote Example4 - controller
import {RelayServer} from "../RelayServer.js";

var channel;
onload = async function(){
	// webSocketリレーの初期化
	var relay = RelayServer("achex", "chirimenSocket" );
	channel = await relay.subscribe("chirimenSW");
	messageDiv.innerText="achex web socketリレーサービスに接続しました";
	channel.onmessage = getMessage;
}

function getMessage(msg){ // メッセージを受信したときに起動する関数
	messageDiv.innerText = "スイッチが、"+msg.data+"になりました。";
}


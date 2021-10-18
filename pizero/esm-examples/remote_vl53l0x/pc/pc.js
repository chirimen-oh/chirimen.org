// Remote Example1 - controller
import {RelayServer} from "https://chirimen.org/remote-connection/js/beta/RelayServer.js";

var channel;
onload = async function(){
	// webSocketリレーの初期化
	var relay = RelayServer("achex", "chirimenSocket" );
	channel = await relay.subscribe("chirimenVL");
	messageDiv.innerText="achex web socketリレーサービスに接続しました";
	channel.onmessage = getMessage;
}

function getMessage(msg){ // メッセージを受信したときに起動する関数
	var mdata = msg.data;
	messageDiv.innerText = JSON.stringify(mdata);
	console.log("mdata:",mdata);
	distanceTd.innerText = mdata + " mm";
}

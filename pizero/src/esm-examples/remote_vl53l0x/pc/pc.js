// Remote Example1 - controller
import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

let channel;
onload = async function () {
  // webSocketリレーの初期化
  const relay = RelayServer("chirimentest", "chirimenSocket");
  channel = await relay.subscribe("chirimenVL");
  messageDiv.innerText = "web socketリレーサービスに接続しました";
  channel.onmessage = getMessage;
};

// メッセージを受信したときに起動する関数
function getMessage(msg) {
  const mdata = msg.data;
  messageDiv.innerText = JSON.stringify(mdata);
  console.log("mdata:", mdata);
  distanceTd.innerText = mdata + " mm";
}

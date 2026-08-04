// Remote Example4 - controller
import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

window.OnLED = OnLED;
window.OffLED = OffLED;

let channel;
onload = async function () {
  // webSocketリレーの初期化
  const relay = RelayServer("chirimentest", "chirimenSocket");
  channel = await relay.subscribe("chirimenLED");
  messageDiv.innerText = "web socketリレーサービスに接続しました";
  channel.onmessage = getMessage;
};

// メッセージを受信したときに起動する関数
function getMessage(msg) {
  messageDiv.innerText = msg.data;
}

function OnLED() {
  channel.send("LED ON");
}
function OffLED() {
  channel.send("LED OFF");
}

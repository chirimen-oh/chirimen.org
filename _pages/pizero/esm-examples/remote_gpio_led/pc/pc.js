// Remote Example4 - controller
import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

window.OnLED = OnLED;
window.OffLED = OffLED;

var channel;
onload = async () => {
  // webSocketリレーの初期化
  var relay = RelayServer("chirimentest", "chirimenSocket");
  channel = await relay.subscribe("chirimenLED");
  messageDiv.innerText = "web socketリレーサービスに接続しました";
  channel.onmessage = getMessage;
};

function getMessage(msg) {
  // メッセージを受信したときに起動する関数
  messageDiv.innerText = msg.data;
}

function OnLED() {
  // LED ON
  channel.send("LED ON");
}
function OffLED() {
  // LED OFF
  channel.send("LED OFF");
}

import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenLED");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// メッセージを受信したときに起動する関数
channel.onmessage = (msg) => {
  messageDiv.innerText = msg.data;
};

window.OnLED = () => {
  channel.send("LED ON");
};
window.OffLED = () => {
  channel.send("LED OFF");
};

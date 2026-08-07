import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenQR");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// メッセージを受信したときに起動する関数
channel.onmessage = (msg) => {
  dataTd.innerText = msg.data.data;
  updatedTd.innerText = new Date().toLocaleTimeString();
  messageDiv.innerText = "QRコードを読み取りました";
};

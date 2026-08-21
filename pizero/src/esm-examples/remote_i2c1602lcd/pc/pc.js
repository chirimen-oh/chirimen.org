import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenLCD");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// メッセージを受信したときに起動する関数
channel.onmessage = (msg) => {
  const { line1, line2 } = msg.data;
  messageDiv.innerText = `表示しました: "${line1}" / "${line2}"`;
};

lcdForm.addEventListener("submit", (event) => {
  event.preventDefault();
  channel.send({ line1: line1Input.value, line2: line2Input.value });
});

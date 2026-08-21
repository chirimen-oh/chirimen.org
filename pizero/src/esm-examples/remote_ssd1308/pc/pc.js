import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenSSD1308");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// メッセージを受信したときに起動する関数
channel.onmessage = (msg) => {
  messageDiv.innerText = `表示しました: ${JSON.stringify(msg.data.text)}`;
};

textForm.addEventListener("submit", (event) => {
  event.preventDefault();
  channel.send({ text: textInput.value });
});

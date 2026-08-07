import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenDFPlayer");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// メッセージを受信したときに起動する関数
channel.onmessage = ({ data }) => {
  messageDiv.innerText = `コマンド「${data.state}」を実行しました`;
};

const sendCommand = (command) => channel.send({ command });

playButton.addEventListener("click", () => sendCommand("PLAY"));
pauseButton.addEventListener("click", () => sendCommand("PAUSE"));

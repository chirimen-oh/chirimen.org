import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenISD1820");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// メッセージを受信したときに起動する関数
channel.onmessage = ({ data }) => {
  messageDiv.innerText = `状態: ${data.state}`;
};

const sendCommand = (command) => channel.send({ command });

recButton.addEventListener("pointerdown", () => sendCommand("REC_START"));
recButton.addEventListener("pointerup", () => sendCommand("REC_STOP"));
recButton.addEventListener("pointerleave", () => sendCommand("REC_STOP"));

playButton.addEventListener("pointerdown", () => sendCommand("PLAY_START"));
playButton.addEventListener("pointerup", () => sendCommand("PLAY_STOP"));
playButton.addEventListener("pointerleave", () => sendCommand("PLAY_STOP"));

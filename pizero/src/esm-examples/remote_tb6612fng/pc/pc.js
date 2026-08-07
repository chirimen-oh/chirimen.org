import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenTB6612FNG");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// メッセージを受信したときに起動する関数
channel.onmessage = ({ data }) => {
  messageDiv.innerText = `モーターを${data.state}にしました`;
};

const sendCommand = (command) => channel.send({ command });

fwdButton.addEventListener("click", () => sendCommand("FWD"));
revButton.addEventListener("click", () => sendCommand("REV"));
brakeButton.addEventListener("click", () => sendCommand("BRAKE"));
freeButton.addEventListener("click", () => sendCommand("FREE"));

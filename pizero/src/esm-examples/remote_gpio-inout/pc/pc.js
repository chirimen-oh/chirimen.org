import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenGpioInOut");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// メッセージを受信したときに起動する関数
channel.onmessage = ({ data }) => {
  if (data.type === "switch") {
    switchTd.innerText = data.state;
    messageDiv.innerText = `スイッチが${data.state}になりました`;
  } else if (data.type === "led") {
    messageDiv.innerText = `LED/モータを${data.state}にしました`;
  }
};

const sendLed = (state) => channel.send({ type: "led", state });

onButton.addEventListener("click", () => sendLed("ON"));
offButton.addEventListener("click", () => sendLed("OFF"));

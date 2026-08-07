import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenA4988");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// メッセージを受信したときに起動する関数
channel.onmessage = ({ data }) => {
  if (data.done) {
    const directionLabel = data.direction === 1 ? "正転" : "逆転";
    messageDiv.innerText = `${directionLabel}方向に${data.steps}ステップ回転しました`;
  }
};

sendButton.addEventListener("click", () => {
  const direction = Number(directionSelect.value);
  const steps = Number(stepsInput.value);
  channel.send({ direction, steps });
  messageDiv.innerText = `方向:${direction} ステップ数:${steps} を送信しました`;
});

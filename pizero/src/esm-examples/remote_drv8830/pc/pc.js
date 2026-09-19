import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenDRV8830");
messageDiv.innerText = "web socketリレーサービスに接続しました";

channel.onmessage = (message) => {
  if (message.data.voltage !== undefined) {
    messageDiv.innerText = `電圧${message.data.voltage}Vでモーターを駆動しました`;
  }
};

window.sendVoltage = (event) => {
  const voltage = Number(event.target.value);
  console.log(voltage);
  channel.send({ voltage });
  messageDiv.innerText = `voltage:${voltage}を送信しました`;
};

window.showVoltage = (event) => {
  voltageGuide.innerText = event.target.value;
};

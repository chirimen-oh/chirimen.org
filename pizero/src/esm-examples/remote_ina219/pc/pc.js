import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenINA");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// メッセージを受信したときに起動する関数
channel.onmessage = (msg) => {
  const { voltage, supplyVoltage, current, power, shuntVoltage } = msg.data;
  messageDiv.innerText = JSON.stringify(msg.data);
  console.log("mdata:", msg.data);
  voltageTd.innerText = voltage.toFixed(3);
  supplyVoltageTd.innerText = supplyVoltage.toFixed(3);
  currentTd.innerText = current.toFixed(2);
  powerTd.innerText = power.toFixed(2);
  shuntVoltageTd.innerText = shuntVoltage.toFixed(2);
};

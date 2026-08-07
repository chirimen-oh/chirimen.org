import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenBME280");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// メッセージを受信したときに起動する関数
channel.onmessage = (msg) => {
  const { temperature, humidity, pressure } = msg.data;
  messageDiv.innerText = JSON.stringify(msg.data);
  console.log("mdata:", msg.data);
  temTd.innerText = temperature.toFixed(2);
  humTd.innerText = humidity.toFixed(2);
  presTd.innerText = pressure.toFixed(2);
};

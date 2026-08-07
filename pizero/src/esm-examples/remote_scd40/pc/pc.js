import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenSCD");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// メッセージを受信したときに起動する関数
channel.onmessage = (msg) => {
  const { co2, temperature, relative_humidity, updated } = msg.data;
  messageDiv.innerText = JSON.stringify(msg.data);
  console.log("mdata:", msg.data);
  co2Td.innerText = co2;
  temTd.innerText = temperature;
  humTd.innerText = relative_humidity;
  updatedTd.innerText = updated;
};

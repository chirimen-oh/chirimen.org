import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenADS1X15");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// メッセージを受信したときに起動する関数
channel.onmessage = (msg) => {
  const { voltages } = msg.data;
  messageDiv.innerText = JSON.stringify(msg.data);
  console.log("mdata:", msg.data);
  const [v0, v1, v2, v3] = voltages;
  ch0Td.innerText = v0.toFixed(3);
  ch1Td.innerText = v1.toFixed(3);
  ch2Td.innerText = v2.toFixed(3);
  ch3Td.innerText = v3.toFixed(3);
};

import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenS11059");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// メッセージを受信したときに起動する関数
channel.onmessage = (msg) => {
  const { red, green, blue, gain } = msg.data;
  messageDiv.innerText = JSON.stringify(msg.data);
  console.log("mdata:", msg.data);

  redTd.innerText = red;
  greenTd.innerText = green;
  blueTd.innerText = blue;
  gainTd.innerText = gain;

  colorBox.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
};

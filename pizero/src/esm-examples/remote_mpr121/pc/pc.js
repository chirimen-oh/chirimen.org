import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

const CHANNEL_COUNT = 12;

// チャンネル数分のヘッダーセル(Ch0, Ch1, ...)をあらかじめ用意しておく
for (let i = 0; i < CHANNEL_COUNT; i++) {
  const th = document.createElement("th");
  th.innerText = `Ch${i}`;
  channelHeaderRow.appendChild(th);

  const td = document.createElement("td");
  td.id = `chTd${i}`;
  td.className = "touchOff";
  td.innerText = "-";
  channelValueRow.appendChild(td);
}

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenMPR");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// メッセージを受信したときに起動する関数
channel.onmessage = (msg) => {
  const { channels } = msg.data;
  messageDiv.innerText = JSON.stringify(msg.data);
  console.log("mdata:", msg.data);

  channels.forEach((touched, i) => {
    const td = document.getElementById(`chTd${i}`);
    td.innerText = touched ? "ON" : "OFF";
    td.className = touched ? "touchOn" : "touchOff";
  });
};

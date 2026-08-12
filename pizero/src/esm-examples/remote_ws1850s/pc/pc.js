import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenRFID");
messageDiv.innerText =
  "web socketリレーサービスに接続しました(カードをかざしてください)";

// メッセージを受信したときに起動する関数(UIDが検出されたときだけ届く)
channel.onmessage = (msg) => {
  const { uid, detectedAt } = msg.data;
  messageDiv.innerText = JSON.stringify(msg.data);
  console.log("mdata:", msg.data);

  uidTd.innerText = uid;
  detectedAtTd.innerText = new Date(detectedAt).toLocaleString();
};

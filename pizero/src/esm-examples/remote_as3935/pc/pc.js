import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenAS3935");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// メッセージ(雷を検出したときだけ届く)を受信したときに起動する関数
channel.onmessage = (msg) => {
  const { distance, energy, timestamp } = msg.data;
  messageDiv.innerText = JSON.stringify(msg.data);

  distTd.innerText = distance;
  energyTd.innerText = energy;
  timeTd.innerText = timestamp;

  statusBanner.innerText = `⚡ 雷を検出しました！ (${timestamp})`;
  statusBanner.classList.add("detected");
  setTimeout(() => statusBanner.classList.remove("detected"), 3000);
};

import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenGesture");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// 検出方向を、それらしい矢印アイコンに変換する
const ICONS = {
  right: "➡️",
  left: "⬅️",
  up: "⬆️",
  down: "⬇️",
  forward: "🫸",
  back: "🫷",
  clockwise: "↻",
  "count clockwise": "↺",
};

// メッセージ(ジェスチャーを検出したときだけ届く)を受信したときに起動する関数
channel.onmessage = (msg) => {
  const { direction, timestamp } = msg.data;
  messageDiv.innerText = JSON.stringify(msg.data);

  dirTd.innerText = direction;
  timeTd.innerText = timestamp;
  gestureIcon.innerText = ICONS[direction] ?? "🖐";
};

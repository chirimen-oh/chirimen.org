import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenADXL");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// 加速度の値 (だいたい ±20 m/s² くらいまで) をバーの幅に変換する
const RANGE = 20;
const toBarWidth = (value) =>
  `${Math.min(100, (Math.abs(value) / RANGE) * 100)}%`;
const toBarLeft = (value) =>
  value < 0 ? `${50 - parseFloat(toBarWidth(value)) / 2}%` : "50%";

// メッセージを受信したときに起動する関数
channel.onmessage = (msg) => {
  const { x, y, z } = msg.data;
  messageDiv.innerText = JSON.stringify(msg.data);

  xTd.innerText = `${x} m/s²`;
  yTd.innerText = `${y} m/s²`;
  zTd.innerText = `${z} m/s²`;

  xBar.style.width = toBarWidth(x);
  xBar.style.left = toBarLeft(x);
  yBar.style.width = toBarWidth(y);
  yBar.style.left = toBarLeft(y);
  zBar.style.width = toBarWidth(z);
  zBar.style.left = toBarLeft(z);
};

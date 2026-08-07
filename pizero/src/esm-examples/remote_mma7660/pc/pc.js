import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenMMA");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// 加速度(-1G〜+1G)をバーの幅・位置に変換する
const toBarWidth = (g) => `${Math.min(100, Math.abs(g) * 100)}%`;
const toBarLeft = (g) => (g < 0 ? `${50 - parseFloat(toBarWidth(g)) / 2}%` : "50%");

// メッセージを受信したときに起動する関数
channel.onmessage = (msg) => {
  const { x, y, z, gx, gy, gz } = msg.data;
  messageDiv.innerText = JSON.stringify(msg.data);

  xTd.innerText = x;
  yTd.innerText = y;
  zTd.innerText = z;
  gxTd.innerText = `${gx} G`;
  gyTd.innerText = `${gy} G`;
  gzTd.innerText = `${gz} G`;

  xBar.style.width = toBarWidth(gx);
  xBar.style.left = toBarLeft(gx);
  yBar.style.width = toBarWidth(gy);
  yBar.style.left = toBarLeft(gy);
  zBar.style.width = toBarWidth(gz);
  zBar.style.left = toBarLeft(gz);
};

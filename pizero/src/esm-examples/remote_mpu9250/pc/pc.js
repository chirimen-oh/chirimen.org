import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenMPU9250");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// メッセージを受信したときに起動する関数
channel.onmessage = (msg) => {
  const { gx, gy, gz, rx, ry, rz, hx, hy, hz } = msg.data;
  messageDiv.innerText = JSON.stringify(msg.data);

  gxTd.innerText = gx;
  gyTd.innerText = gy;
  gzTd.innerText = gz;
  rxTd.innerText = rx;
  ryTd.innerText = ry;
  rzTd.innerText = rz;
  hxTd.innerText = hx;
  hyTd.innerText = hy;
  hzTd.innerText = hz;
};

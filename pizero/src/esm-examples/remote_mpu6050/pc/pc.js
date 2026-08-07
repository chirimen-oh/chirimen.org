import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenMPU6050");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// メッセージを受信したときに起動する関数
channel.onmessage = (msg) => {
  const { temperature, gx, gy, gz, rx, ry, rz } = msg.data;
  messageDiv.innerText = JSON.stringify(msg.data);

  temTd.innerText = `${temperature} ℃`;
  gxTd.innerText = gx;
  gyTd.innerText = gy;
  gzTd.innerText = gz;
  rxTd.innerText = rx;
  ryTd.innerText = ry;
  rzTd.innerText = rz;
};

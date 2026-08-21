import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenICM");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// メッセージを受信したときに起動する関数
channel.onmessage = (msg) => {
  const { roll, pitch, yaw, ax, ay, az, gx, gy, gz, mx, my, mz } = msg.data;
  messageDiv.innerText = JSON.stringify(msg.data);

  rollTd.innerText = roll.toFixed(2);
  pitchTd.innerText = pitch.toFixed(2);
  yawTd.innerText = yaw.toFixed(2);
  axTd.innerText = ax;
  ayTd.innerText = ay;
  azTd.innerText = az;
  gxTd.innerText = gx;
  gyTd.innerText = gy;
  gzTd.innerText = gz;
  mxTd.innerText = mx;
  myTd.innerText = my;
  mzTd.innerText = mz;

  // roll/pitchで、簡易的な水平儀(地平線)を回転・上下させる
  ground.style.transform = `rotate(${-roll}deg) translateY(${pitch}px)`;
};

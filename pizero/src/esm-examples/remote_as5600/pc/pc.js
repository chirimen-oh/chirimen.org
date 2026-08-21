import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenAS5600");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// メッセージを受信したときに起動する関数
channel.onmessage = (msg) => {
  const { angle, detected, tooLow, tooHigh } = msg.data;
  messageDiv.innerText = JSON.stringify(msg.data);

  angleTd.innerText = `${angle.toFixed(1)}°`;
  detectedTd.innerText = detected;
  tooLowTd.innerText = tooLow;
  tooHighTd.innerText = tooHigh;

  needle.style.transform = `translateX(-50%) rotate(${angle}deg)`;
};

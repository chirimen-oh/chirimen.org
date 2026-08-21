import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenPWMHB");
messageDiv.innerText = "web socketリレーサービスに接続しました";

channel.onmessage = (message) => {
  if (message.data.speed) {
    messageDiv.innerText =
      "別の端末がスピード" + message.data.speed + "を送信しました";
  } else if (message.data.setSpeed) {
    messageDiv.innerText =
      "モーターをスピード" + message.data.setSpeed + "に設定しました";
  }
};

window.sendAngle = (event) => {
  const angle = event.target.value;
  console.log(angle);
  channel.send({ motor: 0, speed: angle });
  messageDiv.innerText = "motor0:" + angle + "を送信しました";
};

window.showAngle = (event) => {
  angleGuide.innerText = event.target.value;
};

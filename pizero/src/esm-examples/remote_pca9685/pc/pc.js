import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenMbitRemoteServo");
messageDiv.innerText = "web socketリレーサービスに接続しました";

channel.onmessage = (message) => {
  if (message.data.slope) {
    messageDiv.innerText =
      "別の端末が傾斜" + message.data.slope + "を送信しました";
  } else if (message.data.setAngle) {
    messageDiv.innerText =
      "サーボを角度" + message.data.setAngle + "に設定しました";
  }
};

window.sendAngle = (event) => {
  const angle = event.target.value;
  console.log(angle);
  channel.send({ slope: angle });
  messageDiv.innerText = "angle:" + angle + "を送信しました";
};

window.showAngle = (event) => {
  angleGuide.innerText = event.target.value;
};

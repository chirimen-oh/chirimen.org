// Remote Example1 - controller
import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

window.showAngle = showAngle;
window.sendAngle = sendAngle;

var channel;
onload = async () => {
  // webSocketリレーの初期化
  var relay = RelayServer("chirimentest", "chirimenSocket");
  channel = await relay.subscribe("chirimenMbitRemoteServo");
  messageDiv.innerText = "web socketリレーサービスに接続しました";
  channel.onmessage = showMessage;
};

function sendAngle(event) {
  var angle = event.target.value;
  console.log(angle);
  channel.send({ slope: angle });
  messageDiv.innerText = "angle:" + angle + "を送信しました";
}

function showAngle(event) {
  angleGuide.innerText = event.target.value;
}

function showMessage(message) {
  if (message.data.slope) {
    messageDiv.innerText =
      "別の端末が傾斜" + message.data.slope + "を送信しました";
  } else if (message.data.setAngle) {
    messageDiv.innerText =
      "サーボを角度" + message.data.setAngle + "に設定しました";
  }
}

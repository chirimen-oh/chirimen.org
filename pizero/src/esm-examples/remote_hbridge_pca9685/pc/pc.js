// Remote Example1 - controller
import { RelayServer } from "https://chirimen.org/remote-connection/js/beta/RelayServer.js";

window.showAngle = showAngle;
window.sendAngle = sendAngle;

var channel;
onload = async function () {
  // webSocketリレーの初期化
  var relay = RelayServer("chirimentest", "chirimenSocket");
  channel = await relay.subscribe("chirimenPWMHB");
  messageDiv.innerText = "web socketリレーサービスに接続しました";
  channel.onmessage = showMessage;
};

function sendAngle(event) {
  var angle = event.target.value;
  console.log(angle);
  channel.send({ motor: 0, speed: angle });
  messageDiv.innerText = "motor0:" + angle + "を送信しました";
}

function showAngle(event) {
  angleGuide.innerText = event.target.value;
}

function showMessage(message) {
  if (message.data.speed) {
    messageDiv.innerText =
      "別の端末がスピード" + message.data.speed + "を送信しました";
  } else if (message.data.setSpeed) {
    messageDiv.innerText =
      "モーターをスピード" + message.data.setSpeed + "に設定しました";
  }
}

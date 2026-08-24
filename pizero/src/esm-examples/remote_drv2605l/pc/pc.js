import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenDRV2605L");
messageDiv.innerText = "web socketリレーサービスに接続しました";

channel.onmessage = (message) => {
  if (message.data.vibrated !== undefined) {
    messageDiv.innerText = `振動強度${message.data.vibrated}でモーターを振動させました`;
  }
};

window.sendIntensity = (event) => {
  const intensity = Number(event.target.value);
  console.log(intensity);
  channel.send({ intensity });
  messageDiv.innerText = `intensity:${intensity}を送信しました`;
};

window.showIntensity = (event) => {
  intensityGuide.innerText = event.target.value;
};

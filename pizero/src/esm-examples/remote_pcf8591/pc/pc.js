import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenPCF8591");
messageDiv.innerText = "web socketリレーサービスに接続しました";

const channelTds = [ch0Td, ch1Td, ch2Td, ch3Td];

// メッセージを受信したときに起動する関数
channel.onmessage = (msg) => {
  const { type, values, voltage } = msg.data;
  if (type === "adc") {
    values.forEach((value, ch) => {
      channelTds[ch].innerText = value.toFixed(3);
    });
  } else if (type === "dac") {
    messageDiv.innerText = `DA出力電圧を${voltage}Vに設定しました`;
  }
};

voltageInput.addEventListener("input", (event) => {
  voltageGuide.innerText = event.target.value;
});

voltageInput.addEventListener("change", (event) => {
  channel.send({ voltage: Number(event.target.value) });
});

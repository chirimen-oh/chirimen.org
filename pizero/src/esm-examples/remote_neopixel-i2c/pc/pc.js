import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenNeoPixel");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// メッセージを受信したときに起動する関数
channel.onmessage = (msg) => {
  const { r, g, b } = msg.data;
  messageDiv.innerText = `色を rgb(${r}, ${g}, ${b}) に設定しました`;
};

function hexToRgb(hex) {
  const value = Number.parseInt(hex.slice(1), 16);
  return {
    r: (value >> 16) & 0xff,
    g: (value >> 8) & 0xff,
    b: value & 0xff,
  };
}

colorPicker.addEventListener("input", (event) => {
  channel.send(hexToRgb(event.target.value));
});

offButton.addEventListener("click", () => {
  colorPicker.value = "#000000";
  channel.send({ r: 0, g: 0, b: 0 });
});

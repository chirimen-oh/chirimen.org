import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenTCS34725");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// メッセージを受信したときに起動する関数
channel.onmessage = (msg) => {
  const { r, g, b, c } = msg.data;
  messageDiv.innerText = JSON.stringify(msg.data);
  console.log("mdata:", msg.data);

  redTd.innerText = r;
  greenTd.innerText = g;
  blueTd.innerText = b;
  clearTd.innerText = c;

  // 生の測定値(16bit)は明るさによって桁数が変わるため、
  // 表示用に最大値が255になるよう正規化してから色を塗る
  const peak = Math.max(r, g, b, 1);
  const scale = 255 / peak;
  const [dr, dg, db] = [r, g, b].map((v) => Math.round(v * scale));
  colorBox.style.backgroundColor = `rgb(${dr}, ${dg}, ${db})`;
};

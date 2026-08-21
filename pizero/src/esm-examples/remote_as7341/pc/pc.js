import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenAS7341");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// 各チャンネルのだいたいの色と、対応するidのテーブルセル
const CHANNELS = [
  { key: "f1", color: "#8b00ff", tdId: "f1Td" },
  { key: "f2", color: "#0000ff", tdId: "f2Td" },
  { key: "f3", color: "#00bfff", tdId: "f3Td" },
  { key: "f4", color: "#00c000", tdId: "f4Td" },
  { key: "f5", color: "#adff2f", tdId: "f5Td" },
  { key: "f6", color: "#ffa500", tdId: "f6Td" },
  { key: "f7", color: "#ff0000", tdId: "f7Td" },
  { key: "f8", color: "#8b0000", tdId: "f8Td" },
  { key: "clear", color: "#999999", tdId: "clearTd" },
  { key: "nir", color: "#555555", tdId: "nirTd" },
];

// バー表示用のDOMをあらかじめ作っておく
const barEls = {};
for (const { key, color } of CHANNELS) {
  const row = document.createElement("div");
  row.innerHTML = `<span class="chLabel">${key}</span><span class="chBarOuter"><span class="chBarInner" style="background:${color}"></span></span>`;
  spectrumBars.appendChild(row);
  barEls[key] = row.querySelector(".chBarInner");
}

// メッセージを受信したときに起動する関数
channel.onmessage = (msg) => {
  const data = msg.data;
  messageDiv.innerText = JSON.stringify(data);

  const maxValue = Math.max(...CHANNELS.map(({ key }) => data[key])) || 1;

  for (const { key, tdId } of CHANNELS) {
    const value = data[key];
    document.getElementById(tdId).innerText = value;
    barEls[key].style.width = `${(value / maxValue) * 100}%`;
  }
};

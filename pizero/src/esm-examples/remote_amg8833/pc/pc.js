import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenAMG");
messageDiv.innerText = "web socketリレーサービスに接続しました";

const ROWS = 8;
const COLS = 8;

// 8x8のマス目(テーブル)を作っておく
for (let r = 0; r < ROWS; r++) {
  const tr = document.createElement("tr");
  for (let c = 0; c < COLS; c++) {
    const td = document.createElement("td");
    td.id = `cell-${r}-${c}`;
    tr.appendChild(td);
  }
  thermoGrid.appendChild(tr);
}

// 温度(だいたい 15℃〜35℃を想定)を青→赤のグラデーションに変換する
const MIN_TEMP = 15;
const MAX_TEMP = 35;
const toColor = (value) => {
  const ratio = Math.min(
    1,
    Math.max(0, (value - MIN_TEMP) / (MAX_TEMP - MIN_TEMP)),
  );
  const hue = 240 - ratio * 240; // 240(青) -> 0(赤)
  return `hsl(${hue}, 90%, 50%)`;
};

// メッセージを受信したときに起動する関数
channel.onmessage = (msg) => {
  const { pixels } = msg.data;
  messageDiv.innerText = JSON.stringify(msg.data);

  let min = Infinity;
  let max = -Infinity;
  let total = 0;
  let count = 0;

  pixels.forEach((row, r) => {
    row.forEach((value, c) => {
      const cell = document.getElementById(`cell-${r}-${c}`);
      cell.style.backgroundColor = toColor(value);
      cell.innerText = value.toFixed(1);

      min = Math.min(min, value);
      max = Math.max(max, value);
      total += value;
      count++;
    });
  });

  minTd.innerText = `${min.toFixed(1)} ℃`;
  maxTd.innerText = `${max.toFixed(1)} ℃`;
  avgTd.innerText = `${(total / count).toFixed(1)} ℃`;
};

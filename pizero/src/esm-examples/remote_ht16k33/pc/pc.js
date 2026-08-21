import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenHT16K33");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// メッセージを受信したときに起動する関数
channel.onmessage = (msg) => {
  const { status, message } = msg.data;
  messageDiv.innerText = `${status}: ${message}`;
};

// 8x8のトグルボタンを生成する
const cells = [];
for (let i = 0; i < 64; i++) {
  const cell = document.createElement("button");
  cell.type = "button";
  cell.addEventListener("click", () => {
    cell.classList.toggle("on");
  });
  grid.appendChild(cell);
  cells.push(cell);
}

function clearGrid() {
  cells.forEach((cell) => cell.classList.remove("on"));
}

function gridToPattern() {
  return cells
    .map((cell) => (cell.classList.contains("on") ? "#" : "_"))
    .join(" ");
}

sendButton.addEventListener("click", () => {
  channel.send({ pattern: gridToPattern() });
});

clearButton.addEventListener("click", () => {
  clearGrid();
  channel.send({ clear: true });
});

document.querySelectorAll(".presets button[data-preset]").forEach((button) => {
  button.addEventListener("click", () => {
    channel.send({ preset: button.dataset.preset });
  });
});

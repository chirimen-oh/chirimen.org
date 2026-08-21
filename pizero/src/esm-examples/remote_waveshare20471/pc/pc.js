import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenWAVESHARE");
messageDiv.innerText = "web socketリレーサービスに接続しました";

// 数値を整形して表示するためのヘルパー
const fmt = (v) => (typeof v === "number" ? v.toFixed(2) : v);

// メッセージを受信したときに起動する関数
channel.onmessage = (msg) => {
  const data = msg.data;
  messageDiv.innerText = JSON.stringify(data);
  console.log("mdata:", data);

  pressureTd.innerText = fmt(data.pressure);
  temperatureTd.innerText = fmt(data.temperature);
  humidityTd.innerText = fmt(data.humidity);
  luxTd.innerText = fmt(data.lux);
  uvsTd.innerText = data.uvs;
  gasTd.innerText = data.gas;
  rollTd.innerText = fmt(data.roll);
  pitchTd.innerText = fmt(data.pitch);
  yawTd.innerText = fmt(data.yaw);
  accelXTd.innerText = fmt(data.accelX);
  accelYTd.innerText = fmt(data.accelY);
  accelZTd.innerText = fmt(data.accelZ);
  gyroXTd.innerText = fmt(data.gyroX);
  gyroYTd.innerText = fmt(data.gyroY);
  gyroZTd.innerText = fmt(data.gyroZ);
  magXTd.innerText = fmt(data.magX);
  magYTd.innerText = fmt(data.magY);
  magZTd.innerText = fmt(data.magZ);
};

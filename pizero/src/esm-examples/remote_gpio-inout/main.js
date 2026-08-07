// Remote Example: GPIO スイッチ入力 + LED/モータ出力
// PORT5に繋いだスイッチの状態をブラウザに表示しつつ、
// ブラウザのボタンでPORT26に繋いだLED/モータをOn/Offします

import { requestGPIOAccess } from "node-web-gpio";
import { RelayServer } from "./RelayServer.js";

// --- GPIOの準備 ---
const gpioAccess = await requestGPIOAccess();

// PORT26: LED（またはモータ）出力
const outputPort = gpioAccess.ports.get(26);
await outputPort.export("out");
await outputPort.write(0);

// PORT5: スイッチ入力
const switchPort = gpioAccess.ports.get(5);
await switchPort.export("in");

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenGpioInOut");
console.log("web socketリレーサービスに接続しました");

// スイッチの状態が変化したらブラウザに通知する
switchPort.onchange = (ev) => {
  const state = ev.value === 0 ? "ON" : "OFF"; // プルアップ想定: 押すとLow(0)
  console.log(`スイッチ: ${state}`);
  channel.send({ type: "switch", state });
};

// ブラウザからのコマンドでLED/モータを制御する
channel.onmessage = ({ data }) => {
  if (data.type !== "led") return;
  const value = data.state === "ON" ? 1 : 0;
  outputPort.write(value);
  console.log(`LED/モータ: ${data.state}`);
  channel.send({ type: "led", state: data.state });
};

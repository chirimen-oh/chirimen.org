// Remote Example: ISD1820 ボイスレコーダー基板の録音・再生制御
// ブラウザのボタンを押している間だけ録音・再生を行います

import { requestGPIOAccess } from "node-web-gpio";
import { RelayServer } from "./RelayServer.js";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- GPIOの準備 ---
const gpioAccess = await requestGPIOAccess();

const playPort = gpioAccess.ports.get(26); // P-L端子（Highの間だけ再生）
await playPort.export("out");
await playPort.write(0);

const recPort = gpioAccess.ports.get(19); // REC端子（Highの間だけ録音、配線した場合のみ有効）
await recPort.export("out");
await recPort.write(0);

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenISD1820");
console.log("web socketリレーサービスに接続しました");

// ブラウザからのコマンドで録音・再生を制御する
channel.onmessage = async ({ data }) => {
  switch (data.command) {
    case "PLAY_START":
      await playPort.write(1);
      break;
    case "PLAY_STOP":
      await playPort.write(0);
      break;
    case "REC_START":
      await recPort.write(1);
      break;
    case "REC_STOP":
      await recPort.write(0);
      break;
    default:
      return;
  }
  console.log(`ISD1820: ${data.command}`);
  channel.send({ state: data.command });
};

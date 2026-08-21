// Remote Example: DFPlayer Mini MP3プレーヤー基板の制御
// DFPlayer MiniのADKEY端子をNchMOSFET経由でGPIOから短くHighにすることで
// ボタンを押したのと同じ操作（再生・一時停止）をブラウザから行います

import { requestGPIOAccess } from "node-web-gpio";
import { RelayServer } from "./RelayServer.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- GPIOの準備 ---
const gpioAccess = await requestGPIOAccess();

const play1Port = gpioAccess.ports.get(26); // ADKEY1相当: 1曲目再生
await play1Port.export("out");
await play1Port.write(0);

const pausePort = gpioAccess.ports.get(19); // ADKEY2相当: 再生/一時停止切替
await pausePort.export("out");
await pausePort.write(0);

async function pressButton(port) {
  await port.write(1);
  await sleep(300); // 0.3秒押して離す
  await port.write(0);
}

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenDFPlayer");
console.log("web socketリレーサービスに接続しました");

// ブラウザからのコマンドでDFPlayerを制御する
channel.onmessage = async ({ data }) => {
  switch (data.command) {
    case "PLAY":
      await pressButton(play1Port);
      break;
    case "PAUSE":
      await pressButton(pausePort);
      break;
    default:
      return;
  }
  console.log(`DFPlayer: ${data.command}`);
  channel.send({ state: data.command });
};

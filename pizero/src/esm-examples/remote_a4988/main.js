// Remote Example: A4988ドライバによるステッピングモータ制御
// ブラウザから回転方向とステップ数を指定してステッピングモータを回転させます

import { requestGPIOAccess } from "node-web-gpio";
import { RelayServer } from "./RelayServer.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- GPIOの準備 ---
const gpioAccess = await requestGPIOAccess();

const stepPort = gpioAccess.ports.get(26); // STEP端子
await stepPort.export("out");
await stepPort.write(0);

const dirPort = gpioAccess.ports.get(19); // DIR端子
await dirPort.export("out");
await dirPort.write(0);

async function stepMove(steps, direction) {
  await dirPort.write(direction);
  for (let i = 0; i < steps; i++) {
    await stepPort.write(1);
    await sleep(1);
    await stepPort.write(0);
    await sleep(20);
  }
}

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenA4988");
console.log("web socketリレーサービスに接続しました");

// ブラウザからのコマンドでモーターを回転させる
channel.onmessage = async ({ data }) => {
  const { direction, steps } = data;
  if (direction === undefined || !steps) return;
  console.log(`モーター回転: 方向${direction} / ${steps}ステップ`);
  await stepMove(steps, direction);
  channel.send({ done: true, direction, steps });
};

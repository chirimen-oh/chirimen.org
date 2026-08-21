// Remote Example: TB6612FNG DCモーター正転・逆転制御
// TB6612FNGは正転[1,0]・逆転[0,1]・ブレーキ[1,1]・フリー[0,0]の4状態を
// GPIOのIN1,IN2の2つの信号線で指示します。STBYピンはHIGHのままにし、
// ドライバを常に動作可能な状態にしておきます。

import { requestGPIOAccess } from "node-web-gpio";
import { RelayServer } from "./RelayServer.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const stbyAddr = 19; // STBY(スタンバイ)ピンをつなぐGPIOポート番号
const portAddrs = [20, 21]; // IN1,IN2をつなぐGPIOポート番号

// --- GPIOの準備 ---
const gpioAccess = await requestGPIOAccess();

const stby = gpioAccess.ports.get(stbyAddr);
await stby.export("out");
await stby.write(1); // STBYをHIGHにしてドライバを動作可能にする

const ports = [];
for (const addr of portAddrs) {
  const port = gpioAccess.ports.get(addr);
  await port.export("out");
  await port.write(0);
  ports.push(port);
}

async function free() {
  await ports[0].write(0);
  await ports[1].write(0);
}

async function brake() {
  await ports[0].write(1);
  await ports[1].write(1);
  await sleep(300); // 300ms待機してフリー状態にします
  await free();
}

async function fwd() {
  await ports[0].write(1);
  await ports[1].write(0);
}

async function rev() {
  await ports[0].write(0);
  await ports[1].write(1);
}

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenTB6612FNG");
console.log("web socketリレーサービスに接続しました");

// ブラウザからのコマンドでモーターを制御する
channel.onmessage = async ({ data }) => {
  switch (data.command) {
    case "FWD":
      await fwd();
      break;
    case "REV":
      await rev();
      break;
    case "BRAKE":
      await brake();
      break;
    case "FREE":
      await free();
      break;
    default:
      return;
  }
  console.log(`モーター: ${data.command}`);
  channel.send({ state: data.command });
};

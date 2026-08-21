// Hブリッジモータードライバは正転[1,0]・逆転[0,1]・ブレーキ[1,1]・フリー[0,0]の4状態を
// GPIOの２つの信号線を使って指示します

import { requestGPIOAccess } from "node-web-gpio";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const portAddrs = [20, 21]; // HブリッジコントローラをつなぐGPIOポート番号
let ports;

async function init() {
  const gpioAccess = await requestGPIOAccess();
  ports = [];

  for (let i = 0; i < 2; i++) {
    ports[i] = gpioAccess.ports.get(portAddrs[i]);
    await ports[i].export("out");
  }
  for (let i = 0; i < 2; i++) {
    await ports[i].write(0);
  }
}

async function free() {
  await ports[0].write(0);
  await ports[1].write(0);
}

async function brake() {
  await ports[0].write(1);
  await ports[1].write(1);
  await sleep(300); // 300ms待機してフリー状態にします
  await ports[0].write(0);
  await ports[1].write(0);
}

async function fwd() {
  await ports[0].write(1);
  await ports[1].write(0);
}

async function rev() {
  await ports[0].write(0);
  await ports[1].write(1);
}

await init();

while (true) {
  console.log("fwd");
  await fwd();
  await sleep(1000);
  console.log("rev");
  await rev();
  await sleep(1000);
  console.log("brake");
  await brake();
  await sleep(1000);
}

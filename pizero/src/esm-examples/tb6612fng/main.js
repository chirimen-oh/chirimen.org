// TB6612FNGは正転[1,0]・逆転[0,1]・ブレーキ[1,1]・フリー[0,0]の4状態を
// GPIOの２つの信号線(IN1,IN2)で指示します。加えてSTBY(スタンバイ)ピンを
// HIGHにしないとモータードライバ自体が動作しないので、起動時にHIGHにします。
// PWM(速度制御)ピンは3.3Vに直結し、常にフルスピードで動作させています。

import { requestGPIOAccess } from "node-web-gpio";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const stbyAddr = 19; // STBY(スタンバイ)ピンをつなぐGPIOポート番号
const portAddrs = [20, 21]; // IN1,IN2をつなぐGPIOポート番号
let stby;
let ports;

async function init() {
  const gpioAccess = await requestGPIOAccess();

  stby = gpioAccess.ports.get(stbyAddr);
  await stby.export("out");
  await stby.write(1); // STBYをHIGHにしてドライバを動作可能にする

  ports = [];
  for (let i = 0; i < 2; i++) {
    ports[i] = gpioAccess.ports.get(portAddrs[i]);
    await ports[i].export("out");
  }
  for (let i = 0; i < 2; i++) {
    ports[i].write(0);
  }
}

async function free() {
  ports[0].write(0);
  ports[1].write(0);
}

async function brake() {
  ports[0].write(1);
  ports[1].write(1);
  await sleep(300); // 300ms待機してフリー状態にします
  ports[0].write(0);
  ports[1].write(0);
}

async function fwd() {
  ports[0].write(1);
  ports[1].write(0);
}

async function rev() {
  ports[0].write(0);
  ports[1].write(1);
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

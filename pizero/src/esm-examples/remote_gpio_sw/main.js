// Remote Example9 - reciever

import { requestGPIOAccess } from "node-web-gpio";
import { RelayServer } from "./RelayServer.js";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let channel;
let gpioPort0;

function testChange(val) {
  const msgTxt = val.value === 1 ? "High" : "Low"; // 条件 (三項) 演算子
  console.log(msgTxt);
  channel.send(msgTxt);
}

// GPIOポート0の初期化
const gpioAccess = await requestGPIOAccess();
const mbGpioPorts = gpioAccess.ports;
gpioPort0 = mbGpioPorts.get(5);
await gpioPort0.export("in");

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
channel = await relay.subscribe("chirimenSW");
console.log("web socketリレーサービスに接続しました");
gpioPort0.onchange = testChange; // ISSUE gpioのonchangeの仕様が異なる

// Remote Example8 - reciever

import { requestI2CAccess } from "node-web-i2c";
import PCA9685 from "@chirimen/pca9685";
import { RelayServer } from "./RelayServer.js";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let channel;
let pca9685;

async function moveServo(message) {
  if (!message.data.slope) {
    return;
  }
  let angle = message.data.slope;
  if (Math.abs(angle) > 28) {
    angle = Math.sign(angle) * 28;
  }
  console.log("servo:", angle);
  await pca9685.setServo(0, angle);
  console.log("サーボ角度:" + angle);
  channel.send({ setAngle: angle });
}

// chirimen with micro:bit、サーボコントローラの初期化
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
pca9685 = new PCA9685(i2cPort, 0x40);
await pca9685.init(0.001, 0.002, 30);

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
channel = await relay.subscribe("chirimenMbitRemoteServo");
console.log("web socketリレーサービスに接続しました");
channel.onmessage = moveServo;

// Remote Example - DRV8830 DC motor driver receiver

import { requestI2CAccess } from "node-web-i2c";
import DRV8830 from "@chirimen/drv8830";
import { RelayServer } from "./RelayServer.js";

// DRV8830の初期化
const i2cAccess = await requestI2CAccess();
const motor = new DRV8830(i2cAccess.ports.get(1));
await motor.init();

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenDRV8830");
console.log("web socketリレーサービスに接続しました");

// メッセージを受信したとき呼び出す関数
channel.onmessage = async (m) => {
  if (m.data.voltage === undefined) {
    return;
  }
  const voltage = m.data.voltage;
  if (voltage === 0) {
    console.log("stop");
    await motor.stop();
  } else if (voltage > 0) {
    console.log("forward:", voltage);
    await motor.forward(voltage);
  } else {
    console.log("reverse:", -voltage);
    await motor.reverse(-voltage);
  }
  channel.send({ voltage });
};

// Remote Example - DRV2605L vibration motor driver receiver

import { requestI2CAccess } from "node-web-i2c";
import DRV2605L from "@chirimen/drv2605l";
import { RelayServer } from "./RelayServer.js";

// DRV2605Lの初期化
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const motor = new DRV2605L(i2cPort, 0x5a);
await motor.init();

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenDRV2605L");
console.log("web socketリレーサービスに接続しました");

// メッセージを受信したとき呼び出す関数
channel.onmessage = async (m) => {
  if (m.data.intensity === undefined) {
    return;
  }
  let intensity = m.data.intensity;
  if (intensity < 0) {
    intensity = 0;
  } else if (intensity > 127) {
    intensity = 127;
  }
  console.log("vibrate:", intensity);
  await motor.vibrate(intensity, 400);
  channel.send({ vibrated: intensity });
};

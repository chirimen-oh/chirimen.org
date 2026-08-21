// Remote VL53L0X
import { requestI2CAccess } from "node-web-i2c";
import VL53L0X from "@chirimen/vl53l0x";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
import { RelayServer } from "./RelayServer.js";

let channel;
let vl;

async function transmitSensorData() {
  while (true) {
    const sensorData = await readData();
    channel.send(sensorData);
    await sleep(1000);
  }
}

async function readData() {
  const vlData = await vl.getRange();
  console.log("distance:" + vlData + "mm");
  return vlData;
}

// I2Cポートと、I2CデバイスVL53L0Xの初期化
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
vl = new VL53L0X(i2cPort, 0x29);
await vl.init();

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
channel = await relay.subscribe("chirimenVL");
console.log("web socketリレーサービスに接続しました");
transmitSensorData();

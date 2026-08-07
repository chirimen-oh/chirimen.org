// Remote VL53L1X (レーザー距離センサー 最長4m)
import { requestI2CAccess } from "node-web-i2c";
import VL53L1X from "@chirimen/vl53l1x";
import { RelayServer } from "./RelayServer.js";

const SEND_INTERVAL_MS = 3000; // 3秒間隔で送信

// I2Cポートと、I2CデバイスVL53L1Xの初期化
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const vl53l1x = new VL53L1X(i2cPort, 0x29);

// Mode: short, medium, long
await vl53l1x.init("short");

// 計測を開始するために必要
await vl53l1x.startContinuous();

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenVL53L1X");
console.log("web socketリレーサービスに接続しました");

async function readSensorData() {
  const distance = await vl53l1x.read();
  return { distance };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

while (true) {
  try {
    const sensorData = await readSensorData();
    channel.send(sensorData);
    console.log(`distance: ${sensorData.distance.toFixed(2)} mm`);
  } catch (error) {
    console.error("READ ERROR:", error);
  }
  await sleep(SEND_INTERVAL_MS);
}

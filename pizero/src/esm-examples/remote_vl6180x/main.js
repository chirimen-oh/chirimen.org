// Remote VL6180X (レーザー測距センサー 0mm - 255mm)
import { requestI2CAccess } from "node-web-i2c";
import VL6180X from "@chirimen/vl6180x";
import { RelayServer } from "./RelayServer.js";

const SEND_INTERVAL_MS = 3000; // 3秒間隔で送信

// I2Cポートと、I2CデバイスVL6180Xの初期化
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const vl6180x = new VL6180X(i2cPort);
await vl6180x.init();

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenVL6180X");
console.log("web socketリレーサービスに接続しました");

async function readSensorData() {
  const distance = await vl6180x.getRange();
  return { distance };
}

setInterval(async () => {
  try {
    const sensorData = await readSensorData();
    channel.send(sensorData);
    console.log(`distance: ${sensorData.distance} mm`);
  } catch (error) {
    console.error("READ ERROR:", error);
  }
}, SEND_INTERVAL_MS);

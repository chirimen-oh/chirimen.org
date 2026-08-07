// Remote VEML6070 (UVセンサー)
import { requestI2CAccess } from "node-web-i2c";
import VEML6070 from "@chirimen/veml6070";
import { RelayServer } from "./RelayServer.js";

const SEND_INTERVAL_MS = 3000; // 3秒間隔で送信

// I2Cポートと、I2CデバイスVEML6070の初期化
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const veml6070 = new VEML6070(i2cPort);
await veml6070.init();

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenVEML6070");
console.log("web socketリレーサービスに接続しました");

async function readSensorData() {
  const uv = await veml6070.read();
  return { uv };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

while (true) {
  try {
    const sensorData = await readSensorData();
    channel.send(sensorData);
    console.log(`UV: ${sensorData.uv}`);
  } catch (error) {
    console.error("READ ERROR:", error);
  }
  await sleep(SEND_INTERVAL_MS);
}

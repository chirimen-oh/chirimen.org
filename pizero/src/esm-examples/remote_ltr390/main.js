// Remote LTR390 (UVセンサー)
import { requestI2CAccess } from "node-web-i2c";
import LTR390 from "@chirimen/ltr390";
import { RelayServer } from "./RelayServer.js";

const SEND_INTERVAL_MS = 3000; // 3秒間隔で送信

// I2Cポートと、I2CデバイスLTR390の初期化
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const ltr390 = new LTR390(i2cPort);
await ltr390.init();

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenLTR390");
console.log("web socketリレーサービスに接続しました");

async function readSensorData() {
  const uvs = await ltr390.UVS();
  return { uvs };
}

setInterval(async () => {
  try {
    const sensorData = await readSensorData();
    channel.send(sensorData);
    console.log(`UVS: ${sensorData.uvs}`);
  } catch (error) {
    console.error("READ ERROR:", error);
  }
}, SEND_INTERVAL_MS);

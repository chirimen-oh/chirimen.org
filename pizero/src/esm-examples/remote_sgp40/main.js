// Remote SGP40 (ガスセンサー)
import { requestI2CAccess } from "node-web-i2c";
import SGP40 from "@chirimen/sgp40";
import { RelayServer } from "./RelayServer.js";

const SEND_INTERVAL_MS = 3000; // 3秒間隔で送信

// I2Cポートと、I2CデバイスSGP40の初期化
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const sgp40 = new SGP40(i2cPort);
await sgp40.init();

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenSGP40");
console.log("web socketリレーサービスに接続しました");

async function readSensorData() {
  // 温度・湿度は決め打ち(25℃, 50%)で生のガス値を測定
  const gas = await sgp40.measureRaw(25, 50);
  return { gas };
}

setInterval(async () => {
  try {
    const sensorData = await readSensorData();
    channel.send(sensorData);
    console.log(`Gas: ${sensorData.gas}`);
  } catch (error) {
    console.error("READ ERROR:", error);
  }
}, SEND_INTERVAL_MS);

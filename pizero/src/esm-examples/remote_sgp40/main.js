// Remote SGP40 (ガスセンサー)
import { requestI2CAccess } from "node-web-i2c";
import SGP40 from "@chirimen/sgp40";
import { RelayServer } from "./RelayServer.js";

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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

while (true) {
  const sensorData = await readSensorData();
  channel.send(sensorData);
  console.log(`Gas: ${sensorData.gas}`);
  // データを送る間隔 (ミリ秒)
  await sleep(3000);
}

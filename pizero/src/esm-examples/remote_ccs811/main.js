// Remote CCS811 (CO2・TVOCセンサー)
import { requestI2CAccess, CCS811 } from "chirimen";
import { RelayServer } from "./RelayServer.js";

// I2Cポートと、I2CデバイスCCS811の初期化
const i2cAccess = await requestI2CAccess();
const ccs811 = new CCS811(i2cAccess.ports.get(1));
await ccs811.init();

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenCCS811");
console.log("web socketリレーサービスに接続しました");

async function readSensorData() {
  const { CO2, TVOC, error } = await ccs811.readData();
  return { CO2, TVOC, error };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

while (true) {
  const sensorData = await readSensorData();
  channel.send(sensorData);
  console.log(`CO2: ${sensorData.CO2} ppm, TVOC: ${sensorData.TVOC} ppb`);
  // データを送る間隔 (ミリ秒)
  await sleep(3000);
}

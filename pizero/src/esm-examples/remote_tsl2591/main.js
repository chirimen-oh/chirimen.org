// Remote TSL2591 (照度センサー)
import { requestI2CAccess } from "node-web-i2c";
import TSL2591 from "@chirimen/tsl2591";
import { RelayServer } from "./RelayServer.js";

// I2Cポートと、I2CデバイスTSL2591の初期化
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const tsl2591 = new TSL2591(i2cPort);
await tsl2591.init();

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenTSL2591");
console.log("web socketリレーサービスに接続しました");

async function readSensorData() {
  const lux = await tsl2591.Lux();
  return { lux };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

while (true) {
  const sensorData = await readSensorData();
  channel.send(sensorData);
  console.log(`Lux: ${sensorData.lux}`);
  // データを送る間隔 (ミリ秒)
  await sleep(3000);
}

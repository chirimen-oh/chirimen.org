// Remote TSL2561 (Grove Digital Light Sensor 光センサー)
import { requestI2CAccess } from "node-web-i2c";
import GROVELIGHT from "@chirimen/grove-light";
import { RelayServer } from "./RelayServer.js";

// I2Cポートと、I2CデバイスTSL2561(Grove Digital Light Sensor)の初期化
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const grovelight = new GROVELIGHT(i2cPort, 0x29);
await grovelight.init();

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenTSL2561");
console.log("web socketリレーサービスに接続しました");

async function readSensorData() {
  const lux = await grovelight.read();
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

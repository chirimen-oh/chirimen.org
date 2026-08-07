// Remote APDS9930 (近接・環境光センサー)
import { requestI2CAccess } from "node-web-i2c";
import APDS9930 from "@chirimen/apds9930";
import { RelayServer } from "./RelayServer.js";

// I2Cポートと、I2CデバイスAPDS9930の初期化
const i2cAccess = await requestI2CAccess();
const apds9930 = new APDS9930(i2cAccess.ports.get(1));
await apds9930.init();

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenAPDS9930");
console.log("web socketリレーサービスに接続しました");

async function readSensorData() {
  const { lux, proximity } = await apds9930.read();
  return { lux, proximity };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

while (true) {
  const sensorData = await readSensorData();
  channel.send(sensorData);
  console.log(
    `照度: ${sensorData.lux.toFixed(2)} lx, 近接: ${sensorData.proximity}`,
  );
  // データを送る間隔 (ミリ秒)
  await sleep(3000);
}

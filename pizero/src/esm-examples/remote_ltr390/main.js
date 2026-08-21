// Remote LTR390 (UVセンサー)
import { requestI2CAccess } from "node-web-i2c";
import LTR390 from "@chirimen/ltr390";
import { RelayServer } from "./RelayServer.js";

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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

while (true) {
  const sensorData = await readSensorData();
  channel.send(sensorData);
  console.log(`UVS: ${sensorData.uvs}`);
  // データを送る間隔 (ミリ秒)
  await sleep(3000);
}

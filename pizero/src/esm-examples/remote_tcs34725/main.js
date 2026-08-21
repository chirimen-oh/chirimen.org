// Remote TCS34725 (カラーセンサー)
import { requestI2CAccess } from "node-web-i2c";
import TCS34725 from "@chirimen/tcs34725";
import { RelayServer } from "./RelayServer.js";

// I2Cポートと、I2CデバイスTCS34725の初期化
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const tcs34725 = new TCS34725(i2cPort, 0x29);
await tcs34725.init();

// gainは1, 4, 16, 60から選択可能
await tcs34725.gain(4);

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenTCS34725");
console.log("web socketリレーサービスに接続しました");

async function readSensorData() {
  const { r, g, b, c } = await tcs34725.read();
  return { r, g, b, c };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

while (true) {
  const sensorData = await readSensorData();
  channel.send(sensorData);
  console.log(
    `R: ${sensorData.r}, G: ${sensorData.g}, B: ${sensorData.b}, Clear Light: ${sensorData.c}`,
  );
  // データを送る間隔 (ミリ秒)
  await sleep(3000);
}

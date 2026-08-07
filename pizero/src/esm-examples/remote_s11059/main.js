// Remote S11059 (RGBカラーセンサー)
import { requestI2CAccess } from "node-web-i2c";
import S11059 from "@chirimen/s11059";
import { RelayServer } from "./RelayServer.js";

// I2Cポートと、I2CデバイスS11059の初期化
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const s11059 = new S11059(i2cPort, 0x2a);
await s11059.init();

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenS11059");
console.log("web socketリレーサービスに接続しました");

async function readSensorData() {
  const [red, green, blue, gain] = await s11059.readR8G8B8();
  return { red: red & 0xff, green: green & 0xff, blue: blue & 0xff, gain };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

while (true) {
  const sensorData = await readSensorData();
  channel.send(sensorData);
  console.log(
    `R:${sensorData.red} G:${sensorData.green} B:${sensorData.blue} GAIN:${sensorData.gain}`,
  );
  // データを送る間隔 (ミリ秒)
  await sleep(3000);
}

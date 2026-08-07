// Remote WAVESHARE20471 (複合センサボード: 9軸+UV+ガス+照度+温湿度+気圧)
import { requestI2CAccess } from "node-web-i2c";
import BME280 from "@chirimen/bme280";
import ICM20948 from "@chirimen/icm20948";
import LTR390 from "@chirimen/ltr390";
import TSL2591 from "@chirimen/tsl2591";
import SGP40 from "@chirimen/sgp40";
import { RelayServer } from "./RelayServer.js";

// I2Cポートと、各I2Cデバイスの初期化
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);

const sgp40 = new SGP40(i2cPort);
const tsl2591 = new TSL2591(i2cPort);
const ltr390 = new LTR390(i2cPort);
const icm20948 = new ICM20948(i2cPort);
const bme280 = new BME280(i2cPort, 0x76); // これだけ0x76忘れずに

await sgp40.init();
await tsl2591.init();
await ltr390.init();
await icm20948.init();
await bme280.init();

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenWAVESHARE");
console.log("web socketリレーサービスに接続しました");

async function readSensorData() {
  const gas = await sgp40.measureRaw(25, 50);
  const lux = await tsl2591.Lux();
  const uvs = await ltr390.UVS();
  const [
    roll,
    pitch,
    yaw,
    accelX,
    accelY,
    accelZ,
    gyroX,
    gyroY,
    gyroZ,
    magX,
    magY,
    magZ,
  ] = await icm20948.getdata();
  const { pressure, temperature, humidity } = await bme280.readData();

  return {
    pressure,
    temperature,
    humidity,
    lux,
    uvs,
    gas,
    roll,
    pitch,
    yaw,
    accelX,
    accelY,
    accelZ,
    gyroX,
    gyroY,
    gyroZ,
    magX,
    magY,
    magZ,
  };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

while (true) {
  const sensorData = await readSensorData();
  channel.send(sensorData);
  console.log("送信しました:", JSON.stringify(sensorData));
  // データを送る間隔 (ミリ秒)
  await sleep(5000);
}

// Remote BME680 (温度・湿度・気圧・ガスセンサー)
import { requestI2CAccess, BME680 } from "chirimen";
import { RelayServer } from "./RelayServer.js";

// I2Cポートと、I2CデバイスBME680の初期化
const i2cAccess = await requestI2CAccess();
const bme680 = new BME680(i2cAccess.ports.get(1));
await bme680.init();

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenBME680");
console.log("web socketリレーサービスに接続しました");

async function readSensorData() {
  const { temperature, humidity, pressure, gas } = await bme680.readData();
  return { temperature, humidity, pressure, gas };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

while (true) {
  const sensorData = await readSensorData();
  channel.send(sensorData);
  console.log(
    `Temperature: ${sensorData.temperature.toFixed(2)}℃, Humidity: ${sensorData.humidity.toFixed(2)}%, Pressure: ${sensorData.pressure.toFixed(2)}hPa, Gas: ${sensorData.gas}ohm`,
  );
  // データを送る間隔 (ミリ秒)
  await sleep(3000);
}

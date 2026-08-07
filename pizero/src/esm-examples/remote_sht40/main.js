// Remote SHT40 (温度・湿度センサー)
import { requestI2CAccess } from "node-web-i2c";
import SHT40 from "@chirimen/sht40";
import { RelayServer } from "./RelayServer.js";

const SEND_INTERVAL_MS = 3000; // 3秒間隔で送信

// I2Cポートと、I2CデバイスSHT40の初期化
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const sht40 = new SHT40(i2cPort, 0x44);
await sht40.init();

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenSHT40");
console.log("web socketリレーサービスに接続しました");

async function readSensorData() {
  const { humidity, temperature } = await sht40.readData();
  return { humidity, temperature };
}

setInterval(async () => {
  try {
    const sensorData = await readSensorData();
    channel.send(sensorData);
    console.log(
      `Temperature: ${sensorData.temperature.toFixed(2)} degree, Humidity: ${sensorData.humidity.toFixed(2)}%`
    );
  } catch (error) {
    console.error("READ ERROR:", error);
  }
}, SEND_INTERVAL_MS);

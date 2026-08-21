// Remote Example5 - reciever
import { requestGPIOAccess } from "node-web-gpio";
import { requestI2CAccess } from "node-web-i2c";
import SHT30 from "@chirimen/sht30";
import { RelayServer } from "./RelayServer.js";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let channel;
let sht;

async function transmitSensorData(ev) {
  console.log(ev.value);
  if (ev.value == 0) {
    const sensorData = await readData();
    channel.send(sensorData);
    console.log(JSON.stringify(sensorData));
  }
}

async function readData() {
  const shtData = await sht.readData();
  return shtData;
}

// GPIOポートの初期化
const gpioAccess = await requestGPIOAccess();
const gpioPort = gpioAccess.ports.get(5);
await gpioPort.export("in");

// I2Cポートと、I2CデバイスSHT30の初期化
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
sht = new SHT30(i2cPort);
await sht.init();

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
channel = await relay.subscribe("chirimenSHT");
console.log("web socketリレーサービスに接続しました");
gpioPort.onchange = transmitSensorData;

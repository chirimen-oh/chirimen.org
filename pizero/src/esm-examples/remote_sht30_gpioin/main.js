// Remote Example5 - reciever
// for CHIRIMEN with nodejs
import { requestGPIOAccess } from "node-web-gpio";
import { requestI2CAccess } from "node-web-i2c";
import SHT30 from "@chirimen/sht30";
import nodeWebSocketLib from "websocket"; // https://www.npmjs.com/package/websocket
import { RelayServer } from "./RelayServer.js";

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
    return (shtData);
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
const relay = RelayServer("chirimentest", "chirimenSocket", nodeWebSocketLib, "https://chirimen.org");
channel = await relay.subscribe("chirimenSHT");
console.log("web socketリレーサービスに接続しました");
gpioPort.onchange = transmitSensorData;

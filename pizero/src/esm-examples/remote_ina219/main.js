// ===================================================
// INA219 電流センサーの値を WebSocket で送信するプログラム
// ===================================================

import { requestI2CAccess } from "node-web-i2c";
import INA219 from "@chirimen/ina219";
import { RelayServer } from "./RelayServer.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- センサーの準備 ---
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const ina219 = new INA219(i2cPort, 0x40);
await ina219.init();
await ina219.configure();
console.log("INA219センサーの準備ができました");

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenINA");
console.log("WebSocketリレーサービスに接続しました");

// --- センサーからデータを読み取る関数 ---
async function readSensor() {
  const voltage = await ina219.voltage();
  const supplyVoltage = await ina219.supply_voltage();
  const current = await ina219.current();
  const power = await ina219.power();
  const shuntVoltage = await ina219.shunt_voltage();
  return { voltage, supplyVoltage, current, power, shuntVoltage };
}

while (true) {
  const data = await readSensor();
  const { voltage, supplyVoltage, current, power, shuntVoltage } = data;
  console.log(
    `Voltage: ${voltage.toFixed(3)}V, Supply voltage: ${supplyVoltage.toFixed(3)}V, Current: ${current.toFixed(2)}mA, Power: ${power.toFixed(2)}mW, Shunt voltage: ${shuntVoltage.toFixed(2)}mV`,
  );

  channel.send(data);
  console.log("送信しました:", JSON.stringify(data));

  // データを送る間隔 (ミリ秒)
  await sleep(3000);
}

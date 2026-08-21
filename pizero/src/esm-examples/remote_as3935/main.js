// ===================================================
// AS3935 (雷センサー) の検出結果を WebSocket で送信するプログラム
// I2Cで雷センサーを読み取り、GPIOポート5の割り込みを検出トリガーに使う
// ===================================================

// --- ライブラリの読み込み ---
import { requestGPIOAccess } from "node-web-gpio";
import { requestI2CAccess } from "node-web-i2c";
import AS3935 from "@chirimen/as3935";
import { RelayServer } from "./RelayServer.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- センサーの準備 ---
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const as3935 = new AS3935(i2cPort);
await as3935.init();
await as3935.reset();
await sleep(100);
await as3935.set_indoors(true);
await as3935.set_noise_floor(0);
await as3935.calibrate(0x0f);
console.log("AS3935センサーの準備ができました");

// --- WebSocketリレーの準備 ---
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenAS3935");
console.log("WebSocketリレーサービスに接続しました");

// --- 雷検出用GPIO割り込みの準備 ---
const gpioAccess = await requestGPIOAccess();
const interruptPort = gpioAccess.ports.get(5);
await interruptPort.export("in");

// 割り込みが発生するたびに理由を調べ、雷を検出したときだけ送信する
interruptPort.onchange = async ({ value }) => {
  if (value === 0) return;

  await sleep(10);
  const reason = await as3935.get_interrupt();

  if (reason === 0x01) {
    console.log("ノイズレベルが高いため、ノイズフロアを調整します");
    await as3935.raise_noise_floor();
  } else if (reason === 0x04) {
    console.log("外乱(ディスターバ)を検出したためマスクします");
    await as3935.set_mask_disturber(true);
  } else if (reason === 0x08) {
    const distance = await as3935.get_distance();
    const energy = await as3935.get_energy();
    const timestamp = new Date().toLocaleString();
    const sensorData = { distance, energy, timestamp };

    console.log(`⚡ 雷を検出しました！ 距離: 約${distance}km (${timestamp})`);
    channel.send(sensorData);
    console.log("送信しました:", JSON.stringify(sensorData));
  }
};

console.log("雷の検出を待機しています...");

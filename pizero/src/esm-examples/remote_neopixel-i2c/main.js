// Remote Neopixel (I2C) LED - receiver

import { requestI2CAccess } from "node-web-i2c";
import NPIX from "@chirimen/neopixel-i2c";
import { RelayServer } from "./RelayServer.js";

const NEOPIXEL_COUNT = 7; // LED個数
const NEOPIXEL_ADDRESS = 0x41;

async function controlColor(message) {
  const { r, g, b } = message.data ?? {};
  if ([r, g, b].some((value) => typeof value !== "number")) return;
  await npix.setGlobal(r, g, b);
  channel.send({ status: "ok", r, g, b });
}

// I2C Neopixelドライバの初期化
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const npix = new NPIX(i2cPort, NEOPIXEL_ADDRESS);
await npix.init(NEOPIXEL_COUNT);

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenNeoPixel");
console.log("web socketリレーサービスに接続しました");
channel.onmessage = controlColor;

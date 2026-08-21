// Remote APDS9960 (近接・環境光・ジェスチャーセンサー)
import { requestI2CAccess } from "node-web-i2c";
import APDS9960 from "@chirimen/apds9960";
import { RelayServer } from "./RelayServer.js";

// I2Cポートと、I2CデバイスAPDS9960の初期化
const i2cAccess = await requestI2CAccess();
const apds9960 = new APDS9960(i2cAccess.ports.get(1));
await apds9960.init();
await apds9960.enableLightSensor(false);
await apds9960.enableProximitySensor(false);
await apds9960.enableGestureSensor(false);

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
const channel = await relay.subscribe("chirimenAPDS9960");
console.log("web socketリレーサービスに接続しました");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

while (true) {
  let gesture = null;
  if (await apds9960.isGestureAvailable()) {
    const detected = await apds9960.readGesture();
    if (detected && detected !== "none") {
      gesture = detected;
    }
  }
  const lux = await apds9960.readAmbientLight();
  const proximity = await apds9960.readProximity();
  channel.send({ lux, proximity, gesture });
  console.log(
    `照度: ${lux}, 近接: ${proximity}` +
      (gesture ? `, ジェスチャー: ${gesture}` : ""),
  );
  // データを送る間隔 (ミリ秒)
  await sleep(500);
}

import { requestI2CAccess } from "node-web-i2c";
import APDS9960 from "@chirimen/apds9960";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const i2cAccess = await requestI2CAccess();
const apds9960 = new APDS9960(i2cAccess.ports.get(1));
await apds9960.init();
await apds9960.enableLightSensor(false);
await apds9960.enableProximitySensor(false);
await apds9960.enableGestureSensor(false);

while (true) {
  if (await apds9960.isGestureAvailable()) {
    const gesture = await apds9960.readGesture();
    console.log("ジェスチャー検出:", gesture);
  }
  const lux = await apds9960.readAmbientLight();
  const proximity = await apds9960.readProximity();
  console.log(`照度: ${lux}, 近接: ${proximity}`);
  await sleep(500);
}

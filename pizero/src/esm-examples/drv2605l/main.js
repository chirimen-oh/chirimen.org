import { requestI2CAccess } from "node-web-i2c";
import DRV2605L from "@chirimen/drv2605l";

const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);

const motor = new DRV2605L(i2cPort, 0x5a);

await motor.init();

console.log("Vibration start");

await motor.vibrate(80, 400);

console.log("Vibration finished");

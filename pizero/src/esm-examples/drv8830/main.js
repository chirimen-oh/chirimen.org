import { requestI2CAccess } from "node-web-i2c";
import DRV8830 from "@chirimen/drv8830";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const i2cAccess = await requestI2CAccess();
const motor = new DRV8830(i2cAccess.ports.get(1));

await motor.init();

console.log("Forward");
await motor.forward(3);
await sleep(1000);

console.log("Brake");
await motor.brake();
await sleep(300);

console.log("Reverse");
await motor.reverse(3);
await sleep(1000);

console.log("Stop");
await motor.stop();
await motor.clearFault();

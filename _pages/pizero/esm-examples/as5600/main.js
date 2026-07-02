// AS5600(磁気式角度センサ)を使う
import { requestI2CAccess } from "node-web-i2c";
import AS5600 from "./as5600.js";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

let as5600;

async function startMeasurement() {
    while (true) {
        const rawAngle = await as5600.getAngle();
        console.log("rawA:",rawAngle);
        await sleep(1000);
    }
}

const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
as5600 = new AS5600(i2cPort);
await as5600.init();
const stat = await as5600.getStatus();
console.log("stat:" , stat);
startMeasurement();

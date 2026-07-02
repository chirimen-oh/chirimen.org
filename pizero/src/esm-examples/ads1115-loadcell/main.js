import { requestI2CAccess } from "node-web-i2c";
import ADS1X15 from "@chirimen/ads1x15";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const ads1115 = new ADS1X15(i2cPort, 0x48);
// If you uses ADS1115, you have to select "true", otherwise select "false".
await ads1115.init(true, 7); // High Gain
console.log("init complete");
let firstTime = true;
let tare;
while (true) {
    const difA = await ads1115.read("0,1");  // p0-p1 differential mode
    console.log("dif chA(0-1):" + difA.toString(16) + " : " + ads1115.getVoltage(difA).toFixed(6) + "V");
    if (firstTime) {
        tare = difA;
        firstTime = false;
    }
    const weight = difA - tare;
    console.log("rawData - Tare:" + weight.toString(16) + " : " + ads1115.getVoltage(weight).toFixed(6) + "V");
    await sleep(500);
}

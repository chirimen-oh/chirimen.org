import { requestI2CAccess } from "node-web-i2c";
import PCA9685 from "@chirimen/pca9685";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const pca9685 = new PCA9685(i2cPort, 0x40);
// servo setting for sg90
// Servo PWM pulse: min=0.0011[sec], max=0.0019[sec] angle=+-60[deg]
await pca9685.init(0.001, 0.002, 30);
while (true) {
  await pca9685.setServo(0, -30);
  console.log("-30 deg");
  await sleep(1000);
  await pca9685.setServo(0, 30);
  console.log("30 deg");
  await sleep(1000);
}

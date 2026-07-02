/* 各種ライブラリをインポート */
import { requestGPIOAccess } from "node-web-gpio";
import { requestI2CAccess } from "node-web-i2c";
import AS3935 from "@chirimen/as3935";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

let as3935;

async function as3935_sens(ev) {
    if (ev.value == 0) { return }
    console.log("interruptPort:", ev.value);
    await sleep(10);
    const reason = await as3935.get_interrupt();
    if (reason == 0x01) {
        console.log("Noise level too high - adjusting");
        await as3935.raise_noise_floor();
    } else if (reason == 0x04) {
        console.log("Disturber detected - masking");
        await as3935.set_mask_disturber(true);
    } else if (reason == 0x08) {
        const now = new Date().toLocaleString();
        const distance = await as3935.get_distance();
        console.log(`Detect lightinig! It was ${distance} Km away. (${now}) `);
    }
}

/* 雷センサー初期化 */
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
as3935 = new AS3935(i2cPort);
await as3935.init();
await as3935.reset();
await sleep(100);
await as3935.set_indoors(true);
await as3935.set_noise_floor(0);
await as3935.calibrate(0x0f);

/* 雷センサーインタラプト用GPIO初期化 */
const gpioAccess = await requestGPIOAccess();
const as3935_interruptPort = gpioAccess.ports.get(5);
await as3935_interruptPort.export("in");
as3935_interruptPort.onchange = as3935_sens;

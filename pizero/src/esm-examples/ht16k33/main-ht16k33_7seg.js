// Example for Aitendo 7sec 4digit LED ht16k33 module kit
// https://www.aitendo.com/product/14540

import { requestI2CAccess } from "./node_modules/node-web-i2c/index.js";
import HT16K33 from "@chirimen/ht16k33"; // 7セグLED拡張版を使用する
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

async function set4digitLED(ht,num,deg){
	// set4digitLED()の後、write_display()を必ず呼ぶので、関数でまとめたもの
	ht.set4digitLED(num,deg);
	await ht.write_display();
}

main();
async function main() {
    const i2cAccess = await requestI2CAccess();
    const port = i2cAccess.ports.get(1);
    const ht = new HT16K33(port);
    await ht.init();

    //await ht.set_blink(ht.HT16K33_BLINK_1HZ);
    //await ht.set_brightness(6);

    while (true) {
        ht.clear();
        await ht.write_display();
        await sleep(1000);
        await set4digitLED(ht, 0, 3);
        await sleep(1000);
        await set4digitLED(ht, 0.003, 3);
        await sleep(1000);
        await set4digitLED(ht, 0.023, 3);
        await sleep(1000);
        await set4digitLED(ht, 0.123, 3);
        await sleep(1000);
        await set4digitLED(ht, 2.0, 3);
        await sleep(1000);
        await set4digitLED(ht, 0.0, 2);
        await sleep(1000);
        await set4digitLED(ht, 0.05, 2);
        await sleep(1000);
        await set4digitLED(ht, 0.25, 2);
        await sleep(1000);
        await set4digitLED(ht, 1.25, 2);
        await sleep(1000);
        await set4digitLED(ht, 10.25, 2);
        await sleep(1000);
        await set4digitLED(ht, 2001.25, 2);
        await sleep(1000);
        await set4digitLED(ht, 20210.25);
        await sleep(1000);
        await set4digitLED(ht, 0);
        await sleep(1000);
        for (var i = 0; i < 1; i += 0.01) {
            await set4digitLED(ht, i, 2);
            await sleep(10);
        }
        for (var i = 0; i < 10; i += 0.11) {
            await set4digitLED(ht, i, 2);
            await sleep(10);
        }
        for (var i = 0; i < 100; i += 3) {
            await set4digitLED(ht, i);
            await sleep(10);
        }
        for (var i = 100; i < 10000; i += 300) {
            await set4digitLED(ht, i);
            await sleep(10);
        }
    }
}

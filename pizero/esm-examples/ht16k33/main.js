// Adafruit Mini 8x8 LED Matrix w/I2C Backpack
// https://www.switch-science.com/products/1493 , https://www.adafruit.com/product/870
// or
// Ks0064 keyestudio I2C 8x8 LED Matrix HT16K33
// https://ja.aliexpress.com/item/32886174149.html

import { requestI2CAccess } from "./node_modules/node-web-i2c/index.js";
import HT16K33 from "@chirimen/ht16k33";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

main();

const iconPattern =[
0,0,1,1,1,1,0,0,
0,1,0,0,0,0,1,0,
1,0,1,0,0,1,0,1,
1,0,0,0,0,0,0,1,
1,0,1,0,0,1,0,1,
1,0,0,1,1,0,0,1,
0,1,0,0,0,0,1,0,
0,0,1,1,1,1,0,0,
]; // スマイルマーク

async function main() {
	const i2cAccess = await requestI2CAccess();
	const port = i2cAccess.ports.get(1);
	const ht = new HT16K33(port);
	await ht.init();
	
	//await ht.set_blink(ht.HT16K33_BLINK_1HZ);
	//await ht.set_brightness(6);
	
	ht.set_8x8_array(iconPattern);
	/**
	for ( var i = 0 ; i < 128 ; i++ ){
		ht.set_led(i, 1);
	}
	**/
	await ht.write_display();
}

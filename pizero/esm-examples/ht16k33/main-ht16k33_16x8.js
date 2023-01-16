// Example for Aitendo 16x8 LED ht16k33 module kit
// https://www.aitendo.com/product/16658

import { requestI2CAccess } from "./node_modules/node-web-i2c/index.js";
import HT16K33 from "@chirimen/ht16k33";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

main();

const iconPattern =[
0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,
0,1,0,0,0,0,1,0,0,1,0,0,0,0,1,0,
1,0,1,0,0,1,0,1,1,0,1,0,0,1,0,1,
1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,
1,0,1,0,0,1,0,1,1,0,1,0,0,1,0,1,
1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,
0,1,0,0,0,0,1,0,0,1,0,0,0,0,1,0,
0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,
]; // スマイルマークx2

const iconPattern2 =[
1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,
0,1,0,0,0,0,1,0,0,1,0,0,0,0,1,0,
0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,
0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,
1,1,0,1,1,0,1,1,1,1,0,1,1,0,1,1,
0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,
0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,
1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,
]; // インベーダーx2

const iconPattern3 =[
0,1,0,0,0,0,1,0,0,1,0,0,0,0,1,0,
1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,
1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,
1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,
1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,
1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,
0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,
0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
]; // 犬x2

const iconPattern4 =[
1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
]; // point test


async function main() {
	const i2cAccess = await requestI2CAccess();
	const port = i2cAccess.ports.get(1);
	const ht = new HT16K33(port);
	await ht.init();
	
	//await ht.set_blink(ht.HT16K33_BLINK_1HZ);
	//await ht.set_brightness(6);
	
	while(true){
		ht.set_16x8_array(iconPattern);
		await ht.write_display();
		await sleep(1000);
		
		ht.set_16x8_array(iconPattern2);
		await ht.write_display();
		await sleep(1000);
		
		ht.set_16x8_array(iconPattern3);
		await ht.write_display();
		await sleep(1000);
		
		ht.set_16x8_array(iconPattern4);
		await ht.write_display();
		await sleep(1000);
		
		/** LEDを一個づつ設定する関数の使用例
		for ( var i = 0 ; i < 128 ; i++ ){
			ht.set_led(i, 1);
		}
		await ht.write_display();
		await sleep(1000);
		**/
	}
}

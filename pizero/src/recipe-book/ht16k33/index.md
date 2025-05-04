# ht16k33
# HT16K33 LEDマトリクスドライバ、8x8LEDマトリクスモジュール一体型や7セグメントLED一体型等にも対応

## 配線図

Note: 3.3V電源でも、あまり明るくはなりませんが動作するようです。

![配線図](./schematic.png "schematic")

## 参照情報

### 8x8マトリクスLEDモジュール(デフォルト設定)
いずれでも動作(ピン配置は異なる)
* Adafruit Mini 8x8 LED Matrix w/I2C Backpack
  * https://www.switch-science.com/products/1493
  * https://www.adafruit.com/product/870

* keyestudio Ks0064 I2C 8x8 LED Matrix HT16K33
  * https://ja.aliexpress.com/item/32886174149.html

* サンプルコード [./main.js](./main.js)

### Aitendo製 8x8マトリクスLEDモジュール
Adafruit、keystudioとマトリクスの結線が異なりますが、設定変更により使用可能です。

* 対応品リスト
  * https://www.aitendo.com/product/12822
  * https://www.aitendo.com/product/12850
  * https://www.aitendo.com/product/12823

* サンプルコード [./main-ht16k33_8x8aitendo.js](./main-ht16k33_8x8aitendo.js)
  * aitendo製モジュール用の設定変更関数を呼び出して使います。

### 4桁7セグメントLEDモジュール
配線が同じであれば、amazonやaliexpress等で販売されているジェネリック品でも使用できると思います。（動作はAitendo製品で確認）
* 対応品：aitendo
  * https://www.aitendo.com/product/14540
  * https://www.aitendo.com/product/18690
  * https://www.aitendo.com/product/20785

* サンプルコード [./main-ht16k33_7seg.js](./main-ht16k33_7seg.js)

### 4桁 14セグメントLEDモジュール
数字やアルファベットが表示可能なLEDモジュール。配線が同じであれば、amazonやaliexpress等で販売されているジェネリック品でも使用できると思います。（動作はAitendo製品で確認）
* 対応品：aitendo
  * https://www.aitendo.com/product/20812
  * https://www.aitendo.com/product/20811

* サンプルコード [./main-ht16k33_14seg.js](./main-ht16k33_14seg.js)

### その他
* set_led関数を使用することで、任意のLEDマトリクスに対応できます

## サンプルコード (main.js)

```javascript
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

const iconPattern2 =[
1,0,0,0,0,0,0,1,
0,1,0,0,0,0,1,0,
0,0,1,1,1,1,0,0,
0,1,1,1,1,1,1,0,
1,1,0,1,1,0,1,1,
0,1,1,1,1,1,1,0,
0,0,1,0,0,1,0,0,
1,1,0,0,0,0,1,1
]; // インベーダー

const iconPattern3 =[
0,1,0,0,0,0,1,0,
1,1,1,1,1,1,1,0,
1,0,0,1,0,0,1,0,
1,1,0,1,1,0,1,0,
1,0,0,1,0,0,1,0,
1,1,1,1,1,1,1,0,
0,1,1,1,1,1,1,1,
0,1,0,1,0,1,0,1
]; // 犬

async function main() {
	const i2cAccess = await requestI2CAccess();
	const port = i2cAccess.ports.get(1);
	const ht = new HT16K33(port);
	await ht.init();
	
	//await ht.set_blink(ht.HT16K33_BLINK_1HZ);
	//await ht.set_brightness(6);
	
	while(true){
		ht.set_8x8_array(iconPattern);
		await ht.write_display();
		await sleep(1000);
		
		ht.set_8x8_array(iconPattern2);
		await ht.write_display();
		await sleep(1000);
		
		ht.set_8x8_array(iconPattern3);
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
```


---
[← 目次に戻る](../index.md)

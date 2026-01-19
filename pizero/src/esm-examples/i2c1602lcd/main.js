import { requestI2CAccess } from "./node_modules/node-web-i2c/index.js";
import I2C1602LCD from "@chirimen/i2c1602lcd";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
	const i2cAccess = await requestI2CAccess();
	const port = i2cAccess.ports.get(1);
	const lcd = new I2C1602LCD(port, 0x27); // アドレスが違う場合は 0x3f 等に変更

	await lcd.init();

	while (true) {
		await lcd.print("Hello CHIRIMEN!", lcd.line1); // 1行目
		await lcd.print("I2C 1602 LCD", lcd.line2); // 2行目
		await new Promise((r) => setTimeout(r, 1500));

		await lcd.print("コンニチハ ラズパイ", lcd.line1); // 全角カタカナ
		await lcd.print("ｵﾊﾖｳｺﾞｻﾞｲﾏｽ", lcd.line2); // 半角カタカナ
		await sleep(1500);
	}
}

main();

import { requestI2CAccess } from "./node_modules/node-web-i2c/index.js";

// vl6180x.js から VL6180Xをインポート
import VL6180X from "@chirimen/vl6180x";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

// メインの処理を実行する非同期関数
async function main() {
	// WebI2Cサービスを取得
	const i2cAccess = await requestI2CAccess();
	const port = i2cAccess.ports.get(1); // ポート1を使用

	// VL6180Xインスタンスを初期化
	const vl6180x = new VL6180X(port);
	await vl6180x.init();

	// 永久ループ
	while (true) {
		console.log("--next loop--");

		const l = await vl6180x.getRange();
		console.log(l, "mm");
		await sleep(500); // 500ms待機
	}
}

// メイン関数を実行
main();

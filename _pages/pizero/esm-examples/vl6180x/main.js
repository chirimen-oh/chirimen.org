import { requestI2CAccess } from "./node_modules/node-web-i2c/index.js";

import VL6180X from "@chirimen/vl6180x";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1); // ポート1を使用

// VL6180Xインスタンスを初期化
const vl6180x = new VL6180X(i2cPort);
await vl6180x.init();

while (true) {
  const l = await vl6180x.getRange();
  console.log(l, "mm");
  await sleep(500); // 500ms待機
}

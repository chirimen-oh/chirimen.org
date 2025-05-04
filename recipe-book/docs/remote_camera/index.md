# GPIOスイッチによるカメラ撮影 (remote_Camera)

## 配線図

![配線図](./PiZero_remote_camera.png "schematic")

タクトスイッチはGPIO PORT5に繋ぎます。

カメラは専用コネクターに専用ケーブルを使って接続し、更にセットアップが必要です。[こちらを参照してください](../gpio-camera/readme.md)


## サンプルコード (main.js)

```javascript
// Raspberry Pi Camera　リモートカメラ

// ライブラリ　pi-camera-connect　をまずインストールする必要があります。readmeを参照してください。

import { StillCamera } from "pi-camera-connect";
import * as fs from "fs";

import { requestGPIOAccess } from "./node_modules/node-web-gpio/dist/index.js";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

import nodeWebSocketLib from "websocket"; // https://www.npmjs.com/package/websocket
import { RelayServer } from "./RelayServer.js";

const stillCamera = new StillCamera({
	width: 128,
	height: 128,
});

var channel;

async function connect() {
	// webSocketリレーの初期化
	var relay = RelayServer(
		"chirimentest",
		"chirimenSocket",
		nodeWebSocketLib,
		"https://chirimen.org"
	);
	channel = await relay.subscribe("chirimenCAM");
	console.log("web socketリレーサービスに接続しました");
	channel.onmessage = transmitImageData;
}

async function transmitImageData(messge) {
	console.log(messge.data);
	if (messge.data == "GET IMAGE DATA") {
		const imageURI = await captureImage();
		var sensorData = {
			imageURI: imageURI,
			time: new Date().getTime(),
		};
		channel.send(sensorData);
		console.log("Send ImageData: length:", JSON.stringify(sensorData).length);
	}
}

// カメラの画像をDataURIとして取得する
// このAPIについてはreadme.mdを参照してください。
async function captureImage() {
	var mime = "image/jpeg";
	var encoding = "base64";
	const image = await stillCamera.takeImage();
	const b64str = image.toString(encoding);
	const dataURL = "data:" + mime + ";" + encoding + "," + b64str;
	return dataURL;
}

connect();
```


---
[← 目次に戻る](../index.md)

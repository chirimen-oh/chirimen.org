# remote_pca9685
# リモートサーボモータ

## 配線図

![配線図](../pca9685/schematic.png "schematic")

## 遠隔コントローラ(PC/スマホブラウザ)側

[pc/index.html](https://codesandbox.io/s/github/chirimen-oh/chirimen.org/tree/master/pizero/src/esm-examples/remote_pca9685/pc?module=pc.js)を起動します。

## サンプルコード (main.js)

```javascript
// Remote Example8 - reciever
// for CHIRIMEN with nodejs

import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import PCA9685 from "@chirimen/pca9685";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
import nodeWebSocketLib from "websocket"; // https://www.npmjs.com/package/websocket
import {RelayServer} from "./RelayServer.js";

var channel;
var pca9685;

async function connect(){
	// chirimen with micro:bit、サーボコントローラの初期化
	var i2cAccess = await requestI2CAccess();
	var i2cPort = i2cAccess.ports.get(1);
	pca9685 = new PCA9685(i2cPort, 0x40);
	await pca9685.init(0.001, 0.002, 30);
	
	
	// webSocketリレーの初期化
	var relay = RelayServer("chirimentest", "chirimenSocket" , nodeWebSocketLib, "https://chirimen.org");
	channel = await relay.subscribe("chirimenMbitRemoteServo");
	console.log("web socketリレーサービスに接続しました");
	channel.onmessage=moveServo;
}

async function moveServo(message) {
//	console.log("message:",message);
	if ( !message.data.slope){
		return;
	}
	var angle = message.data.slope;
	if ( Math.abs(angle)>28){
		angle = Math.sign(angle)*28;
	}
	console.log("servo:",angle);
    await pca9685.setServo(0, angle);
    console.log("サーボ角度:"+angle);
	channel.send({setAngle:angle});
}

connect();```


---
[← 目次に戻る](../index.md)

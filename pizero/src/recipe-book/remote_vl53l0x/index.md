# remote_vl53l0x
# リモート距離センサ

## 配線図

![配線図](../vl53l0x/schematic.png "schematic")

## 遠隔モニタ(PC/スマホブラウザ)側

[pc/index.html](https://codesandbox.io/s/github/chirimen-oh/chirimen.org/tree/master/pizero/src/esm-examples/remote_vl53l0x/pc?module=pc.js)を起動します。

## サンプルコード (main.js)

```javascript
// Remote VL53L0X
// for CHIRIMEN with nodejs
import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import VL53L0X from "@chirimen/vl53l0x";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
import nodeWebSocketLib from "websocket"; // https://www.npmjs.com/package/websocket
import {RelayServer} from "./RelayServer.js";

var channel;
var vl;

async function connect(){
	// I2Cポートと、I2CデバイスVL53L0Xの初期化
	var i2cAccess = await requestI2CAccess();
	var i2cPort = i2cAccess.ports.get(1);
	vl = new VL53L0X(i2cPort, 0x29);
	await vl.init();
	
	// webSocketリレーの初期化
	var relay = RelayServer("chirimentest", "chirimenSocket" , nodeWebSocketLib, "https://chirimen.org");
	channel = await relay.subscribe("chirimenVL");
	console.log("web socketリレーサービスに接続しました");
    transmitSensorData();
}

async function transmitSensorData(){
    for (;;){
		var sensorData = await readData();
		channel.send(sensorData);
        await sleep(1000);
    }
}

async function readData(){
	var vlData = await vl.getRange();
	console.log("distance:" + vlData + "mm");
	return(vlData);
}

connect();
```


---
[← 目次に戻る](../index.md)

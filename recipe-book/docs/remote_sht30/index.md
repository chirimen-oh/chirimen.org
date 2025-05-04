# リモート温湿度センサ

## 配線図

![配線図](../sht30/schematic.png "schematic")

## 遠隔モニタ(PC/スマホブラウザ)側

[pc/index.html](https://codesandbox.io/s/github/chirimen-oh/chirimen.org/tree/master/pizero/src/esm-examples/remote_sht30/pc?module=pc.js)を起動します。

## サンプルコード (main.js)

```javascript
// Remote Example5 - reciever
// for CHIRIMEN with nodejs
import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import SHT30 from "@chirimen/sht30";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
import nodeWebSocketLib from "websocket"; // https://www.npmjs.com/package/websocket
import {RelayServer} from "./RelayServer.js";

var channel;
var sht;

async function connect(){
	// I2Cポートと、I2CデバイスSHT30の初期化
	var i2cAccess = await requestI2CAccess();
	var i2cPort = i2cAccess.ports.get(1);
	sht = new SHT30(i2cPort);
	await sht.init();
	
	// webSocketリレーの初期化
	var relay = RelayServer("chirimentest", "chirimenSocket" , nodeWebSocketLib, "https://chirimen.org");
	channel = await relay.subscribe("chirimenSHT");
	console.log("web socketリレーサービスに接続しました");
	channel.onmessage = transmitSensorData;
}

async function transmitSensorData(messge){
	console.log(messge.data);
	if ( messge.data =="GET SENSOR DATA"){
		var sensorData = await readData();
		channel.send(sensorData);
		console.log(JSON.stringify(sensorData));
	}
}

async function readData(){
	var shtData = await sht.readData();
	console.log('shtData:', shtData);
	console.log("temperature:" + shtData.temperature + "degree  <br>humidity:"+ shtData.humidity + "%");
	return(shtData);
}

connect();```


---
[← 目次に戻る](../index.md)

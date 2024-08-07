// Remote Example9 - reciever
// for CHIRIMEN with nodejs

import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
import nodeWebSocketLib from "websocket"; // https://www.npmjs.com/package/websocket
import {RelayServer} from "./RelayServer.js";

var channel;
var gpioPort0;

async function connect(){
	// GPIOポート0の初期化
	var gpioAccess = await requestGPIOAccess();
	var mbGpioPorts = gpioAccess.ports;
	gpioPort0 = mbGpioPorts.get(5);
	await gpioPort0.export("in"); //port0 out
	
	// webSocketリレーの初期化
	var relay = RelayServer("chirimentest", "chirimenSocket" , nodeWebSocketLib, "https://chirimen.org");
	channel = await relay.subscribe("chirimenSW");
	console.log("web socketリレーサービスに接続しました");
	gpioPort0.onchange=testChange; // ISSUE gpioのonchangeの仕様が異なる
}

function testChange(val){
	var msgTxt = (val.value === 1 ) ? "High" : "Low"; // 条件 (三項) 演算子 
	console.log(msgTxt);
	channel.send(msgTxt);
}


connect();

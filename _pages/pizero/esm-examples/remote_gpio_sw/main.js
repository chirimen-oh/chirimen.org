// Remote Example9 - reciever
// for CHIRIMEN with nodejs

import { requestGPIOAccess } from "node-web-gpio";
import nodeWebSocketLib from "websocket"; // https://www.npmjs.com/package/websocket
import { RelayServer } from "./RelayServer.js";

let channel;
let gpioPort0;

function testChange(val){
	const msgTxt = (val.value === 1 ) ? "High" : "Low"; // 条件 (三項) 演算子 
	console.log(msgTxt);
	channel.send(msgTxt);
}

// GPIOポート0の初期化
const gpioAccess = await requestGPIOAccess();
const mbGpioPorts = gpioAccess.ports;
gpioPort0 = mbGpioPorts.get(5);
await gpioPort0.export("in");

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket" , nodeWebSocketLib, "https://chirimen.org");
channel = await relay.subscribe("chirimenSW");
console.log("web socketリレーサービスに接続しました");
gpioPort0.onchange=testChange; // ISSUE gpioのonchangeの仕様が異なる

// Remote Example1 - reciever
// for CHIRIMEN with nodejs

import { requestGPIOAccess } from "node-web-gpio";
import nodeWebSocketLib from "websocket"; // https://www.npmjs.com/package/websocket
import { RelayServer } from "./RelayServer.js";

let channel;
let gpioPort0;

function controlLED(messge){
	console.log(messge.data);
	if ( messge.data =="LED ON"){
		gpioPort0.write(1);
		console.log("ON");
		channel.send("LEDをオンにしました");
	} else if ( messge.data =="LED OFF"){
		gpioPort0.write(0);
		console.log("OFF");
		channel.send("LEDをオフにしました");
	}
}

// GPIOポート0の初期化
const gpioAccess = await requestGPIOAccess();
const mbGpioPorts = gpioAccess.ports;
gpioPort0 = mbGpioPorts.get(26);
await gpioPort0.export("out");

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket" , nodeWebSocketLib, "https://chirimen.org");
channel = await relay.subscribe("chirimenLED");
console.log("web socketリレーサービスに接続しました");
channel.onmessage = controlLED;

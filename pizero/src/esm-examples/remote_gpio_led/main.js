// Remote Example1 - reciever

import { requestGPIOAccess } from "node-web-gpio";
import { RelayServer } from "./RelayServer.js";

let channel;
let gpioPort0;

function controlLED(messge) {
  console.log(messge.data);
  switch (messge.data) {
    case "LED ON":
      gpioPort0.write(1);
      console.log("ON");
      channel.send("LEDをオンにしました");
      break;
    case "LED OFF":
      gpioPort0.write(0);
      console.log("OFF");
      channel.send("LEDをオフにしました");
      break;
  }
}

// GPIOポート0の初期化
const gpioAccess = await requestGPIOAccess();
const mbGpioPorts = gpioAccess.ports;
gpioPort0 = mbGpioPorts.get(26);
await gpioPort0.export("out");

// webSocketリレーの初期化
const relay = RelayServer("chirimentest", "chirimenSocket");
channel = await relay.subscribe("chirimenLED");
console.log("web socketリレーサービスに接続しました");
channel.onmessage = controlLED;

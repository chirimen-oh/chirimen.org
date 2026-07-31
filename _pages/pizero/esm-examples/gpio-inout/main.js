import { requestGPIOAccess } from "node-web-gpio";
let gpioPort2;

function showPort(ev){
	console.log(ev.value);
    if (ev.value==0){
        gpioPort2.write(1);
    } else {
        gpioPort2.write(0);
    }
}

const gpioAccess = await requestGPIOAccess();

gpioPort2 = gpioAccess.ports.get(26);
await gpioPort2.export("out");

const gpioPort = gpioAccess.ports.get(5);
await gpioPort.export("in");
gpioPort.onchange = showPort;

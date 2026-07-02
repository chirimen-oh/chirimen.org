import { requestGPIOAccess } from "node-web-gpio";

function showPort(ev){
	console.log(ev.value);
}

const gpioAccess = await requestGPIOAccess();
const gpioPort = gpioAccess.ports.get(5);

await gpioPort.export("in");
gpioPort.onchange = showPort;

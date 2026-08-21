import { requestGPIOAccess } from "node-web-gpio";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const gpioAccess = await requestGPIOAccess();
const gpioPort = gpioAccess.ports.get(5);
await gpioPort.export("in");
const gpioPort2 = gpioAccess.ports.get(26);
await gpioPort2.export("out");
gpioPort.onchange = async (e) => {
  console.log(e.value);
  if (e.value == 0) {
    await gpioPort2.write(1);
  } else {
    await gpioPort2.write(0);
  }
};

import { requestGPIOAccess } from "node-web-gpio";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const gpioAccess = await requestGPIOAccess();
const gpioPort = gpioAccess.ports.get(26);

await gpioPort.export("out");

while (true) {
  await gpioPort.write(1);
  await sleep(1000);
  await gpioPort.write(0);
  await sleep(1000);
}

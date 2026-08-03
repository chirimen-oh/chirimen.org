import { requestGPIOAccess } from "node-web-gpio";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const gpioAccess = await requestGPIOAccess();
  const gpioPort = gpioAccess.ports.get(5);

  await gpioPort.export("in");

  while (true) {
    const v = await gpioPort.read();
	console.log(v);
    await sleep(300);
  }

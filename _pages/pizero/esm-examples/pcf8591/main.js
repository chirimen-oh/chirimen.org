import { requestI2CAccess } from "node-web-i2c";
import PCF8591 from "@chirimen/pcf8591";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const pcf8591 = new PCF8591(i2cPort, 0x48);
await pcf8591.init();

// Set DAC voltage (Range: 0V - 3.3V)
await pcf8591.setDAC(3.3);

while (true) {
  let output = "";

  // PCF8591 has 4 channels
  for (let channel = 0; channel < 4; channel++) {
    const voltage = await pcf8591.readADC(channel);
    output += `CH${channel}:${voltage.toFixed(3)}V `;
  }
  console.log(output);

  await sleep(500);
}

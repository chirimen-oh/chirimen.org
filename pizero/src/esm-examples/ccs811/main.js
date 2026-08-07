import { requestI2CAccess, CCS811 } from "chirimen";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const i2cAccess = await requestI2CAccess();
const ccs811 = new CCS811(i2cAccess.ports.get(1));
await ccs811.init();

while (true) {
  const { CO2, TVOC, error } = await ccs811.readData();
  if (!error) {
    console.log(`CO2: ${CO2} ppm, TVOC: ${TVOC} ppb`);
  }
  await sleep(1000);
}

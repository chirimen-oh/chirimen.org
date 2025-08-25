import { requestI2CAccess } from "chirimen";
import QRScanner from "./qrscanner.js";
const i2cAccess = await requestI2CAccess();
const i2cPort = i2cAccess.ports.get(1);
const qrscanner = new QRScanner(i2cPort, 0x21);
await qrscanner.init();
await qrscanner.setTriggerMode(0);

for (;;) {
  let data = await qrscanner.scanData();
  console.dir(data);
}

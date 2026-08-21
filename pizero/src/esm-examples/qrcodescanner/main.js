import { requestI2CAccess } from "node-web-i2c";
import QRScanner from "@chirimen/qrcodescanner";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const i2cAccess = await requestI2CAccess();
const qrscanner = new QRScanner(i2cAccess.ports.get(1), 0x21);
await qrscanner.init();
await qrscanner.setTriggerMode(0);

while (true) {
  const data = await qrscanner.scanData();
  console.dir(data);
}

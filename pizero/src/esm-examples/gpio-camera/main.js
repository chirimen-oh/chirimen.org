// GPIO5のスイッチを押すと、Raspberry Pi Cameraで撮影し、ファイルに保存する

// ライブラリ　pi-camera-connect　をまずインストールする必要があります。readmeを参照してください。

import { StillCamera } from "pi-camera-connect";
import * as fs from "fs";

import { requestGPIOAccess } from "node-web-gpio";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const stillCamera = new StillCamera({
  width: 600,
  height: 600,
});

const gpioAccess = await requestGPIOAccess();
const gpioPort = gpioAccess.ports.get(5);

await gpioPort.export("in");
gpioPort.onchange = async (e) => {
  if (e.value == 1) {
    // 押し下げたときだけ撮影
    return;
  }
  const image = await stillCamera.takeImage();
  const fileName = `still-image-${new Date().getTime()}.jpg`;
  console.log(`sw: ${e.value} takeImage: ${fileName}`);
  fs.writeFileSync(fileName, image);
};

# GPIO スイッチによるカメラ撮影 (GPIO-Camera)

## 配線図

![配線図](./PiZero_gpio-camera.png "schematic")

タクトスイッチは GPIO PORT5 に繋ぎます。

カメラは専用コネクターに専用ケーブルを使って接続し、更にセットアップが必要です。次章を参照してください

# カメラのセットアップと動作確認

_この章は[こちらの記事](https://gist.github.com/satakagi/1b5adc8dff8236421a593b93fa152222)を改変して作成されました。_

[Raspberry Pi のカメラ](https://www.raspberrypi.com/documentation/accessories/camera.html)を API で直接操作する[pi-camera-connect](https://www.npmjs.com/package/pi-camera-connect)を使った方法です。[Pi-Camera](https://github.com/stetsmando/pi-camera)を使った方法([gist はこちら](https://gist.github.com/satakagi/2c5be63d4759fd21eca939f507e7f7ef))より、大幅に高速に画像が取得できることを確認しています。

## 準備

- Raspberry Pi カメラモジュール
  - [例 1:KEYESTUDIO カメラモジュール](https://www.amazon.co.jp/dp/B073RCXGQS/)、[例 2](https://www.amazon.co.jp/dp/B086MK17K5/)、[例 3](https://www.amazon.co.jp/dp/B08HVRB59N/)
- Zero 用ケーブル～上のモジュールは添付されているようです。
  - 無い場合は [別途調達](https://www.amazon.co.jp/gp/product/B07QH455KY/)
- [接続のしかた](https://projects.raspberrypi.org/ja-JP/projects/getting-started-with-picamera) : Zero は専用ケーブルでつなぎます

> **Note**\
> 利用可能なカメラモジュールは v1、v3 です。Camera Module v2 には未対応です。
> また Raspberry Pi Zero 用 CHIRIMEN v1.4.0 未満をお使いの場合、Camera Module v3 には未対応です。
> [Raspberry Pi Zero 用 CHIRIMEN v1.4.0 以上](https://github.com/chirimen-oh/chirimen-lite/releases) をお使いください。

## カメラの動作テスト

以下のコマンドで画像ファイルが保存されます:

```
raspistill -v --width 640 --height 480 -o test.jpg
```

> **Note**\
> [Raspberry Pi Zero 用 CHIRIMEN v1.4.0 以上](https://github.com/chirimen-oh/chirimen-lite/releases) をお使いの場合、`rpicam-still --list-cameras` コマンドで利用可能なカメラの一覧を表示可能です:
>
> ```
> $ rpicam-still --list-cameras
> Available cameras
> -----------------
> 0 : ov5647 [2592x1944 10-bit GBRG] (/base/soc/i2c0mux/i2c@1/ov5647@36)
>     Modes: 'SGBRG10_CSI2P' : 640x480 [58.92 fps - (16, 0)/2560x1920 crop]
>                              1296x972 [43.25 fps - (0, 0)/2592x1944 crop]
>                              1920x1080 [30.62 fps - (348, 434)/1928x1080 crop]
>                              2592x1944 [15.63 fps - (0, 0)/2592x1944 crop]
> ```
>
> 詳細: [Camera software - Raspberry Pi Documentation](https://www.raspberrypi.com/documentation/computers/camera_software.html)

## サンプル

[pi-camera-connect のリポジトリ](https://github.com/launchcodedev/pi-camera-connect)の readme と同じ内容ですが、オプションを加えてみました

```javascript
import { StillCamera } from "pi-camera-connect";
import * as fs from "fs";

// Take still image and save to disk
async function runApp() {
  const stillCamera = new StillCamera({
    width: 600,
    height: 600,
  });
  const image = await stillCamera.takeImage();
  fs.writeFileSync("still-image.jpg", image);
}

runApp();
```

dataURL を取得

```javascript
import { StillCamera } from "pi-camera-connect";

// Take still image and get dataURI
async function runApp() {
  const stillCamera = new StillCamera({
    width: 200,
    height: 200,
  });
  var mime = "image/jpeg";
  var encoding = "base64";
  const image = await stillCamera.takeImage();
  const b64str = image.toString(encoding);
  const dataURL = "data:" + mime + ";" + encoding + "," + b64str;
  console.log(dataURL);
}

runApp();
```

## Note

- [dataURL](https://developer.mozilla.org/ja/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)で画像を文字列化すれば比較的簡単にサーバに送信したりできるでしょう。
  - [リモートカメラサンプル](https://tutorial.chirimen.org/pizero/esm-examples/#REMOTE_remote_camera)
- 各種センサ (WebGPIO 経由で人感センサーなど)を使い、自動的に撮影、サーバにアップロードする仕組みなどもできるでしょう。
- [pi-camera-connect のリポジトリ](https://github.com/launchcodedev/pi-camera-connect)

## サンプルコード (main.js)

```javascript
// GPIO5のスイッチを押すと、Raspberry Pi Cameraで撮影し、ファイルに保存する

// ライブラリ　pi-camera-connect　をまずインストールする必要があります。readmeを参照してください。

import { StillCamera } from "pi-camera-connect";
import * as fs from "fs";

import { requestGPIOAccess } from "./node_modules/node-web-gpio/dist/index.js";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

const stillCamera = new StillCamera({
	width: 600,
	height: 600,
});

async function switchCheck() {
	const gpioAccess = await requestGPIOAccess();
	const port = gpioAccess.ports.get(5);

	await port.export("in");
	port.onchange = takeImage;
}

async function takeImage(ev) {
	if (ev.value == 1) {
		// 押し下げたときだけ撮影
		return;
	}
	const image = await stillCamera.takeImage();
	const fileName = "still-image-" + new Date().getTime() + ".jpg";
	console.log("sw:", ev.value, " takeImage:", fileName);
	fs.writeFileSync(fileName, image);
}

switchCheck();
```


---
[← 目次に戻る](../index.md)

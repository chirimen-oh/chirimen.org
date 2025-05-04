# Serial GPS

PiZeroのシリアル端子に、GY-GPS6MV2等のGPSレシーバ基板を繋いで使用する

* OSの設定
  * ```sudo raspi-config```
  * Interface Options -> Serial Port -> Login over serial: いいえ , serial port enabled: はい -> Finish (reboot)
  * Note: この設定はUSBシリアルのコンソールログインには影響しない
* 結線 (GPSのRX端子の結線は基本動作では不要) : 下図参照
  * 動作検証したモジュール (GY-NEO6MV2,基板の印刷はGY-GPS6MV2)
    * https://electronicwork.shop/items/625c1ca99fe3d707d725cbe1
  * 同等品と考えられるもの
    * https://www.amazon.co.jp/dp/B07LF6KGR8
    * https://www.aitendo.com/product/10255
* 動作確認
  * ```cat /dev/ttyS0```
  * Note: GPS衛星電波受信されていなくてもメッセージが出力される。 ```/dev/serial0``` も使える。測位成功するとメッセージが派手になり、LEDが点滅する (LEDは測位成功していないときは消灯)
* シリアルポート及びGPSのライブラリを導入(myAppディレクトリで)
  * ```cd myApp```
  * ```npm install serialport gps```
* アプリの実行
  * main.js を myApp下に保存
  * ```node main.js```

![GY-NEO6MV2.png](GY-NEO6MV2.png)

## サンプルコード (main.js)

```javascript
// シリアルからGPSデータ受信
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import GPSpackage from 'gps';
const GPS = GPSpackage.GPS;

const port = new SerialPort({ path: '/dev/ttyS0', baudRate: 9600 })
const parser = port.pipe(new ReadlineParser())
const gps = new GPS();

parser.on('data', function (txtData) {
    gps.update(txtData);
});

gps.on('data', function (data) {
    if (data.type == "GGA") { // "RMC"タイプデータを読むと速度(ノット)が得られる
        console.log(data);
    }
    /** 
    console.log("data:", data);
    console.log("stat:", gps.state);
    console.log("==============================================================");
    **/
});
```


---
[← 目次に戻る](../index.md)

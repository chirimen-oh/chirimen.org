# その他

## GPS

### Serial GPS

#### 概要

* 高性能 GPS 受信チップ NEO-6M を搭載した GPS モジュール
* Pi Zero のシリアル端子に、GY-GPS6MV2 等の GPS レシーバ基板を繋いで使用

#### 配線図

![](GY-NEO6MV2.png "schematic"){width=323px height=192px}

#### CHIRIMEN 用ドライバのインストール

- 不要

#### サンプルコード (main.js)

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

#### 特記事項

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

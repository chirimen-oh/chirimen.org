# オーディオ

## オーディオプレーヤー

### DFPlayer Mini

#### 概要

* MP3 プレーヤーボードを GPIO OUTPUT で制御

#### 配線図

![](./DFPlayer.png "schematic"){width=343px height=238px}

#### CHIRIMEN 用ドライバのインストール

- 不要

#### サンプルコード (main.js)

```javascript
import { requestGPIOAccess } from "./node_modules/node-web-gpio/dist/index.js";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

let play1port;
let pauseport;

async function start_play() {
    const gpioAccess = await requestGPIOAccess();
    play1port = gpioAccess.ports.get(26); // 
    pauseport = gpioAccess.ports.get(19);

    await play1port.export("out");
    await pauseport.export("out");

    await repeat_play();
}

async function repeat_play() {
    while (true) {
        // 1曲目を再生開始
        console.log("start play1")
        await play1port.write(1);
        await sleep(300); // 0.3秒保持して元に戻す
        await play1port.write(0);

        // 10秒保持
        await sleep(10 * 1000);

        // 一時停止
        console.log("stop")
        await pauseport.write(1);
        await sleep(300);
        await pauseport.write(0);

        //  3秒間一時停止
        await sleep(3 * 1000);
    }
}

start_play();
```

#### 特記事項

* DFPlayer Mini ボードの ADKEY1 端子を Nch MOSFET を介して GPIO で制御します
  * 他にシリアル通信での制御も可能なボードですがこのサンプルは GPIO で制御できる ADKEY 端子を使用
* 電源投入後、ボリュームが最大になるので S1 スイッチは付けておきましょう
* ADKEY1/2 端子と抵抗を組み合わせることでいろいろなコントロールが可能です。

#### 参考

GPIO 端子の使用数を増やすと制御できる種類も増やせます。

* [参考ページ](https://chitakekoubou.blogspot.com/p/dfplayeradkeyio.html)
* [メーカーサイトの説明ページ](https://wiki.dfrobot.com/DFPlayer_Mini_SKU_DFR0299)

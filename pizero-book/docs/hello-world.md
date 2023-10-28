# Hello Real World（Lチカを実行する）

## 配線

PiZero とパーツを使って下の図の通りに配線します。
* [LEDの極性に注意！](https://tutorial.chirimen.org/raspi/hellorealworld#section-1)
  * LED 基本ガイド (marutsu)<span class="footnote">https://www.marutsu.co.jp/pc/static/large_order/led</span>
* [ブレッドボードの使い方](https://shop.sunhayato.co.jp/blogs/problem-solving/breadboard) (サンハヤト社)
* 抵抗のカラーコードの読み方(JARL)<span class="footnote">https://www.jarl.org/Japanese/7_Technical/lib1/teikou.htm</span>
* その他、配線の基礎知識（13 章 予備知識参照）


<div class="note" role="doc-note">

### 注意

    間違ったピンに差し込むと場合によってはPiZeroが停止したり故障することもあります。（たとえば3.3V端子とGND端子を接続してしまうなど。）
    そのため、慣れるまでは一旦PiZeroをシャットダウン、USBケーブルも外し電源OFFにしてから配線すると安全です

シャットダウンコマンド：```sudo shutdown -h now```

</div>

![PiZero配線図](../../pizero/imgs/pizero_led.png){height=200}

* 配線に使うケーブルの色に厳密な決まりはありませんが、一般的にGNDは黒(や黒っぽい色)、電源(VCC, +3.3V, +5V)には赤(や赤っぽい色)が用いられます。配線間違いを防ぐためにもなるべく合わせましょう。
* 抵抗やLEDの足(リード線)は手で簡単に曲げられます。ブレッドボードに差し込めるように適当に成型してください。
* 上図のPiZeroは上から見たものです

## プログラムを書く

Raspberry Pi に接続した LED を点滅させるプログラムを書きます。

* ターミナルウィンドでRaspberry Pi Zeroに接続します。（ステップ１が完了した状態）
* myAppディレクトリに移動します。
  * コンソールの右側のファイルマネージャでmyApp⇒移動を選ぶ
  * このディレクトリが開発環境が設定されているディレクトリです。
* ```[Create New Text]```ボタンを押す
* 入力欄に```hello.js```と入力
* ```[create]```ボタンを押す
* JS Editorウィンドが出現

以下のプログラムをJS Editorに書き写します

```js
// WebGPIO を使えるようにするためのライブラリをインポート
import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js";
// sleep 関数を定義
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

async function blink() {
  // GPIO を操作する
  const gpioAccess = await requestGPIOAccess();
  // 26 番ポートを操作する
  const port = gpioAccess.ports.get(26);
  // ポートを出力モードに設定
  await port.export("out");

  // 無限ループ
  for (;;) {
    // 1秒間隔で LED が点滅します
    await port.write(1); // LEDを点灯
    await sleep(1000);   // 1000 ms (1秒) 待機
    await port.write(0); // LEDを消灯
    await sleep(1000);   // 1000 ms (1秒) 待機
  }
}

blink();
```

* 書き終えたら保存します。(```[Save]ボタン```もしくはCTRL+s)
* ターミナルウィンドの右側(ファイルマネージャ)に hello.jsが出現していることを確認します
* エディタウィンドを閉じます

<hr class="page-wrap" />


## 実行する

* ターミナルウィンドのコンソール部(ウィンド左側)のプロンプト(画面一番下)が以下になっていることを確認します
  * ```pi@raspberrypi:~/myApp$```
* コンソール部をクリックして、入力可能状態にしてから、以下の文字を入力します。
* ```node hello.js``` ENTERキー
  * [**node**](https://atmarkit.itmedia.co.jp/ait/articles/1102/28/news105.html) はJavaScriptのコードを実行するインタープリタ<span class="footnote">https://ja.wikipedia.org/wiki/インタプリタ</span>
* LED が点滅すれば完成です 🎉
* プログラムを止めるには、コンソール部で ```CTRL+c``` を押します。

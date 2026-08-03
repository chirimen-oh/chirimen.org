# 3.2 プログラムを書く
Raspberry Pi に接続した LED を点滅させるプログラムを書きます。

1. ターミナルウィンドで Raspberry Pi Zero に接続します。（準備のステップ１まで完了した状態）
2. myAppディレクトリに移動します。
   * コンソールの右側のファイルマネージャで myApp ⇒ 移動を選びます。
   * このディレクトリに、開発環境が設定されています。
3. ```[Create New Text]```ボタンを押します。
4. 入力欄に```hello.js```と入力します。
5. ```[create]```ボタンを押します。
6. JS Editorウィンドが出現します。

以下のプログラムを JS Editor に書き写します。下記のプログラム部分を選択して CTRL+c、JS Editor ウィンド上で CTRL+v でコピペしても構いません。

### Lチカのプログラムソースコード
```js
import { requestGPIOAccess } from "node-web-gpio"; // WebGPIO を使えるようにするためのライブラリをインポート
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec)); // sleep 関数を定義

async function blink() {
  const gpioAccess = await requestGPIOAccess(); // GPIO を操作する 
  const port = gpioAccess.ports.get(26); // 26 番ポートを操作する

  await port.export("out"); // ポートを出力モードに設定

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

7. 書き終えたら保存します。(```[Save]ボタン```もしくは```CTRL+s```)
8. ターミナルウィンドの右側 (ファイルマネージャ) に **hello.js** が出現していることを確認します。
9. エディタウィンドを閉じます。
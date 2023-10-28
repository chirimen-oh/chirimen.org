# IoT を試す

## 遠隔 LED コントロール

![system configuration](../../pizero/imgs/IoTsystemConf.png)
IoT は、制御されるデバイス（上図では CHIRIMEN Pi Zero W）と、利用者端末（上図では WebApp PC-side）に加えて、これらの間でデータを中継するサーバ（クラウド）が必要になります。
今回は Web 標準技術である WebSocket プロトコルを中継するサーバを用いて LED を備えた CHIRIMEN デバイスとスマホや PC の WebApp を繋いだ IoT システムを作ります。

<div class="note" role="doc-note">

### Note

モーター制御の回路（第 6 章 2. GPIO出力参照）を組めば、そのまま遠隔モーターコントロールができます

- 第 12 章 IoT 参照
- WebSoeketとRelayServer（第 12 章 1. WebSocketとpub/sub services 参照）

</div>

### 配線する

配線は最初の L チカそのままです。

![Pi Zero配線図](../../pizero/imgs/pizero_led.png){height=200}

<hr class="page-wrap" />

### CHIRIMEN デバイス側にコードを入れ、実行する

* ターミナルウィンドの ```[CHIRIMEN Panel]``` ボタンを押す
* 出現したCHIRIMEN Panelの ```[Get Examples]``` ボタンを押す
* ID : **remote_gpio_led**の行を探します（もう一度この行の情報を使います）
* ```[JS GET]``` ボタンを押すと、開発ディレクトリ (```~/myApp```) に、サンプルコードが保存されます。
  * **main-remote_gpio_led.js** というファイル名で保存されます。
  * ターミナルウィンドの右側のファイルマネージャで main-remote_gpio_led.js ⇒ 編集を選びソースコードを見てみましょう
* 実行する
  * ターミナルウィンドのコンソールのプロンプトが ```pi@raspberrypi:~/myApp$``` となっていることを確認
  * ターミナルウィンドのコンソールに、 ```node main-remote_gpio_led.js``` [ENTER] と入力して実行。
    ![CHIRIMEN PiZero Console](../../pizero/imgs/RC_NODE.png){height=70}
  * なお、実験が終わったら終了は CTRL+c です。

### PC 側のコードを準備し、実行する
* CHIRIMEN Panel に戻り、 ID : **remote_gpio_led** の行にある、 ```CSB EDIT``` リンクをクリックする。
  * [CodeSandbox](https://csb-jp.github.io/) というオンラインの WebApp 開発環境のウィンドが開き、 PC 側のコードが表示されています。編集もできます。
  * また、右側（もしくは右下）のフレームには LED を遠隔コントロールするための webApp が既に実行されています。
  * webApp を使って LED が制御できることを確かめてみましょう。
![Code Sandbox Image](../../pizero/imgs/RC_CSB.svg){height=240}

<hr class="page-wrap" />

### コードを読む
#### Raspberry Pi Zero 側コード
* ターミナルウィンドの右側のファイルマネージャで main-remote_gpio_led.js ⇒ 表示 を選び、ソースコードを読んでみましょう
* これまで通り WebGPIO ライブラリの読み込み
* relayServer.js （第 12 章 1.2. relayServer 参照）ライブラリの読み込み
  * Node.js では relayServer ライブラリに加えて、 websocket ライブラリの読み込みが必要です。
    ```
    import nodeWebSocketLib from "websocket";
    import {RelayServer} from "./RelayServer.js";
    ```
* relayServer.js 第 12 章 1. WebSocketとpub/sub services 参照）を使って、 PC からの操作指示を受信
  * 初期化
  * 受信処理(コールバック関数の設定)
* 受信した内容をもとにGPIO出力を操作（第 12 章 3. GPIOPort の出力処理参照）して LED を点灯・消灯

#### PC 側コード
* CodeSandbox で開いている PC.js を見てみましょう
* JavaScript Module（第 11 章 2.3. JavaScript Module (ECMA Script Module)参照）仕様に基づいて relayServer.js を読み込み
  ```
  import {RelayServer} from "https://chirimen.org/remote-connection/js/beta/RelayServer.js";
  ```
* relayServer.js（第 12 章 1. WebSocketとpub/sub services 参照）を使い、 UI を通してユーザからの操作指示を送信
  * 初期化（受信側、送信側共通の処理参照</span> 
  * 送信処理 ～UI(ボタン)に設置したコールバック関数をもとに送信

#### 自分専用チャンネルで制御

  サンプルのコードは共通のチャンネルを使って制御しています。この状態では複数の人が同時に実習していると混信します。(他の人の PC で ON/OFF を指示しても、自分の LED が ON/OFF する。同じチャンネルを使っているため。)

  これはこれで使い道はあるのですが、自分の LED は自分だけで制御したい場合は専用のチャンネルを使って制御しましょう。　チャンネルの指定は Pi Zero 側のコードと、 PC 側のコード両方を同時に同じ内容で設定する必要があり、以下の部分になります。

  ```channel = await relay.subscribe("chirimenLED");```

  この ```chirimenLED``` という文字列(チャンネル名)を他の人と被らない別のチャンネル名に書き換えます( ```chirimenLED5``` など)

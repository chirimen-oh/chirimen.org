# IoTを試す

## 遠隔LEDコントロール

![system configuration](../../pizero/imgs/IoTsystemConf.png)
IoTは、制御されるデバイス（上図ではCHIRIMEN PiZeroW）と、利用者端末（上図ではWebApp PC-side）に加えて、これらの間でデータを中継するサーバ（クラウド）が必要になります。
今回はWeb標準技術であるWebSocketプロトコルを中継するサーバを用いてLEDを備えたCHIRIMENデバイスとスマホやPCのWebAppを繋いだIoTシステムを作ります。

<div class="note" role="doc-note">

### Note

モーター制御の回路（第 6 章 2. GPIO出力参照）を組めば、そのまま遠隔モーターコントロールができます

- 第 12 章 IoT 参照
- WebSoeketとRelayServer（第 12 章 1. WebSocketとpub/sub services 参照）

</div>

### 配線する

配線は最初のLチカそのままです。

![PiZero配線図](../../pizero/imgs/pizero_led.png){height=200}

<hr class="page-wrap" />

### CHIRIMENデバイス側にコードを入れ、実行する

* ターミナルウィンドの```[CHIRIMEN Panel]```ボタンを押す
* 出現したCHIRIMEN Panelの```[Get Examples]```ボタンを押す
* ID : **remote_gpio_led**の行を探します（もう一度この行の情報を使います）
* ```[JS GET]```ボタンを押すと、開発ディレクトリ(```~/myApp```)に、サンプルコードが保存されます。
  * **main-remote_gpio_led.js**というファイル名で保存されます。
  * ターミナルウィンドの右側のファイルマネージャでmain-remote_gpio_led.js⇒編集 を選びソースコードを見てみましょう
* 実行する
  * ターミナルウィンドのコンソールのプロンプトが```pi@raspberrypi:~/myApp$```となっていることを確認
  * ターミナルウィンドのコンソールに、```node main-remote_gpio_led.js``` [ENTER] と入力して実行。
    ![CHIRIMEN PiZero Console](../../pizero/imgs/RC_NODE.png){height=70}
  * なお、実験が終わったら終了は CTRL+c です。

### PC側のコードを準備し、実行する
* CHIRIMEN Panelに戻り、ID : **remote_gpio_led**の行にある、```CSB EDIT```リンクをクリックする。
  * [CodeSandbox](https://csb-jp.github.io/)というオンラインのWebApp開発環境のウィンドが開き、PC側のコードが表示されています。編集もできます。
  * また、右側（もしくは右下）のフレームにはLEDを遠隔コントロールするためのwebAppが既に実行されています。
  * webAppを使ってLEDが制御できることを確かめてみましょう。
![Code Sandbox Image](../../pizero/imgs/RC_CSB.svg){height=240}

<hr class="page-wrap" />

### コードを読む
#### Raspberry Pi Zero側コード
* ターミナルウィンドの右側のファイルマネージャでmain-remote_gpio_led.js⇒表示 を選び、ソースコードを読んでみましょう
* これまで通りWebGPIOライブラリの読み込み
* relayServer.js（第 12 章 1.2. relayServer 参照）ライブラリの読み込み
  * Node.jsではrelayServerライブラリに加えて、websocketライブラリの読み込みが必要です。
    ```
    import nodeWebSocketLib from "websocket";
    import {RelayServer} from "./RelayServer.js";
    ```
* relayServer.j第 12 章 1. WebSocketとpub/sub services 参照）を使って、PCからの操作指示を受信
  * 初期化
  * 受信処理(コールバック関数の設定)
* 受信した内容をもとにGPIO出力を操作（第 12 章 3. GPIOPort の出力処理参照）してLEDを点灯・消灯

#### PC側コード
* CodeSandboxで開いているPC.jsを見てみましょう
* JavaScript Module（第 11 章 2.3. JavaScript Module (ECMA Script Module)参照）仕様に基づいてrelayServer.jsを読み込み
  ```
  import {RelayServer} from "https://chirimen.org/remote-connection/js/beta/RelayServer.js";
  ```
* relayServer.js（第 12 章 1. WebSocketとpub/sub services 参照）を使い、UIを通してユーザからの操作指示を送信
  * 初期化（受信側、送信側共通の処理参照</span> 
  * 送信処理 ～UI(ボタン)に設置したコールバック関数をもとに送信

#### 自分専用チャンネルで制御

  サンプルのコードは共通のチャンネルを使って制御しています。この状態では複数の人が同時に実習していると混信します。(他の人のPCでON/OFFを指示しても、自分のLEDがON/OFFする。同じチャンネルを使っているため。)

  これはこれで使い道はあるのですが、自分のLEDは自分だけで制御したい場合は専用のチャンネルを使って制御しましょう。　チャンネルの指定はPiZero側のコードと、PC側のコード両方を同時に同じ内容で設定する必要があり、以下の部分になります。

  ```channel = await relay.subscribe("chirimenLED");```

  この```chirimenLED```という文字列(チャンネル名)を他の人と被らない別のチャンネル名に書き換えます(```chirimenLED5```など)

# GPIOを試す

## GPIOを理解する
* GPIOとは？<span class="footnote">11.1. GPIOとは参照</span>

## GPIO出力

GPIOの出力はLチカで実験済みですね。そこで今回はモーターを動かしてみましょう。MOSFETを使った回路図は以下のようになります。

![GPIO Motor](../../pizero/esm-examples/hello-real-world/PiZero_gpio0Motor.png){height=190}

コードはLチカと全く同じです。

### 回路について
* MOSFETを使った大電力制御<span class="footnote">14.10. MOSFET とは参照</span>

### コードを読む
* 前提：CHIRIMEN Rasoberryu Pi ZeroはNode.jsをプログラム実行環境（インタープリタ）として使っています。
  * Node.jsについて<span class="footnote">10.2.2. Node.js (CHIRIMEN Raspberry Pi Zero版)参照</span>
* ターミナルウィンドの右側のファイルマネージャでhello.js⇒表示 を選び、ソースコードを読んでみましょう
* WebGPIOライブラリを読み込み (JavaScript Module<span class="footnote">10.2.3. javascript Module (ECMA Script Module)参照</span>仕様に従って)
　`import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js";`
  * JavaScript module<span class="footnote">10.2.3. javascript Module (ECMA Script Module)参照</span>に基づいてWebGPIOライブラリを読み込みます。これでWeb GPIO APIが使えるようになりました。
* GPIOポートの初期化処理<span class="footnote">11.2. GPIOポートの初期化参照</span>
* GPIOPortの出力処理理<span class="footnote">11.3. GPIOPort の出力処理参照</span>

<hr class="page-wrap" />

## GPIO入力

GPIO端子の**入力が変化したら関数を実行**という機能によってGPIOの入力を使います。

* ターミナルウィンドの```[CHIRIMEN Panel]```ボタンを押す
* 出現したCHIRIMEN Panelの```[Get Examples]```ボタンを押す
* ID : **gpio-onchange**を探します
* 回路図リンクを押すと回路図が出てきますので、回路を組みます。
* ```[JS GET]```ボタンを押すと、開発ディレクトリ(```~/myApp```)に、サンプルコードが保存されます。
  * **main-gpio-onchange.js**というファイル名で保存されます。
  * ターミナルウィンドの右側のファイルマネージャでmain-gpio-onchange.js⇒編集 を選びます。
    * ソースコードを見てみましょう
    * 今回は編集不要ですが、サンプルをベースに応用プログラムを作るときには編集しましょう。
* 実行する
  * ターミナルウィンドのコンソールのプロンプトが```pi@raspberrypi:~/myApp$```となっていることを確認
  * ターミナルウィンドのコンソールに、```node main-gpio-onchange.js``` [ENTER] と入力して実行。
  * タクトスイッチを押してみます。
  * タクトスイッチが押されるたびにコンソール画面に**0**(押された状態)、**1**(離した状態)が交互に表示されます。
    * Note: GPIOポート5は、Pull-Up(開放状態でHighレベル)です。そのため離した状態で１が出力されます。スイッチを押すとポートがGNDと接続され、Lowレベルになり、0が出力されます。
* 終了は CTRL+c

### コードを読む
* ターミナルウィンドの右側のファイルマネージャでmain-gpio-onchange.js⇒表示 を選び、ソースコードを読んでみましょう
* WebGPIOライブラリを読み込み
　`import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js";`
  * JavaScript module<span class="footnote">10.2.3. javascript Module (ECMA Script Module)参照</span>に基づいてWebGPIOライブラリを読み込みます。これでWeb GPIO APIが使えるようになりました。
* GPIOポートの初期化処理を行う<span class="footnote">11.2. GPIOポートの初期化参照参照</span>
* onchangeによる入力処理<span class="footnote">11.4.1. onchange編参照</span>

<hr class="page-wrap" />

## GPIO入力(ポーリング)
入力ではイベントの他にポーリングというテクニックが広く使われます。（次章のI2Cデバイスからの入力では専らポーリング）

* ターミナルウィンドの```[CHIRIMEN Panel]```ボタンを押す
* 出現したCHIRIMEN Panelの```[Get Examples]```ボタンを押す
* ID : **gpio-polling**を探します
* 回路は前章と同じなのでそのままにしておきます。
* ```[JS GET]```ボタンを押すと、開発ディレクトリ(```~/myApp```)に、サンプルコードが保存されます。
  * **main-gpio-polling.js**というファイル名で保存されます。
  * ターミナルウィンドの右側のファイルマネージャでmain-gpio-polling.js⇒編集 を選びソースコードを見てみましょう

* 実行する
  * プロンプトが```pi@raspberrypi:~/myApp$```となっていることを確認
  * コンソールに、```node main-gpio-polling.js``` [ENTER] と入力して実行。
  * 0.3秒おきにポート5の値がコンソールに表示されていきます。
  * タクトスイッチを押してみます。
  * タクトスイッチが押されると、**0**に変化します。
* 終了は CTRL+c

### コードを読む
* ターミナルウィンドの右側のファイルマネージャでmain-gpio-polling.js⇒表示 を選び、ソースコードを読んでみましょう
* WebGPIOライブラリを読み込み
　`import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js";`
  * JavaScript module<span class="footnote">10.2.3. javascript Module (ECMA Script Module)参照</span>に基づいてWebGPIOライブラリを読み込みます。これでWeb GPIO APIが使えるようになりました。
* GPIOポートの初期化処理を行う<span class="footnote">11.2. GPIOポートの初期化参照</span>
* 単純入力＋ポーリングによる入力処理<span class="footnote">11.4.2. 単純入力＋ポーリング参照</span>

<hr class="page-wrap" />

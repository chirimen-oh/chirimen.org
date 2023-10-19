# GPIOを試す


## GPIOとは

[GPIO](https://ja.wikipedia.org/wiki/GPIO)は、「General-purpose input/output」の略で汎用的な入出力インタフェースのことです。

Raspi に実装されている 40 本のピンヘッダから GPIO を利用することができます。

CHIRIMEN Raspi、Raspi Zero では Raspi が提供する 40 本のピンヘッダ<span class="footnote">3.1 Raspberry Pi Zeroのピン配列</span>のうち、GPIO端子(合計 17 本)が利用可能です。

Raspiの GPIO 端子は、GND 端子との間に、0V もしくは 3.3V の電圧を印加(出力)したり、逆に 0V もしくは 3.3V の電圧を検知(入力)したりすることができます。LED は数 mA の電流を流すことによって点灯できる電子部品のため、印加する電圧を 3.3V(点灯)、0V(消灯) と変化させることで L チカが実現できるのです。

詳しくは[ツール・ラボ/第22回 Raspberry PiのGPIO概要](https://tool-lab.com/make/raspberrypi-startup-22/)などを参考にしてみましょう。

### プルアップ(PU)、プルダウン(PD)
GPIOポートを入力モードで使用する場合、ポートが解放状態(電気的に切り離されている状態)のときに設定される値があります。
プルアップは1、プルダウンは0になります。　Raspberry Piのピン配置図に書かれているPU,PDがその設定値です。

より詳しく知りたい場合は [プルアップ抵抗・プルダウン抵抗とは？電子回路に必須の考え方/voltechno](https://voltechno.com/blog/pullup-pulldown/) を参照してください。

<hr class="page-wrap" />

## GPIO出力

GPIOの出力はLチカで実験済みですね。そこで今回はモーターを動かしてみましょう。MOSFET<span class="footnote">13 章の参考リンクから該当情報を参照ください</span>を使った回路図は以下のようになります。

![GPIO Motor](../../pizero/esm-examples/hello-real-world/PiZero_gpio0Motor.png){height=190}

コードはLチカと全く同じです。

### コードを読む

* 前提：CHIRIMEN Rasoberryu Pi ZeroはNode.jsをプログラム実行環境（インタープリタ）として使っています。
  * Node.jsについて<span class="footnote">10.2.2. Node.js (CHIRIMEN Raspberry Pi Zero版)参照</span>
* ターミナルウィンドの右側のファイルマネージャでhello.js⇒表示 を選び、ソースコードを読んでみましょう

#### WebGPIOライブラリを読み込む

```js
import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js";
```

JavaScript module<span class="footnote">10.2.3. javascript Module (ECMA Script Module)参照</span>に基づいてWebGPIOライブラリを読み込みます。これでWeb GPIO APIが使えるようになりました。

#### GPIOポートの初期化

今回の JavaScript ファイルで、最初に呼び出されるコードは `await navigator.requestGPIOAccess()` です。
ここで先ほど出て来た [Web GPIO API](http://browserobo.github.io/WebGPIO) を使い、`gpioAccess` という GPIO にアクセスするためのインタフェースを取得しています。

```js
const gpioAccess = await navigator.requestGPIOAccess(); // GPIO を操作する
```

<section class="note break-before-page" role="doc-note">

##### 関数の呼び出しに `await` 接頭詞を付けることに注意

 この関数は非同期関数で、その処理の完了を待ってから次の処理をする必要があります。また、`await` 接頭詞を使うコードを含むために、それを含む関数 `main()` は async 接頭詞付きの非同期関数として定義する必要があります。

</section>

#### GPIOPort の出力処理
GPIOの**出力**機能を使います。
**`const port = gpioAccess.ports.get(26)` で GPIO の 26 番ポートにアクセスするためのオブジェクト** を取得しています。

```js
const port = gpioAccess.ports.get(26); // 26 番ポートを操作する
```

続いて、 **`await port.export("out")` で GPIO の 26 番を「出力設定」にしています**。これにより LED への電圧の切り替えが可能になっています。

```js
await port.export("out"); // ポートを出力モードに設定
```

最後に、無限ループのなかで `await sleep(1000)` によって 1000 ms (1 秒) 待機さ 1 秒ごとに `await port.write(1)` と `await port.write(0)` を交互に呼び出し、GPIO 26 番に加える電圧を 3.3V → 0V → 3.3V → 0V → … と繰り返しています。

```js
  // 無限ループ
  while (true) {
    // 1秒間隔でモーターが回転します。
    await port.write(1); // モーターを回転
    await sleep(1000); // 1000 ms (1秒) 待機
    await port.write(0); // モーターを停止
    await sleep(1000); // 1000 ms (1秒) 待機
  }
```

LED やモーターは一定以上の電圧を加え、電流を流すと動作（点灯/回転）する性質を持っています。
つまり、3.3 V を加えたとき動作し、0 V を加えたとき停止、これを繰り返すことになります。

### サンプルコードを編集してみよう
- 周期を早く・遅く (```sleep()```の引数を変更)
- 動作する時間と停止する時間を変える (同上)
- GPIO ポートを他のポートに変える・配線を変える (```gpioAccess.ports.get```の引数を変更)

<hr class="page-wrap" />

## GPIO入力

GPIO端子の**入力が変化したら関数を実行**という機能によってGPIOの入力を使います。

GPIOポートに繋いだスイッチやセンサーの状態を取得するには、GPIOの**入力**機能を使います。出力とは違って入力は二つの方法があります。onchangeとポーリングの二つの方法があります。

![GPIOスイッチ (GPIO INPUT)](../../pizero/esm-examples/gpio-onchange/PiZero_gpio1.png){height=190}

### onchange編

* ターミナルウィンドの```[CHIRIMEN Panel]```ボタンを押す
* 出現したCHIRIMEN Panelの```[Get Examples]```ボタンを押す
* ID : **gpio-onchange**を探します
* 回路図リンクを押すと回路図が出てきますので、回路を組みます。
* ```[JS GET]```ボタンを押すと、開発ディレクトリ(```~/myApp```)に、サンプルコードが保存されます。
  * **main-gpio-onchange.js**というファイル名で保存されます。
  * ターミナルウィンドの右側のファイルマネージャでmain-gpio-onchange.js⇒編集 を選びます。
    * 今回は編集不要ですが、サンプルをベースに応用プログラムを作るときには編集しましょう。

#### コードを読む

GPIOポートの値が変化するたびに、指定した関数が実行されます。

```js
import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

async function switchCheck() {
  const gpioAccess = await requestGPIOAccess();
  const port = gpioAccess.ports.get(5);

  await port.export("in");
  port.onchange = showPort;

}

function showPort(ev){
	console.log(ev.value);
}

switchCheck();
```

`port.onchange` は **入力モードの GPIO ポートの「状態変化時に呼び出される関数を設定する」** 機能です。  
このような関数のことをコールバック関数と呼びます。  
次節の「GPIO入力(ポーリング)」と異なりポーリング処理が不要でコードも簡潔ですが、値が変化したタイミング以外では読み取りができませんのでユースケースが少し限られます。

#### 実行する

* ターミナルウィンドのコンソールのプロンプトが```pi@raspberrypi:~/myApp$```となっていることを確認
* ターミナルウィンドのコンソールに、```node main-gpio-onchange.js``` [ENTER] と入力して実行。
* タクトスイッチを押してみます。
* タクトスイッチが押されるたびにコンソール画面に**0**(押された状態)、**1**(離した状態)が交互に表示されます。
  * Note: GPIOポート5は、Pull-Up(開放状態でHighレベル)です。そのため離した状態で１が出力されます。スイッチを押すとポートがGNDと接続され、Lowレベルになり、0が出力されます。
* 終了は CTRL+c

### ポーリング

入力ではイベントの他にポーリングというテクニックが広く使われます。（次章のI2Cデバイスからの入力では専らポーリング）

* ターミナルウィンドの```[CHIRIMEN Panel]```ボタンを押す
* 出現したCHIRIMEN Panelの```[Get Examples]```ボタンを押す
* ID : **gpio-polling**を探します
* 回路は ``onchange編`` と同じなのでそのままにしておきます。
* ```[JS GET]```ボタンを押すと、開発ディレクトリ(```~/myApp```)に、サンプルコードが保存されます。
  * **main-gpio-polling.js**というファイル名で保存されます。
  * ターミナルウィンドの右側のファイルマネージャでmain-gpio-polling.js⇒編集 を選びソースコードを見てみましょう

<section class="note" role="doc-note">

#### ポーリングとは

様々な情報や値の取得や入力のための基本的な機能・関数は、入力を指定した瞬間、一回きり取得するだけのものがほとんどです。そこで、無限ループをつくりこの中で一回きりの入力を定期的に繰り返すことで、入力の変化を読み取る　ということがよく行われます。このような処理を一般にポーリング<span class="footnote">https://ja.wikipedia.org/wiki/ポーリング_(情報)</span>と呼びます。
ポーリングはセンサーの情報入力だけでなく、たとえば電子メールの到着を通知するために定期的にメールサーバにメール着信数を確認する　といった、ネットワークサービスでの処理など様々なシステムで広く使われています。

</section>

#### コードを読む

##### GPIOの単純入力関数

単純に「GPIO ポートの状態を読み込む」には `port.read()` を使います。

`port.read()` で GPIO を読み込むコードは次のように書けます:

```js
const gpioAccess = await navigator.requestGPIOAccess();
const switchPort = gpioAccess.ports.get(5); // GPIO ポート 5 番を取得
await switchPort.export("in"); // 「入力モード」に
const state = await switchPort.read(); // GPIO ポート 5 番に接続したスイッチの状態を読み込む
```

###### await port.export()

`port.export("in")` により取得した **GPIO ポートを「入力モード」で初期化** しています。このモードは GPIO ポートにかかる電圧を Web アプリ側から読み取りたい時に使います。初期化は非同期処理であり `await` で完了を待つ必要があることに注意してください。

###### await port.read()

`port.export("in")` で入力モードに設定した **GPIO ポートの現時点の状態を読み取ります**。読み取りは非同期処理になるので `await` で完了を待つようにしてください。

##### ポーリングルーチン

上記コードで GPIO ポートの読み取りを 1 度だけ行えますが、今回は「スイッチが押され状態を監視する」必要がありますので、定期的に `await port.read()` を繰り返して GPIO ポートの状態を監視するポーリングのルーチンを組みます。

```js
import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

async function switchCheck() {
  const gpioAccess = await requestGPIOAccess();
  const port = gpioAccess.ports.get(5);

  await port.export("in");

  // 無限ループ
  for(;;){
    const v = await port.read();
    //
    // ここにswitchの状態による処理を書き足す
    //
	  console.log(v);
    await sleep(300); // 500 ms 待機
  }

}
```

### 実行する

* プロンプトが```pi@raspberrypi:~/myApp$```となっていることを確認
* コンソールに、```node main-gpio-polling.js``` [ENTER] と入力して実行。
* 0.3秒おきにポート5の値がコンソールに表示されていきます。
* タクトスイッチを押してみます。
* タクトスイッチが押されると、**0**に変化します。
* 終了は CTRL+c

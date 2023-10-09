# 11. GPIO

## 11.1. GPIOとは

[GPIO](https://ja.wikipedia.org/wiki/GPIO)は、「General-purpose input/output」の略で汎用的な入出力インタフェースのことです。

Raspi に実装されている 40 本のピンヘッダから GPIO を利用することができます。

CHIRIMEN Raspi、Raspi Zero では Raspi が提供する 40 本のピンヘッダのうち、下記緑色のピン(合計 17 本)が利用可能です。

Raspiの GPIO 端子は、GND 端子との間に、0V もしくは 3.3V の電圧を印加(出力)したり、逆に 0V もしくは 3.3V の電圧を検知(入力)したりすることができます。LED は数 mA の電流を流すことによって点灯できる電子部品のため、印加する電圧を 3.3V(点灯)、0V(消灯) と変化させることで L チカが実現できるのです。

詳しくは[ツール・ラボ/第22回 Raspberry PiのGPIO概要](https://tool-lab.com/make/raspberrypi-startup-22/)などを参考にしてみましょう。

### 11.1.1. Raspberry Piのピン配置図

![Raspi PIN配置図](https://chirimen.org/PiZeroWebSerialConsole/wallpaperS.png)

### 11.1.2. Raspverry Pi Zeroのピン配置図
Raspberry Piの端子と同じ配列です。

### 11.1.3. プルアップ(PU)、プルダウン(PD)
GPIOポートを入力モードで使用する場合、ポートが解放状態(電気的に切り離されている状態)のときに設定される値があります。
プルアップは1、プルダウンは0になります。　Raspberry Piのピン配置図に書かれているPU,PDがその設定値です。

より詳しく知りたい場合は [プルアップ抵抗・プルダウン抵抗とは？電子回路に必須の考え方/voltechno](https://voltechno.com/blog/pullup-pulldown/) を参照してください。

<hr class="page-wrap" />

## 11.2. GPIOポートの初期化
今回の JavaScript ファイルで、最初に呼び出されるコードは `await navigator.requestGPIOAccess()` です。
ここで先ほど出て来た [Web GPIO API](http://browserobo.github.io/WebGPIO) を使い、`gpioAccess` という GPIO にアクセスするためのインタフェースを取得しています。

```js
const gpioAccess = await navigator.requestGPIOAccess(); // GPIO を操作する
```

**関数の呼び出しに `await` 接頭詞を付けることに注意してください。** この関数は非同期関数で、その処理の完了を待ってから次の処理をする必要があります。また、`await` 接頭詞を使うコードを含むために、それを含む関数 `main()` は async 接頭詞付きの非同期関数として定義する必要があります。

## 11.3. GPIOPort の出力処理
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
    // 1秒間隔で LED が点滅します。
    await port.write(1); // LED を点灯
    await sleep(1000); // 1000 ms (1秒) 待機
    await port.write(0); // LED を消灯
    await sleep(1000); // 1000 ms (1秒) 待機
  }
```

LED は一定以上の電圧を加え、電流を流すと点灯する性質を持っています。
つまり、3.3 V を加えたとき点灯し、0 V を加えたとき消灯、これを繰り返すことになります。

### 11.3.1. サンプルコードを編集してみよう
- 点滅周期を早く・遅く (```sleep()```の引数を変更)
- 点灯する時間と消灯する時間を変える (同上)
- GPIO ポートを他のポートに変える・配線を変える (```gpioAccess.ports.get```の引数を変更)

<hr class="page-wrap" />

## 11.4. GPIOPortの入力処理
GPIOポートに繋いだスイッチやセンサーの状態を取得するには、GPIOの**入力**機能を使います。出力とは違って入力は二つの方法があります。onchangeとポーリングの二つの方法があります。

### 11.4.1. onchange編
GPIOポートの値が変化するたびに、指定した関数が実行されます。

```js
async function main() {
  const button = document.getElementById("button");
  const ledView = document.getElementById("ledView");
  const gpioAccess = await navigator.requestGPIOAccess();
  const ledPort = gpioAccess.ports.get(26); // LED の GPIO ポート番号
  await ledPort.export("out");
  const switchPort = gpioAccess.ports.get(5); // タクトスイッチの GPIO ポート番号
  await switchPort.export("in");

  async function light(lit) {
    await ledPort.write(lit ? 1 : 0);
    const color = lit ? "red" : "black";
    ledView.style.backgroundColor = color;
  }

  button.onmousedown = async function() {
    await light(true);
  };

  button.onmouseup = async function() {
    await light(false);
  };

  // Pull-up なので押したとき 0、それ以外では 1 が得られる
  switchPort.onchange = async function(state) {
    const lit = state === 0;
    await light(lit);
  };
}

main();
```

`port.onchange` は **入力モードの GPIO ポートの「状態変化時に呼び出される関数を設定する」** 機能です。  
このような関数のことをコールバック関数と呼びます。  
下記の`port.read()` を使ったコードと異なりポーリング処理が不要でコードも簡潔ですが、値が変化したタイミング以外では読み取りができませんのでユースケースが少し限られます。

<hr class="page-wrap" />

### 11.4.2. 単純入力＋ポーリング
こちらはGPIOポートの入力値を一回きり単発で取得する単純入力機能と、ポーリングの組み合わせです。

#### 11.4.2.1. ポーリングとは

様々な情報や値の取得や入力のための基本的な機能・関数は、入力を指定した瞬間、一回きり取得するだけのものがほとんどです。そこで、無限ループをつくりこの中で一回きりの入力を定期的に繰り返すことで、入力の変化を読み取る　ということがよく行われます。このような処理を一般にポーリング<span class="footnote">https://ja.wikipedia.org/wiki/ポーリング_(情報)</span>と呼びます。
ポーリングはセンサーの情報入力だけでなく、たとえば電子メールの到着を通知するために定期的にメールサーバにメール着信数を確認する　といった、ネットワークサービスでの処理など様々なシステムで広く使われています。

#### 11.4.2.2. GPIOの単純入力関数
単純に「GPIO ポートの状態を読み込む」には `port.read()` を使います。

`port.read()` で GPIO を読み込むコードは次のように書けます:

```js
const gpioAccess = await navigator.requestGPIOAccess();
const switchPort = gpioAccess.ports.get(5); // GPIO ポート 5 番を取得
await switchPort.export("in"); // 「入力モード」に
const state = await switchPort.read(); // GPIO ポート 5 番に接続したスイッチの状態を読み込む
```

#### 11.4.2.3. await port.export()

`port.export("in")` により取得した **GPIO ポートを「入力モード」で初期化** しています。このモードは GPIO ポートにかかる電圧を Web アプリ側から読み取りたい時に使います。初期化は非同期処理であり `await` で完了を待つ必要があることに注意してください。

#### 11.4.2.4. await port.read()

`port.export("in")` で入力モードに設定した **GPIO ポートの現時点の状態を読み取ります**。読み取りは非同期処理になるので `await` で完了を待つようにしてください。

##### 11.4.2.3.1. ポーリングルーチン
上記コードで GPIO ポートの読み取りを 1 度だけ行えますが、今回は「スイッチが押され状態を監視する」必要がありますので、定期的に `await port.read()` を繰り返して GPIO ポートの状態を監視するポーリングのルーチンを組みます。

```js
const gpioAccess = await navigator.requestGPIOAccess();
const switchPort = gpioAccess.ports.get(5);
await switchPort.export("in");
// 無限ループ
while (true) {
  const state = await switchPort.read(); /
  //
  // ここにswitchの状態による処理を書き足す
  //
  await sleep(100); // 100 ms 待機
}

// sleep() は polyfill 内で定義済みなので省略可能:
function sleep(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
}
```

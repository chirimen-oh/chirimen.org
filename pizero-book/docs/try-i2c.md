# I2C デバイスを試す

## I2C の概要

[I2C](https://ja.wikipedia.org/wiki/I2C) とは 2 線式の同期式シリアル通信インタフェースです。「アイ・スクエア・シー」や「アイ・ ツー・シー」と読みます。I2C では SDA （シリアルデータ）と SCL （シリアルクロック）の 2 本の線で通信を行います。

![i2c-bus](../../raspi/imgs/section2/i2c-bus.png)

上図のように、 I2C の SDA、SCL は複数のデバイス間で共有され、これを「I2C バス」と言います。 I2C ではマスターとスレーブの間で通信が行われます。常にマスター側からスレーブ側に要求が行われ、スレーブ側からマスター側へ要求を行うことはできません。

本チュートリアルでいえば CHIRIMEN 環境を動かすボードコンピュータがマスターとなり、ここに接続されるセンサーやアクチュエータデバイスなどがスレーブとして想定されます。スレーブデバイスの一例として紹介されているI2Cデバイス（第 14 章 1 I2C センサー）をご覧ください。

マスターは、スレーブが持つ「SlaveAddress (スレーブアドレス)」を指定して、特定のスレーブとの通信を行います。このため、同じ I2C バス上に同じ SlaveAddress のスレーブを繋ぐことはできません。
I2C デバイスは小型の IC チップデバイスとなっており、デバイスによっては SlaveAddress は製品ごとに固定されています。

![i2c-bus2](../../raspi/imgs/section2/i2c-bus2.png )


通信するデバイス同士が同一基板上にない場合には、 SDA、 SCL の 2 本の通信線に加え電源や GND の線を加えて 4 本のケーブルを用いて接続するのが一般的です。電源電圧はデバイスに応じたものを繋ぐ必要があります。

### Raspverry Pi Zero の I2C 端子
下図のSCL, SDA が I2C 端子です

![Raspberry Pi PIN配置図](../../raspi/imgs/section0/Raspi3PIN.png){height=600}

Raspberry Pi の I2C 端子と同じ配列です。

<hr class="page-wrap" />

## ポイント

I2C の概要として下記を押さえておきましょう。

- I2C バスを介して複数のデバイスが繋がる
- I2C デバイスにはマスターとスレーブがある
- I2C ではマスターからスレーブに対して通信要求が行われる
- I2C スレーブは SlaveAddress を持つ
- 同じ I2C バスに同じ SlaveAddress のデバイスは繋げない

### I2C デバイスモジュールの接続について
I2C デバイスは一般的に小さなチップ部品です。下の拡大写真で下の枠線で囲んだものが SHT31 の本体で上下に出ている微細な端子を接続して使いますが、微細過ぎてプロトタイピングには向きません。そこでブレッドボードで使いやすい端子に変換したモジュールが販売されています。モジュールには**上の枠線囲んだように端子名の記載**があります。これを**ホストのコンピュータの端子名と一致させて結線**することでI2Cデバイスが正しく接続されます。(電源端子は VIN , V+ , 3V , VCC など別名になっていることがあります)

![I2Cmodule](../../microbit/imgs/SHT31ModulePin.jpg){height=120}

<section class="note" role="doc-note">

#### 注意: 配線時のポイント

    配線の接続先やデバイスの基板の表裏など間違えないように注意してください。
    配線を間違えると、故障や怪我などの原因になることがあります。おかしいなと思ったら、すぐに外して、配線をきちんと確認しましょう。

</section>

## i2cdetect で接続がうまくいったか確認する

`i2cdetect` を使って SlaveAddress を確認し、正しく接続・認識できているか確かめられます。
実際に次節以降の使用例で利用しますが、ここではコマンドの操作方法を解説します。

### コマンドラインから

ターミナルを起動して下記コマンドを入力してみてください。

```sh
i2cdetect -y -r 1
```

### i2cdetect webApp

Raspberry PiZeroWでは、[ターミナルウィンド](https://chirimen.org/PiZeroWebSerialConsole/PiZeroWebSerialConsole.html) ⇒ CHIRIMEN Panel ⇒ i2c detect　でコマンドラインのショートカットが使えます。

### i2c detect の結果

正しく接続できていれば下記のように表示されるはずです。

```
$ i2cdetect -y -r 1
     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
00:          -- -- -- -- -- -- -- -- -- -- -- -- --
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
40: -- -- -- -- 44 -- -- -- -- -- -- -- -- -- -- --
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
70: -- -- -- -- -- -- -- --
```

`44` という表示が見えます。これは 16 進数表示であり、 `0x44` は SHT30 の SlaveAddress です。

念のためSHT30のデータシートも確認してみましょう。

> | SHT3x-DIS     | I2C Address in Hex. representation | Condition                            |
> | ------------- | ---------------------------------- | ------------------------------------ |
> | I2C address A | 0x44 (default)                     | ADDR (pin 2) connected to logic low  |
> | I2C address B | 0x45                               | ADDR (pin 2) connected to logic high |
>
> **Table 8 I2C device addresses.**
>
> [SHT30 のデータシート p.9](https://www.sensirion.com/fileadmin/user_upload/customers/sensirion/Dokumente/2_Humidity_Sensors/Datasheets/Sensirion_Humidity_Sensors_SHT3x_Datasheet_digital.pdf)より引用

SHT30 は`0x44`がデフォルトの SlaveAddress で、 ADDR ピンの HIGH/LOW により SlaveAddeess を `0x44` か `0x45` に変更できることがわかります。

<hr class="page-wrap" />

### 認識されないとき

試しに I2C デバイスへの電源供給を止めて、認識されないケースをあえて確かめてみます。
一度 Raspberry Pi の 3.3V に接続している線を抜いて、もう一度 `i2cdetect -y -r 1` を実行してみてください。

```
$ i2cdetect -y -r 1
     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
00:          -- -- -- -- -- -- -- -- -- -- -- -- --
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
40: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
70: -- -- -- -- -- -- -- --
```

`44` という表示が見つからなくなりました。このことによって間違いなく SHT30 の SlaveAddress が `0x44` となっていることを確認できました。
確認できたら、先ほど外した 3.3V の線を戻して再び SHT30 に電源を供給して認識されるようにしておきましょう。

## WebI2C とデバイスドライバ

CHIRIMEN では、GPIO インターフェースを Web GPIOと呼ぶ API で使用しました。 I2C インターフェースに接続されたスレーブデバイスは[Web I2C API](http://browserobo.github.io/WebI2C)と呼ぶ API によって使用することができます。

しかし I2C スレーブデバイスは GPIO の先に繋げるデバイスと比べてずっと複雑な機能を持っています。実際にはそれは極小のコンピュータで、 I2C を通しデバイス専用のコマンドやデータを送受信（通信）し、固有の機能を利用します。
このようなコードは、各デバイスのデータシートをよく読み込んだうえで書くことができます。これはかなり手間のかかる開発ですので簡単にデバイスが使用できるライブラリ(デバイスドライバ)があらかじめ用意されています。

### デバイスドライバが用意されている I2C デバイスのリスト

デバイスドライバが用意され簡単に利用できるI2Cデバイスのリスト（第 14 章 1 I2C センサー参照）

よく利用される、 30 種類ぐらいの比較的安価なデバイス向けのドライバが用意されています。

<hr class="page-wrap" />

## I2C 温湿度センサーの使用例

### SHT30, SHT31 について
- [湿度・温度センサ (SHT31)](http://akizukidenshi.com/catalog/g/gK-12125/) x 1
  - または SHT30 ([Amazon](https://www.amazon.co.jp/s?k=sht30), [AliExpress](https://ja.aliexpress.com/item/32962846003.html))。
  - note: SHT31 は氷点下や 65 度以上などの高温での計測時の精度が SHT30 よりも少し高いが室温程度ではほぼ同様の類似モデルです。同シリーズには他にも SHT35 などもありますがそちらは未検証です。 (参考: [データシート](https://www.sensirion.com/fileadmin/user_upload/customers/sensirion/Dokumente/2_Humidity_Sensors/Datasheets/Sensirion_Humidity_Sensors_SHT3x_Datasheet_digital.pdf))

### SHT30 編

SHT30は温度に加えて湿度も測定できるI2C接続の多機能センサーです。SHT31もほぼ同等に使えます。(SHT31のほうが精度が高い)

* ターミナルウィンドの ```[CHIRIMEN Panel]``` ボタンを押す
* 出現したCHIRIMEN Panelの ```[Get Examples]``` ボタンを押す
* ID : sht30 を探します
* 回路図リンクを押すと回路図が出てきますので、回路を組みます。なお、接続は下の図のようになります。

![SHT31 schematic](../../pizero/esm-examples/sht30/schematic.png){height=220}

* ```[JS GET]``` ボタンを押すと、開発ディレクトリ (```~/myApp```) に、サンプルコードが保存されます。
  * **main-sht30.js**というファイル名で保存されます。
  * Note: ターミナルウィンドの右側のファイルマネージャで main-sht30.js ⇒ 編集 を選ぶと、エディタで編集できます。
    * ソースコードを見てみましょう
    * 今は編集不要ですが、サンプルをベースに応用プログラムを作るときには編集しましょう。

#### I2C センサー(SHT30)が認識されていることを確認する

* CHIRIMEN Panelの```[i2c detect]```ボタンを押すと、 [SHT30 の I2C アドレス](https://strawberry-linux.com/pub/Sensirion_Humidity_SHT3x_DIS_Datasheet_V3_J.pdf)　 0x**44** が表示されていればうまく接続されています。

<pre>
     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
00:          -- -- -- -- -- -- -- -- -- -- -- -- -- 
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
40: -- -- -- -- 44 -- -- -- -- -- -- -- -- -- -- -- 
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
70: -- -- -- -- -- -- -- --                       
</pre>

#### 実行する

* ターミナルウィンドのコンソールのプロンプトが ```pi@raspberrypi:~/myApp$``` となっていることを確認
* ターミナルウィンドのコンソールに、 ```node main-sht30.js``` [ENTER] と入力して実行。
* 温度と湿度が1秒ごとにコンソールに表示されます。
* 終了は CTRL+c

#### コードを読む

* ターミナルウィンドの右側のファイルマネージャで main-sht30.js ⇒ 表示 を選び、ソースコードを読んでみましょう

```js
import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";
import SHT30 from "@chirimen/sht30";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

main();

async function main() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const sht30 = new SHT30(port, 0x44);
  await sht30.init();

  while (true) {
    const { humidity, temperature } = await sht30.readData();
    console.log(
      [
        `Humidity: ${humidity.toFixed(2)}%`,
        `Temperature: ${temperature.toFixed(2)} degree`
      ].join(", ")
    );

    await sleep(500);
  }
}
```

##### WebI2C ライブラリと SHT30 デバイスドライバを読み込む

`node-web-i2c` は WebI2C API を使用できるようにするためのライブラリです。
`@chirimen/sht30` は、Web I2C API を使って SHT30 との通信を行うための、 SHT30 用のデバイスドライバー(ハードウェアを操作する為のライブラリ)です。
`main.js` がドライバーライブラリを使ってこのアプリケーションの動作を記述している部分です。

次に、 `main.js` の処理の流れを見てみましょう。
ここで温度センサーの情報を定期的に取得し、画面に出力する処理が行われています。
少し詳しく解説してみます。

##### await requestI2CAccess()

Web I2C API を利用するための **`I2CAccess` インタフェースを取得**するための最初の API 呼び出しです。この関数も非同期処理ですので `await` で処理完了を待機し、その結果正しくインタフェースが取得されたら `i2cAccess` オブジェクトに保持します。

##### i2cAccess.ports.get()

`I2CAccess.ports` は、利用可能な I2C ポートの一覧です。

```js
const port = i2cAccess.ports.get(1);
```

CHIRIMEN Raspberry Pi、Raspberry PiZero、で利用可能な I2C ポート番号は`1`番だけです。ポート番号に`1` を指定して **`port` オブジェクトを取得** しています。

##### new SHT30(port, 0x44)

ドライバーライブラリを使い **SHT30 を操作する為のインスタンスを生成**しています。
```js
const sht30 = new SHT30(port, 0x44);
```

##### await sht30.init()

ドライバーライブラリのインスタンス (`sht30`) の `init()` メソッドを通じて **I2C ポートを開いてセンサーを初期化** しています。

```js
await sht30.init();
```

具体的に内部では、インスタンス生成時に指定した `port` オブジェクトと `slaveAddress(0x44)` を用いて `I2CPort.open()` を行なっています。`I2CPort.open()` が成功すると、`I2CSlaveDevice` という I2C ポートへデータ書き込みや読み込みなどを行うインタフェースが返されます。`I2CSlaveDevice` インタフェースは、ライブラリ内に保存され、その後の処理でこのインターフェイスを使って I2C デバイス SHT30 との通信が可能になります。

##### await sht30.readData()

これで実際にデータを読み取っています。 この読み取り関数はGPIOで紹介した、一回きりの単純入力に相当するものです。そのため連続的な変化を知りたい場合はポーリングルーチンを組む必要がありますね。

**SHT30 の仕様に基づくデータ読み出し処理です**。

```js
const { humidity, temperature } = await sht30.readData();
```

ドライバーライブラリ内部では、SHT30 から得られる温度と湿度それぞれ 16bit の数値を、温度・湿度の物理量の数値に変換して返却しています。

#### Web I2C API に着目して流れをまとめると

1. **I2C の準備:** `await requestI2CAccess()` で I2CAccess インタフェースを取得
2. **ポートの準備:** `await i2cAccess.ports.get(1)` で、1 番ポートの `port` オブジェクトを取得
3. **デバイス初期化:** `await port.open(0x44)` で、SlaveAddress `0x44` 番の I2CSlaveDevice インタフェースを取得
4. **データ読み込み・書き込み:** 

この流れは他の I2C デバイスでも基本的に同様になります。

### デバイスドライバーなしにSHT30を使う

デバイスドライバーは I2C デバイスを簡単に使えるようにするライブラリでしかありませんので、ライブラリなしに WebI2CAPI を用いて直接デバイスを使うこともできます。運悪くデバイスドライバーが用意されていない I2C デバイスを使いたい場合や、デバイスドライバーで省略されている機能を使いたい場合などのために、[Web I2C API](http://browserobo.github.io/WebI2C)の振る舞いを理解しておきましょう。


まず、デバイスドライバーなしに使うにはそのデバイスのデータシートをよく読み込みながら開発する必要があります。

それでは[SHT30 ドライバのコード](https://github.com/chirimen-oh/chirimen-drivers/tree/master/packages/sht30/sht30.js)を見てみましょう。

* 初期化 `init()`
```js
if (!slaveAddress){
		slaveAddress = 0x44;
}
```

[SHT30 データシート](https://www.sensirion.com/fileadmin/user_upload/customers/sensirion/Dokumente/2_Humidity_Sensors/Datasheets/Sensirion_Humidity_Sensors_SHT3x_Datasheet_digital.pdf) の９ページに記載の通り、ドライバでは指定がない場合スレーブアドレス0x44を指定して通信を開始しています。

* データの読み取り `readData()`
```js
// 単発高精度計測指示コマンドをi2cインターフェースに送信（
// データシート９～１０ページ、及び２ページ（計測精度スペック））
await this.i2cSlave.write8(0x2C, 0x06); 
// 計測完了の待機時間(100ms)
//（データシート７ページ～15ms以上の待機）
await sleep(100);
// i2cインターフェースから、６バイトの計測データを読み取り
//（データシート１０ページ）
var mdata = await this.i2cSlave.readBytes(6);
// 計算式（データシート１４ページ）に従い温度（摂氏）を算出
var cTemp = ((((mdata[0] * 256.0) + mdata[1]) * 175) / 65535.0) - 45;
// 同様に湿度（％）を算出
var humidity = 100 * (mdata[3] * 256 + mdata[4]) / 65535.0;
```
ドライバーライブラリ内部では、上記のように SHT30 に単発の高精度計測を指示し、得られた温度と湿度それぞれ 16bit の数値を、温度・湿度の物理量の浮動小数点数に変換して返却しています。

### ADT7410 編

温度センサー ADT7410 を使います。
もし、 SHT30 を使用する場合は、「第 8 章 IoT を試す」まで読み飛ばしてください。

* ターミナルウィンドの ```[CHIRIMEN Panel]``` ボタンを押す
* 出現した CHIRIMEN Panelの ```[Get Examples]``` ボタンを押す
* ID : adt7410 を探します(上から5個目ぐらい)
* 回路図リンクを押すと回路図が出てきますので、回路を組みます。なお、接続は下の図のようになります。

![Pi Zero 温度センサー図](../../pizero/imgs/pizero_temp.png)
* ```[JS GET]``` ボタンを押すと、開発ディレクトリ (```~/myApp```) に、サンプルコードが保存されます。
  * **main-adt7410.js** というファイル名で保存されます。
  * Note: ターミナルウィンドの右側のファイルマネージャで main-adt7410.js ⇒ 編集 を選ぶと、エディタで編集できます。
    * ソースコードを見てみましょう
    * 今は編集不要ですが、サンプルをベースに応用プログラムを作るときには編集しましょう。

<section class="note break-after-page" role="doc-note">

#### センサーの極性に注意

    温度センサー ADT7410 を用意した場合、図と同じように配線します。配線(特に電源線)を間違えるとセンサーが高熱になり火傷・破損するので注意してください。

</section>

### I2C センサーが認識されていることを確認する

* CHIRIMEN Panelの[```[i2c detect]```](https://tutorial.chirimen.org/ty51822r3/i2cdetect)ボタンを押すと、[ADT7410 の I2C アドレス](https://akizukidenshi.com/download/ds/akizuki/AE-ADT7410_aw.pdf)　 0x**48** が表示されていればうまく接続されています。

<pre>
     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
00:          -- -- -- -- -- -- -- -- -- -- -- -- -- 
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
40: -- -- -- -- -- -- -- -- 48 -- -- -- -- -- -- -- 
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
70: -- -- -- -- -- -- -- --                       
</pre>

### 実行する

* ターミナルウィンドのコンソールのプロンプトが ```pi@raspberrypi:~/myApp$``` となっていることを確認
* ターミナルウィンドのコンソールに、 ```node main-adt7410.js``` [ENTER] と入力して実行。
* 温度が1秒ごとにコンソールに表示されます。
* 終了は CTRL+c

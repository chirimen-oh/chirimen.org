# 12. I2C
## 12.1. I2Cの概要

[I2C](https://ja.wikipedia.org/wiki/I2C) とは 2 線式の同期式シリアル通信インタフェースです。「アイ・スクエア・シー」や「アイ・ ツー・シー」と読みます。I2C では SDA（シリアルデータ）と SCL（シリアルクロック）の 2 本の線で通信を行います。

![i2c-bus](../../raspi/imgs/section2/i2c-bus.png)

上図のように、I2C の SDA、SCL は複数のデバイス間で共有され、これを「I2C バス」と言います。I2C ではマスターとスレーブの間で通信が行われます。常にマスター側からスレーブ側に要求が行われ、スレーブ側からマスター側へ要求を行うことはできません。

本チュートリアルでいえばCHIRIMEN環境を動かすボードコンピュータがマスターとなり、ここに接続されるセンサーやアクチュエータデバイスなどがスレーブとして想定されます。スレーブデバイスの一例として[こちらに紹介](../partslist)されているI2Cデバイスをご覧ください。

マスターは、スレーブが持つ「SlaveAddress (スレーブアドレス)」を指定して、特定のスレーブとの通信を行います。このため、同じ I2C バス上に同じ SlaveAddress のスレーブを繋ぐことはできません。
I2Cデバイスは小型のICチップデバイスとなっており、デバイスによってはSlaveAddressは製品ごとに固定されています。

![i2c-bus2](../../raspi/imgs/section2/i2c-bus2.png )


通信するデバイス同士が同一基板上にない場合には、SDA、SCL の 2 本の通信線に加え電源や GND の線を加えて 4 本のケーブルを用いて接続するのが一般的です。電源電圧はデバイスに応じたものを繋ぐ必要があります。

### 12.1.1 Raspberry PiのI2C端子
下図のSCL, SDAがI2C端子です（黄色の端子）

![Raspi PIN配置図](../../raspi/imgs/section0/Raspi3PIN.png){height=600}


### 12.1.2. Raspverry Pi ZeroのI2C端子

　Raspberry PiのI2C端子と同じ配列です。

<hr class="page-wrap" />

## 12.2. 参考: I2C に関する詳細情報

I2C に関する詳細は下記をご参照ください。

- [I2C](https://ja.wikipedia.org/wiki/I2C) - Wikipedia
- I2C バス仕様書 最新版（[日本語](https://www.nxp.com/docs/ja/user-guide/UM10204.pdf)、[English](http://www.nxp.com/documents/user_manual/UM10204.pdf)）
- [I2C の使い方](http://www.picfun.com/i2cframe.html)（後閑哲也氏サイト）

## 12.3. ポイント

I2C の概要として下記を押さえておきましょう。

- I2C バスを介して複数のデバイスが繋がる
- I2C デバイスにはマスターとスレーブがある
- I2C ではマスターからスレーブに対して通信要求が行われる
- I2C スレーブは SlaveAddress を持つ
- 同じ I2C バスに同じ SlaveAddress のデバイスは繋げない

## 12.4. I2Cデバイスの実例：I2C 温湿度センサー (SHT30, SHT31)

I2C に対応したデバイスの実例を見てみましょう。CHIRIMENでは [Examples](../partslist#i2c-) にセンサーなど、いくつかの I2C デバイスを使うサンプルコードと Raspi との接続方法を示す回路図が提供されており、SHT30/SHT31も紹介されて
います。

### 12.4.1. SHT30, SHT31について
- [湿度・温度センサ (SHT31)](http://akizukidenshi.com/catalog/g/gK-12125/) x 1
  - または SHT30 ([Amazon](https://www.amazon.co.jp/s?k=sht30), [AliExpress](https://ja.aliexpress.com/item/32962846003.html))。
  - note: SHT31 は氷点下や 65 度以上などの高温での計測時の精度が SHT30 よりも少し高いが室温程度ではほぼ同様の類似モデルです。同シリーズには他にも SHT35 などもありますがそちらは未検証です。 (参考: [データシート](https://www.sensirion.com/fileadmin/user_upload/customers/sensirion/Dokumente/2_Humidity_Sensors/Datasheets/Sensirion_Humidity_Sensors_SHT3x_Datasheet_digital.pdf))

<hr class="page-wrap" />

### 12.4.2. I2Cデバイスモジュールの接続について
I2Cデバイスは一般的に小さなチップ部品です。下の拡大写真で緑で囲んだものがSHT31の本体で 上下に出ている微細な端子を接続して使いますが、微細過ぎてプロトタイピングには向きません。そこでブレッドボードで使いやすい端子に変換したモジュールが販売されています。モジュールには**赤で囲んだように端子名の記載**があります。これを**ホストのコンピュータの端子名と一致させて結線**することでI2Cデバイスが正しく接続されます。(電源端子はVIN,V+,3V,VCCなど別名になっていることがあります)

![I2Cmodule](../../microbit/imgs/SHT31ModulePin.jpg){height=150}


#### 12.4.2.1. 注意: 配線時のポイント

配線の接続先やデバイスの基板の表裏など間違えないように注意してください。
配線を間違えると、故障や怪我などの原因になることがあります。おかしいなと思ったら、すぐに外して、配線をきちんと確認しましょう。

## 12.5. i2cdetectで接続がうまくいったか確認する

`i2cdetect` を使って SlaveAddress を確認し、正しく接続・認識できているか確かめてみましょう。ターミナルを起動して下記コマンドを入力してみてください。

### 12.5.1. コマンドラインから
```sh
i2cdetect -y -r 1
```
(microbit版はコマンドラインがないので下記webAppを使いましょう)

### 12.5.2. i2cdetect webApp
#### 12.5.2.1. Raspberry Pi
SlaveAddress を確認する i2cdetect には WebI2C(後述) を使って実装したwebApp版もあります。https://r.chirimen.org/i2cdetect をご利用ください。ただし、WebI2C 版 i2cdetect を利用中は他のペ
ージから I2C デバイスを操作できません。確認が済んだらタブを閉じるようにしましょう。

#### 12.5.2.2. Raspberry PiZeroW
Raspberry PiZeroWでは、[ターミナルウィンド](https://chirimen.org/PiZeroWebSerialConsole/PiZeroWebSerialConsole.html)⇒CHIRIMEN Panel⇒i2c detect　でコマンドラインのショートカットが使えます。

<hr class="page-wrap" />

### 12.5.3. i2c detectの結果

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

`44`という表示が見えます。これは 16 進数表示であり、 `0x44` は SHT30 の SlaveAddress です。

念のためSHT30のデータシートも確認してみましょう。

> | SHT3x-DIS     | I2C Address in Hex. representation | Condition                            |
> | ------------- | ---------------------------------- | ------------------------------------ |
> | I2C address A | 0x44 (default)                     | ADDR (pin 2) connected to logic low  |
> | I2C address B | 0x45                               | ADDR (pin 2) connected to logic high |
>
> **Table 8 I2C device addresses.**
>
> [SHT30 のデータシート p.9](https://www.sensirion.com/fileadmin/user_upload/customers/sensirion/Dokumente/2_Humidity_Sensors/Datasheets/Sensirion_Humidity_Sensors_SHT3x_Datasheet_digital.pdf)より引用

SHT30 は`0x44`がデフォルトの SlaveAddress で、ADDR ピンの HIGH/LOW により SlaveAddeess を `0x44` か `0x45` に変更できることがわかります。

<hr class="page-wrap" />

### 12.5.4. 認識されないとき

試しに I2C デバイスへの電源供給を止めて、認識されないケースをあえて確かめてみます。
一度 RasPi の 3.3V に接続している線を抜いて、もう一度 `i2cdetect -y -r 1` を実行してみてください。

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

## 12.6. WebI2Cとデバイスドライバ

CHIRIMENでは、GPIOインターフェースをWeb GPIOと呼ぶAPIで使用しました。I2Cインターフェースに接続されたスレーブデバイスは[Web I2C API](http://browserobo.github.io/WebI2C)と呼ぶAPIによって使用することができます。

しかしI2CスレーブデバイスはGPIOの先に繋げるデバイスと比べてずっと複雑な機能を持っています。実際にはそれは極小のコンピュータで、I2Cを通しデバイス専用のコマンドやデータを送受信（通信）し、固有の機能を利用します。
このようなコードは、各デバイスのデータシートをよく読み込んだうえで書くことができます。これはかなり手間のかかる開発ですので簡単にデバイスが使用できるライブラリ(デバイスドライバ)があらかじめ用意されています。

### 12.6.1. デバイスドライバが用意されているI2Cデバイスのリスト

[デバイスドライバが用意され簡単に利用できるI2Cデバイスのリスト](../partslist#i2c-)

よく利用される、30種類ぐらいの比較的安価なデバイス向けのドライバが用意されています。

### 12.6.2. I2C 温湿度センサー (SHT30, SHT31)の使用例

 Raspberry Pi では、index.htmlの中で、Raspberry Pi Zero Wではmain.jsの中で以下のライブラリを読み込んでいます。
  
* WebI2C APIを使用できるようにするためのライブラリ( Raspberry Pi: `polyfill.js`, Raspberry Pi Zero W: xxx)です。
* ( Raspberry Pi, Raspberry Pi Zero W: `@chirimen/sht30`)　このファイルは、Web I2C API を使って SHT30 との通信を行うための、SHT30用のデバイスドライバー (ハードウェアを操作する為のライブラリ) です。

`main.js` がドライバーライブラリを使ってこのアプリケーションの動作を記述している部分です。

<hr class="page-wrap" />

#### 12.6.2.1. main.js

次に、`main.js` の処理の流れを見てみましょう。

```js
main();

async function main() {
  const temperatureDisplay = document.getElementById("temperatureDisplay");
  const humidityDisplay = document.getElementById("humidityDisplay");
  const i2cAccess = await navigator.requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const sht30 = new SHT30(port, 0x44);
  await sht30.init();

  while (true) {
    const { humidity, temperature } = await sht30.readData();
    temperatureDisplay.innerHTML = `${temperature.toFixed(2)} ℃`;
    humidityDisplay.innerHTML = `${humidity.toFixed(2)} %`;
    await sleep(500);
  }
}
```

ここで温度センサーの情報を定期的に取得し、画面に出力する処理が行われています。
少し詳し解説してみます。

##### 12.6.2.1.1. await navigator.requestI2CAccess()

Web I2C API を利用するための **`I2CAccess` インタフェースを取得** するための最初の API 呼び出しです。この関数も非同期処理ですので `await` で処理完了を待機し、その結果正しくインタフェースが取得されたら `i2cAccess` オブジェクトに保持します。

##### 12.6.2.1.2. i2cAccess.ports.get()

`I2CAccess.ports` は、利用可能な I2C ポートの一覧です。

```js
const port = i2cAccess.ports.get(1);
```

CHIRIMEN RasPi、RasPiZero、で利用可能な I2C ポート番号は`1`番だけです。ポート番号に`1` を指定して **`port` オブジェクトを取得** しています。

##### 12.6.2.1.3 new SHT30(port, 0x44)

ドライバーライブラリを使い **SHT30 を操作する為のインスタンスを生成** しています。
```js
const sht30 = new SHT30(port, 0x44);
```

<hr class="page-wrap" />

##### 12.6.2.1.4. await sht30.init()

ドライバーライブラリのインスタンス (`sht30`) の `init()` メソッドを通じて **I2C ポートを開いてセンサーを初期化** しています。

```js
await sht30.init();
```

具体的に内部では、インスタンス生成時に指定した `port` オブジェクトと `slaveAddress(0x44)` を用いて `I2CPort.open()` を行なっています。`I2CPort.open()` が成功すると、`I2CSlaveDevice` という I2C ポートへデータ書き込みや読み込みなどを行うインタフェースが返されます。`I2CSlaveDevice` インタフェースは、ライブラリ内に保存され、その後の処理でこのインターフェイスを使って I2C デバイス SHT30 との通信が可能になります。

##### 12.6.2.1.5. await sht30.readData()

これで実際にデータを読み取っています。 この読み取り関数はGPIOで紹介した、一回きりの単純入力に相当するものです。そのため連続的な変化を知りたい場合はポーリングルーチンを組む必要がありますね。

**SHT30 の仕様に基づくデータ読み出し処理です**。

```js
const { humidity, temperature } = await sht30.readData();
```

ドライバーライブラリ内部では、SHT30 から得られる温度と湿度それぞれ 16bit の数値を、温度・湿度の物理量の数値に変換して返却しています。

#### 12.6.2.2. Web I2C API に着目して流れをまとめると

1. **I2C の準備:** `await navigator.requestI2CAccess()` で I2CAccess インタフェースを取得
2. **ポートの準備:** `await i2cAccess.ports.get(1)` で、1 番ポートの `port` オブジェクトを取得
3. **デバイス初期化:** `await port.open(0x44)` で、SlaveAddress `0x44` 番の I2CSlaveDevice インタフェースを取得
4. **データ読み込み・書き込み:** 

この流れは他の I2C デバイスでも基本的に同様になります。

<hr class="page-wrap" />

### 12.7. デバイスドライバーなしにSHT30を使う

デバイスドライバーはI2Cデバイスを簡単に使えるようにするライブラリでしかありませんので、ライブラリなしにWebI2CAPIを用いて直接デバイスを使うこともできます。運悪くデバイスドライバーが用意されていないI2Cデバイスを使いたい場合や、デバイスドライバーで省略されている機能を使いたい場合などのために、[Web I2C API](http://browserobo.github.io/WebI2C)の振る舞いを理解しておきましょう。


まず、デバイスドライバーなしに使うにはそのデバイスのデータシートをよく読み込みながら開発する必要があります。

それでは[SHT30ドライバのコード](https://github.com/chirimen-oh/chirimen-drivers/tree/master/packages/sht30/sht30.js)を見てみましょう。

* 初期化 `init()`
```js
if (!slaveAddress){
		slaveAddress = 0x44;
}
```

[SHT30データシート](https://www.sensirion.com/fileadmin/user_upload/customers/sensirion/Dokumente/2_Humidity_Sensors/Datasheets/Sensirion_Humidity_Sensors_SHT3x_Datasheet_digital.pdf) の９ページに記載の通り、ドライバでは指定がない場合スレーブアドレス0x44を指定して通信を開始しています。

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
ドライバーライブラリ内部では、上記のようにSHT30 に単発の高精度計測を指示し、得られた温度と湿度それぞれ 16bit の数値を、温度・湿度の物理量の浮動小数点数に変換して返却しています。

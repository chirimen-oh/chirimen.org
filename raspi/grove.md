---
layout: tutorial
---

# 3. I2C の使い方 (Grove 編)

# 概要

ここでは、CHIRIMEN for Raspberry Pi （以下「CHIRIMEN RasPi」）で、Grove (後述) の I2C モジュールを利用する方法を紹介します。

# 0. Grove (グローブ) とは

Grove (グローブ) とは、[Seeed Studio](https://www.seeedstudio.com/) が開発した、センサやアクチュエータ等の I2C モジュールをコネクタで接続するだけで利用できるようにした規格です。煩わしいジャンパワイヤ等の接続をすることなく、手軽にこれらのモジュールを利用することができるほか、[Grove I2C Hub](http://wiki.seeed.cc/Grove-I2C_Hub/) を利用することにより、複数の I2C モジュールを比較的容易に扱うことができます。

> ※ 一方で、通常の I2C デバイスと比べて価格が高い、内部の配線がわかりずらく仕組みを理解しずらいといった欠点もあることから、CHIRIMEN RasPi では Grove のチュートリアルに関して、メインのチュートリアルには掲載していません。

Grove を用いらずに複数の I2C モジュールを取り扱う方法については、[こちら](section3.md)をご覧ください。


# 1. 準備

## 用意するもの

ここでは、1 つのGroveコネクタつき I2C モジュールと 1 つのピンヘッダつき I2C モジュールを接続することを想定し、下記を用意しておきましょう。

- [L チカしてみよう](section0.md) に記載の「基本ハードウエア」

{% cloudinary imgs/section3/h.jpg alt="ハブとケーブル" %}

- [Grove I2C Hub](http://wiki.seeed.cc/Grove-I2C_Hub/) x 1
- [Grove 4ピン ジャンパー メス ケーブル](https://www.seeedstudio.com/grove-to-4-pin-254-female-jumper-wire5-pcs-pack-p-1020.html) x 2
- [Grove 4ピン ケーブル](https://www.seeedstudio.com/Grove-Universal-4-Pin-20cm-Unbuckled-Cable-%285-PCs-Pack%29-p-749.html) x 1
- ブレッドボード x 1

上記に加え今回紹介するセンサが必要となりますが、センサについては各センサの説明のパートに記載します。

##複数の I2C モジュールを接続するために (Grove I2C Hub について)



Grove I2C Hub は、4つの Grove コネクタを備えた I2C モジュールを接続するためのハブです。4ピンの [Grove 4ピン ケーブル](https://www.seeedstudio.com/Grove-Universal-4-Pin-Buckled-20cm-Cable-5-PCs-pack-p-936.html)を経由すれば、後述する[Grove Digital Light Sensor](http://wiki.seeed.cc/Grove-Digital_Light_Sensor/)など Grove コネクタを備えた I2C モジュールを直接接続することができます。

Raspi や [チュートリアル 2](https://tutorial.chirimen.org/raspi/section2
) でも利用した ADT7410 などピンヘッダを備えた（あるいは事前にスルーホールにピンヘッダをはんだ付けしてある）モジュールとの接続には、[Grove 4ピン ジャンパ メスケーブル](https://www.seeedstudio.com/grove-to-4-pin-254-female-jumper-wire5-pcs-pack-p-1020.html) 経由で接続することができます。

なお、ハブと言っても同じピン同士を繋いでいるだけですから、手持ちがない場合はブレッドボードで 4 ピンを並べて刺して繋ぐことで代用可能です。


# 2. 光センサを使ってみる

光の強度 (明るさ) に反応するセンサを使ってみましょう。

## a. 部品と配線について

「1.準備」のパートに記載したものに加え、下記を用意してください。

- [光センサ(Grove Digital Light Sensor)](http://wiki.seeed.cc/Grove-Digital_Light_Sensor/) x 1

Raspberry Piとの接続方法については、下記回路図を参照ください。

`/home/pi/Desktop/gc/i2c/i2c-grove-light/schematic.png`

[{% cloudinary imgs/section3/k.png alt="回路図" %}](imgs/section3/k.png)

このセンサモジュールはGroveコネクタを備えていますので、接続方法に応じてコネクタを選んでください。

- Grove I2C Hub 経由で接続する場合 ：Grove 4ピン ケーブル経由で接続してください。
- Raspberry Pi へ直接接続する場合：Grove 4ピン ジャンパー メス ケーブル経由で接続してください。

## b. 接続確認とexampleの実行

i2cdetect で接続を確認しておきましょう。ターミナルで次のコマンドを実行します。

`$ i2cdetect -y -r 1`

WebI2C 版 `/home/pi/Desktop/gc/i2c/i2c-detect/index.html` でも確認できますが、I2C 接続をこちらを使う場合は確認後に必ずタブを閉じて

SlaveAddress `0x29` が見つかれば接続OKです。次に example を動かします。

`/home/pi/Desktop/gc/i2c/i2c-grove-light/index.html`

画面の回路図の下の数値が明るさの値です。センサに当たる光を遮断してみてください。数値が小さくなるはずです。逆にセンサに LED の光を直接当てると数値が大きくなることが確認できるでしょう。

## c. コード解説

example のコードから、光センサに関係する部分を見ていきます。今回はドライバーライブラリの中までは深入りせずに、アプリケーションの流れを追ってみましょう。ADT7410 の時とほとんど同じであることがわかるはずです。

### c-1. index.html

下記がindex.htmlの中から主要な部分を抜き出したコードです。

index.html
```html
    : 
    <script src="node_modules/@chirimen-raspi/polyfill/polyfill.js"></script>
    <script src="node_modules/@chirimen-raspi/chirimen-driver-i2c-grove-light/GROVELIGHT.js"></script>
    <script src="./main.js" defer></script>
    :
  <body>
    :
    <p id="head">TEST</p>
  </body>
```

HTML は ADT7410 の時とほとんど同じです。ドライバーライブラリは、`GROVELIGHT.js` に変わりました。リモートから最新の Polyfill とドライバを読み込みたい場合は `http://r.chirimen.org/polyfill.js` と `http://r.chirimen.org/grove-light.js` を指定します。

### c-2. main.js

次に、main.jsを見てみましょう。(重要な部分以外は削っています)

main.js
```javascript
  var head = document.getElementById("head");
  var i2cAccess = await navigator.requestI2CAccess();
  var port = i2cAccess.ports.get(1);
  var grovelight = new GROVELIGHT(port, 0x29);
  await grovelight.init();
  for (;;) {
    var value = await grovelight.read();
    head.innerHTML = value ? value : head.innerHTML;
    await sleep(200);
  }
```

`main.js` も温度センサとほとんど同じです。最初に I2C デバイスを操作するため I2CAccess、Port と順に取得したら SlaveAddress と一緒にドライバに渡して初期化し、あとはセンサーの値を読みたいときに `read()` します。詳しく見てみましょう。

### var grovelight = new GROVELIGHT(port,0x29)

ここで光センサ用の **ドライバーライブラリのインスタンス生成** を行なっています。

ライブラリ名が変わっただけで ADT7410 と同様に、`port` オブジェクトと、SlaveAddress をパラメータで渡しています。

### grovelight.init()

`init()` で **I2C ポートを開いてセンサーを初期化** します。

内部ではインスタンス生成時に指定したportオブジェクトと `slaveAddress(0x29)` を用いて `I2CPort.open()` を行ない、返却される `I2CSlaveDevice` を保存後に `resolve()` で呼び出し元に処理を返しています。

### grovelight.read()

Grove Digital Light Sensor の仕様に基づく **データ読み出し処理** をここで実施しています。


# 3. 測距センサを使ってみる

モノまでの距離を測定する測距センサ (I2C-VL53L0X) を使ってみましょう。

## a. 部品と配線について

「1.準備」のパートに記載したものに加え、下記を用意してください。

- [測距センサ(I2C-VL53L0X)](https://www.switch-science.com/catalog/2894/) x 1

Raspi 3 との接続方法については、こちらの回路図を参照ください。

[{% cloudinary imgs/section3/VL53L0X-schematic.png alt="回路図" %}](imgs/section3/VL53L0X-schematic.png)

このセンサモジュールは 4 本のピンヘッダ経由で接続します。あらかじめピンヘッダをハンダ付けしておいてください。また、製品によってはチップ表面に黄色の保護フィルムがついているものがあります。剥して使用してください。

ピンの加工例 (保護フィルムが残っている状態)

[{% cloudinary half imgs/section3/VL53L0X_comp.jpg alt="加工例" %}](imgs/section3/VL53L0X_comp.jpg)

## b. 接続確認と example の実行

i2cdetect で接続を確認しておきましょう。

`$ i2cdetect -y -r 1`

SlaveAddress `0x52` が見つかれば接続OKです。次にexampleを動かします。

`/home/pi/Desktop/gc/i2c/i2c-VL53L0X/VL53L0X.html`

センサの前面 (VIN、GND、SCL、SDA等の文字が書いてある方) に手を近づけたり離したりしてみてください。距離の値が変化するはずです。

> VL53L0X が計測できる距離は およそ 3〜200 cm (30-2000 mm) までです。

## c.コード解説

example のコードから、測距センサに関係する部分を見ていきます。

### c-1. index.html
下記が`VL53L0X.html`の中から主要な部分を抜き出したコードです。

VL53L0X.html
```html
    :
    <script src="node_modules/@chirimen-raspi/polyfill/polyfill.js"></script>
    <script src="node_modules/@chirimen-raspi/chirimen-driver-i2c-vl53l0x/VL53L0X.js"></script>
    <script src="./main.js" defer></script>
    :
  <body>
    :
    <tr><td>Distance [mm]</td>
    <td id="dist"></td></tr>
    :
  </body>
```

HTML は ADT7410 の時とほとんど同じです。ドライバーライブラリは `VL53L0X.js` に変わりました。リモート版の URL は `https://r.chirimen.org/vl53l0x.js` です。

### c-2. main.js

次に、`main.js` を見てみましょう。(重要な部分以外は削っています)

main.js
```javascript
  var dist = document.getElementById("dist");
  var i2cAccess = await navigator.requestI2CAccess();
  var port = i2cAccess.ports.get(1);
  var vl = new VL53L0X(port, 0x29);
  await vl.init(); // for Long Range Mode (<2m) : await vl.init(true);
  for (;;) {
    var distance = await vl.getRange();
    dist.innerHTML=distance;
    await sleep(200);
  }
```

`main.js` も温度センサとほとんど同じです。

### var vl = new VL53L0X(port, 0x29)

ドライバーライブラリのインスタンス生成処理です。

### vl.init()

こちらも、内部で `I2CSlaveDevice` インタフェースを取得する処理で、他のセンサと同様です。

### vl.read()

測距センサ VL53L0X の仕様に基づくデータ読み出し処理をここで実施しています。計測範囲内に遮蔽物がない場合には値が数値で得られないことに注意してください。


# 4. 三軸加速度センサを使ってみる

傾きなどに反応するセンサを使ってみましょう。

## a. 部品と配線について

「1.準備」のパートに記載したものに加え、下記を用意してください。

- 三軸加速度センサ([GROVE - I2C 三軸加速度センサ ADXL345搭載](http://www.seeedstudio.com/depot/grove-3-axis-digital-accelerometer-adxl345-p-1156.html)) x 1

Raspi 3 との接続方法については、下記回路図を参照ください。

`/home/pi/Desktop/gc/i2c/i2c-grove-accelerometer/schematic.png`

{% cloudinary imgs/section3/k3.png alt="回路図" %}

このセンサモジュールは Grove コネクタを備えていますので、接続方法に応じてコネクタを選んでください。

- Grove I2C Hub 経由で接続する場合: Grove 4ピン ケーブル経由で接続してください。
- Raspi 3 へ直接接続する場合: Grove 4ピン ジャンパー メス ケーブル経由で接続してください。

## b. 接続確認とexampleの実行

i2cdetect で接続を確認しておきましょう。

`$ i2cdetect -y -r 1`

SlaveAddress `0x53` が見つかれば接続OKです。次に example を動かします。

`/home/pi/Desktop/gc/i2c/i2c-grove-accelerometer/index.html`

画面の回路図の下に表示されている3つの数値が加速度センサの値 (単位は m/s^2) です。画面左から加速度ベクトルの X、Y、Z 成分の値となっており、ベクトルの長さは静止時に地球の重力加速度 (ここが地球なら約 9.8) となります。

> ADXL345 は各成分 ±16g の範囲で計測が可能です。

{% cloudinary imgs/section3/k4.png alt="加速度センサの値" %}

センサを傾けると数値が変化するはずです。

## c. コード解説

exampleのコードを見てみましょう。

### c-1. index.html

下記が`index.html`の中から主要な部分を抜き出したコードです。

index.html
```html
    :
    <script src="node_modules/@chirimen-raspi/polyfill/polyfill.js"></script>
    <script src="node_modules/@chirimen-raspi/chirimen-driver-i2c-grove-accelerometer/GROVEACCELEROMETER.js"></script>
    <script src="./main.js" defer></script>
    :
  <body>
    :
      <div id="ax" class="inner">ax</div>
      <div id="ay" class="inner">ay</div>
      <div id="az" class="inner">az</div>
    :
  </body>
```

今回のドライバーライブラリは、`GROVEACCELEROMETER.js` です。オンラインから読み込む場合は `https://r.chirimen.org/grove-accelerometer.js` です。そして X、Y、Z、3つの値を表示するため要素が3つに変わりましたが、それ以外は今回もこれまでとほとんど同じです。

### c-2. main.js

次に、`main.js` を見てみましょう。(重要な部分以外は削っています)

main.js

```javascript
  var ax = document.getElementById("ax");
  var ay = document.getElementById("ay");
  var az = document.getElementById("az");
  var i2cAccess = await navigator.requestI2CAccess();
  var port = i2cAccess.ports.get(1);
  var groveaccelerometer = new GROVEACCELEROMETER(port,0x53);
  await groveaccelerometer.init();
  while(1) {
    try {
      var values = await roveaccelerometer.read();
      ax.innerHTML = values.x ? values.x : ax.innerHTML;
      ay.innerHTML = values.y ? values.y : ay.innerHTML;
      az.innerHTML = values.z ? values.z : az.innerHTML;
    } catch ( err ){
      console.log("READ ERROR:" + err);
    }
    await sleep(1000);
  }
```

main.js もこれまでの他のセンサーとほとんど同じです。

### var groveaccelerometer = new GROVEACCELEROMETER(port,0x53)

ここで加速度センサ用のドライバーライブラリのインスタンス生成を行なっています。

### grovelight.init()

これまでのドライバーライブラリ同様に `init()` では、インスタンス生成時に指定した `port` オブジェクトと `slaveAddress(0x29)` を用いて `I2CPort.open()` を行ない、返却される `I2CSlaveDevice` を保存後に`resolve()`で呼び出し元に処理を返しています。

### groveaccelerometer.read()

`read()` では、加速度センサの X、Y、Z の値が一度に返却されます。


# 5. 演習: 複数のセンサを組み合わせて使ってみよう

せっかく Grove I2C Hub を用意しましたので、これまでの復習と応用を兼ねて下記のような組み合わせで2つのセンサを繋いで動かしてみましょう。

- 「温度センサ (ADT7410)」か、「距離センサ (VL53L0X)」のどちらか 1つ
- 「光センサ (Grove Digital Light Sensor)」か「三軸加速度センサ」のどちらか１つ

※この組み合わせなら、冒頭で用意したケーブルで足りるはずです。

オンライン版のドライバーライブラリは下記にあります。

- [温度センサ (ADT7410): i2c-ADT7410.js](https://r.chirimen.org/adt7410.js)
- [距離センサ (VL53L0X): i2c-VL53L0X.js](https://r.chirimen.org/vl53l0x.js)
- [Grove 光センサ: i2c-grove-light.js](https://r.chirimen.org/grove-light.js)
- [Grove 三軸加速度センサ: i2c-grove-accelerometer.js](https://r.chirimen.org/grove-accelerometer.js)

まずはセンサを繋いでから、[jsbin](https://jsbin.com/) か [jsfiddle](https://jsfiddle.net/) を使ってコードを書いてみましょう。


# その他のモジュールの紹介や複数のモジュールを利用する際の注意事項
[メインのチュートリアル (Grove を利用していないチュートリアル)](section3.md)では[他の I2C モジュールの紹介](https://tutorial.chirimen.org/raspi/section3#i2c--1)や、[複数のモジュールを利用する際の注意事項](https://tutorial.chirimen.org/raspi/section3#i2c--2)を紹介しています。

また、メインのチュートリアルには、次のチュートリアル (Section 4) へのリンクもありますので、一度目を通してみてください。


# まとめ

このチュートリアルでは 下記について学びました。

- Grove I2C Hubを使ったI2Cモジュールの接続方法
- 光センサ (Grove) の使い方
- 距離センサ (VL53L0X) の使い方
- 三軸加速度センサ (Grove) の使い方


このチュートリアルで扱ったコードは以下のページで参照できます:

- [GitHub リポジトリで参照](https://github.com/chirimen-oh/tutorials/tree/master/raspi/examples/section3)
- ブラウザで開くページ
  - Grove I2C 光センサ: [JSBin](https://r.chirimen.org/jsbin-i2c-grove-light), [CodeSandbox](https://r.chirimen.org/csb-grove-light)
  - 測距センサ (VL53L0X): [JSBin](https://r.chirimen.org/jsbin-i2c-vl53l0x), [CodeSandbox](https://r.chirimen.org/csb-vl53l0x)
  - GROVE I2C 三軸加速度センサ: [JSBin](https://r.chirimen.org/i2c-grove-accelerometer/), [CodeSandbox](https://r.chirimen.org/csb-grove-accelerometer)
  - 複数センサの利用 (ADT7410 + Grove 光センサ): [JSBin](https://r.chirimen.org/jsbin-i2c-multi-sensors), [CodeSandbox](https://r.chirimen.org/csb-multi-sensors)

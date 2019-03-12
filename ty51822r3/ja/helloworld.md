
# スターターキットを使った HelloWorld 編

CHIRIMEN for TY51822r3 のスターターキットを使用して L チカと I2C 温度計で気温を計測してみよう。

<div style="page-break-before:always"></div>

# 1. L チカをやってみよう
<p>
  <a href="imgs/section0/hardware.jpg">
    <img src="imgs/section0/hardware.jpg" alt="Hardware" height="250" style = "float:right;padding-left:2em;">
  </a>
</p>

## 用意するもの

* スターターキット<br>
* PC

注意<br>
スターターキットの中身を確認しよう。<br>
足りなかったり、多くあった場合は、近くの大人に知らせよう。

## 配線

<p>
  <a href="imgs/section0/ledblink_2.png">
    <img src="imgs/section0/ledblink_2.png" alt="Browser"  height="250" style="float:right;padding-left:2em;">
  </a>
  
右図と同じように配線してみよう。

配線が終わったら、BLE 接続をクリックしよう。

注意<br>
LED には方向がある。アノードが足が長い方。反対の足が短い方をカソードと言い GND 側に繋ぐ。抵抗はどちらかに繋ぐ。
</p>

## Example を実行しよう
<p>
  <a href="imgs/section0/ledblink_3.png">
    <img src="imgs/section0/ledblink_3.png" alt="Browser" height="250" style="float:right;padding-left:2em;">
  </a>
  
BLE 接続をクリックすると、右図のようになります。

Y51822r3 がちゃんと動作していれば、リストに「btGPIO2」 という名前のデバイスが見つかるはずです。<br>
これが CHIRIMEN for TY51822r3 用のデバイスになります。
それを選択して「ペア設定」のボタンを押すとダイアログと青いバーが消え、接続が確立します。

ブレッドボード上では LED が点滅して L チカが動作しはじめます。

これで L チカは完了です。

</p>

<div style="page-break-before:always"></div>

## コード

[今回使用したコードはこちら](https://github.com/chirimen-oh/chirimen-TY51822r3/tree/master/bc/gpio/LEDblink)

今回のコードの一部を以下に示します。

## HTML

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>LED Blink</title>
    <script src="../../polyfill/blePolyfill.js"></script>
    <script src="./main.js"></script>
  </head>
  <body>
  <div><input type="button" id="BLECONN" value="BLE接続"></div>
  </body>
</html>
```

## JavaScript

```javascript
'use strict';

const DEVICE_UUID     = "928a3d40-e8bf-4b2b-b443-66d2569aed50";
let connectButton;
window.addEventListener(
  "load",
  function() {
    connectButton = document.querySelector("#BLECONN");
    connectButton.addEventListener("click", mainFunction);
  },
  false
);

async function mainFunction(){ // プログラムの本体となる関数、非同期処理のためプログラム全体をasync関数で包みます。
	var bleDevice = await navigator.bluetooth.requestDevice({
      filters: [{ services: [DEVICE_UUID] }] });
	var gpioAccess = await navigator.requestGPIOAccess(bleDevice); // thenの前の関数をawait接頭辞をつけて呼び出します。
	connectButton.hidden = true;
	var port = gpioAccess.ports.get(7);
	await port.export("out");
	var v = 0;
	while ( true ){ // 無限ループ
		await sleep(1000); // 1000ms待機する
		v ^= 1; // v = v ^ 1 (XOR 演算)の意。　vが1の場合はvが0に、0の場合は1に変化する。1でLED点灯、0で消灯するので、1秒間隔でLEDがON OFFする。
		await port.write(v);
	}
}

// この関数の定義方法はとりあえず気にしなくて良いです。コピペしてください。
// 単に指定したms秒スリープするだけの非同期処理関数
function sleep(ms){
	return new Promise( function(resolve) {
		setTimeout(resolve, ms);
	});
}
```

これで、 L チカ編は終了です。

* [その他の GPIO の例はこちら](http://chirimen.org/chirimen-raspi3/gc/top/examples/#gpioExamples)



# 2. I2C 温度センサー使ってみよう

<p>
  <a href="imgs/section2/adt7410_parts.jpg">
    <img src="imgs/section2/adt7410_parts.jpg" alt="Browser" height="200" style="float:right;padding-left:2em;">
  </a>
  
## 用意するもの

* L チカを行った回路

* 右図に書いてあるもの

抵抗 10kΩ x 2 個 

ADT7410使用 I2C 温度センサーモジュール

</p>

<p>
  <a href="imgs/section2/adt7410_1.png">
    <img src="imgs/section2/adt7410_1.png" alt="Browser" height="200" style="float:right;padding-left:2em;">
  </a>
  
## 配線

右図と同じように配線してみよう。

配線が終わったら、BLE 接続をクリック。

</p>
  
## Example を実行しよう

<p>
  <a href="imgs/section2/adt7410_3.png">
    <img src="imgs/section2/adt7410_3.png" alt="Browser" height="180" style="float:right;padding-left:2em;">
  </a>
  
BLE 接続をクリックすると、右図のようになります。

ターゲットの gtGPIO2 を選択して「ペア設定」を押してください。

BLE の接続が正常にできれば、青いバーが消え動作を開始します。
  
右下の図に数字がでていますね。

これが温度センサーから取得した現在の温度 (摂氏) の表示になります。

<a href="imgs/section2/adt7410_4.png">
  <img src="imgs/section2/adt7410_4.png" alt ="Browser" height="180" style="float:right;padding-left:2em;">
</a>

これで I2C 温度計は完了です。

## コード

[今回使用したコードはこちら](https://github.com/chirimen-oh/chirimen-TY51822r3/tree/master/bc/i2c/i2c-ADT7410)


* [その他の I2C の例はこちら](http://chirimen.org/chirimen-raspi3/gc/top/examples/#i2cExamples)
* [応用例はこちら](http://chirimen.org/chirimen-raspi3/gc/top/examples/#advanced)

</p>

<div style="page-break-before:always"></div>

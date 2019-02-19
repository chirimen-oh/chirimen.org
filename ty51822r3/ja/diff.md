# CHIRIMEN for TY51822r3 と CHIRIMEN for Raspberry Pi 3 の違い

これは CHIRIMEN for Raspberry Pi 3 の使い方を既に知っていて CHIRIMEN for TY51822r3 ではどのように違うのかを知りたい人向けの資料です。

## コードの書き方について

### ポリフィル
ポリフィルは `polyfill.js` ではなく `blePolyfill.js` を使用します。オンライン版の公開 URL から読み込むには

```html
<script src="https://chirimen.org/chirimen-TY51822r3/bc/polyfill/blePolyfill.js"></script>
```
としてください。

### I2C デバイスのドライバー

I2C デバイスの各ドライバーは GitHub で公開されています。

[I2C デバイスのドライバーリポジトリ](https://github.com/chirimen-oh/chirimen-TY51822r3/tree/master/bc/drivers)

オンラインで公開 URL から読み込むには、

```html
<script src="https://chirimen.org/chirimen-TY51822r3/bc/drivers/i2c-ADT7410.js"></script>
```
のようにしてください。

### example 

CHIRIMEN for TY51822r3 の各種 example は  

 [https://chirimen.org/chirimen-TY51822r3/bc/](https://chirimen.org/chirimen-TY51822r3/bc/)  
 
で公開されています。


### requestGPIOAccess() および requestI2CAccess()

Web GPIO API / Web I2C API を使用するための navigator.requestGPIOAcess() および navigator.requestI2CAccess() には 接続先の BLE デバイスを指す引数が必要です。  
この BLE デバイスオブジェクトは navigator.bluetooth.requestDevice() によって取得します。

### BLE デバイスの選択

CHIRIMEN for TY51822r3 ではアプリが動作を開始する際に、必ずユーザーアクションをトリガーとして、ダイアログから接続先の BLE デバイスを選択する必要があります。

コードとしては、
```javascript
const DEVICE_UUID = "928a3d40-e8bf-4b2b-b443-66d2569aed50";

window.addEventListener('load', function (){
    connectButton = document.querySelector("#BLECONN");
    connectButton.addEventListener("click", mainFunction);
}, false);

async function mainFunction() {
    var bleDevice = await navigator.bluetooth.requestDevice({ filters: [{ services: [DEVICE_UUID] }] });
    var gpioAccess = await navigator.requestGPIOAccess(bleDevice);
    var i2cAccess = await navigator.requestI2CAccess(bleDevice);
}
```

のようにユーザーが GUI 上の「BLE 接続」ボタンを押す事で mainFunction() が走り始めるという形式が定番として想定されています。

DEVICE_UUID は CHIRIMEN for TY51822r3 のサービスを表す UUID です。

## 制限事項など

### GPIO の割り当て

Web GPIO API で使用できるポートは 0 番から 7 番の 8 本です。Web GPIO API の 0 番から 7 番がそれぞれ TY51822r3 の P0_0 から P0_7 に割り当てられています。その他のピンを Web GPIO API で制御するポートとして使用する事はできません。

### I2C の割り当て

Web I2C API で使用する I2C のポートは TY51822r3 の P0_29 が SCL、P0_30 が SDA として割り当てられています。その他のピンを I2C のポートとして使用する事はできません。

この割り当ては MBED 公式の TY51822r3 のピン割り当てとは異なる事に注意してください。

### パフォーマンスの制限

CHIRIMEN for TY51822r3 の Web GPIO API、Web I2C API は JavaScript インターフェースから更に BLE 接続を経由して動作するため、CHIRIMEN for Raspberry Pi 3 に比べてもかなり遅いものになります。ポーリングでセンサーを監視をするというケースで 500ms ～ 1s に 1 回程度の動作が適切と思われます。

### Windows 環境での使用

CHIRIMEN for TY51822r3 は BLE 通信に Web Bluetooth API を使用していますが Windows の場合、まだフラグ付きの実装になっています
(2019/01/05 現在、バージョン: 71.0.3578.98（Official Build） （64 ビット）で確認)。

Chrome のアドレスバーから `chrome:flags` を開いて、`Experimental Web Platform features` の項目を `Enabled` に設定してください。
また Mac 版にくらべて安定性について多少問題が残っています。長時間の稼働などで問題が発生する可能性があります。

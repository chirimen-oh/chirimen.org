# 3. CHIRIMEN Raspberry Pi Zero版 の準備

## 3.1. ステップ０ (物品準備、PCをWiFiに接続)

### 3.1.1. 必要な物品リスト

以下を用意します
* Raspberry Pi Zero W 、( Pi Zero **2** W も使用できます(2022/10/12 update) )
  * Pi Zero: [ケイエスワイ](https://raspberry-pi.ksyic.com/main/index/pdp.id/799/pdp.open/799), [秋月電子](https://akizukidenshi.com/catalog/g/gM-12961/), [スイッチサイエンス](https://www.switch-science.com/catalog/3646/), [マルツ](https://www.marutsu.co.jp/pc/i/1320453/)
  * Pi Zero **2** W: [ケイエスワイ](https://raspberry-pi.ksyic.com/main/index/pdp.id/851/pdp.open/851)
* [Raspberry Pi OS LiteをUSB Serialで使用可能にしたイメージ](https://github.com/chirimen-oh/chirimen-lite/releases)を書き込んだmicroSDカード
* ブラウザの載ったパソコン
  * Windows 10 PC
    * ブラウザは標準のEdgeもしくはChromeを使います。
  * Macintosh
    * ブラウザはChromeが必要です。
  * いずれもUSBとWiFiが使える必要があります。
  * *Note: Linux PCのChromeでは次の設定で利用可能になるとの報告をいただいています*
    * Ubuntu Studio: ```sudo chmod a+rw /dev/ttyACM0```
    * Ubuntu Desktop 20.04 LTS: ```sudo gpasswd -a "$(whoami)" dialout```
* USBケーブル (USB A - MicroB)
* Lチカ用パーツ
  * ブレッドボード
  * LED
  * 1KΩ抵抗
  * ジャンパーワイヤ オス-メス 2本
* GPIO入力実験用追加パーツ
  * タクトスイッチ
* モーター制御用追加パーツ
  * 10KΩ抵抗
  * MOSFET
  * ちびギヤモーター
* 温度センシング実験用追加パーツ
  * [ADT7410モジュール](https://akizukidenshi.com/catalog/g/gM-06675/)　もしくは [SHT30モジュール](https://www.amazon.co.jp/dp/B083NHJSL9/)
  * ジャンパーワイヤ オス-メス 2本

<hr class="page-wrap" />

![Parts Images](../../pizero/imgs/PartsList2.svg){height=360}

PiZero自体はディスプレイやキーボードを接続する必要はありません。

### 3.1.2 PCをWiFiに接続
* 会場(もしくは開発場所)で提供されているWiFiアクセスポイントにまずはPCを接続してください。

## 3.2. ステップ１（ターミナル接続）

* [Raspberry Pi OS LiteをUSB Serialで使用可能にしたイメージ](https://github.com/kou029w/chirimen-os/releases/)を書き込んだmicroSDカードをRaspberry Pi Zeroに差し込みます。
* PCのUSBとRaspberry Pi ZeroのUSB OTGポートをUSBケーブルでつなぎます
  * PiZero側はつなぐポート要注意　ここに繋ぎます
  ![pi zero otg port](https://chirimen.org/PiZeroWebSerialConsole/imgs/PiZeroW_OTG.JPG){height=160}
  * PCからのUSB給電でRaspberry Pi Zeroが起動します。
* PCでRaspberry Pi Zeroが認識されたことを確認します ([Windows10のデバイスマネージャ](https://askpc.panasonic.co.jp/beginner/guide/ten07/7013.html)の例) 
  * 給電後USBデバイスとして出現するまでにしばらく(数十秒)かかります）
  * Windowsの場合、ポートの番号(COMnのnの部分)は環境ごとに異なります
  ![OTG PORT Information on device manager](../../pizero/imgs/OTG_PORT_W10.png)
* [**こちらのWeb Serial RPiZero TerminalページにPCのブラウザでアクセス**](https://chirimen.org/PiZeroWebSerialConsole/PiZeroWebSerialConsole.html)
 (以降、このウィンドを**ターミナルウィンド**と呼びます)
* ```[Connect and Login PiZero]```ボタンを押す
  * 接続ダイアログが出現
    ![connection dialog](../../pizero/imgs/SerialDialog.png){height=155}
  * 上で認識したデバイス（ポート番号）を接続する
* コンソール(左側の黒い画面の最下部)に以下のコマンドプロンプトが表示されればステップ１完了です。引き続きステップ２に進んでください
  * ```pi@raspberrypi:~$```

### 3.2.1. Note:

* CHIRIMEN Raspberry Pi Zero版では[Raspberry Pi OS Lite](https://www.raspberrypi.com/software/operating-systems/)(Linux)を[コマンドラインインターフェース(CLI)](https://atmarkit.itmedia.co.jp/ait/articles/1602/19/news025.html)・[シェル(bash)](https://atmarkit.itmedia.co.jp/ait/articles/1603/02/news016.html)で操作します。
  * ただしこの講習で使うコマンドはごくわずかです。
    * **node** コマンド(後述)
    * [CTRL+c](https://atmarkit.itmedia.co.jp/ait/articles/1708/04/news015_2.html)(CTRLキーとcを同時に押す:実行中のコマンドを終了させる)
  * その他のほとんどの操作（コマンド）は、ターミナルウィンドやそこから起動される別画面のGUIがコマンド操作を代行しています。図1.1のGUIを操作するとコンソールにコマンドが入力されるのがわかると思います。
* もしもあなたがlinuxのシェルコンソール画面に慣れている場合は、ターミナルウィンドのコンソールにその他のシェル(bash)コマンドをタイプして使用することもできます。
  * たとえば ```ls -al``` とタイプするとおコンソール画面にディレクトリ内のファイルのリストが表示されます。
* ターミナルウィンドの概要 (図1.1)

  ![ターミナルウィンドの説明](../../pizero/imgs/termWin.svg)

<hr class="page-wrap" />

## 3.3. ステップ２ (WiFi設定)

* ターミナルウィンドの```[wifi panel]```ボタンを押す
  * ウィンドが開き、WiFiアクセスポイントがスキャンされます。ステルスでないものはリストアップされているので、以降の作業の参考にしてください。
  * Raspberry Pi Zero Wは2.4GHz帯のWiFiにのみ対応しています。
    ![WiFi Setting](../../pizero/imgs/WiFiSetting.png)
* ウィンド下部に、会場(もしくは開発場所)で提供されているWiFiアクセス情報を入力する (いずれも大文字小文字の区別があるので注意してください。)
  * SSID欄
  * PASS PHRASE欄 
* ```[SET WiFi]```ボタンを押す
* ```[Reboot]```ボタンを押す
  * これでRaspberry Pi Zeroが再起動をはじめます
* WiFiウィンドを閉じ、ターミナルウィンドに戻る
* ターミナルウィンドの```[Close Connection]```ボタンを押す
* 30秒ほど待つ（Raspberry Pi Zeroが再起動します）

<hr class="page-wrap" />

* ```[Connect and Login PiZero]```ボタンを押し接続する
  * 接続ダイアログが出現⇒接続するとこれまで同様コマンドプロンプトが出現
* ```[wifi panel]```ボタンを再び押す
* ```[wifi Info]```ボタンを押す
  * 表示された情報をチェックします
  * wlan0: inet xxx.xxx.xxx.xxx　(xxxは数字)のようにIPアドレスが設定されていれば接続成功しています。
![WiFi Setting_IPaddress](../../pizero/imgs/WiFiSettingIPaddress.png)
  <!--  * あとでping chirimen.org OK も入れよう。-->
  * もしもあなたがsshやscp (WinSCP, teraterm等)などのツールに慣れている場合、上記のアドレスでssh接続できます
    * PORT: 22
    * ID: ```pi```
    * PASSWORD: ```raspberry```
  * 確認できたらWiFi Settingウィンドを閉じてください。

* 以上ですべての初期設定完了です！

<hr class="page-wrap" />

# 4. Hello Real World（Lチカを実行する）

## 4.1. 配線

PiZero とパーツを使って下の図の通りに配線します。
* [LEDの極性に注意！](https://tutorial.chirimen.org/raspi/hellorealworld#section-1)
  * LEDの説明<span class="footnote">14.6. LED 参照</span>
* [ブレッドボードの使い方](https://shop.sunhayato.co.jp/blogs/problem-solving/breadboard) (サンハヤト社)
* 抵抗値の読み方<span class="footnote">14.8. 抵抗値の読み方参照</span>
* その他、配線の基礎知識<span class="footnote">14.3. 電子工作参照</span>


**注意**
* 間違ったピンに差し込むと場合によってはPiZeroが停止したり故障することもあります。（たとえば3.3V端子とGND端子を接続してしまうなど。）
* そのため、慣れるまでは一旦PiZeroをシャットダウン、USBケーブルも外し電源OFFにしてから配線すると安全です
   * シャットダウンコマンド：```sudo shutdown -h now```

![PiZero配線図](../../pizero/imgs/pizero_led.png){height=200}

* 配線に使うケーブルの色に厳密な決まりはありませんが、一般的にGNDは黒(や黒っぽい色)、電源(VCC, +3.3V, +5V)には赤(や赤っぽい色)が用いられます。配線間違いを防ぐためにもなるべく合わせましょう。
* 抵抗やLEDの足(リード線)は手で簡単に曲げられます。ブレッドボードに差し込めるように適当に成型してください。
* 上図のPiZeroは上から見たものです

<hr class="page-wrap" />

## 4.2. プログラムを書く

Raspberry Pi に接続した LED を点滅させるプログラムを書きます。

* ターミナルウィンドでRaspberry Pi Zeroに接続します。（ステップ１が完了した状態）
* myAppディレクトリに移動します。
  * コンソールの右側のファイルマネージャでmyApp⇒移動を選ぶ
  * このディレクトリが開発環境が設定されているディレクトリです。
* ```[Create New Text]```ボタンを押す
* 入力欄に```hello.js```と入力
* ```[create]```ボタンを押す
* JS Editorウィンドが出現

以下のプログラムをJS Editorに書き写します

```js
// WebGPIO を使えるようにするためのライブラリをインポート
import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js";
// sleep 関数を定義
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

async function blink() {
  // GPIO を操作する
  const gpioAccess = await requestGPIOAccess();
  // 26 番ポートを操作する
  const port = gpioAccess.ports.get(26);
  // ポートを出力モードに設定
  await port.export("out");

  // 無限ループ
  for (;;) {
    // 1秒間隔で LED が点滅します
    await port.write(1); // LEDを点灯
    await sleep(1000);   // 1000 ms (1秒) 待機
    await port.write(0); // LEDを消灯
    await sleep(1000);   // 1000 ms (1秒) 待機
  }
}

blink();
```

* 書き終えたら保存します。(```[Save]ボタン```もしくはCTRL+s)
* ターミナルウィンドの右側(ファイルマネージャ)に hello.jsが出現していることを確認します
* エディタウィンドを閉じます

<hr class="page-wrap" />


## 4.3. 実行する

* ターミナルウィンドのコンソール部(ウィンド左側)のプロンプト(画面一番下)が以下になっていることを確認します
  * ```pi@raspberrypi:~/myApp$```
* コンソール部をクリックして、入力可能状態にしてから、以下の文字を入力します。
* ```node hello.js``` ENTERキー
  * [**node**](https://atmarkit.itmedia.co.jp/ait/articles/1102/28/news105.html) はJavaScriptのコードを実行するインタープリタ<span class="footnote">https://ja.wikipedia.org/wiki/インタプリタ</span>
* LED が点滅すれば完成です 🎉
* プログラムを止めるには、コンソール部で ```CTRL+c``` を押します。

<hr class="page-wrap" />

# 5. GPIOを試す

## 5.1. GPIOを理解する
* GPIOとは？<span class="footnote">11.1. GPIOとは参照</span>

## 5.2. GPIO出力

GPIOの出力はLチカで実験済みですね。そこで今回はモーターを動かしてみましょう。MOSFETを使った回路図は以下のようになります。

![GPIO Motor](../../pizero/esm-examples/hello-real-world/PiZero_gpio0Motor.png){height=190}

コードはLチカと全く同じです。

### 5.2.1. 回路について
* MOSFETを使った大電力制御<span class="footnote">14.10. MOSFET とは参照</span>

### 5.2.2. コードを読む
* 前提：CHIRIMEN Rasoberryu Pi ZeroはNode.jsをプログラム実行環境（インタープリタ）として使っています。
  * Node.jsについて<span class="footnote">10.2.2. Node.js (CHIRIMEN Raspberry Pi Zero版)参照</span>
* ターミナルウィンドの右側のファイルマネージャでhello.js⇒表示 を選び、ソースコードを読んでみましょう
* WebGPIOライブラリを読み込み (JavaScript Module<span class="footnote">10.2.3. javascript Module (ECMA Script Module)参照</span>仕様に従って)
　`import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js";`
  * JavaScript module<span class="footnote">10.2.3. javascript Module (ECMA Script Module)参照</span>に基づいてWebGPIOライブラリを読み込みます。これでWeb GPIO APIが使えるようになりました。
* GPIOポートの初期化処理<span class="footnote">11.2. GPIOポートの初期化参照</span>
* GPIOPortの出力処理理<span class="footnote">11.3. GPIOPort の出力処理参照</span>

<hr class="page-wrap" />

## 5.3. GPIO入力

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

### 5.3.1. コードを読む
* ターミナルウィンドの右側のファイルマネージャでmain-gpio-onchange.js⇒表示 を選び、ソースコードを読んでみましょう
* WebGPIOライブラリを読み込み
　`import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js";`
  * JavaScript module<span class="footnote">10.2.3. javascript Module (ECMA Script Module)参照</span>に基づいてWebGPIOライブラリを読み込みます。これでWeb GPIO APIが使えるようになりました。
* GPIOポートの初期化処理を行う<span class="footnote">11.2. GPIOポートの初期化参照参照</span>
* onchangeによる入力処理<span class="footnote">11.4.1. onchange編参照</span>

<hr class="page-wrap" />

## 5.4. GPIO入力(ポーリング)
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

### 5.4.1. コードを読む
* ターミナルウィンドの右側のファイルマネージャでmain-gpio-polling.js⇒表示 を選び、ソースコードを読んでみましょう
* WebGPIOライブラリを読み込み
　`import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js";`
  * JavaScript module<span class="footnote">10.2.3. javascript Module (ECMA Script Module)参照</span>に基づいてWebGPIOライブラリを読み込みます。これでWeb GPIO APIが使えるようになりました。
* GPIOポートの初期化処理を行う<span class="footnote">11.2. GPIOポートの初期化参照</span>
* 単純入力＋ポーリングによる入力処理<span class="footnote">11.4.2. 単純入力＋ポーリング参照</span>

<hr class="page-wrap" />

# 6. I2Cデバイスを試す

## 6.1. I2Cを理解する

* I2Cとは？<span class="footnote">12. I2C参照</span>

## 6.2. SHT30編

SHT30は温度に加えて湿度も測定できるI2C接続の多機能センサーです。SHT31もほぼ同等に使えます。(SHT31のほうが精度が高い)
* SHT30/SHT31について<span class="footnote">12.4.1. SHT30, SHT31について参照</span>

* ターミナルウィンドの```[CHIRIMEN Panel]```ボタンを押す
* 出現したCHIRIMEN Panelの```[Get Examples]```ボタンを押す
* ID : sht30を探します
* 回路図リンクを押すと回路図が出てきますので、回路を組みます。なお、接続は下の図のようになります。

  ![SHT31 schematic](../../pizero/esm-examples/sht30/schematic.png){height=220}

* ```[JS GET]```ボタンを押すと、開発ディレクトリ(```~/myApp```)に、サンプルコードが保存されます。
  * **main-sht30.js**というファイル名で保存されます。
  * Note: ターミナルウィンドの右側のファイルマネージャでmain-sht30.js⇒編集 を選ぶと、エディタで編集できます。
    * ソースコードを見てみましょう
    * 今は編集不要ですが、サンプルをベースに応用プログラムを作るときには編集しましょう。

<hr class="page-wrap" />

### 6.2.1. I2Cセンサー(SHT30)が認識されていることを確認する

* CHIRIMEN Panelの```[i2c detect]```ボタンを押すと、[SHT30のI2Cアドレス](https://strawberry-linux.com/pub/Sensirion_Humidity_SHT3x_DIS_Datasheet_V3_J.pdf)　0x**44**が表示されていればうまく接続されています。
  * i2c detectとは<span class="footnote">12.5. i2cdetectで接続がうまくいったか確認する参照</span>

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

### 6.2.2. 実行する

* ターミナルウィンドのコンソールのプロンプトが```pi@raspberrypi:~/myApp$```となっていることを確認
* ターミナルウィンドのコンソールに、```node main-sht30.js``` [ENTER] と入力して実行。
* 温度と湿度が1秒ごとにコンソールに表示されます。
* 終了は CTRL+c

### 6.2.3. コードを読む

* ターミナルウィンドの右側のファイルマネージャでmain-sht30.js⇒表示 を選び、ソースコードを読んでみましょう
* [WebI2CライブラリとSHT30デバイスドライバを読み込み](https://tutorial.chirimen.org/chirimenGeneric/#webi2c)

　`import {requestI2CAccess} from "./node_modules/node-web-i2c/index.js";`
  `import SHT30 from "@chirimen/sht30";`
  * JavaScript module<span class="footnote">10.2.3. javascript Module (ECMA Script Module)参照</span>に基づいてWebI2Cライブラリを読み込みます。
* I2C 温湿度センサー (SHT30, SHT31)の初期化と使用<span class="footnote">12.6.2. I2C 温湿度センサー (SHT30, SHT31)の使用例参照</span>

<hr class="page-wrap" />

## 6.3. ADT7410編

温度センサーADT7410を使います。
もし、SHT30を使用する場合は、「IoTを試す」の章まで読み飛ばしてください。

* ターミナルウィンドの```[CHIRIMEN Panel]```ボタンを押す
* 出現したCHIRIMEN Panelの```[Get Examples]```ボタンを押す
* ID : adt7410を探します(上から5個目ぐらい)
* 回路図リンクを押すと回路図が出てきますので、回路を組みます。なお、接続は下の図のようになります。

![PiZero温度センサー図](../../pizero/imgs/pizero_temp.png)
* ```[JS GET]```ボタンを押すと、開発ディレクトリ(```~/myApp```)に、サンプルコードが保存されます。
  * **main-adt7410.js**というファイル名で保存されます。
  * Note: ターミナルウィンドの右側のファイルマネージャでmain-adt7410.js⇒編集 を選ぶと、エディタで編集できます。
    * ソースコードを見てみましょう
    * 今は編集不要ですが、サンプルをベースに応用プログラムを作るときには編集しましょう。

#### センサーの極性に注意

    温度センサー ADT7410 を用意した場合、図と同じように配線します。配線(特に電源線)を間違えるとセンサーが高熱になり火傷・破損するので注意してください。

<hr class="page-wrap" />

### 6.3.1. I2Cセンサーが認識されていることを確認する

* CHIRIMEN Panelの[```[i2c detect]```](https://tutorial.chirimen.org/ty51822r3/i2cdetect)ボタンを押すと、[ADT7410のI2Cアドレス](https://akizukidenshi.com/download/ds/akizuki/AE-ADT7410_aw.pdf)　0x**48**が表示されていればうまく接続されています。

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

### 6.3.2. 実行する

* ターミナルウィンドのコンソールのプロンプトが```pi@raspberrypi:~/myApp$```となっていることを確認
* ターミナルウィンドのコンソールに、```node main-adt7410.js``` [ENTER] と入力して実行。
* 温度が1秒ごとにコンソールに表示されます。
* 終了は CTRL+c

# 7. IoTを試す

## 7.1. 遠隔LEDコントロール

![system configuration](../../pizero/imgs/IoTsystemConf.png)
IoTは、制御されるデバイス（上図ではCHIRIMEN PiZeroW)と、利用者端末（上図ではWebApp PC-side）に加えて、これらの間でデータを中継するサーバ（クラウド）が必要になります。
今回はWeb標準技術であるWebSocketプロトコルを中継するサーバを用いてLEDを備えたCHIRIMENデバイスとスマホやPCのWebAppを繋いだIoTシステムを作ります。

Note: モーター制御の回路<span class="footnote">5.2. GPIO出力参照</span> を組めば、そのまま遠隔モーターコントロールができます

- IoT<span class="footnote">13. IoT 参照</span> 
- WebSoeketとRelayServer<span class="footnote">13.1. webSocketとpub/sub services 参照</span> 

### 7.1.1. 配線する

配線は最初のLチカそのままです。

![PiZero配線図](../../pizero/imgs/pizero_led.png){height=200}

<hr class="page-wrap" />

### 7.1.2. CHIRIMENデバイス側にコードを入れ、実行する

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

### 7.1.3. PC側のコードを準備し、実行する
* CHIRIMEN Panelに戻り、ID : **remote_gpio_led**の行にある、```CSB EDIT```リンクをクリックする。
  * [CodeSandbox](https://csb-jp.github.io/)というオンラインのWebApp開発環境のウィンドが開き、PC側のコードが表示されています。編集もできます。
  * また、右側（もしくは右下）のフレームにはLEDを遠隔コントロールするためのwebAppが既に実行されています。
  * webAppを使ってLEDが制御できることを確かめてみましょう。
![Code Sandbox Image](../../pizero/imgs/RC_CSB.svg){height=240}

<hr class="page-wrap" />

### 7.1.4. コードを読む
#### 7.1.4.1. Raspberry Pi Zero側コード
* ターミナルウィンドの右側のファイルマネージャでmain-remote_gpio_led.js⇒表示 を選び、ソースコードを読んでみましょう
* これまで通りWebGPIOライブラリの読み込み
* relayServer.js<span class="footnote">13.1.2.2. relayServer.js 参照</span> ライブラリの読み込み
  * Node.jsではrelayServerライブラリに加えて、webSocketライブラリの読み込みが必要です。
    ```
    import nodeWebSocketLib from "websocket";
    import {RelayServer} from "./RelayServer.js";
    ```
* relayServer.js<span class="footnote">13.1. webSocketとpub/sub services 参照</span> を使って、PCからの操作指示を受信
  * 初期化<span class="footnote">13.1.2.3.1. 初期化（受信側、送信側共通の処理参照</span>
  * 受信処理<span class="footnote">13.1.2.3.2. チャンネルの作成参照</span>(コールバック関数の設定)
* 受信した内容をもとにGPIO出力を操作<span class="footnote">11.3. GPIOPort の出力処理参照</span>してLEDを点灯・消灯

#### 7.1.4.2. PC側コード
* CodeSandboxで開いているPC.jsを見てみましょう
* JavaScript Module<span class="footnote">10.2.3. javascript Module (ECMA Script Module)参照</span>仕様に基づいてrelayServer.jsを読み込み
  ```
  import {RelayServer} from "https://chirimen.org/remote-connection/js/beta/RelayServer.js";
  ```
* relayServer.js<span class="footnote">13.1. webSocketとpub/sub services 参照</span> を使い、UIを通してユーザからの操作指示を送信
  * 初期化<span class="footnote">13.1.2.3.1. 初期化（受信側、送信側共通の処理参照</span> 
  * 送信処理<span class="footnote">13.1.2.3.3. データの送信参照</span> ～UI(ボタン)に設置したコールバック関数をもとに送信

#### 7.1.4.3. 自分専用チャンネルで制御

  サンプルのコードは共通のチャンネルを使って制御しています。この状態では複数の人が同時に実習していると混信します。(他の人のPCでON/OFFを指示しても、自分のLEDがON/OFFする。同じチャンネルを使っているため。)

  これはこれで使い道はあるのですが、自分のLEDは自分だけで制御したい場合は専用のチャンネルを使って制御しましょう。　チャンネルの指定はPiZero側のコードと、PC側のコード両方を同時に同じ内容で設定する必要があり、以下の部分になります。

  ```channel = await relay.subscribe("chirimenLED");```

  この```chirimenLED```という文字列(チャンネル名)を他の人と被らない別のチャンネル名に書き換えます(```chirimenLED5```など)

<hr class="page-wrap" />

# 8. 他のいろいろなデバイスを試してみる

* ターミナルウィンドの```[CHIRIMEN Panel]```ボタン⇒CHIRIMEN Panelの```[Get Examples]``ボタンで出現するリストのデバイスがすぐ試せます。
* このリストの直リンクは[こちら(サンプル一覧)](esm-examples/)です。CHIRIMEN RPiZeroをPCにつないでいないときはこちらを眺めてください。

また、こちらには、Web GPIO や Web I2C によって扱うことのできる[外部デバイスの写真や様々なCHIRIMEN環境のサンプルコードの一覧があります](https://tutorial.chirimen.org/raspi/partslist)。こちらも参考になるかもしれません。(CHIRIMENは[Raspberry Pi ZeroW以外に、Raspberry Pi 3,4や、micro:bit等](../)でも使用できます）

# 9. 常駐プログラム化する

ターミナルウィンドからnodeコマンドで実行指示しなくても、電源投入後 自動的に指定したコードを起動する設定（常駐プログラム化）ができます。
このチュートリアルでは、[forever](https://www.npmjs.com/package/forever)を使用する設定を専用GUIを用いて行ってみましょう。

* ターミナルウィンドの```[CHIRIMEN Panel]```ボタン⇒CHIRIMEN Panelの```[Resident App Conf.]```ボタンを押します。 
  * 専用画面のUIが使用可能状態になるまで数秒かかります。
* 開発ディレクトリ```~/myApp```内にあるjavascriptコードがリストアップされます。
* 各行の```Now Running```列は常駐状態、```App Name```はコードのファイル名、```Select```は選択用チェックボックスです。
  * ```Now Running```欄には現在常駐プログラム化しているコードに、```RUNNING```が表示されています。（常駐プログラムがなければ全部の行が空白になります）
  * ```Select```欄のチェックボックスをチェックすると、そのコードが常駐プログラム化します。（常駐プログラムは一個だけ指定できます）
    * 設定が反映され、常駐状態が確認できるようになるまで、２０秒ぐらいかかります
      * 常駐状態の再確認は```[Resident App Conf.]```ボタンで可能
      * 設定できたらシャットダウンしてPCとのUSB接続も外します
        * シャットダウンコマンド: ```sudo shutdown -h now```
      * その後PiZeroをモバイルバッテリなどにつないで独立して稼働させます。
        * PiZeroの緑色LEDの点滅が収まると、概ね常駐プログラムが起動
        * その後PCからリモートコントロールしてみましょう
  * PCに接続しなおして、一番上の```STOP ALL APPS```のチェックボックスをチェックすると、常駐プログラムを解除できます。


* *Note: 常駐化のツールとしては、他にもsystemd service unit, openrc, cron, pm2, forever 等があります。Webでそれぞれの特徴を調べて用途に合ったものを選択して設定しても良いでしょう。*

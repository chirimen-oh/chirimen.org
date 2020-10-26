
# Hello micro:bit - 準備編

このドキュメントはCHIRIMEN with micro:bitを使う上で最初の一歩となる以下を学習するチュートリアルです。

- 学習に必要な材料を揃えよう
- CHIRIMEN with micro:bitをセットアップしよう
- 内蔵センサーやLEDをコントロールするwebAppsを動かしてみよう

# 機材の準備
以下の機材が準備できていることを確認しましょう。

## CHIRIMEN with micro:bit 基本セット
|基本セット (パーソナルコンピュータを除く)  -  電池ボックス, micro:bit, microUSBケーブル |
| ----- |
| ![CHIRIMEN with micro:bit 基本セット](imgs/baseSet.jpg)  |


## フィジカルコンピューティングセット(スターターキット)

|  |  |  |
| --- | --- | --- |
| micro:bitブレークアウトボード | ブレッドボード | ジャンパー(オス-オス4本) |
| ![](imgs/parts/pinbit.png) | ![](imgs/parts/breadboard.png) | ![](imgs/parts/MtoM.png) |
| リード付きLED (赤or黄or緑) | リード抵抗 (150Ω)　茶緑茶金 | リード抵抗 (1KΩ)　茶黒赤金 |
| ![](imgs/parts/LED.png) | ![](imgs/parts/150Ohm.png) | ![](imgs/parts/1kOhm.png) |
 リード抵抗 (10KΩ) 茶黒橙金 | タクトスイッチ | Nch MOSFET (2SK4017) |
| ![](imgs/parts/10kOhm.png) | ![](imgs/parts/switch.png) | ![](imgs/parts/MOSFET.png) |
| ちびギアモータ | ADT7410 | 又はSHT30 |
| ![](imgs/parts/chibigear.png) | ![](imgs/parts/ADT7410.png) | ![](imgs/parts/SHT30.jpg) |

<!--
| ブレークアウトボード | ブレッドボード | ジャンパーワイヤー | リード付き LED | リード抵抗 (150Ω) | リード抵抗 (1KΩ) | リード抵抗 (10KΩ) | タクトスイッチ | Nch MOSFET | ちびギアモータ | SHT30 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ![](imgs/pinbit.jpg) | ![](imgs/breadboardImg.jpg) | ![](imgs/parts/MtoM.png) | ![](imgs/parts/LED.png) | ![](imgs/parts/150Ohm.png) | ![](imgs/parts/1kOhm.png) | ![](imgs/parts/10kOhm.png) | ![](imgs/parts/switch.png) | ![](imgs/parts/MOSFET.png) | ![](imgs/parts/chibigear.png) | ![](imgs/parts/ADT7410.png) |
-->

<!--
| ![CHIRIMEN with micro:bit 基本セット](imgs/baseSet.jpg) [<img src="https://res.cloudinary.com/chirimen/image/fetch/c_limit,f_auto,q_auto,w_400/https://tutorial.chirimen.org/raspi/imgs/section0/raspi3.jpg" alt="基本セットの画像">](imgs/section0/raspi3.jpg) | ![フィジカルコンピューティングセット](imgs/pcSet.jpg) [<img src="https://res.cloudinary.com/chirimen/image/fetch/c_limit,f_auto,q_auto,w_400/https://tutorial.chirimen.org/raspi/imgs/section0/l.jpg" alt="L チカセット">](imgs/section0/l.jpg) |
-->

- CHIRIMEN for Raspi 基本セット(内蔵センサーだけ試せます)<br/>
準備編ではこの基本セットだけを使います。
  - 以下の条件を備えたパーソナルコンピュータ
    - Bluetoothインターフェース搭載
      - USB Bluetoothドングルでも動作します(例: [ELECOM LBT-UAN05C2](https://www.elecom.co.jp/products/LBT-UAN05C2.html))
    - Windows10 もしくは MacOS
      - linux PCでも動作する可能性はありますがディストリビューションが多岐にわたるので自己責任で試してください
    - 対応ブラウザ: [Google Chrome](https://www.google.com/chrome/) もしくは [Microfott Edge](https://www.microsoft.com/edge)
    - インターネット接続環境
  - [micro:bit](https://www.sengoku.co.jp/mod/sgk_cart/detail.php?code=EEHD-55WL)
  - microUSB ケーブル
  - [micro:bit用電池ボックス](https://www.switch-science.com/catalog/5277/)(及び電池)

- フィジカルコンピューティングセット (スターターキット)<br/>
本編では部品が揃っていることだけを確認しましょう。
  - micro:bit用ブレークアウトボード
    - このチュートリアルでは[pimoroni pin:bit](https://www.sengoku.co.jp/mod/sgk_cart/detail.php?code=EEHD-5AWW)を使用しています
    - 他に[SparkFun micro:bit Breakout (with Headers)](https://www.sengoku.co.jp/mod/sgk_cart/detail.php?code=EEHD-56JS)、[ジェネリック品](https://ja.aliexpress.com/item/4001118934669.html) の [m:bit](https://ja.aliexpress.com/item/4000143210124.html) などが使用できますが、ピン配列の差異に注意して配線してください。
  - ブレッドボード (通常サイズまたはミニサイズ) × 1
  - リード付き LED × 1
  - タクトスイッチ × 1
  - ジャンパーワイヤー (オス-オス) x 4
  - [Nch MOSFET (2SK4017)](http://akizukidenshi.com/catalog/g/gI-07597/) x 1
  - リード抵抗 (150Ω) x 1 (茶・緑・茶・金)
  - リード抵抗 (1KΩ) x 1 (茶・黒・赤・金)
  - リード抵抗 (10KΩ) x 1 (茶・黒・橙・金)
  - [ちびギアモータ(ピンヘッダ付き)](https://tiisaishop.dip.jp/product/sgm/)
  - I2Cセンサーモジュール(以下のいずれか)
    - [ADT7410 温度センサーモジュール](http://akizukidenshi.com/catalog/g/gM-06675/) (ピンヘッダ半田付け済み)
    - [SHT30 温度・湿度センサーモジュール](https://www.amazon.co.jp/dp/B07HBSLLSY/) (ピンヘッダ半田付け済み)



-----
# 1. CHIRIMEN with micro:bitをセットアップしよう

## micro:bit に CHIRIMEN サポートプログラムを書き込む
- PC の Bluetooth を有効にする
- USB ケーブルを使って micro:bit と PC を繋ぐ
  ![USBでmicro:bitをPCに接続する](imgs/pc_mbit_usb_con.jpg)
-　micro:bitにCHIRIMEN サポートプログラム (CHIRIMEN BLE brigde) を書き込む
  - Chrome or 最新のEdgeブラウザで <a href="https://r.chirimen.org/makecode-chirimen" target="_blank">MakeCode ページ</a> にアクセス
- 以下の手順でプログラムを書き込む

| 1 このボタンを押す | 2 このボタンを押す | 3 このボタンを押す |
  | -- | -- | -- |
  | ![makecode遷移ボタン](imgs/ssInst1.jpg) | ![ダウンロード設定](imgs/ssInst2.jpg) | ![USB接続設定](imgs/ssInst3.jpg) |

  | 4 ピンクの部分を選んだ後、赤のボタンを押す | 5 このボタンを押す | 6 ハートマークが表示されれば完了 |
  | -- | -- | -- |
  | ![USB接続ダイアログ](imgs/ssInst4.jpg) | ![ダウンロードボタン](imgs/ssInst5.jpg) | ![](imgs/mbitInst.jpg) |

- CHIRIMEN with micro:bit を使った IoT プロトタイピングでは、PC のブラウザで動くウェブアプリの開発だけを行います。**micro:bit へのサポートプログラムの書き込みは初回に一度行えば以降必要ありません**
  - 通常の micro:bit を使ったプログラミング (MakeCode で開発するもの) を行うときは単に上書きしてください。その後、CHIRIMEN with micro:bit を使った IoT プロトタイピングに戻るときには再度この手順で CHIRIMEN サポートプログラム を micro:bit に書き込んでください (基本的に同時併用は出来ません)。
  - [CHIRIMEN with micro:bitのシステム構成はこちら](https://chirimen.org/chirimen-micro-bit/guidebooks/systemConfiguration.html)

-----

# 2. micro:bitの内蔵デバイスを使ってみよう

## micro:bitをバッテリーで駆動する
- PCとmicro:bitの間のUSB接続を切り離します
- micro:bitの電源端子に電池ボックスを繋ぎます
![裏面の様子](imgs/mbitBatt_1.jpg)
- ハートマークが表示されているのを確認
![バッテリー駆動](imgs/mbitBatt_2.jpg)

## codesandboxを使って、micro:bitを操作するウェブアプリを動かす
- [このページ](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/Embed?module=main.js)にアクセスする
  - [codesandbox](https://codesandbox.io/)(web上でプログラミングができるサービス)で CHIRIMEN with micro:bit のサンプルを読み込みます。
  - 画面上でソースコードを改変することもできます。File-Save`(CTRL+S)`で変更を反映(変更したコードにはランダムな文字列のURLが振られるので、それをどこかに控えておきます)
- 矢印で示したボタンを押し、新しいタブでウェブアプリを動かす **(注： 新しいタブで開かないと動作しません。Web Bluetooth 通信は CodeSandbox の iframe 内では使えないためです)**
![codesandbox初期画面](imgs/csb0.jpg)
- 新しいタブでサンプルのウェブアプリが開いたら、その `CONNECT` ボタンを押す。
![example独立ウィンド起動](imgs/csb1.jpg)
- Bluetooth 接続ダイアログが出るので、接続先の micro:bit を選択し(ピンクの〇)、ペア設定ボタン(赤い〇)を押す
![exampleBluetooth接続](imgs/csb2.jpg)
  - これでウェブアプリがBluetoothを使ってmicro:bitに接続しました。*（参考：micro:bitに◇マークが一瞬表示されます）*
  - *接続に失敗した場合は、micro:bit背面リセットボタンを押しハートマークが表示されてから、ウェブアプリのタブをリロードして再度CONNECTを押してみます*
  - 複数の micro:bit に同時に電源が入っていると接続先 micro:bit デバイスが複数表示されます。自分の micro:bit の ID に繋ぐよう注意してください。
- ウェブアプリの UI を操作すると、micro:bit をコントロールできます
![example動作の様子](imgs/csb3.jpg)

# 3. 動作確認完了

お疲れ様でした！　CHIRIMEN with micro:bitによるIoTプロトタイピング環境の準備ができました。

## 次はフィジカルコンピューティングセットを使った、[デバイス操作～基礎編](./GPIO_starter.md) に進みましょう


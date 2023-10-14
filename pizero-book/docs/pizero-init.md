# CHIRIMEN Raspberry Pi Zero版 の準備

## ステップ０ (物品準備、PCをWiFiに接続)

### 必要な物品リスト

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

### PCをWiFiに接続
* 会場(もしくは開発場所)で提供されているWiFiアクセスポイントにまずはPCを接続してください。

## ステップ１（ターミナル接続）

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

### Note:

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

## ステップ２ (WiFi設定)

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

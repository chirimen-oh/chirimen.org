# 2.1 ステップ０ (物品準備、PCをWiFiに接続)
## 必要な物品リスト

以下を用意します

![Parts Images](imgs/PartsList2.svg)

* **Raspberry Pi Zero W** ( Pi Zero **2** W も使用できます(2022/10/12 update) )
  * Pi Zero: [ケイエスワイ](https://raspberry-pi.ksyic.com/main/index/pdp.id/406/pdp.open/406), [秋月電子](https://akizukidenshi.com/catalog/g/gM-12961/), [スイッチサイエンス](https://www.switch-science.com/catalog/3646/), [マルツ](https://www.marutsu.co.jp/pc/i/1320453/)
  * Pi Zero **2** W: [ケイエスワイ](https://raspberry-pi.ksyic.com/main/index/pdp.id/851/pdp.open/851)
* **microSDカード**
  * [CHIRIMEN Lite 最新リリース版](https://github.com/chirimen-oh/chirimen-lite/releases)を書き込みます
  * 自分でイメージを書き込む場合は、[こちら](https://tutorial.chirimen.org/raspi/sdcard2)や[こちら](https://tutorial.chirimen.org/raspi/sdcard)の手順を参考にしてください
* **USBケーブル (USB A - MicroB)**
* **Lチカ用パーツ**(以下のパーツ一式を用意します)
  * ブレッドボード
  * LED
  * 1KΩ抵抗
  * ジャンパーワイヤ オス-メス 2本
* **GPIO入力実験用追加パーツ**(以下のパーツを用意します)
  * タクトスイッチ
* **モーター制御用追加パーツ**(以下のパーツ一式を用意します)
  * 10KΩ抵抗
  * MOSFET
  * ギヤードモーター（ミニモーター）
* **温度センシング実験用追加パーツ**（温湿度センサーはいずれかを用意します）
  * [**ADT7410モジュール**](https://akizukidenshi.com/catalog/g/gM-06675/)　もしくは [**SHT30モジュール**](https://www.amazon.co.jp/dp/B083NHJSL9/)
  * ジャンパーワイヤ オス-メス 4本（追加 2本）
* **ブラウザの載ったパソコン**（いずれもUSBとWiFiが使える必要があります）
  * Windows 10 PC
    * ブラウザは標準の Edge もしくは Chrome を使います。
  * Macintosh
    * ブラウザは Chrome が必要です。
  * Chrome OS / Chromebook
    * 確認済みハード：Lenovo Chromebook S330
  * *Note: Linux PC の Chrome では次の設定で利用可能になるとの報告をいただいています*
    * Ubuntu Studio: ```sudo chmod a+rw /dev/ttyACM0```
    * Ubuntu Desktop 20.04 LTS: ```sudo gpasswd -a "$(whoami)" dialout```

※ PiZero自体はディスプレイやキーボードを接続する必要はありません。

## 開発用 PC をネットワークに接続
* 会場(もしくは開発場所)で提供されているネットワークにまずはPCを接続してください。
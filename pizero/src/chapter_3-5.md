# 3.5 Raspberry Pi Zeroのピン配列
GPIO, 電源, GND, I2C信号線などのピン配列を記載します。</br>
詳細は次の章の「[4.1 GIPOを理解する](./chapter_4-1.md)」で解説します。

* 白い文字で書かれたピンだけが使えます
* GND、3.3V、5Vはそれぞれ電源とグランドです
* 数字 + PD||PUと書かれているピンはGPIO端子(詳細は次章)
  * PD:プルダウン, PU:プルアップ
* SCL, SDAはI2Cインターフェースのピンです(詳細は [I2Cデバイスを試す](./chapter_5.md)にて)


![Raspberry Pi Pinout](https://chirimen.org/PiZeroWebSerialConsole/wallpaperS.png)
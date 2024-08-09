# 5. I2Cデバイスを試す
* I2C（アイ・ツー・シー／アイ・スクエアド・シー）センサの使い方を学びます。
* I2Cセンサを利用するにあたり、以下のポイントが重要になります。

## ポイント

I2C の概要として下記を押さえておきましょう。

- I2C バスを介して複数のデバイスが繋がる
- I2C デバイスにはマスターとスレーブがある
- I2C ではマスターからスレーブに対して通信要求が行われる
- I2C スレーブは SlaveAddress を持つ
- 同じ I2C バスに同じ SlaveAddress のデバイスは繋げない

### Raspberry Pi の I2C端子
下図のSCL, SDAがI2C端子です（黄色の端子）
![Raspi PIN配置図](https://chirimen.org/PiZeroWebSerialConsole/wallpaperS.png)
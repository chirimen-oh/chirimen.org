# GPIOスイッチ (GPIO INPUT)

## 配線図

GPIO PORT5に繋ぎます

![配線図](./PiZero_gpio1.png "schematic")


# GPIOタッチセンター
プログラムコードは通常のスイッチと同じです。
## 配線図

GPIO PORT5に繋ぎます。3.3V電源を用います。指でのタッチだけでなく金属の近接(1~2mmに接近すると検知)も感知。接近させる金属がセンサーのピンに接触してショートしないようテープで金属を被覆し絶縁しておくと安全です。

![配線図](./PiZero_gpio_TTP223.png "schematic TP223")

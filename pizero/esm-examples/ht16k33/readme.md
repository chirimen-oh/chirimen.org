# HT16K33 LEDマトリクスドライバ、8x8LEDマトリクスモジュール一体型にも対応

## 配線図

Note: 3.3V電源でも、あまり明るくはなりませんが動作するようです。

![配線図](./schematic.png "schematic")

## 参照情報

いずれでも動作(ピン配置は異なる)
* Adafruit Mini 8x8 LED Matrix w/I2C Backpack
  * https://www.switch-science.com/products/1493
  * https://www.adafruit.com/product/870

* keyestudio Ks0064 I2C 8x8 LED Matrix HT16K33
  * https://ja.aliexpress.com/item/32886174149.html

7セグメントLEDを用いたものでも動作すると思います。（ただし専用関数はないのでset_ledを使用)

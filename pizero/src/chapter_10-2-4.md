# 10.2.4 MOSFETによる大電力制御
## GPIO の制約事項

Raspberry Pi の GPIO ポートは、全体で流せる電流の上限が決められています。

- [合計 50mA](https://elinux.org/RPi_Low-level_peripherals#Power_pins)
- 3.3 V

小さな LED 数個の場合はこの条件内で使えますが、モーターやソレノイド、パワー LED など電流を多く消費するデバイスは直接接続して使うことができません。

## MOSFET とは

[MOSFET](https://ja.wikipedia.org/wiki/MOSFET) とは[電界効果トランジスタ (FET)](https://ja.wikipedia.org/wiki/%E9%9B%BB%E7%95%8C%E5%8A%B9%E6%9E%9C%E3%83%88%E3%83%A9%E3%83%B3%E3%82%B8%E3%82%B9%E3%82%BF) の一種で、主にスイッチング素子として利用される (小さな電圧の変更で大きな電流・電圧のオンオフを切り替える) 部品です。

今回は Nch MOSFET「[2SK4017](http://akizukidenshi.com/catalog/g/gI-07597/)」を利用します。

![MOSFET](../imgs/mosfet.png)

プルダウンの GPIO ポートを使った典型的な回路は以下のようになります。

![NCh MOSFET schematic](../imgs/DC3motor-schematic.svg)

## 電源

図の GND 端子は Raspberry Pi と DC 負荷用電源のものと共通ですが、VCC 端子は、基本的には Raspberry Pi の 3.3V や 5V 端子とは異なります。
DC 負荷用に Raspberry Pi とは別に電源を用意するのが望ましいです。

[ミニモータを使った作例](./chapter_4-2.md)では、その消費電力が十分小さいので、例外的に Raspberry Pi の 5V 端子か電力を供給しています。
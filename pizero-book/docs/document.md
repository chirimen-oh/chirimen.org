# 予備知識・資料集

CHIRIMEN を利用するに際して、知っておくと良い予備知識やツールの使い方が学べるドキュメントをまとめています。

## JavaScript 初学者向け資料集
- [JavaScript 1 Day 講習資料、JavaScript 本格入門書、チートシートなどはこちら](https://tutorial.chirimen.org/js/)
- [JavaScript Primer - 迷わないための入門書](https://jsprimer.net/)

## GitHub と開発環境

- [GitHub ハンズオン](https://github.com/webiotmakers/github-handson)
  - GitHub の基本的な使い方の分かるハンズオン資料です。
- [CodeSandbox ガイド](https://csb-jp.github.io/)
  - ブラウザ上で開発する CodeSandbox の使い方を確認しましょう。

## 電子工作

- LED
  - [LED 基本ガイド (marutsu)](https://www.marutsu.co.jp/pc/static/large_order/led)
- 抵抗
  - [抵抗のカラーコードの読み方(JARL)](https://www.jarl.org/Japanese/7_Technical/lib1/teikou.htm)
  - [テスターで抵抗値を確認する(始める電子回路)](http://startelc.com/elcLink/tester/elc_nArtcTester2.html#chapter-2)
- ブレッドボード
  - [ブレッドボードの使い方 (サンハヤト)](https://www.sunhayato.co.jp/problem-solving/howto_SAD-101.html)
  - [小さいブレッドボード (Switch Science)](https://www.sunhayato.co.jp/material2/ett03/item_787)
  - [ミニブレッドボード (秋月電子)](https://akizukidenshi.com/catalog/g/gP-05155/)
- タクトスイッチ
  - [タクトスイッチとは (準備中)](https://tutorial.chirimen.org/raspi/section1#section-4)
  - [タクトスイッチ製品例 (アルプスアルパイン)](https://tech.alpsalpine.com/prod/j/html/tact/snapin/skhw/skhwala010.html)
- GPIO
  - [Raspberry Pi の GPIO 概要 (ツールラボ)](https://tool-lab.com/raspberrypi-startup-22/)
  - [プルアップとプルダウン(VOLTECHNO)](https://voltechno.com/blog/pullup-pulldown/)
- I2C
  - [I2C](https://ja.wikipedia.org/wiki/I2C) - Wikipedia
  - I2C バス仕様書 最新版（[日本語](https://www.nxp.com/docs/ja/user-guide/UM10204.pdf)、[English](http://www.nxp.com/documents/user_manual/UM10204.pdf)）
  - [I2C の使い方](http://www.picfun.com/i2cframe.html)（後閑哲也氏サイト）

- 電源・電力
  - デバイス駆動に必要な電源 (準備中)

<hr class="page-wrap" />

## ハードウェア・デバイス

- [予備知識・資料集～電子工作について](../reference#section-1)


## そもそも「L チカ」って何？

「L チカ」とは、LED（発光ダイオード）<span class="footnote">https://ja.wikipedia.org/wiki/発光ダイオード</span>を点けたり消したりチカチカ点滅させることです。今回は「LED を点ける」「LED を消す」をプログラムで繰り返し実行することで実現します。

## LED
- [LED の使い方](https://www.marutsu.co.jp/pc/static/large_order/led)

### ヒント: LED の電圧

LED の順方向電圧は色により異なっており、赤色 LED は 1.8V 程度、青色 LED は 3.1V 程度とされています。

## ブレッドボード

- [ブレッドボードの使い方](https://shop.sunhayato.co.jp/blogs/problem-solving/breadboard) (サンハヤト社)

| 外観                            | 内部の接続状態                            |
| ------------------------------- | ----------------------------------------- |
| ![外観](../../microbit/imgs/breadboardImg.jpg){width=150} | ![内部の接続状態](../../microbit/imgs/breadboardSch.png){width=130} |

* +と-のライン(上下の横のピン列)が無いブレッドボードもあります（CHIRIMEN Starter Kitのブレッドボードにはありません）

* 配線に使うケーブルの色に厳密な決まりはありませんが、一般的にGNDは黒(や黒っぽい色)、電源(VCC, +3.3V, +5V)には赤(や赤っぽい色)が用いられます。配線間違いを防ぐためにもなるべく合わせましょう。
* 抵抗やLEDの足(リード線)は手で簡単に曲げられます。ブレッドボードに差し込めるように適当に成型してください。

## 抵抗値の読み方
- [抵抗値の読み方](http://www.jarl.org/Japanese/7_Technical/lib1/teikou.htm)
- [テスターを使って抵抗値を確かめる](http://startelc.com/elcLink/tester/elc_nArtcTester2.html#chapter-2)

<hr class="page-wrap" />

## MOSFETによる大電力制御
### GPIO の制約事項

Raspberry Pi の GPIO ポートは、全体で流せる電流の上限が決められています。

- [合計 50mA](https://elinux.org/RPi_Low-level_peripherals#Power_pins)
- 3.3 V

小さな LED 数個の場合はこの条件内で使えますが、モーターやソレノイド、パワー LED など電流を多く消費するデバイスは直接接続して使うことができません。

## MOSFET とは

[MOSFET](https://ja.wikipedia.org/wiki/MOSFET) とは[電界効果トランジスタ (FET)](https://ja.wikipedia.org/wiki/%E9%9B%BB%E7%95%8C%E5%8A%B9%E6%9E%9C%E3%83%88%E3%83%A9%E3%83%B3%E3%82%B8%E3%82%B9%E3%82%BF) の一種で、主にスイッチング素子として利用される (小さな電圧の変更で大きな電流・電圧のオンオフを切り替える) 部品です。

今回は Nch MOSFET「[2SK4017](http://akizukidenshi.com/catalog/g/gI-07597/)」を利用します。

![MOSFET](../../raspi/imgs/section1/mosfet.png){height=300}

<hr class="page-wrap" />

プルダウンの GPIO ポートを使った典型的な回路は以下のようになります。

![NCh MOSFET schematic](../../raspi/imgs/section1/DC3motor-schematic.svg){height=300}

### 電源

図の GND 端子は Raspberry Pi と DC 負荷用電源のものと共通ですが、VCC 端子は、基本的には Raspberry Pi の 3.3V や 5V 端子とは異なります。
DC 負荷用に Raspberry Pi とは別に電源を用意するのが望ましいです。

ちびギアモータを使った作例では、その消費電力が十分小さいので、例外的に Raspberry Pi の 5V 端子か電力を供給しています。

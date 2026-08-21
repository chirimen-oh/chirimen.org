# 11.5.2 I2C の詳細情報とポイント

## I2C に関する参考資料

I2C の詳細は、次の資料を参照してください。

- [I2C](https://ja.wikipedia.org/wiki/I2C) - Wikipedia
- I2C バス仕様書 最新版（[日本語](https://www.nxp.com/docs/ja/user-guide/UM10204.pdf)、[English](http://www.nxp.com/documents/user_manual/UM10204.pdf)）
- [I2C の使い方](http://www.picfun.com/i2cframe.html)（後閑哲也氏サイト）

## I2C の要点

I2C の概要として、次の点を押さえておきましょう。

- I2C バスには複数のデバイスが接続される
- I2C デバイスには**マスター**と**スレーブ**がある
- I2C では、マスターからスレーブへ通信要求が行われる
- I2C スレーブは SlaveAddress（スレーブアドレス）を持つ
- 同じ I2C バスに、同じ SlaveAddress のデバイスは接続できない

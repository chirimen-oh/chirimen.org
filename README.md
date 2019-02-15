## [Tutorials for CHIRIMEN / CHIRIMEN チュートリアル](https://tutorial.chirimen.org/)
This site contains tutorials for "CHIRIMEN for Raspberry Pi 3.

このサイトは "CHIRIMEN for Raspberry Pi 3" (以下 CHIRIMEN Raspi3) のチュートリアルサイトです。

CHIRIMEN コミュニティと W3C の Browsers and Robotics コミュニティグループでは、JavaScript で Web アプリから電子パーツを直接制御できる低レベルハードウェア制御 API (WebGPIO API や WebI2C API など) の標準化に向けての検討や、それらの API を実際の開発ボード上で試せるようにするプロトタイプ環境の開発を行っています。Web ページ中の JavaScript で直接ハードを制御できる環境を実現することで、既存の Web 関連の知識・環境・サービスをすべて活かしたまま、同じプログラムの中で簡単に画面やサービスと電子パーツを制御可能になります。電子パーツの制御だけのために専用のツールや開発環境を用意したり、複数の言語やプログラムを連携した複雑な仕組みを理解して作る必要がないため、素早くプロトタイピングを行ったり、プログラミング初学者が IoT の基礎を学ぶ上で最適な環境です。

現在、CHIRIMEN コミュニティでは最新の CHIRIMEN 環境を Raspberry Pi 3 向けにメンテナンスしており、このサイトではその使い方を学ぶためのチュートリアルを掲載しています。

CHIRIMEN Raspi3 を試すには、[ビルドイメージ](https://r.chirimen.org/download) をダウンロードして [Etcher](https://etcher.io/) などを使って microSD カードに焼き込み、Raspberry Pi 3 もしくは Raspberry Pi 3B+ を起動してください。CHIRIMEN Raspi3 を使ったプロトタイピングに必要な環境とサンプルコードが全てセットアップされた状態のイメージとなっており、このサイトのチュートリアルをすぐにお試し頂けます。

## CHIRIMEN for Raspberry Pi 3 チュートリアル

[CHIRIMEN Raspi3 チュートリアルの各ページはこちらでご覧頂けます](/raspi3/ja/readme.md)

```javascript
window.onload = function mainFunction() {
  var gpioAccess = await navigator.requestGPIOAccess();
  var port = gpioAccess.ports.get(26);
  var v = 0;

  await port.export("out");
  for (;;) {
    await sleep(1000); // 繰り返し毎に 1000ms 待機
    v = v === 0 ? 1 : 0; // LEDをON/OFFする
    port.write(v);
  }
};
```

## Online Version / オンライン版
Latest version of this site is hosted on https://tutorial.chirimen.org/

このサイトのオンライン版は https://tutorial.chirimen.org/ でご覧頂けます

## Feedback / フィードバック
If you have any feedback to this tutorials, see [Feedback Page](feedback.md)

本チュートリアルにご指摘やご提案のある方、編集に協力頂ける方は [フィードバックページ](feedback.md) をご覧ください。

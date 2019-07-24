<p align="right">Language: <a href="https://tutorial.chirimen.org">Japanese</a>, <a href="https://translate.google.com/translate?sl=ja&tl=en&u=https%3A%2F%2Ftutorial.chirimen.org">English (Google Translation)</a></p>

## CHIRIMEN とは

CHIRIMEN とは、Web ブラウザからハードウェアを制御するプロトタイピング環境です。CHIRIMEN ではブラウザの JavaScript からハードを制御できるため、画面表示も電子パーツの操作もサーバとの通信も単一のプログラムで扱えます。Web 開発者向けの開発環境、ツール、ドキュメント、サービスすべてそのまま使えるため、素早くプロトタイピングを行ったり、プログラミング初学者がプログラミングと IoT の基礎を学ぶのにも最適です。詳しくは [CHIRIMEN について](about.md) ページをご覧ください。

## Hello Real World

CHIRIMEN 環境では普通の Web 開発と同様にハードウェア制御が可能です。例えば L チカコードはこのように書けます:

```javascript
window.onload = async function() {
  var gpioAccess = await navigator.requestGPIOAccess(); // GPIO を操作する
  var port = gpioAccess.ports.get(26); // 26 番ポートを操作する
  var v = 0;

  await port.export("out"); // ポートを出力モードに設定
  for (;;) {
    v = v === 0 ? 1 : 0; // ポートの出力値を 0/1 交互に変更
    port.write(v); // LED を ON/OFF する
    await sleep(1000); // 繰り返し毎に 1000ms 待機
  }
};
```

## チュートリアル
上記のように WebGPIO, WebI2C を使ったコードが書ける CHIRIMEN 環境は現在 Rasbpebbry Pi 3 や TY51822r3 向けに移植されています。お持ちのボードに合わせて各ボード向けのチュートリアルをご覧ください:

- [CHIRIMEN for Raspberry Pi 3 チュートリアル](/raspi3/)
- [CHIRIMEN for TY51822r3 チュートリアル](/ty51822r3/)
<!-- I2C 対応完了したらコメント外してリストに加える:
- CHIRIMEN for microbit チュートリアル](/microbit/ja/readme.md)
  -->

## Old Versions / 以前のチュートリアル
本チュートリアルでは使用機材や手順を変更することがあります。お手持ちの機材が古い場合や、以前学習したときのものを参照したい場合など、必要に応じて古いチュートリアルのアーカイブをご覧ください。

- [2018 年度に作成したスターターキット (DC Fan を含むもの) を利用するチュートリアル](https://webiot-2018--tutorial-chirimen-org.netlify.com/)
  - DC Fan を含む、初期のスターターキットを使うチュートリアルです。[Web x IoT Makers Challenge 2018-19](https://webiotmakers.github.io/) でも採用されていたバージョンです。

<div class="hide-on-production">
  <!-- tutorial.chirimen.org では hide-on-production クラスの中は表示されない -->

  ## Latest Version / 最新版

  Latest version of this document is hosted on https://tutorial.chirimen.org/

  このサイトの最新オンライン版は https://tutorial.chirimen.org/ でご覧頂けます
</div>

<p align="right">Language: <a href="https://tutorial.chirimen.org">Japanese</a>, <a href="https://translate.google.com/translate?sl=ja&tl=en&u=https%3A%2F%2Ftutorial.chirimen.org">English (Google Translation)</a></p>

## CHIRIMEN とは

CHIRIMEN とは、Web ブラウザからハードウェア制御も可能にしたプロトタイピング環境です。ブラウザの JavaScript からセンサーや電子パーツを制御できるため、デジタルのソフトとフィジカルなハードを同じプログラムで容易に連携できます。例えば L チカコードはこの通りです:

```javascript
window.onload = async function() {
  var gpioAccess = await navigator.requestGPIOAccess(); // GPIO を操作する
  var port = gpioAccess.ports.get(26); // 26 番ポートを操作する
  var v = 0;

  await port.export("out"); // ポートを出力モードに設定
  for (;;) {
    // 無限に繰り返す
    v = v === 0 ? 1 : 0; // ポートの出力値を 0/1 交互に変更
    port.write(v); // LED を ON/OFF する
    await sleep(1000); // 繰り返し毎に 1000ms 待機
  }
};
```

ブラウザだけで簡単に[サンプルコードの確認・編集](https://r.chirimen.org/csb-gpio-blink)から公開までできます。Web 開発の知識と環境が全てそのまま活かせる CHIRIMEN は、素早くハードとソフトを融合させたプロトタイピングを行ったり、[最も人気で実践的なプログラミング言語](https://octoverse.github.com/projects#languages) JavaScript と IoT をプログラミング初心者でも楽しく簡単に学ぶのに最適な環境です。詳しくは [CHIRIMEN について](about.md) ページをご覧ください。

## チュートリアル

上記のように WebGPIO, WebI2C が使える CHIRIMEN 環境は現在 [Rasbpebbry Pi](https://www.raspberrypi.org/), [TY51822r3](https://www.switch-science.com/catalog/2574/), [micro:bit](https://microbit.org/ja/) 向けに実装されています。お持ちのボードに合わせたものをご覧ください:

- [CHIRIMEN for Raspberry Pi 3](/raspi/)
- [CHIRIMEN with ty51822r3](/ty51822r3/)
- [CHIRIMEN with micro:bit](https://chirimen.org/chirimen-micro-bit/)

注: Raspberry Pi 3 ではボード上のブラウザからハードを制御しますが、TY51822r3 や micro:bit では PC やスマホなど他の端末のブラウザから Web Bluetooth を使いリモート制御します。

## Old Versions / 以前のチュートリアル

<!-- 2020 年になったら古いチュートリアルは /raspi/ からの案内のみとしてここから削除する -->

本チュートリアルでは使用機材や手順を変更することがあります。お手持ちの機材が古い場合や、以前学習したときのものを参照したい場合など、必要に応じて古いチュートリアルのアーカイブをご覧ください。

- [2018 年度に作成したスターターキット (DC Fan を含むもの) を利用するチュートリアル](https://webiot-2018--tutorial-chirimen-org.netlify.com/)
  - DC Fan を含む、初期のスターターキットを使うチュートリアルです。[Web x IoT Makers Challenge 2018-19](https://webiotmakers.github.io/) でも採用されていたバージョンです。

<div class="hide-on-production">
  <!-- tutorial.chirimen.org では hide-on-production クラスの中は表示されない -->

  ## Latest Version / 最新版

  Latest version of this document is hosted on https://tutorial.chirimen.org/

  このサイトの最新オンライン版は https://tutorial.chirimen.org/ でご覧頂けます
</div>

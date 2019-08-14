<p align="right">Language: <a href="https://tutorial.chirimen.org">Japanese</a>, <a href="https://translate.google.com/translate?sl=ja&tl=en&u=https%3A%2F%2Ftutorial.chirimen.org">English (Google Translation)</a></p>

## CHIRIMEN とは

CHIRIMEN とは、Web ブラウザからハードウェア制御も可能にしたプロトタイピング環境です。ブラウザの JavaScript からセンサーや電子パーツを制御できるため、デジタルのソフトとフィジカルなハードを同じプログラムで容易に連携できます。例えば L チカコードはこの通りです:

```javascript
window.onload = async function() {
  var gpioAccess = await navigator.requestGPIOAccess(); // GPIO を操作する
  var port = gpioAccess.ports.get(26); // 26 番ポートを操作する
  var v = 0;

  await port.export("out"); // ポートを出力モードに設定
  for (;;) { // 無限に繰り返す
    v = v === 0 ? 1 : 0; // ポートの出力値を 0/1 交互に変更
    port.write(v); // LED を ON/OFF する
    await sleep(1000); // 繰り返し毎に 1000ms 待機
  }
};
```

ブラウザだけで簡単に[サンプルコードの確認・編集](https://r.chirimen.org/csb-gpio-blink)から公開までできます。Web 開発の知識と環境が全てそのまま活かせる CHIRIMEN は、素早くハードとソフトを融合させたプロトタイピングを行ったり、[最も人気で実践的なプログラミング言語](https://octoverse.github.com/projects#languages) JavaScript と IoT をプログラミング初心者でも楽しく簡単に学ぶのに最適な環境です。詳しくは [CHIRIMEN について](about.md) ページをご覧ください。


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

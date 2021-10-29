<p align="right">Language: <a href="https://tutorial.chirimen.org">Japanese</a>, <a href="https://translate.google.com/translate?sl=ja&tl=en&u=https%3A%2F%2Ftutorial.chirimen.org">English (Google Translation)</a></p>

## CHIRIMEN とは

CHIRIMEN とは、Web ブラウザや Node.js の JavaScript からハードウェア制御が可能なプロトタイピング環境です。デジタルのソフトとフィジカルなハードを連携するデバイスを JavaScript だけで容易に実現できます。例えば L チカコードはこの通りです:

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

ブラウザだけで[サンプルコードの確認・編集・フォークして公開](https://r.chirimen.org/csb-gpio-blink)まで簡単にでき、Web 開発の知識と環境がそのまま活かせる CHIRIMEN は、ハードとソフトを融合させたプロトタイピングや、[最も人気で実践的なプログラミング言語](https://octoverse.github.com/#top-languages) JavaScript と IoT を初心者でも楽しく学ぶのに最適です。詳しくは [CHIRIMEN について](about.md) ページをご覧ください。

## CHIRIMEN チュートリアル

上記のように WebGPIO, WebI2C が使える CHIRIMEN 環境は現在 [Rasbpberry Pi (Model B, Zero)](https://www.raspberrypi.org/), [micro:bit](https://microbit.org/ja/), [TY51822r3](https://www.switch-science.com/catalog/2574/) 向けに実装されています。お持ちのボードに合わせたものをご覧ください:

- [Raspberry Pi (ModelB) 用チュートリアル](/raspi/)
- [Paspberry PiZero 用チュートリアル](/pizero/)
- [micro:bit 用チュートリアル](/microbit/)
- [ty51822r3 用チュートリアル](/ty51822r3/)

注: Raspberry Pi (ModelB)ではボード上のブラウザからハードを制御、TY51822r3 や micro:bit ではパソコンやスマホなどのブラウザから Bluetooth 経由でリモート制御、Paspberry PiZeroはNode.jsで制御しますが、いずれのボードコンピュータ用のコードもほぼ同じように書くことができます。

<div class="hide-on-production">
  <!-- tutorial.chirimen.org では hide-on-production クラスの中は表示されない -->

  ## Latest Version / 最新版

  Latest version of this document is hosted on https://tutorial.chirimen.org/

  このサイトの最新オンライン版は https://tutorial.chirimen.org/ でご覧頂けます
</div>

<a class="twitter-timeline" data-height="600" data-dnt="true" href="https://twitter.com/chirimen_oh?ref_src=twsrc%5Etfw">Tweets by chirimen_oh</a>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

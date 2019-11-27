---
layout: tutorial
---

# 5. WebBluetooth の使い方

# 注意: 執筆・更新中
**本チュートリアルではリンク先のサンプルコードがそのままでは動作せず、修正が必要なことがあるページがあることが判明しています。
修正なく試していけるようにチュートリアルを更新予定ですが、ひとまず今はご自身で対応可能な人がお試しください。**

**Note: これらのAPIは Feature Policy の制限（iframe 内からは埋め込み側で明示許可されていない API は利用不可）により、jsbin では動作しません。ローカルで実行してください。**
> ※ブラウザ上でプログラムが書ける [jsfiddle](https://jsfiddle.net/) では各種 API が利用可能となっていますが、まだ動作確認ができていません。

# 概要
これは Raspberry Pi 上で動作する IoT プラットフォーム「CHIRIMEN for Raspberry Pi」で [Web Bluetooth](https://www.mitsue.co.jp/knowledge/blog/frontend/201705/15_1702.html) を使用してライトを制御するサンプルです。USBマイクから音が入るとライトが点灯する、または測距センサで何かが近づいたらライトが点灯する、という動作をさせています。

# ソースコード

ソフトウェア本体は GitHub 上のリポジトリにあります。

https://github.com/g200kg/chirimen-webbluetooth

# ライブデモ

オンラインで実際に動作するサンプルは下のリンクで公開されています。CHIRIMEN for RasPi 上で全ての機能を動かすには下の部品を揃える必要がありますが、もし [PLAYBULB](https://www.mipow.co.jp/category_playbulb.html) ([sphere](https://www.croy.co.jp/mipow/btl301w.html) または [candle](https://www.croy.co.jp/mipow/btl300.html))をお持ちであれば(BLE対応の)ノートPCからでもマイク周りの動作を試す事ができます。

[ライブデモ](https://g200kg.github.io/chirimen-webbluetooth/)

# 必要なもの

- CHIRIMEN for Raspberry Pi が動作する Raspberry Pi
- BLE制御できる ライト、PLAYBULB [sphere](https://www.croy.co.jp/mipow/btl301w.html) (または PLAYBULB [candle](https://www.croy.co.jp/mipow/btl300.html))
- USB マイク
- 測距センサ ([GP2Y0E03](http://akizukidenshi.com/catalog/g/gI-07547/))

{% cloudinary imgs/section5/bledemo1.jpg alt="必要なもの" %}

# 準備

## 前提

- CHIRIMEN for Raspberry Pi の基本的な動かし方については、「[L チカしてみよう](section0.md)」の通りにできているものとします。
また、測距センサ(GP2Y0E03)は「[I2C の使い方](section3.md)」の通りに動作しているものとします。

## WebBluetoothの有効化

- 現在の所、Chromium のデフォルト状態では WebBluetooth は有効になっていないため、まず WebBluetoothを使えるようにブラウザの設定を変えます。
  - ブラウザで chrome://flags にアクセスして試験運用機能の画面を開きます
  - "`Experimental Web Platform features`" という項目を探し、 [`有効`] に切り替えてブラウザを再起動します ("Experimental" で始まる項目は複数あるので間違えない事)
  - WebBluetoothが使えるようになっているかの確認は、F12 キーでコンソールを出し、 "`> navigator.bluetooth`" と入力して "`▶ Bluetooth {}`" が返ってくればOKです。"`undefined`" になる場合は WebBluetooth が有効になっていません。

## マイクの設定

- `chrome://settings` にアクセスして Chromium の設定画面を開きます
- [`詳細設定`] - [`コンテンツの設定`] - [`マイク`]に進みます
- USBマイクを接続します
- 最初の項目(何も設定していなければ、[`既定`]になっています) で使用するマイクを選択します。この画面を出した状態でUSBマイクを接続した時に新たに現れる項目が対象のマイクです。名前は使用するマイクによって異なりますが、ここで使用している超小型マイクでは、[`USB PnP Sound Device, USB Audio-Default Audio Device`]となっています。

# サンプルプログラムの起動

実際に Web Bluetooth を使うサンプルプログラムは、https://www.g200kg.com/demo/chirimen/webbluetooth/ に置いてあります。ブラウザでアクセスすると次の画面になります。この時、マイクの使用許可のダイアログがでたら[`許可`]を選択してください。

**現在リンク先のサンプルプログラムが動かないケースがある事が判明しています。サンプルプログラムで定数 `bledevices` を定義していますが、デバイス名が `PLAYBULB candle` と小文字で定義しているが実際のデバイスは名が `PLAYBULB CANDLE` と大文字になっており不整合になっています。同様の問題が発生する場合は `bledevices` 定数の定義で CANDLE を大文字にしてください。**

{% cloudinary imgs/section5/bledemo2.png alt="サンプルプログラム起動の様子" %}

## Bluetooth ライトの基本的な制御

Bluetooth デモを起動して [`BLE Connect`]を押すと BLE デバイスを選択するダイアログが出てきます。ここで PLAYBULB (sphere または candle)を選択して [`ペア設定`] を押す事で BLE デバイスと接続されます。
接続ができた状態で [`Off`]、[`Red`]、[`Green`]、[`Blue`]、[`White`]の各ボタンを押すと PLAYBULB の色が指定の色に変わります。

{% cloudinary imgs/section5/bledemo3.png alt="Bluetoothライトの基本的な制御の様子" %}

## マイクからの制御

マイクのボタンを押して[`On`]状態にすると音に反応するようになります。音の周波数帯域を3つに分けてそれぞれ色の RGB に割り当てていますのでマイクで拾う音によって PLAYBULB の色が変わります。

{% cloudinary imgs/section5/bledemo4.png alt="マイクからの制御の様子" %}

実際の動作状況の動画がありますので見てみてください。

[{% cloudinary imgs/section5/blemov.png alt="実際の動作状況の動画" %}](imgs/section5/blemov.mp4)

## 測距センサからの制御

測距センサのボタンを[`On`]状態にすると、測距センサで検出した障害物までの距離によって PLAYBULB の色が変わります。この測距センサの検出範囲は4～50cm程度ですので、距離が近くなるにつれて色が青⇒緑⇒赤と変化するようになっています。

{% cloudinary imgs/section5/bledemo5.jpeg alt="測距センサからの制御の様子" %}

# コードの説明

## Web Bluetooth API

BLEデバイス、PLAYBULB を制御する部分は class `Playbulb` にまとめてあります。
ブラウザが WebBluetooth をサポートしていれば `navigator.bluetooth` が存在しますので、まず

```javascript
navigator.bluetooth.requestDevice(options)
```

で周囲のBLEデバイスのスキャンを行います。この時、`options` には使いたいサービスのIDを指定する事で、そのサービスを持っているデバイスだけがスキャンされます。この時点で Bluetooth のペア設定ダイアログが表示され、ユーザーがデバイスを選択する事で `requestDevice` の `promise` が解決され、BLE デバイスを指すオブジェクトが得られます。

次にBLEデバイスオブジェクトに対して

```javascript
device.gatt.connect()
```

を使用して、デバイスの機能との通信の枠組みである **GATT（Generic Attribute Profile）**サーバーに接続します。

GATTサーバーとの接続ができれば、実際に PLAYBULB の色を設定する部分は `setColor()` という関数内にあります。

```javascript
let data = new Uint8Array([0x00, r, g, b]);
return this.device.gatt.getPrimaryService(bledevices[this.device.name].serviceId)
  .then(service => service.getCharacteristic(COLOR_UUID))
  .then(characteristic => characteristic.writeValue(data))
  .then(() => [r,g,b]);
```

RGBの値(各0-255)を PLAYBULB に設定するには、`getPrimaryService(serviceId)` でサービスを取得し、`getCharacteristic(COLUR_UUID)` で個別の属性(色設定)を取得し、`characteristic.writeValue(data)` でそこに値を書き込む、という手順になります。

## getUserMedia / Web Audio API
PLAYBULB の色の基本的な設定ができるようになれば、後はマイクで拾う音で制御するなり、測距センサから制御するなり自由ですが、ここでは `getUserMedia` でマイクから拾った音を Web Audio API の `analyser` で周波数分割し、RGB値に変換しています。

ここで使用する Media Capture 関係の API や Web Audio API 等はブラウザの API としては新しいものですので、仕様の変更もまだ頻繁に行われています。内容が古くなって動作しないサンプルなども Web 上では散見されますので、最新の仕様は W3C のEditor's Draft で確認したい所です。

さて、まず class `Microphone` で `getUserMedia` と Web Audio API を使ってマイクからの音を
拾って周波数領域への変換を行います。
Web Audioノードの接続としては、

> **`MediaStreamSourceNode(getUserMedia) => AnalyserNode => GainNode => DestinationNode`**

となっています。

`GainNode` の gain が `0` ですので、結局、マイクで拾った音そのものは外に出さずにミュートしてしまっているのですが、Web Audio API の仕様上、最終的に `Destination` まで繋がっていないノードはノードそのものが動作を止めてしまうという事になっていますので、こういう形を取っています。もちろん gain を `0 `よりも大きい値にすれば、拾った音をスピーカーから出してモニターするようにする事もできますが、ハウリングを起こしやすいのでご注意ください。

`new AnalyserNode(this.audioctx,{smoothingTimeConstant:0.5})` や `new GainNode(this.audioctx,{gain:0})` という書き方は Web Audio API の `audioctx.createXXX()` に代わる新しい書き方になりますが、ノードの生成と同時にプロパティの初期値を指定できるというメリットがあります。

また、`getUserMedia()` が `mediaDevices.getUserMedia()` になっているのも割合新しい書き方ですね。以前は `navigator.getUserMedia()` だったのですが、このあたりの最新仕様も詳細は W3C の Editor's Draft で確認してください。

さて、マイクの音を実際に周波数帯域に分割する動作をしているのは `AnalyserNode` です。`AnalyserNode` はパラメータが多いのですが、最初からいわゆるスペクトラムアナライザー(スペアナ)的な表示に使えるようにデフォルト値がほぼチューニングされた状態になっています。ここではノードの生成時に `smoothingTimeConstant` だけ少しいじっていますが、これは(スペアナの)メーターの戻りのスピードを調整するものです。今回は BLE 経由のライトを光らせますのでやや遅めの設定になっています。

`AnalyserNode` からは `getByteFrequencyData(array)` で現時点の周波数帯域ごとの強度(マグニチュード)のデータが取れます(`getLevel()`関数内)。結果は引数の `array` に格納されますが、`array` のサイズが小さい場合は周波数が低い方から`array` のサイズ分だけを取得する事になります。

```javascript
class Microphone {
  constructor(){
    this.audioctx=null;
    this.audioctx=new AudioContext();
    this.analyser=new AnalyserNode(this.audioctx,{smoothingTimeConstant:0.5});
    this.gain=new GainNode(this.audioctx,{gain:0});
    navigator.mediaDevices.getUserMedia({audio:true,video:false})
    .then(
      (strm)=>{
        let audio = this.audioctx.createMediaStreamSource(strm);
        audio.connect(this.analyser).connect(this.gain).connect(this.audioctx.destination);
      },
      (err)=>{
        console.log(err);
      }
    );
    this.run=-1;
  }
  toggle(){
    if(this.run<0){
      document.getElementById("micbtn").innerHTML="On";
      this.run=1;
    }
    else {
      this.run^=1;
      let btn=document.getElementById("micbtn");
      btn.innerHTML=this.run?"On":"Off";
    }
  }
  getLevel(array){
    if(this.analyser)
      this.analyser.getByteFrequencyData(array);
  }
}
```

`AnalyserNode` から取った周波数データは FFT のポイント数がデフォルトで `2048` ですので、`44.1kHz` の音声信号に対して

> **44.1kHz / 2048 ≒ 21.5Hz**

毎の強度データになります。単位は`dB(デシベル)`ですが通常の音声データに対して `Uint8Array` で各点 `0-255` の範囲に程よく収まるようにデフォルトのパラメータで調整されています。今回のサンプルではこれを33点毎にまとめて平均したものを3組作っています。

```javascript
if(mic.run>0){
  mic.getLevel(arr);
  let lev=[0,0,0];
  for(let i=0;i<33;++i){
    lev[0]+=arr[1+i]/33;
    lev[1]+=arr[34+i]/33;
    lev[2]+=arr[67+i]/33;
  }
  for(let i=0;i<3;++i)
    meter[i].value=lev[i]/256;
  playbulb.setColor(lev[0],lev[1],lev[2]);
}
```

つまり

| 帯域   | FFTポイント | 周波数帯域         | ライト色 |
| ------ | ----------- | ------------------ | -------- |
| Bass   | 1-33        | 21.5 - 709.5 Hz    | 赤       |
| Middle | 34-66       | 731 - 1419 Hz      | 緑       |
| Treble | 67-99       | 1440.5 - 2128.5 Hz | 青       |

という対応になります。この辺の取り決めは適当に決めたものではありますが、大体人間の声の母音が含む倍音のあたりに相当しますので「あ」「い」「う」「え」「お」の各母音の違いに割合良く反応するようになっています。

## 測距センサ

同様に測距センサの検出値から色を制御する部分は次の通りです。距離 `dist` は cm 単位で 50-4 程度ですので、それを三分割して、B => G => R の順にピークが来るように変換しています。

```javascript
let dist=distance.get();
let light=((dist==null)?0:Math.max(0,60-dist))/60;
if(dist==null)
  document.getElementById("distancedisplay").innerHTML="Out of Range";
else
  document.getElementById("distancedisplay").innerHTML=dist+" cm";
meter[3].value=light;
let r=(light>2/3)?(light-2/3)*3:0;
let g=(light>2/3)?(1-(light-2/3)*3):(light>1/3)?(light-1/3)*3:0;
let b=(light>2/3)?0:(light>1/3)?(1-(light-1/3)*3):light*3;
playbulb.setColor(r*255,g*255,b*255);
```

## UUID について
PLAYBULB を WebBluetooth で制御するサンプルの元ネタは google codelabs の次の記事にあります。

https://codelabs.developers.google.com/codelabs/candle-bluetooth/#0

ただしこの記事で扱っているのは PLAYBULB candle というモデルになりますが、PLAYBULB には幾つかの種類があってそれぞれサービスIDが異なるようです。ネット上を探すと各モデルのサービスIDらしきものが提示されていたりするのですが、どれも公式の仕様ではなくユーザーが解析した結果のようです。今の所以下の定義通りの各デバイスのサービスIDおよび色設定のキャラクタリスティックIDを使用しています。

```javascript
const bledevices={
  "PLAYBULB sphere":{serviceId:0xFF0F},
  "PLAYBULB candle":{serviceId:0xFF02},
};

const COLOR_UUID = 0xFFFC;
```

このサンプルでは、PLAYBULB sphere と PLAYBULB candle に対応しているはずですが、やや情報が錯綜しており、同じモデルでもリビジョンによってIDが異なるのでは、等の意見もあるようですので、もし手持ちの PLAYBULB で思うように動作しないケースがあれば、その点も留意ください。

また、UUID は通常`128ビット`長ですが、ここで扱っているサービス ID は UUID と言いつつ `0xFF02` 等、`16ビット長`しかありません。これは BLE の仕様で短縮 UUID というもので、
`0000xxxx-0000-1000-8000-00805F9B34FB`　の `xxxx` の部分だけを表す形式です。ただし短縮 UUID を使えるのは Bluetooth SIG で承認されたものだけですという事なのですが、Bluetooth SIG の 16ビットUUID の一覧を見ても PLAYBULB の ID は見つかりませんので、PLAYBULB のBLE実装はまだ実験的なレベルのものなのかも知れません。

# 参考

- [チュートリアル - L チカしてみよう](section0.md)
- [チュートリアル - I2C の使い方](section3.md)
- [codelabs : Control a PLAYBULB candle with Web Bluetooth](https://codelabs.developers.google.com/codelabs/candle-bluetooth/#0)
- [W3C : Media Capture and Streams](https://www.g200kg.com/demo/chirimen/webbluetooth/README.md)
- [W3C : Web Audio API](https://webaudio.github.io/web-audio-api/)
- [Bluetooth SIG : メンバー向け 16 ビット UUID](https://www.bluetooth.com/ja-jp/specifications/assigned-numbers/16-bit-uuids-for-members)

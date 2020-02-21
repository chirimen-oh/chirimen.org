---
layout: tutorial
---

# 6. ステッピングモーターを制御する

このチュートリアルで使用しているステッピングモータードライバは [CHIRIMEN の公式リリース](https://github.com/chirimen-oh/chirimen)にまだ含まれていないかも知れません。Example 等がリンクエラーになる場合は、公式リリースまでしばらくお待ちください。

# 概要

これは [CHIRIMEN for Raspberry Pi](section0.md) でステッピングモーターを回すサンプルです。モーターの制御のために Arduino を I2C スレーブデバイスとして使用します。

全体の様子は下の写真のようになります。

{% cloudinary imgs/section6/i1.jpg alt="全体の様子" %}

# 1.ステッピングモーターとは

ステッピングモーターはモーターの一種ですが通常のモーターとは違い、角度を指定して回すなど非常に精密な動きができるのが特徴で、プリンタや工作機械などでも多用されているモーターです。一般的には上の写真の上段に映っているような金属の四角い形状をしていますが、小さなもの等では違う形の場合もあります。

今回のサンプルで使用するステッピングモーターの場合は、角度 1.8 度を 1 ステップとして 200 ステップで 1 回転となり、ステップ数を指定して回転させる事ができます。

回路図のシンボルでは下の図のようにあらわされ、モーターの軸に対してそれぞれ違う方向にコイルが巻かれています。コイルの中点から線が出ているかどうかで、左のバイポーラ型(4 線式)、右のユニポーラ型(6 線式)がありますが、今回使用するのはバイポーラ型(4 線式)のモーターです。

{% cloudinary imgs/section6/i2.png alt="ステッピングモーター" %}

通常のモーターでは電圧をかければ勝手に回りますが、ステッピングモーターは電気回路側でどのコイルに電流を流すかを順次切り替えて行く事で、1 ステップずつ回転するという仕組みになっています。

# 2.使用する部品

使用する部品の一覧は次の通りです。

- [CHIRIMEN for Raspberry Pi](section0.md) が動作する Raspberry Pi (ここでは [Raspberry Pi 3 Model B](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/) を利用します) 
- [Arduino UNO R3](https://www.switch-science.com/catalog/789/)
- [EasyDriver ステッピングモータードライバ v4.4](https://www.switch-science.com/catalog/2242/)
- [I2C バス用双方向電圧レベル変換モジュール(FXMA2102)](http://akizukidenshi.com/catalog/g/gM-05825/)
- [バイポーラ ステッピングモーター SM-42BYG011](http://akizukidenshi.com/catalog/g/gP-05372/)
- [AC アダプター 12V/1.5A](https://www.switch-science.com/catalog/1410/)
- [DC プラグ変換ケーブル（QI オス）](https://www.switch-science.com/catalog/2321/)
- ジャンパー（オス・メス）ケーブル x 7、(オス・オス) x 7
- ピンヘッダ (EasyDriver にはピンヘッダが付属していません)

# 3.回路

今回作る回路は下の図の通りです。かなり部品が多いですが順番に説明して行きます。

{% cloudinary imgs/section6/i3.png alt="回路" %}

(クリックで拡大します)

## ステッピングモーター

回路図の右上にあるのが今回のターゲットとなるステッピングモーター(SM-42BYG011)です。ステッピングモーターからは普通のワイヤーが出ているだけですのでブレッドボードに挿して使うには圧着やはんだ付けで加工しておく必要があります。

回路図上のワイヤーの色は実際のモーター(SM-42BYG011)のワイヤーの色に合わせてありますが、もし違う型番のモーターを使いたい場合は電圧等の定格を守ると共に、ワイヤーの色も違いますのでデータシート等で確認してください。

## モータードライバ

モーターの下にある赤い基板がモータードライバモジュール (EasyDriver) です。モータードライバには実際にモーターを回すための電源を供給する必要がありますので、AC アダプタからの 12V を接続します。Raspberry Pi や Arduino で扱う電圧よりも高い電圧ですので接続の間違いがないように注意してください。

EasyDriver にはピンヘッダは付属していません。ブレッドボードで使うには別途用意したピンヘッダをはんだ付けする必要があります。

ステップ単位で動くステッピングモーターの駆動方法として、電流を制御する事で 1 ステップを疑似的に更に分割してより滑らかに動かす「マイクロステッピング」駆動という手法があるのですが、この EasyDriver でもそれに対応しておりデフォルトで 1/8 のマイクロステッピング駆動が可能です。つまりこのステッピングモーターでは 1 回転が 200 ステップですが、制御信号としては 1600 マイクロステップで 1 回転となります。

## Arduino UNO R3

Arduino はご存知の方も多いと思いますが、小さなマイコンが乗ったボードです。モータードライバに信号を送る事でステッピングモーターが回るのですが、この信号はステップ毎にマイクロ秒単位で制御する必要があります。 CHIRIMEN の Web ベースのアプリから直接制御するのは無理がありますので、この仕事を Arduino で行うと共に I2C スレーブデバイスとして動作させ、 CHIRIMEN からは I2C 経由でコマンドを送るだけでモーターが指示通りに回るという構成になっています。

これを実現するため、Arduino にはモータードライバに信号を送るためのプログラム(スケッチ)を書きこんでおく必要があります。
Arduino には公式の Stepper というステッピングモーター用のライブラリもあるのですが、今回使用する EasyDriver には適合せず、マイクロステップ駆動にも対応していませんので使用していません。

今回使用するモータードライバ用のスケッチは[こちらの GitHub リポジトリ](https://github.com/g200kg/arduino-stepping-motor)にあります。

[GitHub : arduino-stepping-motor](https://github.com/g200kg/arduino-stepping-motor)

ここから`sketch_steppingmotor.ino` をダウンロードして Arduino に書き込んでください。Arduino への書き込みには Arduino 用の開発環境「[Arduino IDE](https://www.arduino.cc/en/main/software)」の準備等が別途必要です。Arduino 関係の情報はネット上にたくさんありますので、 [html5experts.jp](https://html5experts.jp/) の以下のページなどを参考にしてスケッチを書き込んでください。

[**html5experts.jp : 初心者でもわかる・できる！Arduino を使った初めての電子工作実践**](https://html5experts.jp/youtoy/12029/)

## I2C 電圧レベル変換モジュール

今回のサンプルでは Raspberry Pi が I2C マスターデバイス、Arduino が I2C スレーブデバイスとなり、I2C での接続を行います。しかし Arduino は 5V 動作、Raspberry Pi は 3.3V 動作ですので I2C 電圧レベル変換モジュールの AE-FXMA2102 を介してこの間を接続します。

このモジュールにはピンヘッダが付属していますがはんだ付けはされていません。モジュールの側面にピンヘッダをはんだ付けする必要がありますが、かなり小さいモジュールですのでピンをブレッドボードに固定した状態で作業するのが楽そうです。

## Raspberry Pi 3 Model B

CHIRIMEN が動作する Raspberry Pi の一例です。CHIRIMEN を動かして操作するために SD カード、HDMI ディスプレイ、キーボード、マウス等も必要ですので、CHIRIMEN が動作する所までは以下のチュートリアル等を参考にしてください。

[CHIRIMEN for Raspberry Pi Hello World](section0.md)

- なお、CHIRIMEN for Raspberry Pi はこのモデルのほか、[Raspberry Pi 3 Model B+](https://www.raspberrypi.org/products/raspberry-pi-3-model-b-plus/) 、 [Raspberry Pi 4 Model B](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/) の2モデルにも対応しています。

# 4.動作テスト

回路の準備は良いでしょうか? それでは動作を順番に確認していきましょう。

なお、今回は Raspberry Pi や Arduino が扱う動作電圧よりも高い 12V という電圧を AC アダプターから供給しています。もしこれが間違った所に接続されていたりすると、何かが簡単に壊れてしまうという事態にもなりかねませんので配線のチェックは慎重に行ってください。

## Raspberry Pi と Arduino の接続

Raspberry Pi で ターミナルを起動して次のコマンドを入力すると、I2C デバイスの一覧が表示されます。

ここまでは ステッピングモーターや EasyDriver がなくても Raspberry Pi と 電圧レベル変換モジュール、Arduino がちゃんと接続されていれば動きます。

`i2cdetect -y 1`

今回の Arduino の I2C スレーブデバイスはスケッチ`arduiono-stepping-motor` で `0x12` と定義されていますので、一覧に `12` が表示されれば Raspberry Pi と Arduino の間の接続は正常です。

{% cloudinary imgs/section6/i4.png alt="i2cdetectの様子" %}

## モータードライバ、モーターの接続

では次にモーター側のテストをしましょう。 ターミナルから次のコマンドを入力します。

`i2cset -y 1 0x12 0x01 1600 w`

{% cloudinary imgs/section6/i5.png alt="i2csetの様子" %}

正常であれば、このコマンドでステッピングモーターが 1 回転だけ回って止まるはずです。

このコマンドは I2C のアドレス `0x12` のデバイスのレジスタ番号(コマンド) `0x01` に 数値 `1600` を送っています。
1600 というのがステップ数でちょうど 1 回転です。もし動かないようであればモーターの配線、AC アダプター周りの配線を確認してください。

## Example を動かしてみる

ここまでくれば回路としての動作は大丈夫です。CHIRIMEN の Web アプリから動かしてみましょう。
ブラウザで次のアドレスにアクセスします。

[**chirimen.org : i2c-arduino-steppingMotor Example**](https://chirimen.org/chirimen/gc/i2c/i2c-arduino-steppingMotor)

下のような画面になり、1 秒の停止をはさみながらモーターが 1 回転ずつ正方向逆方向交互に動くはずです。

{% cloudinary imgs/section6/i6.png alt="Exampleの様子" %}

# 5.ソースコードの確認

example のソースコードはどうなっているのか確認してみます。`main.js` にページのロード完了から走り始めるコードが書かれています。

```javascript
window.addEventListener(
  "load",
  async () => {
    function sleep(msec) {
      return new Promise(resolv => {
        setTimeout(resolv, msec);
      });
    }
    let step = 1600;
    const head = document.querySelector("#head");
    const i2cAccess = await navigator.requestI2CAccess();
    const port = i2cAccess.ports.get(1);
    const steppingMotor = new SteppingMotor(port, 0x12);
    await steppingMotor.init();
    for (;;) {
      await sleep(1000);
      head.innerHTML = "MOVE";
      await steppingMotor.move(step);
      head.innerHTML = "STOP";
      step = -step;
    }
  },
  false
);
```

`function sleep()` は 1 秒の待機で使用している関数の定義で `await sleep(1000)` とする事で 1 秒待機します。
初期化部分では、`navigator.requestI2CAccess()`で `I2CAccess` オブジェクト、`i2cAccess.ports.get(1)` で I2C ポートを順次取得します。

そして `steppingMotor = new SteppingMotor(port,0x12);` によって steppingMotor を制御するオブジェクトを得ます。
`port` は`i2cAccess.ports.get(1)` で取得したポート、`0x12` は Arduino のスケッチであらかじめ定義されている I2C デバイスのスレーブアドレスです。

`await steppingMotor.init();` で `init()` を呼び出す所までが初期化です。

その後は、

- `await sleep(1000)` で 1 秒待機

- `await steppingMotor.move(step)` でモーターを動かす

という処理を繰り返しています。

`step` は初期値が `1600` で一回動かすたびに `step = -step` で正負を反転していますが、この値がマイナスの場合には逆方向に回転します。

`steppingMotor.move()` は `Promise` を返しますので、`await` を付けて呼び出すと指定されたステップ数の回転が終わるまで戻ってきません。`await` なしの場合はモーターを勝手に回転させながらプログラムの処理は先に進みます。

`SteppingMotor` のオブジェクトではここで使用している `init()` で初期化、`move(step)` でモーターを動かす、の他に `setSpeed(speed)` でモーターの速度を設定、`setAccelRate(rate)` で回転開始/停止時の加減速レートの設定、`setMinSpeed(speed)` で最低速度の設定などが可能です。詳細は example の一覧ページからリンクされている API の説明を見てください。

例えば for ループの部分を次のようにすると、

```javascript
for (;;) {
  await sleep(1000);
  await steppingMotor.setSpeed(Math.random() * 1600 * 10);
  head.innerHTML = "MOVE";
  await steppingMotor.move(Math.random() * 1600 * 5);
  head.innerHTML = "STOP";
}
```

1 秒の停止をはさみながら色々な速度と色々なステップ数で回転します。

# [Example 2](https://g200kg.github.io/chirimen-steppingmotor/example2.html)

`setSpeed()`の速度の単位は(マイクロステップ数/秒)で、`Math.random()*1600*10` だと`毎秒 10 回転以内の乱数`、
また、回転の角度は `move(Math.random()*1600*5)` ですから `5 回転以内の乱数`になります。

さて、モーターの動きを見ていて一定速度ではない事に気が付いたでしょうか?

ステッピングモーターは停止状態からいきなり急加速したり高速回転から急に減速したりしようとすると付いていけず信号の通りに動かない「脱調」という現象が発生します。これを避けるため、モーターの仕様として加減速レートの限界が決まっています。

今回 `SteppingMotor` オブジェクトでこれに対応するのが `setAccelRate(rate)` というメソッドです。`rate` の単位は **msec / kHz** で、ステップの信号周波数が 1kHz 変化、つまり `setSpeed(speed)` で設定する速度が 1000 変化するために必要なミリ秒(msec)で指定します。0 を指定した場合は加速減速の処理はされず、いきなり指定の速度で動き始め、いきなり停止します。

せっかくなので、このあたりの数値を変えるとモーターがどう動くのかを確認できるサンプルプログラムを準備しましたので試してみてください。動作としてはスライダーで設定した「速度」「加減速レート」「最低速度」をそのまま `setSpeed(speed)`、`setAccelRate(rate)`、`setMinSpeed(speed)`で設定してから `move(step)` を実行しているだけです。

# [Example3](https://g200kg.github.io/chirimen-steppingmotor/example3.html)

{% cloudinary imgs/section6/i7.png alt="Example3の画面" %}

javascript

```javascript
window.addEventListener(
  "load",
  async () => {
    let steps = 1600;
    let speed = 1600;
    let accel = 10;
    let minspeed = 800;
    const head = document.querySelector("#head");
    const i2cAccess = await navigator.requestI2CAccess();
    const port = i2cAccess.ports.get(1);
    const steppingMotor = new SteppingMotor(port, 0x12);
    await steppingMotor.init();
    document.getElementById("run").addEventListener("click", async () => {
      await steppingMotor.setSpeed(speed);
      await steppingMotor.setMinSpeed(minspeed);
      await steppingMotor.setAccelRate(accel);
      head.innerHTML = "MOVE";
      await steppingMotor.move(steps);
      head.innerHTML = "STOP";
    });
    document.getElementById("steps").addEventListener("input", () => {
      document.getElementById("stepsval").innerHTML = steps =
        event.target.value;
    });
    document.getElementById("speed").addEventListener("input", () => {
      document.getElementById("speedval").innerHTML = speed =
        event.target.value;
    });
    document.getElementById("accel").addEventListener("input", () => {
      document.getElementById("accelval").innerHTML = accel =
        event.target.value;
    });
    document.getElementById("minspeed").addEventListener("input", () => {
      document.getElementById("minspeedval").innerHTML = minspeed =
        event.target.value;
    });
  },
  false
);
```

HTML

```html
<div>モーターの状態 : <span id="head">STOP</span></div>
<table>
  <tr><td>ステップ</td><td><input type="range" id="steps" min="-16000" max="16000" value="1600"/></td><td id="stepsval">1600</td></tr>
  <tr><td>速度</td><td><input type="range" id="speed" min="0" max="10000" value="1600"/></td><td id="speedval">1600</td></tr>
  <tr><td>加減速</td><td><input type="range" id="accel" min="0" max="1000" value="100"/></td><td id="accelval">100</td></tr>
  <tr><td>最低速度</td><td><input type="range" id="minspeed" min="0" max="1600" value="800"/></td><td id="minspeedval">800</td></tr>
</table>
<button id="run">Run</button>
```

# まとめ

このチュートリアルでは 下記について学びました。

- Arduino の I2C デバイスとしての応用
- ステッピングモーターの制御方法

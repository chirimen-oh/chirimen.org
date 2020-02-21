# WebGPIO API や WebI2C API を Node.js から使う

Node.js から GPIO や I<sup>2</sup>C を扱う方法を説明します。

## Node.js とは

[Node.js](https://nodejs.org/) は、オープンソース・クロスプラットフォームな JavaScript 実行環境です。
[パッケージマネージャー npm](https://www.npmjs.com/) を利用して膨大なパッケージにアクセスでき、IoT プロトタイピングだけでなく幅広いアプリケーションを作るために使われています。

## 準備

プログラムを実行するには Raspberry Pi に Node.js をインストールします。CHIRIMEN を利用する場合はあらかじめ Node.js がインストールされているので不要です。
もし CHIRIMEN の microSD カードを作成する方法を知りたい場合は [SD カードイメージの作成方法](sdcard.md)を参照してください。

## 新しいディレクトリの作成

実際にアプリケーションを作る前にプログラムを実行するための環境を整えます。作業用のディレクトリを作り、そのディレクトリの中でプログラムを実行します。

ターミナルを起動して以下のコマンドを実行します。

```sh
mkdir hello-real-world
```

```sh
cd hello-real-world
```

npm のためのファイル package.json を作成します。

```sh
npm init -y
```

作業用のディレクトリの中に npm パッケージ [node-web-gpio
](https://www.npmjs.com/package/node-web-gpio) と [node-web-i2c](https://www.npmjs.com/package/node-web-i2c) をインストールします。

```sh
npm install node-web-gpio node-web-i2c
```

これで Node.js から WebGPIO API と WebI2C API を使う準備は完了です。

## Hello Real World

Raspberry Pi に接続した LED を点滅させるプログラムを書きます。

次の図のとおりに配線します。

[{% cloudinary imgs/section1/k.png alt="LEDの点滅回路の配線図" %}](imgs/section1/k.png)

空のテキストファイル main.js を作成し、Node.js のための JavaScript のプログラムを書きます。

```sh
touch main.js
```

```sh
xdg-open main.js
```

テキストエディターで main.js を次のように書きます。

```js
const { requestGPIOAccess } = require("node-web-gpio");
const sleep = require("util").promisify(setTimeout);

async function blink() {
  const gpioAccess = await requestGPIOAccess();
  const port = gpioAccess.ports.get(26);

  await port.export("out");

  for (;;) {
    await port.write(1);
    await sleep(1000);
    await port.write(0);
    await sleep(1000);
  }
}

blink();
```

書き終えたら保存します。

Node.js で main.js を実行するには、次のコマンドを実行します。

```sh
node main.js
```

LEDが点滅すれば完成です 🎉

## いろいろなデバイスを試す

CHIRIMEN ブラウザーから利用できるいろいろなデバイスはすべて同じように Node.js から扱うことができます。

たとえば、次のコードは[温度センサー ADS1015](http://akizukidenshi.com/catalog/g/gM-06675/)を利用して温度を表示するプログラムです。

```js
const { requestI2CAccess } = require("node-web-i2c");
const ADT7410 = require("@chirimen/adt7410");

async function measure() {
  const i2cAccess = await requestI2CAccess();
  const i2c1 = i2cAccess.ports.get(1);
  const adt7410 = new ADT7410(i2c1, 0x48);
  await adt7410.init();
  const temperature = await adt7410.read();
  console.log(`Temperature: ${temperature} ℃`);
}

measure();
```

コマンド `npm i @chirimen/adt7410` を実行すると、温度センサー ADT7410 を利用するための `@chirimen/adt7410` パッケージをインストールできます。

デバイスを扱うためのパッケージについてさらに知りたい場合は [CHIRIMEN Drivers](https://github.com/chirimen-oh/chirimen-drivers) を参照してください。

## CHIRIMEN ブラウザー版との差異

| CHIRIMEN ブラウザー版         | Node.js                                                                       |
| ----------------------------- | ----------------------------------------------------------------------------- |
| `navigator.requestGPIOAccess` | `const { requestGPIOAccess } = require("node-web-gpio");` `requestGPIOAccess` |
| `navigator.requestI2CAccess`  | `const { requestI2CAccess } = require("node-web-i2c");` `requestI2CAccess`    |
| `sleep`                       | `const sleep = require("util").promisify(setTimeout);` `sleep`                |

## 後付

- [サーバサイド Web サイトプログラミング - ウェブ開発を学ぶ | MDN](https://developer.mozilla.org/ja/docs/Learn/Server-side)
- [Node.js で CLI アプリ · JavaScript Primer](https://jsprimer.net/use-case/nodecli/)
- [CHIRIMEN Drivers Documentation](https://chirimen.org/chirimen-drivers/)

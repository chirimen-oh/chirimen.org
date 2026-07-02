# ECMA Script Module化したExamples

CHIRIMEN with Node.js (Raspberry Pi Zero) 用のサンプルコード集です。
ブラウザ版 CHIRIMEN と同じ書き方（ECMAScript Module: `import` 文）で、Node.js 上で GPIO や I2C デバイスを制御します。

Examples の一覧は [index_examples.csv](index_examples.csv) を参照（Webページ版一覧は [https://chirimen.org/pizero/esm-examples/](https://chirimen.org/pizero/esm-examples/) ）

## 各Exampleのディレクトリ構成

| ファイル       | 内容                                 |
| -------------- | ------------------------------------ |
| `main.js`      | プログラム本体                       |
| `package.json` | 使用するライブラリ（ドライバ）の一覧 |
| `readme.md`    | 配線図・ドライバのインストール方法・サンプルコードの解説 |

## 実行方法

1. 回路図（各ディレクトリの readme.md）を見て配線する
2. Raspberry Pi Zero にログインし、ライブラリがプリインストールされている `~/myApp` ディレクトリに `main.js` をコピーして実行する

```sh
cd ~/myApp
node main.js
```

停止は `Ctrl+C` です。

- 自分専用の開発ディレクトリを作りたい場合は [howToDev](howToDev) を参照してください。
- リモートExample（`remote_` で始まるもの）は、`main.js` を Raspberry Pi Zero で動かし（`node main.js`）、`pc/` ディレクトリ以下の webApp（index.html と pc.js）をリモートの PC/スマホのブラウザで動かします。webApp は一覧ページの「CSB EDIT」リンクから CodeSandbox 上で編集・実行できます。

## 基礎知識

### ECMAScript Module (ESM) とは

JavaScript の標準のモジュール読み込み方式です。ファイルの先頭で `import` 文を使ってライブラリを読み込みます。

```js
import { requestI2CAccess } from "node-web-i2c";
import ADT7410 from "@chirimen/adt7410";
```

Node.js で `import` 文を使うには、`package.json` に `"type": "module"` の指定が必要です（このディレクトリの各 example の package.json には指定済み）。この指定がないと `SyntaxError: Cannot use import statement outside a module` というエラーになります。

また、ESM ではモジュールのトップレベル（関数の外）で直接 `await` が書けます（**top-level await**）。この Examples のコードは `async function main()` のようなラッパー関数を使わず、top-level await で統一したシンプルなスタイルで書かれています。

なお、[chirimen-drivers の node-examples](https://github.com/chirimen-oh/chirimen-drivers/tree/master/node-examples) には同じ内容の CommonJS（`require()`）版のコードもあります。古い記事やコードで `require()` を見かけたら、それは ESM 以前の書き方です。

### ドライバ（ライブラリ）の読み込み方は2通り

CHIRIMEN のデバイスドライバは [chirimen-drivers](https://github.com/chirimen-oh/chirimen-drivers) リポジトリで開発され、npm パッケージとして公開されています。使い方は2通りあります。

**1. デバイスごとの個別パッケージを使う（このExamples集の方式）**

```sh
npm i node-web-i2c @chirimen/adt7410
```

```js
import { requestI2CAccess } from "node-web-i2c";
import ADT7410 from "@chirimen/adt7410";
```

**2. 全ドライバ入りの `chirimen` パッケージをまとめて使う**

```sh
npm i chirimen
```

```js
import { requestI2CAccess, ADT7410 } from "chirimen";

const i2cAccess = await requestI2CAccess();
const adt7410 = new ADT7410(i2cAccess.ports.get(1), 0x48);
await adt7410.init();
const temperature = await adt7410.read();
```

`chirimen` パッケージひとつで `requestI2CAccess` / `requestGPIOAccess` と全デバイスドライバが import できるので、複数のデバイスを使うときや package.json を書くのが面倒なときに便利です。

また、Node.js の代わりに [Deno](https://deno.com/) でも `import { requestI2CAccess, ADT7410 } from "npm:chirimen";` のように動かせます。

### I2C デバイスの基礎

- I2C デバイスの配線は基本4本です: **VCC（電源。多くは3.3V）・GND・SDA（データ）・SCL（クロック）**。配線を間違えるとデバイスが壊れることがあるので、電源を入れる前に確認しましょう。
- 各デバイスは「**スレーブアドレス**」（0x48 のような16進数）で区別されます。配線後、次のコマンドで認識されているか確認できます。

```sh
i2cdetect -y 1
```

- スレーブアドレスは同じ型番のセンサーでも製品（基板）によって異なることがあります。例: BME280 は 0x76 と 0x77 の製品が存在、ADT7410 はジャンパで 0x48〜0x4B に変更可能。ドライバに渡すアドレスと実物のアドレスが一致しないと動きません。
- AS3935（雷センサ）の 0x03 のような小さいアドレスは通常のスキャンでは表示されません。`i2cdetect -y -a 1` のように `-a` オプションを付けて確認します。
- **複数の I2C デバイス**は、スレーブアドレスが互いに異なれば同じ I2C バスに並列接続して同時に使えます（Grove I2C ハブを使うと配線が楽です）。同じアドレスのデバイスを複数使いたい場合は、I2C マルチプレクサ **TCA9548A**（8チャンネル切替、アドレス 0x70〜0x77）を使う方法があります（ドライバ: [@chirimen/tca9548a](https://github.com/chirimen-oh/chirimen-drivers/tree/master/packages/tca9548a)）。

### 各デバイスの詳しい仕様・API を知りたいとき

- [CHIRIMEN Drivers Documentation](https://chirimen.org/chirimen-drivers/) - ドライバ全体のドキュメント
- [chirimen-drivers/packages](https://github.com/chirimen-oh/chirimen-drivers/tree/master/packages) - 各ドライバのソースコード。README があるパッケージにはセンサー仕様（測定範囲・精度・スレーブアドレス）、API の説明、データシートへのリンクが載っています
- [Web I2C API](https://browserobo.github.io/WebI2C/) / [Web GPIO API](https://browserobo.github.io/WebGPIO/) - ドライバの土台になっている API の仕様

### うまく動かないときのチェックリスト

1. 配線（特に VCC/GND の逆挿し、SDA/SCL の入れ違い）を確認する
2. `i2cdetect -y 1` でデバイスが見えるか確認する（見えなければ配線かデバイスの問題）
3. 表示されたアドレスと `main.js` でドライバに渡しているアドレスが一致しているか確認する
4. `npm install` が済んでいるか（`node_modules` ディレクトリがあるか）確認する
5. `SyntaxError: Cannot use import statement outside a module` が出たら package.json の `"type": "module"` を確認する

## もっと進んだ話題

- 自分のプログラムを開発する手順: [howToDev](howToDev)
- ドライバ自体を作る・修正する（新しいデバイスを CHIRIMEN 対応にする）: [chirimen-drivers Contributing Guidelines](https://chirimen.org/chirimen-drivers/CONTRIBUTING) に「新しいドライバの追加：完全ガイド」があります

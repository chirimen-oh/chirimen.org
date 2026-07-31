# @chirimen/hello-world-example

自分のプログラムを開発する手順です。

## `~/myApp`ディレクトリを使う

あらかじめ用意されている`~/myApp`ディレクトリは、ライブラリがプリインストールされています。

## 自分でつくったディレクトリにライブラリをインストールする

以下でライブラリの設定ができます。（2分ぐらいかかります）

```sh
mkdir [自分の開発ディレクトリ]
cd [自分の開発ディレクトリ]
wget https://tutorial.chirimen.org/pizero/package.json
npm install
```

実行結果

```log
pi@raspberrypi:~$ mkdir myAppX
pi@raspberrypi:~$ cd myAppX
pi@raspberrypi:~/myAppX$ wget https://tutorial.chirimen.org/pizero/package.json
...
2021-XX-XX XX:XX:XX (XX.X KB/s) - `package.json' へ保存完了 [1785/1785]

pi@raspberrypi:~/myAppX$ npm install
> i2c-bus@5.2.2 install /home/pi/myAppX/node_modules/i2c-bus
> node-gyp rebuild

make: ディレクトリ '/home/pi/myAppX/node_modules/i2c-bus/build'　に入ります
  CXX(target) Release/obj.target/i2c/src/i2c.o
  SOLINK_MODULE(target) Release/obj.target/i2c.node
  COPY Release/i2c.node
make: ディレクトリ '/home/pi/myAppX/node_modules/i2c-bus/build' から出ます

> bufferutil@4.0.3 install /home/pi/myAppX/node_modules/bufferutil
> node-gyp-build

> utf-8-validate@5.0.5 install /home/pi/myAppX/node_modules/utf-8-validate
> node-gyp-build

npm notice created a lockfile as package-lock.json. You should commit this file.
added 63 packages from 64 contributors and audited 63 packages in 137.662s
found 0 vulnerabilities

pi@raspberrypi:~/myAppX$
```

## 全ドライバ入りの `chirimen` パッケージを使う方法

package.json に個別ドライバを列挙する代わりに、全デバイスドライバをまとめた [chirimen](https://www.npmjs.com/package/chirimen) パッケージを使うこともできます。

```sh
mkdir [自分の開発ディレクトリ]
cd [自分の開発ディレクトリ]
npm init -y
npm pkg set type=module
npm install chirimen
```

コードでは `requestI2CAccess` / `requestGPIOAccess` もドライバも `chirimen` からまとめて import できます。

```js
import { requestI2CAccess, ADT7410 } from "chirimen";

const i2cAccess = await requestI2CAccess();
const adt7410 = new ADT7410(i2cAccess.ports.get(1), 0x48);
await adt7410.init();
console.log(await adt7410.read());
```

## ドライバ自体を開発したい場合

新しいデバイスの CHIRIMEN 対応ドライバを作る・既存ドライバを修正する手順は、[chirimen-drivers の Contributing Guidelines](https://chirimen.org/chirimen-drivers/CONTRIBUTING) を参照してください。開発環境のセットアップから「新しいドライバの追加：完全ガイド」、リリース方法までまとまっています。

### ローカルにあるドライバパッケージをリンクして実行する

npm 公開前の（手元で開発中の）ドライバパッケージは、次のようにリンクしてサンプルコードから使えます。

```sh
# ドライバのソースコードをクローンします
git clone https://github.com/chirimen-oh/chirimen-drivers.git
cd chirimen-drivers/node-examples/hello-world
# リンクしたいパッケージのシンボリックリンクを作ります
npm ../../packages/hello-world link
# シンボリックリンクを作ったパッケージにリンクします
npm i @chirimen/hello-world
# サンプルコード本体を実行します
node main.js
```

実行結果

```log
$ node main.js
Hello World!
```

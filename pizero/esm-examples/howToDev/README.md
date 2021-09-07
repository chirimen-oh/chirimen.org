# @chirimen/hello-world-example

自分のプログラムを開発する手順です。

## ```~/myApp```ディレクトリを使う

あらかじめ用意されている```~/myApp```ディレクトリは、ライブラリがプリインストールされています。

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

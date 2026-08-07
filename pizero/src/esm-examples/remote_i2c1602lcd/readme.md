# リモート液晶ディスプレイ

## 配線図

![配線図](../i2c1602lcd/schematic.png "schematic")

> [!WARNING]
> Node.js v20 では `WebSocket` が実験的機能としてデフォルト無効のため、Raspberry Pi Zero 側で `node main.js` を実行すると `nodeWebSocketClass and OriginURL are required.` というエラーで終了します。
> `node --experimental-websocket main.js` のようにフラグを付けて実行してください (v22 以降ではフラグ不要です)。

## 遠隔コントロール(PC/スマホブラウザ)側

[pc/index.html](https://codesandbox.io/s/github/chirimen-oh/chirimen.org/tree/master/pizero/src/esm-examples/remote_i2c1602lcd/pc?module=pc.js)を起動します。

1行目・2行目のテキスト入力欄に文字列(全角・半角カタカナ利用可)を入力して送信すると、Pi Zero側の16文字×2行LCDに表示されます。

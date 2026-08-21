# リモート温湿度センサ２
スイッチを押すと温湿度センサーの値を送信します。スイッチの代わりに人感センサー等を繋ぐと有意義かもしれません。

## 配線図

![配線図](schematic.png "schematic")

> [!WARNING]
> Node.js v20 では `WebSocket` が実験的機能としてデフォルト無効のため、Raspberry Pi Zero 側で `node main.js` を実行すると `nodeWebSocketClass and OriginURL are required.` というエラーで終了します。
> `node --experimental-websocket main.js` のようにフラグを付けて実行してください (v22 以降ではフラグ不要です)。

## 遠隔モニタ(PC/スマホブラウザ)側

[pc/index.html](https://codesandbox.io/s/github/chirimen-oh/chirimen.org/tree/master/pizero/src/esm-examples/remote_sht30_gpioin/pc?module=pc.js)を起動します。
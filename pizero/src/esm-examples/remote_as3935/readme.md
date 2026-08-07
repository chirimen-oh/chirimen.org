# リモート雷センサ(AS3935)

## 配線図

![配線図](../as3935/schematic.png "schematic")

I2Cバスに加えて、GPIOポート5を雷検出のトリガーとして使用しています。雷を検出したときだけ、距離とエネルギー値がブラウザに送信されます。

> [!WARNING]
> Node.js v20 では `WebSocket` が実験的機能としてデフォルト無効のため、Raspberry Pi Zero 側で `node main.js` を実行すると `nodeWebSocketClass and OriginURL are required.` というエラーで終了します。
> `node --experimental-websocket main.js` のようにフラグを付けて実行してください (v22 以降ではフラグ不要です)。

## 遠隔モニタ(PC/スマホブラウザ)側

[pc/index.html](https://codesandbox.io/s/github/chirimen-oh/chirimen.org/tree/master/pizero/src/esm-examples/remote_as3935/pc?module=pc.js)を起動します。

# リモート振動モータードライバ(DRV2605L)

## 配線図

![配線図](../drv2605l/schematic.png "schematic")

> [!WARNING]
> Node.js v20 では `WebSocket` が実験的機能としてデフォルト無効のため、Raspberry Pi Zero 側で `node main.js` を実行すると `nodeWebSocketClass and OriginURL are required.` というエラーで終了します。
> `node --experimental-websocket main.js` のようにフラグを付けて実行してください (v22 以降ではフラグ不要です)。

## 遠隔コントローラ(PC/スマホブラウザ)側

[pc/index.html](https://codesandbox.io/s/github/chirimen-oh/chirimen.org/tree/master/pizero/src/esm-examples/remote_drv2605l/pc?module=pc.js)を起動します。

スライダーを離したタイミングで振動強度(0〜127)をリレーサービスに送信し、Raspberry Pi Zero側でERM振動モーターを振動させます。

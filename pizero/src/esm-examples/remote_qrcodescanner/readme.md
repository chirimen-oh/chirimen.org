# リモートQRコードリーダ

## 配線図

![配線図](../qrcodescanner/schematic.png "schematic")

> [!WARNING]
> Node.js v20 では `WebSocket` が実験的機能としてデフォルト無効のため、Raspberry Pi Zero 側で `node main.js` を実行すると `nodeWebSocketClass and OriginURL are required.` というエラーで終了します。
> `node --experimental-websocket main.js` のようにフラグを付けて実行してください (v22 以降ではフラグ不要です)。

## 遠隔モニタ(PC/スマホブラウザ)側

[pc/index.html](https://codesandbox.io/s/github/chirimen-oh/chirimen.org/tree/master/pizero/src/esm-examples/remote_qrcodescanner/pc?module=pc.js)を起動します。

Pi Zero側のQRコードスキャナーが数秒間隔でQRコードをポーリングし、読み取った内容が変化した場合にブラウザの表示を更新します。

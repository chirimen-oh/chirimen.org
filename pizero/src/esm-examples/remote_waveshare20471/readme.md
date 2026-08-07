# リモート複合センサボード(WAVESHARE20471)

## 配線図

[説明ページの組み立て方](https://www.waveshare.com/wiki/Environment_Sensor_HAT#Hardware_connection)に従ってRaspberry Pi Zeroに接続したら完了です。

![ボードの写真](../../../partsImgs/WAVESHARE-20471.jpg "ボードの写真")

> [!WARNING]
> Node.js v20 では `WebSocket` が実験的機能としてデフォルト無効のため、Raspberry Pi Zero 側で `node main.js` を実行すると `nodeWebSocketClass and OriginURL are required.` というエラーで終了します。
> `node --experimental-websocket main.js` のようにフラグを付けて実行してください (v22 以降ではフラグ不要です)。

## 遠隔モニタ(PC/スマホブラウザ)側

[pc/index.html](https://codesandbox.io/s/github/chirimen-oh/chirimen.org/tree/master/pizero/src/esm-examples/remote_waveshare20471/pc?module=pc.js)を起動します。

# リモートNeopixel LED

## 配線図

![配線図](../neopixel-i2c/schematic.png "schematic")

## 配線図（専用ボード使用）

![配線図](../neopixel-i2c/schematic_with_dedicated_breadboard.png "schematic")

> [!WARNING]
> Node.js v20 では `WebSocket` が実験的機能としてデフォルト無効のため、Raspberry Pi Zero 側で `node main.js` を実行すると `nodeWebSocketClass and OriginURL are required.` というエラーで終了します。
> `node --experimental-websocket main.js` のようにフラグを付けて実行してください (v22 以降ではフラグ不要です)。

## 遠隔コントロール(PC/スマホブラウザ)側

[pc/index.html](https://codesandbox.io/s/github/chirimen-oh/chirimen.org/tree/master/pizero/src/esm-examples/remote_neopixel-i2c/pc?module=pc.js)を起動します。

カラーピッカーで色を選ぶと、Pi Zero側のNeopixel LED(7個)が全て同じ色で点灯します。「消灯」ボタンで全LEDを消灯できます。

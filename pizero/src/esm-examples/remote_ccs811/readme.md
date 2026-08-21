# リモートCO2・TVOCセンサー(CCS811)

## 配線図

VCC(3.3V)・GND・SDA・SCL の4本をRaspberry PiのI2Cピンに接続します。I2Cアドレスは基板の`ADDR`ピンの状態により `0x5A`（未接続/GND、既定）または `0x5B`（3.3Vに接続）になります。

Note: CCS811には`nWAKE`ピンがあり、通信時はLowにする必要があります。多くのブレイクアウト基板ではGNDに直結済みですが、動作しない場合は基板の回路図で`nWAKE`(または`WAK`)がGNDに接続されているか確認してください。

> [!WARNING]
> Node.js v20 では `WebSocket` が実験的機能としてデフォルト無効のため、Raspberry Pi Zero 側で `node main.js` を実行すると `nodeWebSocketClass and OriginURL are required.` というエラーで終了します。
> `node --experimental-websocket main.js` のようにフラグを付けて実行してください (v22 以降ではフラグ不要です)。

## 遠隔モニタ(PC/スマホブラウザ)側

[pc/index.html](https://codesandbox.io/s/github/chirimen-oh/chirimen.org/tree/master/pizero/src/esm-examples/remote_ccs811/pc?module=pc.js)を起動します。

# リモートDCモータードライバ(DRV8830)

## 配線

Raspberry PiとDRV8830をI2Cで接続します。

| Raspberry Pi | DRV8830 |
| ------------ | ------- |
| 3.3V         | VCC     |
| GND          | GND     |
| GND          | ISENSE  |
| SDA          | SDA     |
| SCL          | SCL     |

DCモーターはDRV8830のブリッジ出力端子に接続します。

| DRV8830 | DCモーター |
| ------- | ---------- |
| OUT1    | +          |
| OUT2    | -          |

ISENSEは電流検出抵抗を介してGNDへ接続し、電流制限のしきい値を設定する端子です。
このサンプルでは電流制限機能を使わないため、電流検出抵抗を挟まずISENSEをGNDへ直接接続します。

> [!WARNING]
> Node.js v20 では `WebSocket` が実験的機能としてデフォルト無効のため、Raspberry Pi Zero 側で `node main.js` を実行すると `nodeWebSocketClass and OriginURL are required.` というエラーで終了します。
> `node --experimental-websocket main.js` のようにフラグを付けて実行してください (v22 以降ではフラグ不要です)。

## 遠隔コントローラ(PC/スマホブラウザ)側

[pc/index.html](https://codesandbox.io/s/github/chirimen-oh/chirimen.org/tree/master/pizero/src/esm-examples/remote_drv8830/pc?module=pc.js)を起動します。

スライダーを離したタイミングで電圧(-5V〜5V)をリレーサービスに送信し、Raspberry Pi Zero側でDCモーターを正転・逆転・停止させます。
0を送信すると出力をハイインピーダンス状態にして停止(コースト)します。

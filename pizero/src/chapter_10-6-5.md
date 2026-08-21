# 11.6.5 プログラムの流れ

## 初期化（受信側、送信側共通の処理）

詳しくは[こちら](https://www.chirimen.org/remote-connection/#使用方法)を参照してください。

```javascript
import { RelayServer } from "https://www.chirimen.org/remote-connection/js/beta/RelayServer.js";
const relay = RelayServer("achex", "chirimenSocket");
```

import文で、ライブラリRelayServer.jsを読み込みます。
続けて、relayServiceのひとつである**achex**に接続します。
RelayServerの第二引数`("chirimenSocket")`は、そのサービスを利用するためのトークンです。
achexの場合、このトークンには任意の文字列を使えます。

_Node.jsを使う場合は、第三引数と第四引数も必要になります（後述します）。_

##### チャンネルの作成

`channel = await relay.subscribe("chirimenMbitSensors");`

変数`channel`に、RelayServerのチャンネルのインスタンスを登録します。
引数はチャンネル名で、自分の好きな名前を与えられます。

ただし、受信側と送信側では、同じサービス、トークン、チャンネルを指定しなければなりません。

##### データの送信

`channel.send(data);`

任意のデータ（`data`）を、relayServerの指定チャンネルに送信します。

送信できるのは文字列だけではありません。
連想配列、つまり構造化されたオブジェクトも、そのまま送信できます。

##### データの受信

`channel.onmessage = getMessage;`

チャンネルにメッセージが届いたときに呼び出される関数、すなわちコールバック関数を登録しています。

`function getMessage(msg)`

この関数の第一引数`msg`のうち、`msg.data`に送信されたメッセージが届きます。
届くデータの構造は、送信時のままです。

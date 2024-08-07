# 10.6.5 プログラムの流れ
## 初期化（受信側、送信側共通の処理
[詳しくはこちらを参照](https://chirimen.org/remote-connection/#使用方法)

```javascript
import {RelayServer} from "https://chirimen.org/remote-connection/js/beta/RelayServer.js";
var relay = RelayServer("achex", "chirimenSocket" );
```

  import文でライブラリRelayServer.jsを読み込んだ後、relayServiceのひとつ**achex**に接続しています。
  RelayServerの第二引数`("chirimenSocket")`はそのサービスを使うためのトークンですが、**achex**は任意の文字列で利用できてます。

*Node.jsでは第三,第四引数が必要になります (後述)*

##### チャンネルの作成
* `channel = await relay.subscribe("chirimenMbitSensors");`

  変数`channel`にRelayServerのチャンネルのインスタンスを登録
  引数はチャンネル名で、自分で好きな名前を与えられます。

  受信側と送信側で同じサービス、トークン、チャンネルを指定する必要があります。

##### データの送信
* `channel.send(data);`

  任意のデータ(data)をrelayServerの指定チャンネルに送信します。

  dataは文字列だけでなく、連想配列(構造化されたデータ、オブジェクト)も送信可能です。

##### データの受信
* `channel.onmessage = getMessage;`
チャンネルにメッセージがポストされた時に起動する関数(コールバック関数)を登録しています。

* `function getMessage(msg)`
上で登録した関数の第一引数(`msg`)のメンバ変数msg.dataに送信されたメッセージが構造もそのままで届きます。
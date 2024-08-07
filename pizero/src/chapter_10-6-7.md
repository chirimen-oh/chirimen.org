# 10.6.7 Node.jsでの利用

初期化手順に差異があります。

```javascript
import nodeWebSocketLib from "websocket";
import {RelayServer} from "./RelayServer.js";
var relay = RelayServer("achex", "chirimenSocket" , nodeWebSocketLib, "https://chirimen.org");
```

* Node.jsではwebSocketを使用するためにはwebsocketライブラリが必要なので読み込みます
* RelayServer.jsやwebSocket等のライブラリは、ローカルからの読み込みになります
* RelayServerの第三引数でwebsocketライブラリを渡す必要があります
* RelayServerの第四引数で、[リファラー](https://e-words.jp/w/%E3%83%AA%E3%83%95%E3%82%A1%E3%83%A9.html)の指定が必要です
  * webアプリの場合はそのコンテンツの配信元のURLがリファラーとして自動設定されますが、Node.jsのアプリはローカルにあるので別途指定が必要
  * achexの場合URLは何でも許可されますが、他のrelayServerサービスでは あらかじめ指定したリファラーが設定されていなければアクセス拒否されるものもあります(これも一つのセキュリティ)
# 11.6.7 Node.jsでの利用

ブラウザ向けの実装と比べて、初期化の手順が異なります。

```javascript
import nodeWebSocketLib from "websocket";
import {RelayServer} from "./RelayServer.js";
var relay = RelayServer("achex", "chirimenSocket" , nodeWebSocketLib, "https://chirimen.org");
```

* Node.js で webSocket を使うには websocket ライブラリが必要なため、これを読み込みます
* RelayServer.js や webSocket などのライブラリは、ローカルから読み込みます
* RelayServer の第三引数で、websocket ライブラリを渡す必要があります
* RelayServer の第四引数では、[リファラー](https://e-words.jp/w/%E3%83%AA%E3%83%95%E3%82%A1%E3%83%A9.html)の指定が必要です
  * web アプリの場合、コンテンツの配信元の URL がリファラーとして自動設定されますが、Node.js のアプリはローカルにあるため、別途指定する必要があります
  * achex の場合は URL を自由に設定できますが、他の relayServer サービスでは、あらかじめ指定したリファラーが設定されていないとアクセスを拒否されるものもあります（これもセキュリティ対策の一つです）
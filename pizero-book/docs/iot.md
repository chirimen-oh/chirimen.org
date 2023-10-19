# IoT
これまでのチュートリアルでは、いずれもそのコンピュータに直接接続されたデバイスを使うものでした。このようなシステムは「スタンドアロン」と呼ばれます。
今までは、ウェブブラウザを使っていたのに、実はウェブの重要な機能～インターネット上の情報基盤WWWを活用したシステムを作っていなかったのです。（開発環境としてはgithubやCodeSandboxなどWWW上の情報サービスを活用していますが）

このようなインターネットを活用するシステムのことをIoT (Internet of Thingの略)と呼びます。ただし単にPCやスマホで使うウェブサービスがIoTと呼ばれることがありません。チュートリアルで学んだようなセンサーやアクチュエータがシステムに組み込まれ、物理的なモノと相互作用するようなものを特にIoTと呼びます。（なお、WWWを用いずネットワーク部のインターネットだけを使ったものでもIoTと呼びます。詳しくはwiki<span class="footnote">https://ja.wikipedia.org/wiki/モノのインターネット</span>や、[総務省「IoT機器等の電波利用システムの適正利用のためのICT人材育成事業」における講習会テキスト](https://smartiot-forum.jp/application/files/5315/8642/5503/iot-jinzai-text_verR0202.pdf)なども参考にしてください）

## WebSocketとpub/sub services
### システム構成

![sysConfImg](../../pizero/imgs/IoTsystemConf.png)

今回のチュートリアルでつくるIoTシステムの構成図です。

インターネットを介して、左側のアクチュエータやLEDを右側のウェブアプリから操作したり、
左側でセンシングしたデータを右側のウェブアプリで表示させたりするシステムですね。

構成要素を見ていきます。

* 左側のボードコンピュータはCHIRIMENを使ったプログラミングで使用してきた環境やデバイスを使います。
* 右側のPCはどんなブラウザでも動かせるので、スマートフォンを使うこともできます。<br>インターネットにつながっていさえすれば別の場所のPCやスマホでも動きます。これがIoTの便利なところ～遠隔操作ですね。

* InternetのrelayServiceが見慣れないものだと思います。以下で解説します。

### relayService

送り側(左側)のWebAppsが、受け側(右側)のwebAppsに情報を送るなら、直接接続するのが簡単そうです。これはピアツーピア通信と言います。

実はこれは簡単ではありません。webAppsはインターネット上のあらゆるコンピュータ（サーバやブラウザの乗ったPCも含め）にURLでアクセスする必要がありますが、相手のPCにURLでアクセスすることは難しいのです。

一方、(あらかじめ用意されていれば)ウェブサーバにはURLでアクセスできます。そこで登場するのがrelayServerです。下図のようにrelayServer(Web Socket Relay Service)を介してwebAppsが通信します。

  ![Relay Server Configuration](https://chirimen.org/remote-connection/imgs/relay.png)

relayServerは特定のウェブサイトの固有名ではなく、「ウェブアプリ間でリアルタイム性の高いデータのやり取りを仲介する」という機能を持ったウェブサイトの抽象的な名称でpub/sub servicesと呼ばれることもあります。(SNSとかblogとかというのと同じです）

relayServerはトークン(ユーザーやシステムごとに割り当てられたランダムな文字列)ごとにスペース(図の濃い青色)が設けられ、その中にいくつかのチャンネル(図の茶色)を置くことができます。

同じトークンとチャンネルにアクセスしたウェブアプリ同士が通信でき、図ではウェブアプリは２個つながっていますが、何個でもつなげることができます。チャットスペースのようなイメージですね。

#### リアルタイム性
例えば遠隔からカメラのパンチルトをコントロールしたい　などのケースを考えると、IoTではデバイスのコントロールを機敏に行いたいケースが多くあります。（リアルタイム性の高いユースケースが多い）このようなリアルタイム性の高い情報のやり取りのために[WebSocket](https://ja.wikipedia.org/wiki/WebSocket)というブラウザが標準としてサポートするプロトコルがよく使われます。

#### relayServer.js

IoTにはrelayServerの機能を持つウェブサイトが必要になりますが、これを誰かが運営しなければなりません。実習やプロトタイピングのためにこのようなサイトを自分たちで立ち上げるのはかなり大変ですが、インターネット上では既にいくつもの事業者がrelayServerサービスを提供しています。

今回はCHIRIMEN環境の試験用に、CHIRIMEN用に用意された検証用サービス(chirimentest)を使うことにしますが、いくつかある事業者間でサービスの内容に差異があります。サイトごとの差異は主に接続できる端末の管理と情報の取り扱いに関する機能になります。

[relayServer.js](https://chirimen.org/remote-connection/)は、relayServerサービスによる差異を吸収し複数の事業者を自由に切り替えられ、WebSocketの標準API仕様に沿った作法でwebApps(含Node.jsプログラム)間の通信を簡単に使えるようにするライブラリです。

#### relayServer.js を使ったプログラムの流れ

##### 初期化（受信側、送信側共通の処理

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

#### セキュリティを考えよう

relayServerを使うということは、情報をインターネット上のウェブサイトに送信することになります。
すると このウェブサイトがその情報をどのように取り扱うのかを理解しておく必要があります。
achexは無料で使え、しかもユーザ登録も不要です。つまりこのサイトに送信した情報は誰でも見ることができてしまうということです。（ただし、トークンとチャンネルを知る必要がある。これがachexのセキュリティレベル）
今回は個人情報などのセキュリティを考慮する必要がない、チュートリアルで使うセンシングデータを送るだけですので問題ありませんが、セキュリティを考慮する必要がある多くの用途ではそのセキュリティ基準に適合したサイトを契約して利用する、もしくは自分でそのようなサイトを立てるなどの必要が出てきます。
relayServer.jsでもいくつかの商用サイトの比較と使用方法が記載されているので参考にしてください。

#### Node.jsでの利用

初期化手順に差異があります。

```javascript
import nodeWebSocketLib from "websocket";
import {RelayServer} from "./RelayServer.js";
var relay = RelayServer("achex", "chirimenSocket" , nodeWebSocketLib, "https://chirimen.org");
```

* Node.jsではWebSocketを使用するためにはwebsocketライブラリが必要なので読み込みます
* RelayServer.jsやwebsocket等のライブラリは、ローカルからの読み込みになります
* RelayServerの第三引数でwebsocketライブラリを渡す必要があります
* RelayServerの第四引数で、リファラー<span class="footnote">https://e-words.jp/w/リファラ.html</span> の指定が必要です
  * webアプリの場合はそのコンテンツの配信元のURLがリファラーとして自動設定されますが、Node.jsのアプリはローカルにあるので別途指定が必要
  * achexの場合URLは何でも許可されますが、他のrelayServerサービスでは あらかじめ指定したリファラーが設定されていなければアクセス拒否されるものもあります(これも一つのセキュリティ)

## Webhooks
relayServerが必要なほどリアルタイム性は求めないけれど、むしろ既存のWebサービス・アプリと簡単につなぎたいようなケースでは、httpをそのまま使うことができるでしょう。ただし既存のWebサービス・アプリはウェブブラウザを介して人が操作することが前提でつくられていますので、直接センサーやアクチュエータ（を制御するコンピュータとプログラム～IoTデバイス）をつなげるにはハードルがあります。
IFTTTに代表されるようなWebhooksサービスは、httpを活用することで既存の多くのウェブサービス（twitterやgoogleのサービスなど）とIoTデバイスを簡単に接続できるようにする中継サービスです。

## IoTクラウドサービス
Webhookのような中継サービスを介さずに、直接IoTデバイスを接続できるように設計されたサービスが多くの事業者から提供されています。これらのサービスを使うには、各サービス事業者ごとに提供しているAPI・プロトコル等の仕様に基づいた開発が必要になります。

## W3C WoT, FIWARE
先述のようなIoT事業者間の非互換を解消するとともに、多様なユースケースにも対応するための国際標準化が現在進行中です。
* [WoT](https://www.w3.org/WoT/)
* [FIWARE](https://www.fiware.org/)

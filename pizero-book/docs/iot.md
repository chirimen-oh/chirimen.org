# IoT
これまでのチュートリアルでは、いずれもそのコンピュータに直接接続されたデバイスを使うものでした。このようなシステムは「スタンドアロン」と呼ばれます。
今までは、ウェブブラウザを使っていたのに、実はウェブの重要な機能～インターネット上の情報基盤 WWW を活用したシステムを作っていなかったのです。（開発環境としては github や CodeSandbox など WWW 上の情報サービスを活用していますが）

このようなインターネットを活用するシステムのことを IoT (Internet of Thing の略)と呼びます。ただし単にPCやスマホで使うウェブサービスが IoT と呼ばれることがありません。チュートリアルで学んだようなセンサーやアクチュエータがシステムに組み込まれ、物理的なモノと相互作用するようなものを特に IoT と呼びます。（なお、 WWW を用いずネットワーク部のインターネットだけを使ったものでも IoT と呼びます。詳しくはwiki<span class="footnote">https://ja.wikipedia.org/wiki/モノのインターネット</span>や、[総務省「 IoT 機器等の電波利用システムの適正利用のための ICT 人材育成事業」における講習会テキスト](https://smartiot-forum.jp/application/files/5315/8642/5503/iot-jinzai-text_verR0202.pdf)なども参考にしてください）

## WebSocket と pub/sub services
### システム構成

![sysConfImg](../../pizero/imgs/IoTsystemConf.png)

今回のチュートリアルでつくる IoT システムの構成図です。

インターネットを介して、左側のアクチュエータや LED を右側のウェブアプリから操作したり、
左側でセンシングしたデータを右側のウェブアプリで表示させたりするシステムですね。

構成要素を見ていきます。

* 左側のボードコンピュータは CHIRIMEN を使ったプログラミングで使用してきた環境やデバイスを使います。
* 右側の PC はどんなブラウザでも動かせるので、スマートフォンを使うこともできます。<br>インターネットにつながっていさえすれば別の場所の PC やスマホでも動きます。これがIoTの便利なところ～遠隔操作ですね。

* Internet の relayService が見慣れないものだと思います。以下で解説します。

### relayService

送り側(左側)の WebApps が、受け側(右側)の webApps に情報を送るなら、直接接続するのが簡単そうです。これはピアツーピア通信と言います。

実はこれは簡単ではありません。 webApps はインターネット上のあらゆるコンピュータ（サーバやブラウザの乗ったPCも含め）に URL でアクセスする必要がありますが、相手の PC に URL でアクセスすることは難しいのです。

一方、(あらかじめ用意されていれば)ウェブサーバには URL でアクセスできます。そこで登場するのが relayServer です。下図のように relayServer(Web Socket Relay Service) を介して webApps が通信します。

  ![Relay Server Configuration](https://chirimen.org/remote-connection/imgs/relay.png)

relayServer は特定のウェブサイトの固有名ではなく、「ウェブアプリ間でリアルタイム性の高いデータのやり取りを仲介する」という機能を持ったウェブサイトの抽象的な名称で pub/sub services と呼ばれることもあります。SNSとかblogとかというのと同じです）

relayServerはトークン(ユーザーやシステムごとに割り当てられたランダムな文字列)ごとにスペース(図の濃い青色)が設けられ、その中にいくつかのチャンネル(図の茶色)を置くことができます。

同じトークンとチャンネルにアクセスしたウェブアプリ同士が通信でき、図ではウェブアプリは２個つながっていますが、何個でもつなげることができます。チャットスペースのようなイメージですね。

#### リアルタイム性
例えば遠隔からカメラのパンチルトをコントロールしたい　などのケースを考えると、IoTではデバイスのコントロールを機敏に行いたいケースが多くあります。（リアルタイム性の高いユースケースが多い）このようなリアルタイム性の高い情報のやり取りのために[WebSocket](https://ja.wikipedia.org/wiki/WebSocket)というブラウザが標準としてサポートするプロトコルがよく使われます。

#### relayServer.js

IoT には relayServer の機能を持つウェブサイトが必要になりますが、これを誰かが運営しなければなりません。実習やプロトタイピングのためにこのようなサイトを自分たちで立ち上げるのはかなり大変ですが、インターネット上では既にいくつもの事業者が relayServer サービスを提供しています。

今回は CHIRIMEN 環境の試験用に、 CHIRIMEN 用に用意された検証用サービス(chirimentest)を使うことにしますが、いくつかある事業者間でサービスの内容に差異があります。サイトごとの差異は主に接続できる端末の管理と情報の取り扱いに関する機能になります。

[relayServer.js](https://chirimen.org/remote-connection/) は、 relayServer サービスによる差異を吸収し複数の事業者を自由に切り替えられ、 WebSocket の標準 API 仕様に沿った作法で webApps (含 Node.js プログラム)間の通信を簡単に使えるようにするライブラリです。

#### relayServer.js を使ったプログラムの流れ

##### 初期化（受信側、送信側共通の処理

```javascript
import {RelayServer} from "https://chirimen.org/remote-connection/js/beta/RelayServer.js";
var relay = RelayServer("achex", "chirimenSocket" );
```

import 文でライブラリ RelayServer.js を読み込んだ後、 relayService のひとつ **achex** に接続しています。  
RelayServer の第二引数 `("chirimenSocket")` はそのサービスを使うためのトークンですが、 **achex** は任意の文字列で利用できてます。

*Node.js では第三,第四引数が必要になります (後述)*

##### チャンネルの作成
* `channel = await relay.subscribe("chirimenMbitSensors");`

  変数 `channel` にRelayServerのチャンネルのインスタンスを登録
  引数はチャンネル名で、自分で好きな名前を与えられます。

  受信側と送信側で同じサービス、トークン、チャンネルを指定する必要があります。

##### データの送信
* `channel.send(data);`

  任意のデータ（data）を relayServer の指定チャンネルに送信します。

  dataは文字列だけでなく、連想配列（構造化されたデータ、オブジェクト）も送信可能です。

##### データの受信
* `channel.onmessage = getMessage;`
チャンネルにメッセージがポストされた時に起動する関数(コールバック関数)を登録しています。

* `function getMessage(msg)`
上で登録した関数の第一引数 (`msg`) のメンバ変数 msg.data に送信されたメッセージが構造もそのままで届きます。

#### セキュリティを考えよう

relayServer を使うということは、情報をインターネット上のウェブサイトに送信することになります。
すると このウェブサイトがその情報をどのように取り扱うのかを理解しておく必要があります。
achex は無料で使え、しかもユーザ登録も不要です。つまりこのサイトに送信した情報は誰でも見ることができてしまうということです。（ただし、トークンとチャンネルを知る必要がある。これが achex のセキュリティレベル）
今回は個人情報などのセキュリティを考慮する必要がない、チュートリアルで使うセンシングデータを送るだけですので問題ありませんが、セキュリティを考慮する必要がある多くの用途ではそのセキュリティ基準に適合したサイトを契約して利用する、もしくは自分でそのようなサイトを立てるなどの必要が出てきます。
relayServer.js でもいくつかの商用サイトの比較と使用方法が記載されているので参考にしてください。

#### Node.jsでの利用

初期化手順に差異があります。

```javascript
import nodeWebSocketLib from "websocket";
import {RelayServer} from "./RelayServer.js";
var relay = RelayServer("achex", "chirimenSocket" , nodeWebSocketLib, "https://chirimen.org");
```

* Node.js では WebSocket を使用するためには websocket ライブラリが必要なので読み込みます
* RelayServer.js や websocket 等のライブラリは、ローカルからの読み込みになります
* RelayServer の第三引数で websocket ライブラリを渡す必要があります
* RelayServer の第四引数で、リファラー<span class="footnote">https://e-words.jp/w/リファラ.html</span> の指定が必要です
  * web アプリの場合はそのコンテンツの配信元の URL がリファラーとして自動設定されますが、 Node.js のアプリはローカルにあるので別途指定が必要
  * achex の場合 URL は何でも許可されますが、他の relayServer サービスでは あらかじめ指定したリファラーが設定されていなければアクセス拒否されるものもあります(これも一つのセキュリティ)

## Webhooks
relayServer が必要なほどリアルタイム性は求めないけれど、むしろ既存の Web サービス・アプリと簡単につなぎたいようなケースでは、 http をそのまま使うことができるでしょう。ただし既存の Web サービス・アプリはウェブブラウザを介して人が操作することが前提でつくられていますので、直接センサーやアクチュエータ（を制御するコンピュータとプログラム～ IoT デバイス）をつなげるにはハードルがあります。
IFTTT に代表されるような Webhooks サービスは、 http を活用することで既存の多くのウェブサービス（ twitter や google のサービスなど）と IoT デバイスを簡単に接続できるようにする中継サービスです。

## IoTクラウドサービス
Webhook のような中継サービスを介さずに、直接 IoT デバイスを接続できるように設計されたサービスが多くの事業者から提供されています。これらのサービスを使うには、各サービス事業者ごとに提供しているAPI・プロトコル等の仕様に基づいた開発が必要になります。

## W3C WoT, FIWARE
先述のような IoT 事業者間の非互換を解消するとともに、多様なユースケースにも対応するための国際標準化が現在進行中です。
* [WoT](https://www.w3.org/WoT/)
* [FIWARE](https://www.fiware.org/)

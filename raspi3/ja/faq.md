# 良くある質問と回答

CHIRIMEN Raspi3 を利用していて良くある質問や回答のメモページです。利用上のテクニックや知っておくと良いことは [TIPS ページ](tips.md) に書いているので、そちらも合わせてご覧ください。

## できること・できないこと

### CHIRIMEN Raspi3 では何が出来ますか？

CHIRIMEN Raspi3 は一般的な Web アプリケーションの開発環境に、GPIO と I2C という IoT プロトタイピングなどでよく使われるハードウェアインターフェイスを [Web GPIO API](http://browserobo.github.io/WebGPIO/) と [WebI2C API](http://browserobo.github.io/WebI2C/) を用いてウェブブラウザの JavaScript から直接制御可能にしたものです。

デスクトップの Web アプリで出来ることは全て同じようにして実装可能ですし、Web アプリで出来ないことはローカルのサーバと通信させたり拡張機能を作って通信させたりして他のコンテキストや言語の環境で実行させることもあります。いろいろな応用の仕方は [TIPS ページ](tips.md) も参考にしてください。

GPIO, I2C 以外によく見聞きするハードのインターフェイスについては次の通りです:

* UART
  * MIDI であれば WebMIDI からコントロール可能です。それ以外はローカルにサーバを立ててサーバ側で処理するなどしてください。
* PWM
  * [CHIRIMEN Examplesに掲載されているI2C PWMコントローラ PCA9685](http://chirimen.org/chirimen-raspi3/gc/top/examples/)を使って、サーボ・DCモーター・さらにLEDのPWM制御ができます。
  * それ以外はローカルにサーバを立ててサーバ側で処理するか Arduino を組み合わせるなどして制御します。いずれの場合もデバイスの仕様 (データシート) をしっかり確認してから使ってください。対応する周波数以外の信号を送るとデバイスにロックがかかったり発熱して故障したりする原因となります。
* SPI
  * クロック、入力、出力の 3 本で双方向通信を行う機能です。CHIRIMEN では現在の所 SPI を JavaScript から直接制御する API を実装していません。SPI を利用したい場合はローカルにサーバを立ててサーバ側で処理するか Arduino を組み合わせるなどして制御します。
  
また、GPIO, I2Cに対しては以下の制限があります。
* GPIO
  * 概ね50ms以下の周期で細かくHigh/Lowを切り替える必要があるもの（例えばステッピングモータを高速に動かしたいなど）や、概ね50ms以上の精度を必要とするも、複数のGPIO端子を同様な高精度で同期させる必要があるものは困難です。
  * ハードウェア上で用意されている本数以上のGPIOを用いるもの（I2C接続のGPIOマルチプレクサを使うことでI2C経由で対応可能と思われますが未検証です)
* I2C
  * 標準モード以外のモードで動作するもの
  * ハードウェア上で用意されている本数以上のI2Cバスの本数が必要なもの

## 動作環境

### Raspberry Pi 3 Model A+ はサポートしないの？

理論的には移植可能と考えられますが、本ページの執筆時点では技適通過モデルの販売が開始されておらず、未検証です。Model B, Model B++ と比べると Model A+ ではメモリ容量が半分となるため、Chromium 以外に多くのアプリケーションを同時に起動すると処理が重たくなることが予想されます。

### Raspberry Pi Zero はサポートしないの？

論理的には移植可能と考えられますが、未検証・未対応です。

### Raspberry Pi 以外のボードでは動作しないの？

CHRIMEN コミュニティで公式にサポートしている環境はありませんが、Chrome (Chromium) や Firefox のようなブラウザが動作し、Node サーバなどがインストールできる環境であればほぼ同様にして動作するように移植可能と考えられます (実際いくつかのボードで試して使っているコミュニティメンバーもいます)。

もちろん、ポート番号など物理配線が違う場合はそれに合わせてコードを書き換える必要があることには注意が必要です。

## サービス連携

### メールを送信したい

スパム対策などもあり、ローカルのメールサーバなどからの送信は正しく配信されないことがあるため、Gmail などのメールサービスを利用して送信することが望ましいです。Gmail などのメール送信 API を利用するための認証などの実装が面倒な場合は IFTTT のトリガーとして [Webhook](https://ifttt.com/maker_webhooks) を、アクションとして [Gmail](https://ifttt.com/gmail) を利用するなどすれば比較的簡単にメールの送信が可能です。

### LINE, Slack その他のサービスと連携したい

IFTTT のトリガーとして [Webhook](https://ifttt.com/maker_webhooks) を利用すると簡単に様々なサービスとの連携が可能です。Webhook 用の URL や使い方は IFTTT にログインしてから [Webhook](https://ifttt.com/maker_webhooks) ページからリンクされている documents ページや [Webhooks settings ページ](https://ifttt.com/services/maker_webhooks/settings) をご覧ください。

IFTTT では応答性が悪い (トリガーをキックしてからアクションまでの待ち時間が長すぎる) 場合は連携先のサービスの API を使って自分で直接各サービスとの連携を実装してください。

## 他のプログラムとの連携

CHIRIMEN ではブラウザ上の JavaScript だけでハードウェア制御を可能にしていますが、様々な理由で C, Python, Node, シェルスクリプトなどで書かれたコードと連携したいことがあります。そのような場合はブラウザの JavaScript とバックエンドのコードとの間を WebSocket で接続して通信させながら動作させてください (非常に高速な通信が必要な場合は除く)。

例えば Node で WebSocket サーバを作る場合はこのように index.js ファイルを作成し

```javascript
// Node で実行する JavaScript (index.js)
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port:8080 });

wss.on('connection', function(ws) {
    // ブラウザからメッセージを受信した時の処理
    ws.on('message', function(message) {
        console.log("Message Received: " + message);
    });

    // ブラウザにメッセージを送信する時の処理
    wss.clients.forEach(function(client){
        client.send("A message from server");
    });
});
```

次のように ws モジュールのインストールと node サーバの実行をすればサーバが起動します。

```sh
// ws モジュールを現在のディレクトリにインストール (初回一度だけ必要)
npm install ws
// index.js を node で実行する:
node index.js
```

この Node サーバにブラウザ側からは次のようにメッセージの送受信が可能です。

```javascript
// ブラウザで実行する JavaScript
var ws = new WebSocket('ws://localhost:8080');
ws.addEventListener('open', function(event){
    console.log('WebSocket 接続完了');

    // サーバからメッセージを受け取ったときの処理
    ws.addEventListener('message',function(e){
        console.log("Message Recieved: " + e.data);
    });
    
    // サーバにデータを送信するときの処理
    ws.send("A message from browser");
});
```


## トラブルシューティング

### 同時に複数のタブで開くと動作しない

制限事項です。API では特に規定されていませんが排他制御をしており同一のページを複数タブで開くなど、同じポートを同時に扱うコードを書くと正しく動作しなくなることがあります。全てのタブを閉じてから目的のページだけを開き直してください。

### コンソールに `Uncaught ReferenceError: xxx is not defined` などと表示される

変数 `xxx` にアクセスしようとしているがそれが定義されていないというエラーです。単純に変数名などを Typo (入力し間違え) していることが多いです。次に多いのは定義域の外でアクセスしようとしている場合です。JavaScript の変数スコープは var で宣言した場合は関数単位、let や const で宣言した場合にはブロック単位です。別の関数の中からなど、スコープ外からアクセスしようとしていないか確認してください。

### コンソールに `Uncaught TypeError: Cannot read property 'xxx' of null` や `Uncaught TypeError: Cannot read property 'xxx' of undefined` などと表示される

オブジェクトのプロパティ `xxx` にアクセスしようとしている (`some.xxx` のようなコード)、プロパティ `xxx` を持つと考えている変数 `some` がオブジェクトではなく null や undefined となっており、プロパティアクセスができないというエラーです。変数 `some` の取得・代入をしているコードに問題がないか確認してください。

### コンソールに `Uncaught (in promise) TypeError: navigator.requestGPIOAccess is not a function` などと表示される

関数 (メソッド) 呼び出ししようとしているがその関数が定義されていないというエラーです。この場合 `navigator.requestGPIOAccess` が関数ではないと言うことですが、polyfill スクリプトを読み込んでいないか、読み込みより前にアクセスしようとしている場合に発生します。

### コンソールに `Uncaught SyntaxError: await is only valid in async function` などと表示される

`await` 文は async (非同期) 関数の中でのみ利用可能です。関数の中で `await` を使って非同期処理を行いたい場合、その関数を async 関数として宣言する必要があります。`addEventListener` など引数に関数を渡している場合に `async` を付け忘れているケースが多いので注意してください。

```
// 関数宣言:
async function wait100ms() { await sleep(100); }
// 匿名関数を使う場合:
element.addEventListener("click", async function() { await sleep(100); }, false);
// アロー(矢印)関数を使う場合
element.addEventListener("click", async () => { await sleep(100); }, false);
```

### JS Bin のコンソールに `error: ws error: [object Event]` と表示される
### コンソールに `WebSocket connection to 'wss://localhost:33330/' failed: Error in connection establishment: net::ERR_CONNECTION_REFUSED` などと表示される

CHIRIMEN Raspi3 のバックエンドサーバに接続できていません。デスクトップの reset.sh で再起動してください。

### JavaScript から特定の URL にアクセスできない
### コンソールに `Failed to load https://...: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'https://...' is therefore not allowed access.` などと表示される
### コンソールに `Access to fetch at 'https://...' from origin 'https://...' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.` などと表示される

CHIRIMEN に限らず一般的な Web 開発でよく見かけるエラーです。Web には [同一オリジンポリシー (Same Origin Policy)](https://developer.mozilla.org/ja/docs/Web/Security/Same-origin_policy) というセキュリティ制約があり、JavaScript を読み込んでいるのと異なるドメインの URL には相手側のサーバが [オリジン管理ソース共有 (CORS)](https://developer.mozilla.org/ja/docs/Web/HTTP/HTTP_access_control) で明示的に許可している場合以外は JavaScript のコード中で XMLHttpRequest や fetch からアクセスできません。

単純化して言えば、サーバからの HTTP レスポンスヘッダに `access-control-allow-origin: *` が付与されていれば JavaScript からのアクセスが許可されるため、任意の URL へのアクセスをプロキシ (中継) してレスポンスヘッダを勝手に追加してくれるようなサーバを用意すれば任意のドメインから任意の URL にアクセスが可能になります。

そのような機能を持った公開の CORS プロキシサービスには例えば https://cors-anywhere.herokuapp.com/ や https://cors.io/ など[いろいろなものがあります](https://gist.github.com/jimmywarting/ac1be6ea0297c16c477e17f8fbe51347)。なお、これらのサービスの利用は本来のセキュリティ機能を無視するものであり、利用に際しては注意が必要です。あくまでもプライバシー情報などを含まないものについて、テストやプロトタイピング時だけに限って利用すべきです。


### コードも配線も正しいのにとにかく動作しない！

いろいろな原因が考えらるため、ひとつずつ確認していく必要があります。

* 開発者ツールのコンソールに何かエラーメッセージは出ていないですか？
  * JS Bin などのコンソールだけでなく、ブラウザのエラーコンソールも確認してください
  * 何もエラーが出ないと言っても最初に 1 行だけエラーが出ているケースなどあります。ページをリロードして何もエラーがないか確認してください
* 開発者ツールのネットワークパネルで読み込みできていないファイルはないですか？
  * polyfill や driver などを相対パスで読み込んでいる HTML のディレクトリを移動させた場合、相対パスが変わって必要なファイルが読み込みできなくなっていることがあります
* 配線は本当に正しいですか？
  * 慌てて配線すると RasPi のピンの配置を 180° 反転させた逆向けで配線していることがあります
* 配線はしっかりしていますか？
  * ジャンパーピンやピンヘッダーの太さが細すぎないか。ブレッドボードに刺す前提で細いピンヘッダを採用しているセンサー (秋月電子の商品など) がありますが、これらをピンソケットに刺すと接触が不安定になることがあります
  * センサー類などの基盤にピンヘッダーを付けている場合はそれがしっかり半田付けされているか
* 利用ハードウェアに不良・故障はないか？
  * 不良・故障の可能性のあるハードを順に交換して試してください
  * ソフトウェアと違いハードウェアには配線を間違って使うと不可逆的な損傷を受けて正常動作しなくなるパーツも存在します。抵抗無しで LED を接続して焼け飛ぶ場合や DC ファンを極性と異なる向きに繋いで焼いてしまった場合などが典型的ですが、壊れたら交換するしかありません
  * サーボモータドライバーなど手作業での半田付けを行うピンヘッダ数が多いパーツなどは半田付けになれている人が作らなければ不良品になることが多く見られます。半田付け直後は動作しても保管している間にダメになるケースもあるので注意してください
  * ジャンパーケーブルのような単純なパーツも安物であれば大容量の電流を流したり曲げを繰り返していると繋がらなくなるケースがあります。ブレッドボードも繰り返し使っているうちにピンの固定が緩く接触不良になることがあります。消耗品は調子が悪くなったら交換してください
* CHIRIMEN Raspi3 のバックエンドサーバに問題がないか？
  * 同時に複数のタブで同一ポートにアクセスしたりする場合、大抵は適切に排他制御されてタブを閉じてから開き直すだけで解決しますが、処理の仕方やタイミングなどによっては何らかの理由でバックエンドサーバに不具合が起きる場合もあるようです。デスクトップの reset.sh で再起動して再度試してみてください。

ハンズオン・ハッカソン・講義など、講師やチューターなどのいる時は、色々試して分からないときは一人で悩まず遠慮なく質問しましょう。
ひとつのことに悩んで糸口が見つけられないまま何十分も過ごさず、どんどん質問してデバッグテクニックや回避策などを教わってスキルを向上させていってください。


## デバッグチェックリスト

問題解決のためのチェックリスト (初心者向け) を書いてみたので参考にしてください:

- 開発ツールでのエラーの確認
  - エラーコンソールにエラーメッセージが出力されていないか
    - デバイスにアクセスできないケースにはコードでなく配線に問題がないかも確認する
  - ネットワークパネルでファイル読み込みやアクセスのエラーがないか
- JavaScript コードの確認
  - 該当コードが呼び出されているか
    - 処理が行われない場合、そもそもそのコードが実行されていないことが多いです
    - まずは console.log やブレークポイントで実行されていることを確認します
    - イベントハンドラはイベントの発生前に登録できているか。例えば onload イベントで実行する関数を onload 後に登録するなどしていないか
  - 変数のスコープ (定義域) に問題がないか
    - 別の関数で宣言した変数にアクセスしようとしていないか (コードをコピペなどで移動させたときに特に注意)
  - 実行順序が意図した通りか
    - console.log やブレークポイントで実行順序を確認します
    - 非同期処理の呼び出し時に await を付け忘れていないか確認します
  - 変数には意図した値が代入されているか
    - 様々な原因で意図せぬ値が入っていることがあるため実際の値を console.log やブレークポイントで停止した状態で確認します
    - HTML 要素を取得する場合、要素の読み込みより後で JavaScript を実行しなければ取得できないことに注意してください
- 配線の確認
  - ピンヘッダの何処にどのジャンパーワイヤを刺しているか確認する
  - ピンヘッダに刺す位置を 180° 反転した逆向きに指していないか
  - コードで指定しているピン番号と配線は一致しているか
  - 抵抗などのパーツの配線も正しく行われているか
- 機材の故障
  - LED など内部抵抗の小さいデバイスを抵抗無しで通電するなどすると故障します
  - DC ファンなど極性のあるデバイスは逆指しすると故障します
  - 配線中にショートさせたりするとデバイスも RasPi ボードも故障します

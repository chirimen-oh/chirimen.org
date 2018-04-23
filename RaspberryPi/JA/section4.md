# 概要

CHIRIMEN for Raspberry Pi 3 を使ったプログラミングを通じて、[Web GPIO API](https://rawgit.com/browserobo/WebGPIO/master/index.html) や Web I2C API の使い方を学ぶチュートリアルです。

今回は、Web GPIO API と Web I2C APIを組み合わせたWebアプリを作ってみます。

最終回じゃなくなりました!!!

(※1) CHIRIMEN for Raspberry Pi 3とは
Raspberry Pi 3（以下「Raspi3」）上に構築したIoTプログラミング環境です。

Web GPIO API (Draft)や、Web I2C API (Draft)といったAPIを活用したプログラミングにより、WebアプリからRaspi3に接続した電子パーツを直接制御することができます。 
CHIRIMEN Open Hardware コミュニティにより開発が進められています。

前回までのおさらい
本チュートリアルを進める前に前回までのチュートリアルを進めておいてください。

CHIRIMEN for Raspberry Pi 3 Hello World
CHIRIMEN for Raspberry Pi 3 チュートリアル 1. GPIO編
CHIRIMEN for Raspberry Pi 3 チュートリアル 2. I2C　基本編（ADT7410温度センサー）
CHIRIMEN for Raspberry Pi 3 チュートリアル 3. I2C　応用編（その他のセンサー）
前回までのチュートリアルで学んだことは下記のとおりです。

CHIRIMEN for Raspberry Pi 3 では、各種exampleが ~/Desktop/gc/配下においてある。配線図も一緒に置いてある
CHIRIMEN for Raspberry Pi 3 で利用可能なGPIO Port番号と位置は壁紙を見よう
CHIRIMEN for Raspberry Pi 3 ではWebアプリからのGPIOの制御にはWeb GPIO API を利用する。GPIOポートは「出力モード」に設定することでLEDのON/OFFなどが行える。また「入力モード」にすることで、GPIOポートの状態を読み取ることができる
async function を利用すると複数ポートの非同期コードがすっきり書ける
CHIRIMEN for Raspberry Pi 3 ではWebアプリからI2C通信に対応したモジュールの制御にWeb I2C API を利用することができる
I2Cモジュールは1つのI2Cバス上に複数接続することができる。Grove I2C Hubを利用すると接続が簡単になる
今回つくるもの
シンプルに下記のような基本仕様にしてみます。

定期的に測定した温度を画面に表示する。
一定温度以上になったらDCファンを回す。一定温度以下になったらDCファンを止める。
1. GPIO編 でMOSFET＋DCファンと2. I2C　基本編（ADT7410温度センサー） で使った温度センサーがあればできそうですね。

1.準備
用意するもの
このチュートリアル全体で必要になるハードウエア・部品は下記の通りです。

CHIRIMEN for Raspberry Pi 3 Hello World に記載の「基本ハードウエア」
ブレッドボード x 1
ジャンパーワイヤー (オス-メス) x 3
Nch MOSFET (2SK4017) x 1
リード抵抗 (1KΩ) x 1
リード抵抗 (10KΩ) x 1
DCファン x 1
ADT7410 x 1
ジャンパーワイヤー (メス-メス) x 4
今回用意するものが多いですが、これまでのチュートリアルで使ったことがあるものばかりですので、ご安心ください。

parts-1

2.まずは仕様通りにつくる
a. 部品と配線について
Raspberry Pi 3との接続方法については、下記回路図を参照ください。

schematic

b. 接続確認
今回の回路用のコードはまだ書いていませんので、下記方法で配線の確認をおこなっておきましょう。

Lチカのサンプルを使って、DCファンが回ったり止まったりすることを確認
i2cdetectコマンドを使い、SlaveAddress 0x48 が見つかることを確認
c.コードを書いてみる
jsfiddle を使ってコードを書いていきましょう。
今回は「あえて」記事中にコードを掲載しません！
これまでのチュートリアルで実施してきたことの復習です。頑張ってください！

HTML
jsfiddle のHTMLペインには下記内容のコードを記載してください。

Web GPIO API / Web I2C API の polyfill を読み込むコード
ADT7410のドライバーライブラリを読み込むコード ※任意。以前の記事 を参考に、ドライバーを使わずに書いても良いです。
温度表示用の要素 (DIVタグなど)
JavaScript
続いてJavaScriptペインには下記内容のコードを記載します。

Web GPIO API の初期化 (navigator.requestGPIOAccess()でGPIOAccessインタフェースの取得)
GPIOAccessで 26番ポートのportオブジェクトを取得
26番ポートを「出力モード」に設定

Web I2C API の初期化 (navigator.requestI2CAccess()でI2CAccessインタフェースの取得)

I2CAccessで、1番のI2CポートのI2CPortオブジェクトを取得

ADT7410のインスタンスを生成し、init()による初期化を行なっておく

ここまでを実施しておきましょう。

ヒント: Promiseやasync functionを使って「3. 26番ポートを「出力モード」に設定」が終わってから、「4. Web I2C API の初期化」を開始するように書いてみましょう。

1.〜 6. までの処理が全て終わってから、以降の処理が行われるように書いていきます。

adt7410.read()を使い定期的(1秒ごと)に温度を読み込む
温度データを HTMLの表示用要素に反映させる。温度が30度以上なら、表示に変化をつける (文字を大きくする、赤くする、等)
温度が32度以上になったら GPIO 26番ポートに1 (HIGH)を書き込むことでファンを回す。温度が32度未満なら、GPIO 26番ポートに0 (LOW) を書き込むことでファンを止める
ここまでできたら動くはずです！

と書いてる人が実は動かなくて 3時間悩んだのは秘密... 
動かない原因→ Ver. 2017.09.27-2 に同梱のPolyfillに不具合があることがわかったので、オンライン側は対応済み。
次回環境リリース時に環境同梱版のPolyfillも直ります。

3.完成度を上げるために
ここまでのチュートリアルで Web GPIO APIや Web I2C APIの使い方はもうお腹いっぱい！という状況かと思います。おつかれさまでした！

最後に、CHIRIMEN for Raspberry Pi 3を使って「楽しい作品」を仕上げるためのTipsをいくつか書いてこのチュートリアルを締めくくりたいと思います。

a. 全画面表示
jsbinやjsfiddleはコードの学習を進める上では便利なサービスですが、各サービスのメニューやコードが常に表示されてしまい「画面だけを表示する」ということが
できません。

このため、プログラミングを進める時はjsfiddleなどで進め、ある程度コードが固まって来たら index.htmlファイルなどに保存して、ブラウザで直接 index.htmlを表示する方が良いでしょう。

さらに、サイネージのような作品の場合、ブラウザのメニューやタスクバーすらも表示せずに全画面表示にしたいケースもあるでしょう。

Raspberry Pi 3 の Chromium Browserで全画面表示を行うには、コマンドラインから下記のように入力します。

chromium --kiosk

全画面表示を終了するには、ctrl + F4 を押します。

b. Web GPIO API / Web I2C API 以外のIoT向け機能
今回は、CHIRIMEN for Raspberry Pi 3 で拡張を行った Web GPIO API と Web I2C API の利用方法を学習してきましたが、他の方法でもブラウザと外部デバイスがコミュニケーションする方法がありますので、CHIRIMEN for Raspberry Pi 3で利用可能な他の手段を簡単にいくつか紹介しておきます。

Web Bluetooth API : Webアプリから BLEを使った通信を行うためのAPIです。無線で外部機器と通信することができます。入出力が可能です。
Web MIDI API : WebアプリからMIDI機器と通信するためのAPIです。外部機器との入出力が可能です。
keyイベント/Mouseイベントの応用 : USB-HIDデバイスを作成できるArduino Leonardoなどを利用することで、そういったボードからの入力をキーイベントやマウスイベントとして受け取ることができます。入力にしか使えませんが、USB経由でKeyイベントに対応するブラウザは非常に多いので、様々な環境への応用が必要な場合には選択肢になりうると思います。
また、将来的にはUSB機器が直接ブラウザから制御可能になる Web USB API なども利用可能になる可能性がありますが、残念ながら現在のバージョンの CHIRIMEN for Raspberry Pi 3 環境で利用している Chromium Browserでは利用できません。

c. githubの活用
現状の CHIRIMEN for Raspberry Pi 3 には標準では Webサーバが含まれていません。
最近のセキュアドメイン からの実行でないと許可されない Web APIも増えています。

index.htmlなどのファイルができたら、GitHub pagesなどを使って公開すると良いでしょう。

GitHub Pagesの使い方は、下記記事が参考になります。

GitHubを使ってWebサイトを公開する
無料で使える！GitHub Pagesを使ってWebページを公開する方法 (TechAcademy Magazine)
d. Raspberry Pi で使えなかった機能 (WIP)
Raspberry Pi 3 は非常に使いやすいSBC（シングルボードコンピュータ）ですが、一般的なPCと比べるとやはり非力です。
筆者が試してダメだー！ってなったポイントを書いてみたいと思います。(今後も追記予定)

他にもいろいろあると思うのでコメントいただけたら嬉しいです！

WebGLがまともに動作しない → 諦めてCanvasを使おう
Speech Synthesis APIが動作しない
さいごに
このチュートリアルでは 下記について学びました。

Web GPIO APIと Web I2C APIを組み合わせたプログラミング
最後に、本稿に最後までおつきあいいただき、ありがとうございました。

WebBluetooth編に続きます!

また、CHIRIMEN for Raspberry Piはまだ生まれたばかりです。いろいろと至らない点も多く、今後もオープンソースを前提にどんどん洗練していかなければなりません。課題は山積みです。

どうか、様々なご支援をいただきたく、よろしくお願いいたします。

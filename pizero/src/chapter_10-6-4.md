# 10.6.4 relayServer.js

IoT には relayServer の機能を持つウェブサイトが必要になりますが、これを誰かが運営しなければなりません。実習やプロトタイピングのためにこのようなサイトを自分たちで立ち上げるのはかなり大変ですが、インターネット上では既にいくつもの事業者が relayServer サービスを提供しています。

今回は CHIRIMEN環境の試験用に、CHIRIMEN用に用意された検証用サービス(chirimentest)を使うことにしますが、いくつかある事業者間でサービスの内容に差異があります。サイトごとの差異は主に接続できる端末の管理と情報の取り扱いに関する機能になります。

[relayServer.js](https://chirimen.org/remote-connection/) は、relayServerサービスによる差異を吸収し複数の事業者を自由に切り替えられ、webSocket の標準 API仕様に沿った作法で WebApps(含Node.jsプログラム)間の通信を簡単に使えるようにするライブラリです。
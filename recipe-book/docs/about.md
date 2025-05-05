# CHIRIMEN とは

![CHIRIMEN_pf](../images/CHIRIMEN_pf.png)

CHIRIMEN は Web ブラウザや Node.js の JavaScript からハードウェアを制御するプロトタイピング環境です。

CHIRIMEN コミュニティと W3C の [Browsers and Robotics コミュニティグループ](https://www.w3.org/community/browserobo/)では、JavaScript で Web アプリから電子パーツを直接制御できる低レベルハードウェア制御 API ([WebGPIO API](http://browserobo.github.io/WebGPIO) や [WebI2C API](http://browserobo.github.io/WebI2C) など) の標準化に向けての検討・提案と、それらの API を Raspberry Pi などの開発ボード上で使うプロトタイプ環境 (CHIRIMEN 環境) を実装しています。

Web ページや Node.js 上の JavaScript から直接ハードウェアを制御できるため、既存の Web 技術や知識を活かしつつ、ひとつのプログラムで画面表示やサービス連携と電子パーツの制御を統合できます。
開発環境もローカルエディタだけでは無く Web ブラウザ上のオンラインエディタで動くようにしており、[サンプルコード集](https://github.com/chirimen-oh/chirimen.org/tree/master/pizero/src/esm-examples)の通り配線しタブを開くだけですぐに[多数の電子パーツ](https://tutorial.chirimen.org/partslist)を試して頂けます。

電子パーツ制御のために専用のツールや開発環境を用意したり、複数の言語やプログラムを連携させたり、独特のフレームワークを学習・利用したりする必要はありません。Web 標準技術をベースとしており、素早いプロトタイピングやプログラミング初学者の IoT 学習に最適です。

## CHIRIMEN のメリット

- 広く使われている標準技術を学習できるので
  - 学習のハードルが低い
  - 得たスキルが広く長く役立つ
  - インターネットでノウハウを検索しやすい
- Web 技術を活用するので
  - WWW のサービスと簡単に連携できる
  - ユーザーインターフェースやコンテンツを簡単に作れる
  - Web ブラウザを使って開発できる

## コミュニティについて

何か不明点や困ったことがあれば CHIRIMEN コミュニティの [Slack](http://chirimen-oh.slack.com/) や [Github](https://github.com/chirimen-oh/) の各リポジトリの issues でご連絡・ご相談ください。

- [Slack](http://chirimen-oh.slack.com/) 
- [Github](https://github.com/chirimen-oh/)
- [X](https://x.com/chirimen_oh)
- [Facebook](https://www.facebook.com/groups/chirimen/)

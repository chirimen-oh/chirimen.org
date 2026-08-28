# LTspice入門

## LTspiceの概要

[Linear Technology](http://www.linear.com/)社は、便利な*無料の*[回路シミュレーションツール](http://www.linear.com/designtools/software/)とデバイスモデルを提供している。
このチュートリアルでは、無料の集積回路シミュレータであるLTspice IVの基本的な使い方を扱う。

## 使い始める

LTspice IVは、Windows版を[こちら](http://ltspice.linear-tech.com/software/LTspiceIV.exe)、Mac OS X 10.7以降向けを[こちら](http://ltspice.linear-tech.com/LTspiceIV.dmg)からダウンロードできる。
Linear Technology社はこれらのパッケージを随時更新しているため、最新版は[公式サイト](http://www.linear.com/designtools/software/#LTspice)で確認してほしい。
このチュートリアルではこの実行ファイルへのリンクを使うが、これは筆者が実際に使用しているバージョンである。

> [!NOTE]
> Ubuntu Linuxを使っている場合は、WineベースのPlayOnLinuxというツールを検討してみるとよい。ある顧客がUbuntu上でこれを試しており、その[フォーラムへの投稿](https://electronics.stackexchange.com/questions/18760/comparison-between-spice-simulators/43329#43329)に詳しい情報がある。PlayOnLinuxのインストールガイドとしては、[PlayOnLinux Ubuntu Documentation](https://help.ubuntu.com/community/PlayOnLinux)や[How does one install PlayOnLinux?](https://askubuntu.com/questions/233782/how-does-one-install-playonlinux)も参考になる。

LTspice IVを起動したら、次の動画を見ながら、メニューの操作方法や回路図・波形表示の設定、新しい回路図の追加、部品の配置と整理、そして分圧回路の簡単な直流動作点解析の実行方法を確認してほしい。

[Getting Started with LTspice（LTspiceの使い始め方）](https://www.youtube.com/embed/FWGC9SqA3J0/)

### 覚えておくと便利なこと

[ホットキーとシミュレータディレクティブ](http://cds.linear.com/docs/en/software-and-simulation/LTspiceIV_flyer.pdf)：ショートカットを使うと作業がはかどる。シミュレータディレクティブは、いわゆるドットコマンドである。LTspiceのHELPメニューでこれらをじっくり確認しておくことをおすすめする。HELPメニューには構文と各コマンドの説明が載っている。個々のコマンドについては、今後の動画で1つずつ扱っていく。うまく動かせない場合は、フォーラムで相談してほしい。

[ラベル](http://cds.linear.com/docs/en/software-and-simulation/LTspiceGettingStartedGuide.pdf)：23ページを開くと、8000ではなく8kのように値をラベル表記する方法がわかる。

## シミュレーション：過渡解析

時間領域の過渡解析とは、電圧や電流といったパラメータを時間の関数としてプロットするものである。
出力波形を見れば、指定した時間内での挙動を確認できる。
この例では、[半波整流回路](http://www.circuitstoday.com/half-wave-rectifiers)の出力をシミュレートする。
この種の解析を通じて、回路図に交流信号源を追加する方法と、特定のダイオードを選ぶ方法を扱う。

[Transient Analysis in LTspice（LTspiceでの過渡解析）](https://www.youtube.com/embed/X8xdeQfKhx4/)

## シミュレーション：AC解析

AC解析は、回路の周波数特性を示してくれる。
出力波形は[ボード線図](http://lpsa.swarthmore.edu/Bode/Bode.html)として表示され、指定した周波数範囲における振幅と位相を確認できる。
AC解析にはいくつかの表示方法がある。ボード線図として見ることもできれば、実数軸と虚数軸を持つ直交座標平面上で見ることも、ナイキスト線図として見ることもできる。

ここでは、受動素子だけで構成された1次の[ローパスフィルタ](http://www.electronics-tutorials.ws/filter/filter_2.html)を作り、そのプロットからどのような情報が読み取れるかを見ていく。

[AC Analysis in LTspice（LTspiceでのAC解析）](https://www.youtube.com/embed/FR29PyRc_Tg/)

## シミュレーション：DCスイープ

DCスイープは、指定したデバイスの電圧や電流を変化させながらシミュレートする解析である。
SparkFunの部品の回路図にはすべて、その製品が安全に動作する電圧範囲が示されている。
そこで、SparkFunの製品を1つ取り上げ、その電圧範囲がどれだけ正確かを確かめてみることにした。
この例では、[エレクトレットマイクブレイクアウトボード](https://www.sparkfun.com/products/12758)を扱う。

[DC Sweep in LTspice（LTspiceでのDCスイープ）](https://www.youtube.com/embed/Iq4N4UaJ4v4/)

## シミュレーション：ノイズ

[ノイズ解析](http://www.ni.com/tutorial/14516/en/)を使うと、正しくモデル化されていれば、システムに内在するノイズや外部から混入するノイズを確認できる。
ノイズがもっとも問題になりやすいのは、精度がすべてを左右するオペアンプ回路である。
たとえば、オペアンプで電流を検知するバッテリー管理システムを考えてみよう。
充電式電池の充電サイクルや負荷電流は、電池全体の健全性とユーザーの安全にとって非常に重要な監視項目である。
オペアンプ回路にノイズが乗ると電流の読み取り値がずれてしまい、マイクロコントローラ側で過電流や電流不足を正しく検知できなくなるなど、望ましくない影響が出ることがある。
本来ならオーディオ回路を例にするほうがわかりやすかったかもしれないが、要は望まないノイズは悪影響を及ぼしうるということである。

引き続きエレクトレットマイクブレイクアウトボードのプリアンプ回路を使い、ノイズ解析を実行してみる。
LTspiceは、回路の[ショットノイズ、フリッカーノイズ、熱雑音](https://ja.wikipedia.org/wiki/%E3%83%8E%E3%82%A4%E3%82%BA_%28%E9%9B%BB%E5%AD%90%E5%B7%A5%E5%AD%A6%29))をモデル化できる。

[Noise Analysis in LTspice（LTspiceでのノイズ解析）](https://www.youtube.com/embed/IUxua3jeZQo/)

## シミュレーション：DC伝達関数

DC伝達関数（DC Transfer）は、回路の低周波ゲインと、入力・出力インピーダンスを計算する。
引き続きエレクトレットマイクブレイクアウトボードを例に、まずは伝達関数を計算してみよう。
出力電圧は入力電圧のちょうど半分にバイアスされていることがわかっている。
伝達関数は出力が入力の関数としてどう振る舞うかを表すものなので、この伝達関数は1/2に等しいはずである。
VCCを5Vとすれば、Voutは2.5Vになる。
オペアンプは理想的な電圧源のように振る舞ってほしいので、この回路の出力インピーダンスは低くなるはずである。
出力インピーダンスが低いほど、出力に最大限の電力が供給され、ADCにとって最良の値が得られる。
出力インピーダンスは、0に近いほどよい。
同様に、入力インピーダンスは、信号源から電流を引き込みすぎないよう高くしておきたい。
実際にシミュレーションを行い、伝達関数が狙いどおりに設計されているか確認してみよう。

[DC Transfer Function in LTspice（LTspiceでのDC伝達関数解析）](https://www.youtube.com/embed/Citk1YVUsHA/)

## 新しいモデルを作る

LTspiceで独自のモデルを作るには、いくつかの手順を踏む必要がある。
モデルは、サブ回路とシンボルから構成される。
ここでは例として、ポテンショメータのモデルを作ってみる。SparkFunの10kトリムポットをもとにしたモデルである。
数か月前、555タイマーをもとにした個人用のはんだ付けキットを設計したことがある。
LTspiceには標準でポテンショメータが用意されていないため、自分で作ることになった。
たいていの場合、トリムポットを抵抗としてシミュレートするだけで問題ない。
しかし、これから電子工作を学ぶ学生にこのキットを配ることを考えており、抵抗のシンボルとその使い方と、ポテンショメータのシンボルがこの回路でどう使われるかの違いを理解してもらいたかった。

以下の動画で、自分のポテンショメータモデルをLTspiceで作る手順を確認できる。

[Creating a Potentiometer Model in LTspice（LTspiceでポテンショメータのモデルを作る）](https://www.youtube.com/embed/LUTON6WkwCg/)

## サードパーティ製モデルを追加する

サードパーティ製のモデルをLTspiceに取り込む方法は複数ある。
その中でも、もっとも速くて簡単だと感じている方法を1つ紹介する。
他の方法についても、いずれフォーラムに別の動画を追加する予定である。
うまくいく方法を見つけたら、ぜひフォーラムで共有してほしい。
特定の方法でうまくいかない場合も、フォーラムで質問してもらえれば動画で回答する。

[Adding Third Party Models in LTspice（LTspiceにサードパーティ製モデルを追加する）](https://www.youtube.com/embed/OcnZnHd6Zdk/)

## まとめ

- LTspice用の[フォーラム](https://forum.sparkfun.com/viewforum.php?f=53)もぜひ確認してほしい。質問や解決策の投稿、チュートリアルのサンプル回路の入手、毎週追加される新しい動画の視聴、LTspiceコミュニティへの参加ができる。LTspiceのフォーラムは他にもたくさんあるが、新しいフォーラムには新しいフォーラムなりの良さがある。
- Linear Technology社による[動画チュートリアル集](https://www.youtube.com/playlist?list=PL4vooS_8RnzE4EoE27QssuxsccFmspbRP)もある。
- Linear Technology社によるLTspiceの[Getting Started Guide](http://cds.linear.com/docs/en/software-and-simulation/LTspiceGettingStartedGuide.pdf)。
- このリストは随時更新される予定である。

タグ: 概念、電気工学、ツール

---

出典：[Getting Started with LTspice](https://learn.sparkfun.com/tutorials/getting-started-with-ltspice)（SparkFun Learn）を日本語に翻訳し、再構成した。
原文は [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) ライセンスで公開されており、本ページも同ライセンスの下で提供する。

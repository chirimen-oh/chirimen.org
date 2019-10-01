この資料は CHIRIMEN for Raspberry Pi3 を使った講習会向けの Tips です。

# 非同期処理 (async await 版)

## はじめに

[Javascript の初歩](https://webiotmakers.github.io/static/docs/2017/maebashi-js.pdf)を勉強した後、CHIRIMEN for Raspberry Pi でデバイスを接続してコントロールできるようになるには、一つ重要な概念とそのコーディングの作法を学ぶ必要があります。それが**非同期処理**という特別な処理方法です。

## 非同期処理

CHIRIMEN for Raspberry Pi でのプログラミングでは、センサーやアクチュエータを使いますが、これらは動作するのに無視できない時間がかかります。例えば、体温計の測定やロボットハンドの腕の動きを想像してみてください。非同期処理はこのような動作に時間がかかる処理において、**処理の完了を待って次の処理を行う**ときによく使われます。_(非同期処理無しに待とうとすれば、その間ブラウザ画面がフリーズしてしまいます。）_

非同期処理のプログラムにはいくつもの書き方があり、統一されていません。また、入れ子が深かったり、無名関数が使われていたりして、読み解くのが難しい書き方がほとんどです。CHIRIMEN の講習では async await を用いた方法に統一して説明をするようにしています。関数の入れ子を作らずに非同期処理が書け、基本的な文法を学んだ方にとって比較的わかりやすい記法のためです。

- _注記 1: async await はかなり新しい javascript の文法です。が、CHIRIMEN for Raspberry Pi3 をはじめ新しいウェブブラウザは既にサポートしています_
- _注記 2: 非同期処理はセンサーやアクチュエータを使った処理固有のものではありません。例えばサーバに問合せを行い返答を待機する時やキーの入力を待機する　などのときにも使われます。web アプリでよく使われる処理です。_

## async 接頭詞

関数定義に async 接頭詞を付けることで、その関数が非同期処理を行う関数であることを宣言します。async 接頭詞を持った関数は、その関数が途中で一時停止する処理が含まれているなど、処理完了まで時間がかかる処理が含まれていても、その他の処理を妨げなくなります。たとえば、ゲームのキャラクタが画面上を動き続けている処理がメインの処理ループで実行させている間に、ネット上からゲームのマップ情報を取ってくる（この処理には無視できない時間がかかりますね）処理をもつ関数が async 関数で実現できます。

`async function myAsyncFunction(){....}`

### 返り値

async 接頭詞を持つ関数も、返り値を返すことができます。ただし、その返り値は次章の**await 接頭詞を付けて利用する必要がある**と、ひとまず覚えておきましょう。

## await 接頭詞

**async 接頭詞を持った関数内でのみ使用できる**接頭詞です。
この接頭詞を付けて他の非同期処理の関数を呼び出すと、その非同期処理関数の処理完了を待った上で、処理を続行することができます。

ここで、await 接頭詞を付けることができる非同期関数とは、先述の async 接頭詞を付けて自分て定義した関数、およびあらかじめライブラリや組み込み関数として用意されている、Promise 型の帰り値を持った関数です。(Promise 型の詳しい説明はひとまずここでは省きます。そういう型があるということだけ気に留めておいてください。）

`await myAnotherAsyncFunction();`

また、先述の通り await 接頭詞を付けることで、非同期処理の関数の処理の完了を待ち、それによって作られた返り値を得ることができます。

`var responsText = await fetch(url);`

## サンプル 1 - 処理を待って続行する

非同期関数 myAsyncFunction1 は、1 秒処理を停止した後メッセージを出力する関数です。

コンテンツロード直後(onload)に最初に実行される mainFunction は、非同期関数 myAsyncFunction1 を呼び出すものの、即座に処理を完了します。その後１秒経ってから myAsyncFunction1 の処理が完了します。すなわち、時間のかかる myAsyncFunction1 が mainFunction の処理を妨げなくなりました。

### async1.js

```javascript
onload = function mainFunction(){
  myAsyncFunction1();
  console.log("mainFunction End");
}

async function myAsyncFunction1(){
	await sleep(1000); // 1000ミリ秒処理を待って続行
	console.log("message from myAsyncFunction1");
}


// この関数の意味はまずは理解しないでOKです。指定時間後に処理を完了する非同期関数と思ってください。
function  sleep(ms){
  return new Promise( function(resolve) {
    setTimeout(resolve, ms);
  });
}
```

### index1.html

```html
<!doctype html>
<html>
  <!-- htmlでは単に上のjsを読み込んでいるだけ、画面には何も反映されません。このソースには特別新しい作法はありません。。　ブラウザの開発ツールのコンソールに結果のメッセージが出ます -->
  <head>
    <meta charset="UTF-8"/>
    <script src='async1.js'></script>
  </head>
  <body>
  </body>
</html>
```

## サンプル２ - 処理を待って値を得る

myAsyncFunction2 は、３秒待機後、その時の時間を返却する非同期関数です。

asyncMainFunction は、上記の非同期関数の処理を待って返却された返り値を表示します。
await は非同期関数内でしか利用できませんので、asyncMainFunction もまた非同期関数になっています。

### async2.js

```javascript
onload = async function asyncMainFunction(){
	console.log("Start asyncMainFunction", new Date(), "  and await myAsyncFunction2");
	var date3s = await myAsyncFunction2(); //
	console.log("Return value from myAsyncFunction2: ", date3s);
}

async function myAsyncFunction2(){
	await sleep(3000); // 3秒間処理を待機させる
	return ( new Date());
}


// この関数の意味はまずは理解しないでOKです。指定時間後に処理を完了する非同期関数と思ってください。
function  sleep(ms){
  return new Promise( function(resolve) {
    setTimeout(resolve, ms);
  });
}
```

### index2.html

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8"/>
    <script src='async2.js'></script>
  </head>
  <body>
  </body>
</html>
```

## サンプル３ - async 接頭詞を持たない(通常の関数)、Promise 型の返り値を返す関数で、非同期関数を作る

CHIRIMEN のライブラリの関数を利用している限り、この内容を完全に理解する必要はありません。

更に詳しいことは

- https://www.d-wood.com/blog/2017/01/04_8716.html
- https://base.terrasky.co.jp/articles/3BHoO
  あたりを参考にしてみましょう

### async3.js

```javascript
// async await を用いた非同期処理の方法を説明
// # コールバック関数、アロー関数式なし、Primiseの詳細な理解(.then()など)もなし
// # さらにPromiseを返却する関数(非同期処理の関数)を自分で作らないならば、無名関数もなしでわかる書き方



// 非同期処理を行う関数の例　：　非同期処理の関数は、Promiseというオブジェクトを返却してくれると覚えておきましょう
// すでに提供されているライブラリの関数がPromiseオブジェクトを返却してくるものの場合(例えば温度センサーのオブジェクトにある関数)、
// その関数自体が非同期処理を行う関数なので、この関数の書き方は気にしなくて良いです。
// Promiseを返す関数＝非同期処理を行う関数　ということだけ覚えておきましょう。
function asyncProcess(value,time) {
  return new Promise( function (resolve, reject){ // Promiseオブジェクトを返却する この部分は呪文・定型文と思っておこう・・・
    setTimeout( // 非同期処理の例 setTimeout()は、第一引数に処理が完了したときの関数を書く(無名関数)、第二引数は処理を実行するまでの遅延時間(ms)
      function() {
        if (value) {
          resolve('入力値： ' + value); // 成功したときの帰り値はresolve()で返す
        } else {
          reject('入力値は空です。'); // 失敗したときの返り値はreject()で返す
        }
      } , time
    );
  } );
}

// 単に指定したms秒スリープするだけの非同期処理関数の例（今後コピペして結構使える）
// # この関数は　エラーを起こさないということで作ってあり、rejectは省略
function  sleep(ms){
  return new Promise( function(resolve) {
    setTimeout(resolve, ms);
  });
}


// 非同期処理の完了を都度都度待機して実行する関数(このプログラムでは実質的なメインルーチン)の定義方法
async function asyncTest(){ // 頭にasyncを付けるのがポイント
  try{
    // asyncProcessを遅延時間1000msで起動してans1に値が帰るまで待つ
    var ans1 = await asyncProcess("TEST1",1000); // 非同期処理関数の返答を待機するには頭にawaitをつけて呼び出すのがポイント
    console.log("test1 call end:",ans1);

    // asyncProcessを遅延時間200msで起動してans2に値が帰るまで待つ
    var ans2 = await asyncProcess("TEST2",200);
    console.log("test2 call end:",ans2);

    // 別の非同期処理の関数(sleep)を使って500ms待機させてみる
    await sleep(500);
    console.log("end sleep 500ms");

    // asyncProcessを遅延時間500msで起動してans3に値が帰るまで待つ
    var ans3 = await asyncProcess("TEST3",500);
    console.log("test3 call end:",ans3);

    // これで全部の値が順番に取れた
    console.log(ans1,ans2,ans3);
  } catch (err){
    // どこかの処理でエラーが起きればそのエラーの値がここに戻ってくる
    console.log(err);
  }
}

// 上記で定義した非同期処理を待機して順次実行する関数を呼び出す。（プログラムのエントリーポイント）
asyncTest();
```

### index3.html

```html
<!doctype html>
<html>
  <!-- htmlでは単に上のjsを読み込んでいるだけ、画面には何も反映されません。このソースには特別新しい作法はありません。。　結果はブラウザの開発ツールのコンソールにメッセージが出る-->
  <head>
    <meta charset="UTF-8"/>
    <script src='async3.js'></script>
  </head>
  <body>
  </body>
</html>
```

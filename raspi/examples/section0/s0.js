async function mainFunction() {
  // プログラムの本体となる関数。非同期処理を await で扱えるよう全体を async 関数で包みます
  var gpioAccess = await navigator.requestGPIOAccess(); // 非同期関数は await を付けて呼び出す
  var port = gpioAccess.ports.get(26);
  var v = 0;

  await port.export("out");
  for (;;) {
    // 無限ループ
    await sleep(1000); // 無限ループの繰り返し毎に 1000ms 待機する
    v = v === 0 ? 1 : 0; // vの値を0,1入れ替える。1で点灯、0で消灯するので、1秒間隔でLEDがON OFFする
    port.write(v);
  }
}

// await sleep(ms) と呼べば指定 ms 待機する非同期関数
// 同じものが polyfill.js でも定義されているため省略可能
function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

mainFunction(); // 定義したasync関数を実行します（このプログラムのエントリーポイント）

"use strict"; // strict モードで実行。細かいエラーチェックが行われます。

var head;
window.addEventListener(
  "load",
  function() {
    head = document.querySelector("#ADT7410value");
    mainFunction();
  },
  false
);

async function mainFunction() {
  var i2cAccess = await navigator.requestI2CAccess(); // i2cAccessを非同期で取得
  var port = i2cAccess.ports.get(1); // I2C I/Fの1番ポートを取得
  var adt7410 = new ADT7410(port, 0x48); // 取得したポートの0x48アドレスをADT7410ドライバで受信する
  await adt7410.init();
  while (1) {
    // 無限ループ
    var value = await adt7410.read();
    head.innerHTML = value ? value + "degree" : "Measurement failure";
    await sleep(1000);
  }
}

function sleep(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
}

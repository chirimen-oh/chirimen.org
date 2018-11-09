// ADT7410valueドライバを使わず、自力でADT7410の値を読むサンプル

"use strict"; // strictモードで実行。細かいエラーチェックが行われます。

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
  var i2cSlaveDevice = await port.open(0x48); // アドレス0x48のI2Cスレーブデバイスを得る

  while (1) {
    // 無限ループ
    var MSB = await i2cSlaveDevice.read8(0x00); // これ以下の３行が肝です
    var LSB = await i2cSlaveDevice.read8(0x01);
    var temperature = ((MSB << 8) | (LSB & 0xff)) / 128.0;
    head.innerHTML = temperature + "℃";
    await sleep(1000);
  }
}

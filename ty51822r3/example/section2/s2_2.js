// ADT7410valueドライバを使わず、自力でADT7410の値を読むサンプル

"use strict"; // strictモードで実行。細かいエラーチェックが行われます。

window.onload = async function mainFunction() {
  var head = document.querySelector("#ADT7410value");
  var i2cAccess = await navigator.requestI2CAccess(); // i2cAccessを非同期で取得
  var port = i2cAccess.ports.get(1); // I2C I/Fの1番ポートを取得
  var i2cSlaveDevice = await port.open(0x48); // アドレス0x48のI2Cスレーブデバイスを得る
  var MSB;
  var LSB;
  var temperature;

  for (;;) {
    // 無限ループ
    MSB = await i2cSlaveDevice.read8(0x00); // これ以下の３行が肝です
    LSB = await i2cSlaveDevice.read8(0x01);
    temperature = ((MSB << 8) | (LSB & 0xff)) / 128.0;
    head.innerHTML = `${temperature} ℃`;
    await sleep(1000);
  }
};

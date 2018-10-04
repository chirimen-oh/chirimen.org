var onoff, ledView; // GUIの要素

var ledPort, switchPort; // LED とスイッチの付いているポート

onload = function() {
  onoff = document.getElementById("onoff");
  ledView = document.getElementById("ledView");

  onoff.onmousedown = function() {
    ledOnOff(1);
  };
  onoff.onmouseup = function() {
    ledOnOff(0);
  };

  initGPIO();
};

function ledOnOff(v) {
  if (v === 0) {
    ledPort.write(0);
    ledView.style.backgroundColor = "black";
  } else {
    ledPort.write(1);
    ledView.style.backgroundColor = "red";
  }
}

async function initGPIO() {
  var gpioAccess = await navigator.requestGPIOAccess();
  ledPort = gpioAccess.ports.get(26); // LED のポート番号
  await ledPort.export("out");
  switchPort = gpioAccess.ports.get(5); // タクトスイッチのポート番号
  await switchPort.export("in");
  switchPort.onchange = function(val) {
    // Port 5の状態を読み込む
    val = val === 0 ? 1 : 0; // スイッチは Pull-up なので OFF で 1、LED は OFF で 0 なので反転させる
    ledOnOff(val);
  };
}

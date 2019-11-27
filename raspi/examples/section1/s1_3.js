var port;

function ledOnOff(v) {
  var ledView = document.getElementById("ledView");
  if (v === 0) {
    port.write(0);
    ledView.style.backgroundColor = "black";
  } else {
    port.write(1);
    ledView.style.backgroundColor = "red";
  }
}

window.onload = async function mainFunction() {
  var onoff = document.getElementById("onoff");
  var gpioAccess = await navigator.requestGPIOAccess();
  port = gpioAccess.ports.get(26);
  await port.export("out");
  onoff.onmousedown = function onLed() {
    ledOnOff(1);
  };
  onoff.onmouseup = function offLed() {
    ledOnOff(0);
  };
};

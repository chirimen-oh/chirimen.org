window.onload = async function mainFunction() {
  var onoff = document.getElementById("onoff");
  var ledView = document.getElementById("ledView");
  var v = 0;
  var gpioAccess = await navigator.requestGPIOAccess();
  var port = gpioAccess.ports.get(26);
  await port.export("out");
  onoff.onclick = function controlLed() {
    v = v === 0 ? 1 : 0;
    port.write(v);
    ledView.style.backgroundColor = v ? "red" : "black";
  };
};

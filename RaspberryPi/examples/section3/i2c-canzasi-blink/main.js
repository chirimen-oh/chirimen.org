"use strict";

var head;
window.addEventListener(
  "load",
  function() {
    head = document.querySelector("#head");
    mainFunction();
  },
  false
);

async function mainFunction() {
  var i2cAccess = await navigator.requestI2CAccess();
  try {
    var port = i2cAccess.ports.get(1);
    var cz = new canzasi(port, 0x30);
    var v = 0;
    await cz.init();
    while (1) {
      v ^= 1;
      cz.set(v);
      await sleep(500);
    }
  } catch (error) {
    console.error("error", error);
  }
}

function sleep(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
}

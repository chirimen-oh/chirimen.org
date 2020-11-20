async function main() {
  const button = document.getElementById("button");
  const ledView = document.getElementById("ledView");
  const gpioAccess = await navigator.requestGPIOAccess();
  const ledPort = gpioAccess.ports.get(26); // LED の GPIO ポート番号
  await ledPort.export("out");
  const switchPort = gpioAccess.ports.get(5); // タクトスイッチの GPIO ポート番号
  await switchPort.export("in");

  async function light(lit) {
    await ledPort.write(lit ? 1 : 0);
    const color = lit ? "red" : "black";
    ledView.style.backgroundColor = color;
  }

  button.onmousedown = async function() {
    await light(true);
  };

  button.onmouseup = async function() {
    await light(false);
  };

  // Pull-up なので押したとき 0、それ以外では 1 が得られる
  switchPort.onchange = async function(state) {
    const lit = state === 0;
    await light(lit);
  };
}

main();

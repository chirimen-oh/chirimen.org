async function main() {
  const button = document.getElementById("button");
  const ledView = document.getElementById("ledView");

  let lit = false;
  button.onclick = async function() {
    lit = !lit;

    const color = lit ? "red" : "black";
    ledView.style.backgroundColor = color;
  };
}

main();

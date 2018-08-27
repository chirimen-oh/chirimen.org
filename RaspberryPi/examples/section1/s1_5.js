var onoff, ledview; // GUIの要素

var ledPort,switchPort; // LEDとスイッチの付いているポート

onload = function(){
	onoff = document.getElementById("onoff");
	ledview = document.getElementById("ledview");
	
	onoff.onmousedown = function(){
		ledOnOff(1);
	};
	onoff.onmouseup = function(){
		ledOnOff(0);
	};
	
	initGPIO();
}

function ledOnOff(v){
	if(v === 0){
		ledPort.write(0);
		ledview.style.backgroundColor = "black";
	} else {
		ledPort.write(1);
		ledview.style.backgroundColor = "red";
	}
}

async function initGPIO(){
	var gpioAccess = await navigator.requestGPIOAccess();
	ledPort = gpioAccess.ports.get(26); // LEDのPort
	await ledPort.export("out");
	switchPort = gpioAccess.ports.get(5); // タクトスイッチのPort
	await switchPort.export("in");
	switchPort.onchange = function(val){
		// Port 5の状態を読み込む  
		val ^= 1; // switchはPullupなのでOFFで1。LEDはOFFで0なので反転させる
		ledOnOff(val);
	}
}

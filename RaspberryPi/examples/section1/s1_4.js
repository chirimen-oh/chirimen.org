onload = function(){
	mainFunction();
}


var ledPort, switchPort ;

async function mainFunction(){
	var onoff = document.getElementById("onoff");
	var ledview = document.getElementById("ledview");
	var gpioAccess = await navigator.requestGPIOAccess();
	
	ledPort = gpioAccess.ports.get(26); // LEDのPort
	await ledPort.export("out");
	
	switchPort = gpioAccess.ports.get(5); // タクトスイッチのPort
	await switchPort.export("in");
	
	onoff.onmousedown = function(){
		ledOnOff(1);
	};
	onoff.onmouseup = function(){
		ledOnOff(0);
	};

	while(1){
		var val = await switchPort.read(); // Port 5の状態を読み込む  
		val ^= 1; // switchはPullupなのでOFFで1。LEDはOFFで0なので反転させる
		ledOnOff(val);
		await sleep(100);
	}

}

function ledOnOff(v){
	if(v === 0){
		ledPort.write(0);
		ledview.style.backgroundColor = "black";
	}else{
		ledPort.write(1);
		ledview.style.backgroundColor = "red";
	}
}


function sleep(ms){
	return new Promise( function(resolve) {
		setTimeout(resolve, ms);
	});
}

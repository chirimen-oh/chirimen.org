onload = function(){
	mainFunction();
}


var port;

async function mainFunction(){
	var onoff = document.getElementById("onoff");
	var ledview = document.getElementById("ledview");
	var gpioAccess = await navigator.requestGPIOAccess();
	port = gpioAccess.ports.get(26);
	await port.export("out");
	onoff.onmousedown = function(){
		ledOnOff(1);
	};
	onoff.onmouseup = function(){
		ledOnOff(0);
	};
}

function ledOnOff(v){
	if(v === 0){
		port.write(0);
		ledview.style.backgroundColor = "black";
	}else{
		port.write(1);
		ledview.style.backgroundColor = "red";
	}
}
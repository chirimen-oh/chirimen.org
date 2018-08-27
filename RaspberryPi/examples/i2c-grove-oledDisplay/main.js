'use strict';

var head;

window.addEventListener('load', function (){
	head = document.querySelector('#head');
	
	mainFunction();
}, false);

async function mainFunction(){
	head.innerHTML = "started";
	var i2cAccess = await navigator.requestI2CAccess();
	head.innerHTML = "initializing...";
	try {
		var port = i2cAccess.ports.get(1);
		var disp = new OledDisplay(port);
		await disp.init();
		disp.clearDisplayQ();
		await disp.playSequence();
		head.innerHTML = "drawing text...";
		disp.drawStringQ(0,0,"hello");
		disp.drawStringQ(1,0,"Real");
		disp.drawStringQ(2,0,"World");
		await disp.playSequence();
		head.innerHTML = "completed";
	} catch ( error ){
		console.error('I2C bus error!', error);
		head.innerHTML = error;
	}
}

function sleep(ms){
	return new Promise( function(resolve) {
		setTimeout(resolve, ms);
	});
}

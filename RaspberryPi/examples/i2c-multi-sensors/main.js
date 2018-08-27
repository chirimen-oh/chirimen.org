'use strict';
var head1, head2;
window.addEventListener('load', function (){
	head1 = document.querySelector('#head1');
	head2 = document.querySelector('#head2');
	
	mainFunction();
}, false);

async function mainFunction(){
	var i2cAccess = await navigator.requestI2CAccess();
	try{
		var port = i2cAccess.ports.get(1);
		var grovelight = new GROVELIGHT(port,0x29);
		var adt7410 = new ADT7410(port,0x48);
		await grovelight.init();
		await adt7410.init();
		
		while(1){
			try{
				var lightValue = await grovelight.read();
//				console.log('lightValue:', lightValue);
				head1.innerHTML = lightValue;
			} catche ( error ){
				console.log('grovelight error:'+error);
			}
			
			try{
				var tempValue = await adt7410.read();
//				console.log('tempValue:', tempValue);
				head2.innerHTML = tempValue;
			} catche ( error ){
				console.log('adt7410 error:'+error);
			}
			sleep(500);
		}
	} catch ( error ){
		console.error('error', error);
	}
}

onload = function(){
	var onoff = document.getElementById("onoff");
	var ledview = document.getElementById("ledview");
	var v = 0;
	onoff.onclick = function(){
		 v ^= 1;
		ledview.style.backgroundColor = (v == 1)? "red" : "black";
	};
}


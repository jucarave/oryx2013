var Utils = {
	addEvent: function(obj, type, func){
		if (obj.attachEvent){
			obj.attachEvent("on" + type, func);
		}else if (obj.addEventListener){
			obj.addEventListener(type, func, false);
		}
	}
};

window.requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame;
    
Array.prototype.clone = function(){
	var ret = [];
	for (var i=0;i<this.length;i++){
		ret[i] = this[i];
	}
	
	return ret;
};

Math.iRandom = function(a, b){
	if (arguments.length == 1){
		return Math.round(Math.random() * a);
	}else if (arguments.length == 2){
		return a + Math.round(Math.random() * (b - a));
	}
};

Audio.prototype.stop = function(){
	this.pause();
	this.currentTime = 0;
};

Audio.prototype.stopAndPlay = function(){
	this.loop = false;
	this.stop();
	this.play();
};

Audio.prototype.loopPlay = function(){
	this.loop = true;
	this.play();
};

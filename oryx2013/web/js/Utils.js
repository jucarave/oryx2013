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
function Position(x, y){
	this.x = x;
	this.y = y;
}

Position.prototype.equals = function(a, b){
	if (arguments.length == 1){
		if (this.x == a.x && this.y == a.y){
			return true;
		}
	}else if (arguments.length == 2){
		if (this.x == a && this.y == b){
			return true;
		}
	}
	
	return false;
};

Position.prototype.sum = function(a, b){
	if (arguments.length == 1){
		this.x += a.x;
		this.y += a.y;
	}else if (arguments.length == 2){
		this.x += a;
		this.y += b;
	}
};

Position.prototype.set = function(a, b){
	if (arguments.length == 1){
		this.x = a.x;
		this.y = a.y;
	}else if (arguments.length == 2){
		this.x = a;
		this.y = b;
	}
};

Position.prototype.clone = function(){
	return new Position(this.x, this.y);
};

function Character(tile, position){
	this.tile = tile;
	this.position = position;
	this.mapManager = null;
}

Character.prototype.moveTo = function(x, y){
	this.position.sum(x, y);
	if (this.mapManager.isSolid(this.position)){
		this.position.sum(-x, -y);
		return false;
	}
	return true;
};

Character.prototype.draw = function(game){
	game.drawTile(this.tile, this.position, this.mapManager.view);
};

Character.prototype.loop = function(game){
	this.draw(game);
};

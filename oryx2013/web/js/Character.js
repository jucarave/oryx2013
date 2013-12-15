function Character(tile, position){
	this.tile = tile;
	this.position = position;
	this.mapManager = null;
}

Character.prototype.moveTo = function(x, y){
	var npos = this.position.clone();
	npos.sum(x, y);
	if (this.mapManager.isSolid(npos)){
		return false;
	}
	this.position = npos;
	return true;
};

Character.prototype.draw = function(game, tile){
	if (!tile) tile = this.tile;
	game.drawTile(tile, this.position, this.mapManager.view);
};

Character.prototype.loop = function(game){
	this.draw(game);
};

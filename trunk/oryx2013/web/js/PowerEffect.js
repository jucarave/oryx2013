function PowerEffect(tile, position, dir){
	this.tile = tile;
	this.position = position;
	this.dir = dir;
	this.inWorld = true;
	this.keepAnimation = true;
	
	Character.call(this, tile, position);
}

PowerEffect.prototype = Object.create(Character.prototype);
PowerEffect.prototype.constructor = PowerEffect;

PowerEffect.prototype.step = function(game){
	var enemy = this.mapManager.getEnemyAt(this.position.x, this.position.y);
	if (enemy){
		this.mapManager.player.castAttack(this.position.x, this.position.y);
		this.mapManager.player.act();
		this.keepAnimation = false;
		return false;
	}
	
	if (this.mapManager.isSolid(this.position, true)){
		this.mapManager.player.act();
		this.keepAnimation = false;
		return false;
	}
	
	//this.draw(game, this.tile.getColor(0,0,0));
	//this.mapManager.drawFloor(this.position.x, this.position.y, true);
	this.position.sum(this.dir);
	if (this.mapManager.isVisible(this.position) == 2)
		this.mapManager.repaint = true;
	
	return true;
};

PowerEffect.prototype.draw = function(game){
	if (this.mapManager.isVisible(this.position) == 2){
		Character.prototype.draw.call(this, game);
	}
};

PowerEffect.prototype.animatedLoop = function(game){
	if (this.step(game))
		this.draw(game);
};

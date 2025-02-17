function PowerEffect(tile, position, dir){
	this.tile = tile;
	this.position = position;
	this.dir = dir;
	this.inWorld = true;
	this.keepAnimation = true;
	this.repaint = true;
	this.hitPlayer = false;
	this.master = null;
	
	Character.call(this, tile, position);
}

PowerEffect.prototype = Object.create(Character.prototype);
PowerEffect.prototype.constructor = PowerEffect;

PowerEffect.prototype.step = function(game){
	var enemy = this.mapManager.getEnemyAt(this.position.x, this.position.y);
	var player = this.mapManager.player;
	
	if (enemy && !this.hitPlayer){
		this.mapManager.player.castAttack(this.position.x, this.position.y);
		this.mapManager.player.act();
		this.keepAnimation = false;
		return false;
	}
	
	if (player.position.equals(this.position) && this.hitPlayer){
		game.sounds.step.stopAndPlay();
		this.master.attackPlayer();
		this.keepAnimation = false;
		return false;
	}
	
	if (this.mapManager.isSolid(this.position, true)){
		this.mapManager.player.act();
		this.keepAnimation = false;
		return false;
	}
	
	this.position.sum(this.dir);
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

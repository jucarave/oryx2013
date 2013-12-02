function Player(tile, position){
	this.playerAction = true;
	this.fovDistance = 4;
	this.run = 0;
	
	Character.call(this, tile, position);
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.tryMove = function(key, xTo, yTo){
	if (game.keyP[key]){ 
		if (this.run == 0 || this.run > 20){
			this.moveTo(xTo, yTo);
			this.playerAction = true;
			game.keyP[key] = 2;
		}
		this.run++;
		return true;
	}
	return false;
};

Player.prototype.step = function(game){
	if (!this.tryMove(37,-1,0))
	if (!this.tryMove(38,0,-1))
	if (!this.tryMove(39,1,0))
	if (!this.tryMove(40,0,1))
		this.run = 0;
};

Player.prototype.setView = function(game){
	var view = this.mapManager.view;
	var x = this.position.x - game.viewS.x / 2;
	var y = this.position.y - game.viewS.y / 2;
	
	if (x < 0) x = 0;
	if (y < 0) y = 0;
	if (x + game.viewS.x > game.map.map[0].length) x = game.map.map[0].length - game.viewS.x;
	if (y + game.viewS.y > game.map.map.length) y = game.map.map.length - game.viewS.y;
	
	view.set(x, y);
};

Player.prototype.loop = function(game){
	this.step(game);
	this.setView(game);
	
	if (this.playerAction){
		FOV.getFOV(this.position, this.mapManager, this.fovDistance);
	}
	
	Character.prototype.loop.call(this, game);
};

var PlayerStats = {
	health: 30,
	mHealth: 30,
	
	mana: 7,
	mMana: 15
};

function Stairs(tile, position, direction, dungeonName){
	this.tile = tile;
	this.position = position;
	this.direction = direction;
	this.dungeonName = dungeonName;
	this.mapManager = null;
	this.inWorld = true;
}

Stairs.prototype.checkPlayer = function(game){
	if (this.mapManager.player.position.equals(this.position)){
		var dir = (this.direction == 'D')? "descend" : "ascend";
		Console.addMessage("You stepped into a(n) " + dir +" stairs ", "rgb(255,255,255)");
		PlayerStats.stairs = this;
	}
};

Stairs.prototype.draw = function(game){
	if (this.mapManager.isVisible(this.position))
		game.drawTile(this.tile, this.position, this.mapManager.view);
};

Stairs.prototype.loop = function(game){
	this.checkPlayer(game);
	this.draw(game);
};

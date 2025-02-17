function Stairs(tile, position, direction, dungeonName){
	this.tile = tile;
	this.position = position;
	this.direction = direction;
	this.dungeonName = dungeonName;
	this.level = 0;
	this.mapManager = null;
	this.inWorld = true;
	this.isHole = false;
	this.isStairs = true;
}

Stairs.prototype.checkPlayer = function(game){
	if (!this.mapManager.player.playerMoved) return;
	
	if (this.mapManager.player.position.equals(this.position)){
		PlayerStats.stairs = this;
		if (this.isHole){
			Console.addMessage(msg.hole, "rgb(255,255,255)");
			return;
		}
		if (this.direction == 'E'){
			Console.addMessage(msg.dungeonEntry, "rgb(255,255,0)");
			return;
		}
		var dir = (this.direction == 'D')? msg.descend : msg.ascend;
		Console.addMessage(msg.stepStairs.replace("D", dir), "rgb(255,255,255)");
	}
};

Stairs.prototype.draw = function(game){
	var visible = this.mapManager.isVisible(this.position);
	if (!visible) return;
	visible = (visible == 1);
	game.drawTile(this.tile, this.position, this.mapManager.view, visible);
};

Stairs.prototype.loop = function(game){
	this.checkPlayer(game);
	this.draw(game);
};

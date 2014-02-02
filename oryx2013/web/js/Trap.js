function Trap(tile, position, damage){
	this.position = position;
	this.tile = tile;
	this.damage = damage;
	
	this.active = false;
	this.mapManager = null;
	this.inWorld = true;
}

Trap.prototype.step = function(game){
	var player = this.mapManager.player;
	if (player.position.equals(this.position)){
		this.active = true;
		var dice = Math.iRandom(100);
		if (dice <= PlayerStats.luk){
			Console.addMessage(msg.trapAvoid, "rgb(255,255,0)");
		}else{
			game.sounds.attack.stopAndPlay();
			PlayerStats.health -= this.damage;
			Console.addMessage(msg.trapHurt.replace("X", this.damage), "rgb(255,0,0)");
			
			var tile = 10 + Math.iRandom(1,4);
			this.mapManager.map[this.position.y][this.position.x].push({
				tileId: tile,
				tile: Tileset.dungeon.getByTileId(tile, this.mapManager.level),
				visible: 0,
				wasVisible: true
			});
			
			if (PlayerStats.health <= 0){
				PlayerStats.deathCause = "t";
				game.map = null;
				game.scene = new DeathScreen();
			}
		}
	}
};

Trap.prototype.draw = function(game){
	if (!this.active) return;
	
	if (this.mapManager.isVisible(this.position) == 2){
		game.drawTile(this.tile, this.position, this.mapManager.view);
	}
};

Trap.prototype.loop = function(game){
	this.step(game);
	this.draw(game);
};

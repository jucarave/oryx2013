function DeathScreen(){
	this.blink = 30;
	this.skull = Tileset.itemsWeapons.skull;
	
	this.tilePos = new Position(2.5, 2.5);
}

DeathScreen.prototype.step = function(game){
	if (game.keyP[13] == 1){
		game.scene = new MainScreen();
		game.keyP[13] = 2;
	}
};

DeathScreen.prototype.drawTomb = function(game){
	var ctx = game.eng.ctx;
	
	this.tilePos.set(9, 1);
	game.drawTile(Tileset.environment.highGrass.getColor(0, 160, 0), this.tilePos);
	game.drawTile(Tileset.environment.grave, this.tilePos);
};

DeathScreen.prototype.draw = function(game){
	var ctx = game.eng.ctx;
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0,0,ctx.width,ctx.height);
	
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.textAlign = "center";
	
	this.tilePos.set(2.5,2.5);
	game.drawTile(this.skull, this.tilePos);
	this.tilePos.set(16.5,2.5);
	game.drawTile(this.skull, this.tilePos);
	
	ctx.fillText(PlayerStats.name + " the " + PlayerStats.class.name, ctx.width / 2, 70);
	
	ctx.fillText("As you went through your adventure you", ctx.width / 2, 200);
	if (PlayerStats.deathCause == 's'){
		if (PlayerStats.level == 0){
			ctx.fillText("starved to death in the middle of the town", ctx.width / 2, 220);
		}else{
			ctx.fillText("manage to advance to the level " + PlayerStats.level, ctx.width / 2, 220);
			ctx.fillText("but you starved to death", ctx.width / 2, 240);
		}
	}else{
		ctx.fillText("were slayed by a " + PlayerStats.deathCause + " on the level " + PlayerStats.level, ctx.width / 2, 220);
		ctx.fillText("of the dungeon ", ctx.width / 2, 240);
	}
	
	if (this.blink > 15){
		ctx.fillText("Press [Enter] key to return to the main screen", ctx.width / 2, 360);
	}
	
	ctx.textAlign = "left";
};

DeathScreen.prototype.loop = function(game){
	this.step(game);
	
	this.draw(game);
	this.drawTomb(game);
	
	this.blink--;
	if (this.blink == 0) this.blink = 30;
};

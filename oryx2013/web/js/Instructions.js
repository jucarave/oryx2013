function Instructions(){
	this.img = game.sprites.keyboard;
}

Instructions.prototype.step = function(game){
	if (game.keyP[27] == 1){
		game.scene = new MainScreen();
		game.keyP[27] = 2;
	}
};

Instructions.prototype.draw = function(game){
	var ctx = game.eng.ctx;
	
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0,0,ctx.width, ctx.height);
	ctx.drawImage(this.img, 100, 48);
	
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.textAlign = "center";
	ctx.fillText("Ingame instructions", ctx.width / 2, 30);
	
	ctx.textAlign = "left";
	ctx.fillText("Q: Open the weapons menu", 16, 250);
	ctx.fillText("W: Open the armour menu", 16, 270);
	ctx.fillText("E: Open the Items menu", 16, 290);
	ctx.fillText("R: Open the magic menu", 16, 310);
	ctx.fillText("T: Transact with the vendors", 16, 330);
	ctx.fillText("A: Attack", 16, 350);
	ctx.fillText("D: Drops a weapon or an armour", 16, 370);
	ctx.fillText("I: Gets info about an item", 16, 390);
	ctx.fillText("U: Use the current item", 16, 410);
	ctx.fillText("M: Use the current magic spell", 16, 430);
	ctx.fillText("Space Bar: Pass the turn", 16, 450);
	ctx.fillText("Enter: Accept / Choose / Pickup / Enter", 16, 470);
	ctx.fillText("Arrow Keys: Movement", 16, 490);
	
	ctx.textAlign = "center";
	ctx.fillText("Press Escape to return", ctx.width / 2, 520);
};

Instructions.prototype.loop = function(game){
	this.step(game);
	this.draw(game);
};

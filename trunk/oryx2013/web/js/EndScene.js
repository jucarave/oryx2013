function EndScene(){
	this.scene = 0;
	this.scenePos = new Position(0, 0);
	
	this.text1 = ("As you fight with the evil Ias, you finally give end to his\nlife granting the peace to not only Tull but all the earth\nitself. Although you decided to not returning with the king\nto report your feat, you get out of the town before anyone\nnotices you and continue your journey throught the desert.\n\nThis is not the end of your journeys but is the last time\nthat the town of Tull or any other hear about you.").split("\n");
}

EndScene.prototype.step = function(game){
	var ctx = game.eng.ctx;
	
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.textAlign = "center";
	
	ctx.fillText("[Press Enter to continue]", ctx.width / 2, ctx.height - 30);
	
	ctx.textAlign = "left";
	
	if (game.keyP[13] == 1){
		this.scene++;
		game.keyP[13] = 2;
	}
};

EndScene.prototype.drawScene1 = function(game){
	var ctx = game.eng.ctx;
	
	this.scenePos.set(1, 0);
	game.drawTile(Tileset.cinema.cementery, this.scenePos);
	this.scenePos.set(2, 0);
	game.drawTile(Tileset.cinema.desert, this.scenePos);
	
	ctx.fillStyle = "rgb(255,255,255)";
	for (var i=0;i<this.text1.length;i++){
		ctx.fillText(this.text1[i], 16, 220 + (20 * i));
	}
};

EndScene.prototype.loop = function(game){
	var ctx = game.eng.ctx;
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0,0,ctx.width,ctx.height);
	
	this.step(game);
	
	switch (this.scene){
		case 0: this.drawScene1(game); break;
		case 1:
			game.scene = new MainScreen();
		break;
	}
};

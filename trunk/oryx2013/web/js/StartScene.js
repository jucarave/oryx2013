function StartScene(){
	this.scene = 0;
	this.scenePos = new Position(0, 0);
	
	this.text1 = ("In the depths of the corner of the world, an ancient ruins\nare buried into the forgotten, it's been a thousand of years\nsince the realm of Ias, lord of the darkness fell and\neveryone on the earth have forgot about the pain and suffer\nthat he had caused.\n\nIas has been on his chamber, growing in strength, in hatred,\nreuniting an army and is waiting for the perfect time to come\nto the world once again.").split("\n");
	this.text2 = ("Some recent exploration has connected an human graveyard\nwith the ruins of Ias, legions of monsters are crawling to\nthe surface obeying their master. The town of Tull is now\nthreaten by Ias return, the king has called all the warriors\nto get into the dungeon and destroy Ias and his minions.\n\nyou came from far lands hearing about the rumor of the\nreturning of an ancient demon and decided to help to the town\nof Tull.").split("\n");
}

StartScene.prototype.step = function(game){
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

StartScene.prototype.drawScene1 = function(game){
	var ctx = game.eng.ctx;
	
	this.scenePos.set(1.5, 0);
	game.drawTile(Tileset.cinema.cave, this.scenePos);
	
	ctx.fillStyle = "rgb(255,255,255)";
	for (var i=0;i<this.text1.length;i++){
		ctx.fillText(this.text1[i], 16, 220 + (20 * i));
	}
};

StartScene.prototype.drawScene2 = function(game){
	var ctx = game.eng.ctx;
	
	this.scenePos.set(0.5, 0);
	game.drawTile(Tileset.cinema.dungeon, this.scenePos);
	this.scenePos.set(1.5, 0);
	game.drawTile(Tileset.cinema.cementery2, this.scenePos);
	this.scenePos.set(2.5, 0);
	game.drawTile(Tileset.cinema.city, this.scenePos);
	
	ctx.fillStyle = "rgb(255,255,255)";
	for (var i=0;i<this.text2.length;i++){
		ctx.fillText(this.text2[i], 16, 220 + (20 * i));
	}
};

StartScene.prototype.loop = function(game){
	var ctx = game.eng.ctx;
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0,0,ctx.width,ctx.height);
	
	this.step(game);
	
	switch (this.scene){
		case 0: this.drawScene1(game); break;
		case 1: this.drawScene2(game); break;
		case 2:
			game.gotoMap({map: "town"});
		break;
	}
};

function StartScene(){
	this.scene = 0;
	this.scenePos = new Position(0, 0);
	
	this.text1 = (msg.story1).split("\n");
	this.text2 = (msg.story2).split("\n");
}

StartScene.prototype.step = function(game){
	var ctx = game.eng.ctx;
	
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.textAlign = "center";
	
	ctx.fillText(msg.storeContinue, ctx.width / 2, ctx.height - 30);
	
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

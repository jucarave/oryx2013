function MainScreen(){
	this.title = [
		[0,2,3,2,0,3,0,3,0,3,0,0,0,3,0,0],
		[0,0,3,0,0,3,0,3,0,3,0,0,0,3,0,0],
		[0,0,3,0,0,3,0,3,0,3,0,0,0,3,0,0],
		[0,0,3,0,0,3,0,3,0,3,0,0,0,3,0,0],
		[0,0,2,0,0,2,2,2,0,2,2,2,0,2,2,2]
	];
	
	this.setInitStats();
};

MainScreen.prototype.setInitStats = function(){
	game.maps = [];
};

MainScreen.prototype.drawTitle = function(ctx){
	var x, y, pos;
	x = 0;
	y = 0;
	pos = new Position(x, y);
	for (var i=0,len=this.title.length;i<len;i++){
		for (var j=0,jlen=this.title[i].length;j<jlen;j++){
			var tile = this.title[i][j];
			x++;
			if (tile == 0) continue;
			
			pos.set(x,y);
			tile = Tileset.environment.getByTileId(tile);
			game.drawTile(tile, pos);
			
		}
		x = 0;
		y++;
	}
};

MainScreen.prototype.step = function(game){
	if (game.keyP[65] == 1){
		game.scene = new CharacterCreation();
		game.keyP[65] = 2;
	}else if (game.keyP[66] == 1){
		
		game.keyP[65] = 2;
	}else if (game.keyP[68] == 1){
		location.href = exitPath;
		game.keyP[67] = 2;
	}
};

MainScreen.prototype.draw = function(game){
	var ctx = game.eng.ctx;
	
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0,0,ctx.width,ctx.height);
	
	this.drawTitle(ctx);
	
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.textAlign = "center";
	ctx.fillText("a) To start a new adventure", ctx.width / 2, 380);
	ctx.fillText("b) To continue the adventure", ctx.width / 2, 400);
	ctx.fillText("c) To instructions", ctx.width / 2, 420);
	ctx.fillText("d) To exit", ctx.width / 2, 440);
	
	ctx.fillText("DOR, Developed by Camilo Ramírez (Jucarave) 2013", ctx.width / 2, ctx.height - 20);
	
	ctx.textAlign = "left";
};

MainScreen.prototype.loop = function(game){
	this.step(game);
	this.draw(game);
};

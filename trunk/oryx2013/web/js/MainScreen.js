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

MainScreen.prototype.setRandomPotions = function(){
	var ef = EffectFactory;
	var iF = ItemFactory;
	var effectsS = [ef.hpPotionS, ef.poisonS, ef.antidoteS, ef.attributeS];
	var effectsL = [ef.hpPotionL, ef.poisonL, ef.antidoteL, ef.attributeL];
	var containersS = [iF.redSmallPotion, iF.blueSmallPotion, iF.greenSmallPotion, iF.purpleSmallPotion];
	var containersL = [iF.redLargePotion, iF.blueLargePotion, iF.greenLargePotion, iF.purpleLargePotion];
	
	var j = 0;
	while (effectsS.length > 0){
		var effect = Math.iRandom(effectsS.length - 1);
		
		effectsS[effect].used = false;
		containersS[j].effect = effectsS[effect];
		containersL[j].effect = effectsL[effect];
		
		j++;
		effectsS.splice(effect, 1);
		effectsL.splice(effect, 1);
	}
};

MainScreen.prototype.setInitStats = function(){
	game.maps = [];
	Console.messages = [];
	
	//this.setRandomPotions();
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
		game.scene = new Instructions();
		game.keyP[65] = 2;
	}else if (game.keyP[68] == 1){
		location.href = exitPath;
		game.keyP[68] = 2;
	}else if (game.keyP[67] == 1){
		var l = (lang == "es")? "en" : "es";
		location.href = cp + "?lang=" + l;
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
	ctx.fillText(msg.newAdventure, ctx.width / 2, 380);
	ctx.fillText(msg.instructions, ctx.width / 2, 400);
	ctx.fillText(msg.language, ctx.width / 2, 420);
	ctx.fillText(msg.exitGame, ctx.width / 2, 440);
	
	ctx.fillText(msg.info1, ctx.width / 2, ctx.height - 30);
	ctx.fillText(msg.info2, ctx.width / 2, ctx.height - 10);
	
	ctx.textAlign = "left";
};

MainScreen.prototype.loop = function(game){
	this.step(game);
	this.draw(game);
};

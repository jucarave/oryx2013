function CharacterCreation(){
	this.process = 0;
	this.name = "";
	this.skill = new Array(4);
	this.skill[0] = 10;
	this.skill[1] = 10;
	this.skill[2] = 10;
	this.skill[3] = 10;
	
	this.points = 20;
	this.opt = 0;
	this.classPos = new Position(0,0);
	this.class = 0;
	
	this.attribs = [
		[4, 3, 1, 0],
		[2, 3, 4, 0],
		[0, 1, 3, 4]
	];
	
	game.lastK = -1;
}

CharacterCreation.prototype.processName = function(game){
	var ctx = game.eng.ctx;
	
	ctx.textAlign = "left";
	ctx.fillText(msg.enterName + this.name, 16, 60);
	ctx.fillText(msg.enterName2, 16, 80);
	ctx.fillText(msg.enterName3, 16, 100);
	
	if (game.lastK != -1){
		if ((game.lastK >= 65 && game.lastK <= 90) || (game.lastK >= 97 && game.lastK <= 122)){
			this.name += String.fromCharCode(game.lastK);
		}else if (game.lastK == 32){
			this.name += " ";
		}else if (game.lastK == 8){
			this.name = this.name.substring(0, this.name.length-1);
		}
		
		game.lastK = -1;
	}
	
	if (this.name.length > 12){
		this.name = this.name.substring(0,12);
	}
	
	if (game.keyP[13] == 1){
		if (this.name.trim() == "") return;
		this.name = this.name.trim();
		this.process = 1;
		game.keyP[13] = 2;
	}else if (game.keyP[27] == 1){
		game.scene = new MainScreen();
		game.keyP[27] = 2;
	}
};

CharacterCreation.prototype.processSkills = function(game){
	var ctx = game.eng.ctx;
	
	ctx.textAlign = "left";
	ctx.fillText(msg.yourName + this.name, 16, 60);
	
	ctx.textAlign = "center";
	ctx.fillText(msg.remainPoints + this.points, ctx.width / 2, 120);
	
	if (this.opt == 0) ctx.fillStyle = "rgb(255, 255, 0)"; else ctx.fillStyle = "rgb(255,255,255)"; 
	ctx.fillText(msg.ccStrength + this.skill[0], ctx.width / 2, 160);
	if (this.opt == 1) ctx.fillStyle = "rgb(255, 255, 0)"; else ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillText(msg.ccDefense + this.skill[1], ctx.width / 2, 180);
	if (this.opt == 2) ctx.fillStyle = "rgb(255, 255, 0)"; else ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillText(msg.ccSpeed + this.skill[2], ctx.width / 2, 200);
	if (this.opt == 3) ctx.fillStyle = "rgb(255, 255, 0)"; else ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillText(msg.ccLuck + this.skill[3], ctx.width / 2, 220);
	
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.textAlign = "left";
	
	ctx.fillText(msg.upDownNav, 16, 260);
	ctx.fillText(msg.rightLeftNav, 16, 280);
	ctx.fillText(msg.skillsEnter, 16, 300);
	
	if (game.keyP[38] == 1){ this.opt--; game.keyP[38] = 2; }
	else if (game.keyP[40] == 1){ this.opt++; game.keyP[40] = 2; }
	
	this.opt = Math.max(0, Math.min(3, this.opt));
	
	if (game.keyP[37] == 1){
		if (this.skill[this.opt] > 10){
			this.points++;
			this.skill[this.opt] -= 1;
		}
		game.keyP[37] = 2;
	}else if (game.keyP[39] == 1){
		if (this.points > 0){
			this.points--;
			this.skill[this.opt] += 1;
		}
		game.keyP[39] = 2;
	}
	
	if (game.keyP[13] == 1){
		this.process = 2;
		this.opt = 0;
		game.keyP[13] = 2;
	}else if (game.keyP[27] == 1){
		this.process = 0;
		game.keyP[27] = 2;
	}
};

CharacterCreation.prototype.processClass = function(game){
	var ctx = game.eng.ctx;
	
	ctx.textAlign = "left";
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillText(msg.yourName + this.name, 16, 60);
	
	ctx.textAlign = "center";
	ctx.fillText(msg.skillPoints, ctx.width / 2, 120);
	
	var atr = this.attribs[this.opt];
	ctx.fillText(msg.ccStrength + (this.skill[0] + atr[0]), ctx.width / 2, 160);
	ctx.fillText(msg.ccDefense + (this.skill[1] + atr[1]), ctx.width / 2, 180);
	ctx.fillText(msg.ccSpeed + (this.skill[2] + atr[2]), ctx.width / 2, 200);
	ctx.fillText(msg.ccLuck + (this.skill[3] + atr[3]), ctx.width / 2, 220);
	
	ctx.textAlign = "center";
	ctx.strokeStyle = "rgb(255,255,255)";
	
	var tile = Tileset.classes.fighter;
	this.classPos.set(2,2.5);
	game.drawTile(tile, this.classPos);
	ctx.fillText(msg.fighter, 170, 360);
	
	if (this.opt == 0)
		ctx.strokeRect(134, 270, 72, 72);
	
	var tile = Tileset.classes.archer;
	this.classPos.set(4,2.5);
	game.drawTile(tile, this.classPos);
	ctx.fillText(msg.archer, 305, 360);
	
	if (this.opt == 1)
		ctx.strokeRect(269, 270, 72, 72);
	
	var tile = Tileset.classes.wizard;
	this.classPos.set(6,2.5);
	game.drawTile(tile, this.classPos);
	ctx.fillText(msg.wizard, 440, 360);
	
	if (this.opt == 2)
		ctx.strokeRect(404, 270, 72, 72);
		
	if (game.keyP[37] == 1){ this.opt--; game.keyP[37] = 2; }
	else if (game.keyP[39] == 1){ this.opt++; game.keyP[39] = 2; }
	
	this.opt = Math.max(0, Math.min(2, this.opt));
	
	ctx.textAlign = "left";
	ctx.fillText(msg.classesNav, 16, 400);
	ctx.fillText(msg.classesEnt, 16, 420);
	
	if (game.keyP[13] == 1){
		this.process = 3;
		this.class = this.opt;
		game.keyP[13] = 2;
	}else if (game.keyP[27] == 1){
		this.process = 1;
		this.opt = 0;
		game.keyP[27] = 2;
	}
};

CharacterCreation.prototype.processConfirm = function(game){
	var ctx = game.eng.ctx;
	
	ctx.textAlign = "left";
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillText(msg.yourName+ this.name, 16, 60);
	
	ctx.textAlign = "center";
	ctx.fillText(msg.skillPoints, ctx.width / 2, 120);
	
	var atr = this.attribs[this.class];
	ctx.fillText(msg.ccStrength + (this.skill[0] + atr[0]), ctx.width / 2, 160);
	ctx.fillText(msg.ccDefense + (this.skill[1] + atr[1]), ctx.width / 2, 180);
	ctx.fillText(msg.ccSpeed + (this.skill[2] + atr[2]), ctx.width / 2, 200);
	ctx.fillText(msg.ccLuck + (this.skill[3] + atr[3]), ctx.width / 2, 220);
	
	ctx.textAlign = "center";
	ctx.strokeStyle = "rgb(255,255,255)";
	
	if (this.class == 0){
		var tile = Tileset.classes.fighter;
		this.classPos.set(4,2.5);
		game.drawTile(tile, this.classPos);
		ctx.fillText(msg.fighter, 305, 360);
	}else if (this.class == 1){
		var tile = Tileset.classes.archer;
		this.classPos.set(4,2.5);
		game.drawTile(tile, this.classPos);
		ctx.fillText(msg.archer, 305, 360);
	}else if (this.class == 2){
		var tile = Tileset.classes.wizard;
		this.classPos.set(4,2.5);
		game.drawTile(tile, this.classPos);
		ctx.fillText(msg.wizard, 305, 360);
	}
	
	ctx.fillText(msg.correctChar, ctx.width/ 2, 400);
	
	ctx.textAlign = "left";
	if (game.keyP[89] == 1){
		this.gotoGame();
		game.keyP[89] = 2;
	}else if (game.keyP[78] == 1){
		this.process = 0;
		game.keyP[78] = 2;
		game.lastK = -1;
	}
};

CharacterCreation.prototype.gotoGame = function(){
	var atr = this.attribs[this.class];
	
	PlayerStats = {
		name: this.name,
		class: HeroClasses.fromId(this.class),
		
		health: 80,
		mHealth: 80,
		
		mana: 20,
		mMana: 20,
		
		weapons: [],
		currentW: 0,
		
		armours: [],
		currentA: 0,
		
		items: [],
		currentI: 0,
	
		spells: [],
		currentS: 0,
		
		food: 100,
		
		lvl: 1,
		exp: 0,
		str: this.skill[0] + atr[0],
		def: this.skill[1] + atr[1],
		spd: this.skill[2] + atr[2],
		luk: this.skill[3] + atr[3],
		
		gold: 50,
		
		poison: 0,
		slowerT: 0,
		bersekT: 0,
		displayEnemies: false,
		blinking: false,
		sleepSp: false,
		portal: null,
		dungeonStep: 0,
		
		steppedItems: [],
		stairs: null,
		
		weaponsMenu: false,
		armourMenu: false,
		spellsMenu: false,
		pickItemsMenu: false,
		itemsMenu: false,
		
		deathCause: '',
		level: 0
	};
	
	var i = ItemFactory.getItem("cottomCloth", 1);
	var item = new Item(i.tile, new Position(0,0), i);
	PlayerStats.armours.push(item);
	
	i = ItemFactory.getItem("knife", 1);
	item = new Item(i.tile, new Position(0,0), i);
	PlayerStats.weapons.push(item);
	
	game.scene = new StartScene();
};

CharacterCreation.prototype.loop = function(game){
	var ctx = game.eng.ctx;
	
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0,0,ctx.width,ctx.height);
	
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.textAlign = "center";
	ctx.fillText(msg.characterCreation, ctx.width / 2, 20);
	
	switch (this.process){
		case 0: this.processName(game); break;
		case 1: this.processSkills(game); break;
		case 2: this.processClass(game); break;
		case 3: this.processConfirm(game); break;
	}
};

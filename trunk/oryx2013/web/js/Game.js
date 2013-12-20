function Game(container){
	this.eng = new Engine();
	this.eng.createCanvas(640, 528, container);
	//this.eng.canvas.style.zoom = "200%";
	this.eng.ctx.font = '16px "Courier New"';
	
	this.fps = 1000 / 30;
	this.lastF = Date.now();
	
	this.room = 0;
	this.sprites = {};
	this.instances = [];
	
	this.loadImages();
	
	this.selectedOpt = 0;
	
	this.viewS = new Position(20, 8);
	this.viewPos = new Position(0, 1);
	this.gridS = new Position(32, 48);
	
	this.maps = [];
	this.map = null;
	this.scene = null;
	
	this.keyP = new Array(255);
	this.lastK = -1;
}

Game.prototype.loadImages = function(){
	this.sprites["heroes"] = this.eng.loadImage(cp + "img/heroes.png?version=" + version, 19, 2);
	this.sprites["environment"] = this.eng.loadImage(cp + "img/environment.png?version=" + version, 19, 4);
	this.sprites["hud"] = this.eng.loadImage(cp + "img/hud.png?version=" + version, 4, 1);
	this.sprites["itemsWeapons"] = this.eng.loadImage(cp + "img/itemsWeapons.png?version=" + version, 19, 5);
	this.sprites["misc"] = this.eng.loadImage(cp + "img/misc.png?version=" + version, 19, 7);
	this.sprites["enemies"] = this.eng.loadImage(cp + "img/enemies.png?version=" + version, 19, 8);
	this.sprites["classes"] = this.eng.loadImage(cp + "img/classes.png?version=" + version, 3, 1);
	this.sprites["effects"] = this.eng.loadImage(cp + "img/effects.png?version=" + version, 19, 3);
	this.sprites["magic"] = this.eng.loadImage(cp + "img/magic.png?version=" + version, 7, 1);
	this.sprites["keyboard"] = this.eng.loadImage(cp + "img/keyboard.png?version=" + version, 1, 1);
	this.sprites["cinema"] = this.eng.loadImage(cp + "img/cinema.png?version=" + version, 2, 3);
};

Game.prototype.drawLoading = function(){
	var ctx = this.eng.ctx;
	var per = this.eng.getImagesLoadedPercent();
	
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0,0,ctx.width,ctx.height);
	
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.strokeStyle = "rgb(255,255,255)";
	
	ctx.fillRect(ctx.width / 2 - 147, ctx.height / 2 - 2, 294 * per, 4);
	ctx.strokeRect(ctx.width / 2 - 150, ctx.height / 2 - 4, 300, 8);
};

Game.prototype.getTown = function(){
	for (var i=0;i<this.maps.length;i++){
		if (this.maps[i].key == "town")
			return this.maps[i];
	}
	
	return null;
};

Game.prototype.drawTile = function(tile, position, view, darker){
	var spr;
	if ((typeof tile.img) == "string") spr = this.sprites[tile.img]; else spr = tile.img;
	var x = position.x + this.viewPos.x;
	var y = position.y + this.viewPos.y;
	if (view){ 
		x -= view.x;
		y -= view.y;
	}
	this.eng.drawImage(spr, x, y, tile.subImg, true);
	
	if (darker){
		var ctx = this.eng.ctx;
		ctx.fillStyle = "rgba(0,0,0,0.8)";
		ctx.fillRect(x*spr.imgWidth,y*spr.imgHeight,spr.imgWidth,spr.imgHeight);
	}
};

Game.prototype.navigateItemsMenu = function(quitK){
	var limit = PlayerStats.steppedItems.length;
	
	if (this.keyP[39] == 1){
		this.selectedOpt += 1;
		this.keyP[39] = 2;
	}else if (this.keyP[37] == 1){
		this.selectedOpt -= 1;
		this.keyP[37] = 2;
	}
	if (limit > 14){
		if (this.keyP[38] == 1){
			this.selectedOpt -= 14;
			this.keyP[38] = 2;
		}else if (this.keyP[40] == 1){
			this.selectedOpt += 14;
			this.keyP[40] = 2;
		}
	}
	
	if (this.selectedOpt < 0) this.selectedOpt = limit + this.selectedOpt;
	else if (this.selectedOpt > limit - 1) this.selectedOpt -= limit;
	
	if (this.keyP[quitK] == 1){
		this.selectedOpt = 0;
		this.keyP[quitK] = 2;
		return true;
	}
	
	return false;
};

Game.prototype.drawPickupItemsMenu = function(){
	if (!PlayerStats.pickItemsMenu) return;
	
	var tile = Tileset.itemsWeapons.frame;
	var x = game.gridS.x;
	var y = game.gridS.y * 2;
	var items = PlayerStats.steppedItems;
	
	for (var i=0;i<items.length;i++){
		var xx = x + (game.gridS.x * (i % 14));
		this.eng.drawImage(game.sprites[tile.img], xx, y, tile.subImg);
		
		var itile = items[i].tile;
		var img = (game.sprites[itile.img])? game.sprites[itile.img] : itile.img;
		this.eng.drawImage(img, xx, y, itile.subImg);
		
		if (this.selectedOpt == i)
			this.eng.drawImage(tile.getColor(255,255,0).img, xx, y, tile.subImg);
			
		x += 10;
		if (i > 0 && i % 14 == 13){
			x = game.gridS.x;
			y += game.gridS.y + 8;
		}
	}
	
	if (this.keyP[13] == 1){
		this.map.player.pickItem(items[this.selectedOpt]);
		items.splice(this.selectedOpt,1);
		this.map.player.act();
		this.keyP[13] = 2;
	}
	
	if (this.navigateItemsMenu(27) || items.length == 0){
		PlayerStats.pickItemsMenu = false;
		this.map.player.act();
	}
};

Game.prototype.navigateMenu = function(quitK){
	if (this.keyP[40] == 1){
		this.selectedOpt += 1;
		this.keyP[40] = 2;
	}else if (this.keyP[38] == 1){
		this.selectedOpt -= 1;
		this.keyP[38] = 2;
	}
	
	if (this.selectedOpt < 0) this.selectedOpt = 6;
	else if (this.selectedOpt > 6) this.selectedOpt = 0;
	
	if (this.keyP[quitK] == 1){
		this.selectedOpt = 0;
		this.keyP[quitK] = 2;
		return true;
	}
	
	return false;
};

Game.prototype.drawPlayerMenu = function(bucket, current, x, canDrop){
	var ctx = this.eng.ctx;

	tile = Tileset.itemsWeapons.frame;
	y = this.gridS.y + 16;
	
	for (var i=0;i<7;i++){
		this.eng.drawImage(this.sprites[tile.img], x, y, tile.subImg);
		if (bucket[i]){
			var item = bucket[i];
			var wtile = (this.sprites[item.tile.img])? this.sprites[item.tile.img] : item.tile.img;
			this.eng.drawImage(wtile, x, y, item.tile.subImg);
			
			if (this.selectedOpt == i && this.keyP[68] == 1 && canDrop){
				item.position.set(this.map.player.position);
				item.inWorld = true;
				this.map.instances.push(item);
				bucket.splice(i,1);
				PlayerStats[current] = Math.max(0, PlayerStats[current] - 1);
				i--;
				this.map.player.act();
				this.keyP[68] = 2;
				item.mapManager = this.map;
				Console.addMessage("You dropped a(n) " + ItemFactory.getItemName(item.item), "rgb(255,255,255)");
				PlayerStats.steppedItems.push(item);
				continue;
			}
			
			if (item.item.effect && this.keyP[73] == 1){
				if (item.item.effect.used){
					Console.addMessage(item.item.effect.desc, "rgb(255,255,255)");
				}else{
					Console.addMessage("Unknow effect", "rgb(255,255,255)");
				}
				this.keyP[73] = 2;
			}
		}
		
		if (this.selectedOpt == i){
			this.eng.drawImage(tile.getColor(255,255,0).img, x, y, tile.subImg);
			
			if (this.keyP[13] == 1){
				PlayerStats[current] = i;
				this.keyP[13] = 2;
			}
		}
	
		y += this.gridS.y + 4;
	}
};

Game.prototype.drawSpellsMenu = function(){
	if (!PlayerStats.spellsMenu) return;
	
	var ctx = this.eng.ctx;
	x = ctx.width - this.gridS.x * 6 + 149;
	this.drawPlayerMenu(PlayerStats.spells, "currentS", x, false);
	
	if (this.navigateMenu(82)){
		PlayerStats.spellsMenu = false;
		this.map.player.act();
	}
};

Game.prototype.drawItemsMenu = function(){
	if (!PlayerStats.itemsMenu) return;
	
	var ctx = this.eng.ctx;
	x = ctx.width - this.gridS.x * 6 + 94;
	this.drawPlayerMenu(PlayerStats.items, "currentI", x, true);
	
	if (this.navigateMenu(69)){
		PlayerStats.itemsMenu = false;
		this.map.player.act();
	}
};

Game.prototype.drawWeaponsMenu = function(){
	if (!PlayerStats.weaponsMenu) return;
	
	var ctx = this.eng.ctx;
	x = ctx.width - this.gridS.x * 6 - 16;
	this.drawPlayerMenu(PlayerStats.weapons, "currentW", x, true);
	
	if (this.navigateMenu(81)){
		PlayerStats.weaponsMenu = false;
		this.map.player.act();
	}
};

Game.prototype.drawArmourMenu = function(){
	if (!PlayerStats.armourMenu) return;
	
	var ctx = this.eng.ctx;
	x = ctx.width - this.gridS.x * 6 + 39;
	this.drawPlayerMenu(PlayerStats.armours, "currentA", x, true);
	
	if (this.navigateMenu(87)){
		PlayerStats.armourMenu = false;
		this.map.player.act();
	}
};

Game.prototype.drawConsole = function(){
	var ctx = this.eng.ctx;
	
	ctx.fillStyle = "rgb(33,33,33)";
	ctx.fillRect(0,0,ctx.width, this.gridS.y + 4);
	
	this.eng.drawLine(0,this.gridS.y + 3, ctx.width, this.gridS.y + 3, "rgb(255,255,255)");
	
	var messages = Console.messages;
	var end = messages.length;
	
	for (var i=0;i<end;i++){
		var m = messages[i];
		
		ctx.fillStyle = m.color;
		ctx.fillText(m.text, 4, 16 + (16 * i));
	}
};

Game.prototype.drawInterface = function(){
	this.drawConsole();
	var ctx = this.eng.ctx;
	
	ctx.fillStyle = "rgb(33,33,33)";
	ctx.fillRect(0,ctx.height - this.gridS.y * 2,ctx.width, this.gridS.y * 2);
	
	this.eng.drawLine(0,ctx.height - this.gridS.y * 2 + 1, ctx.width,ctx.height - this.gridS.y * 2 + 1, "rgb(255,255,255)");
	
	//Health
	var x = 8;
	var y = ctx.height - this.gridS.y * 2 + 8;
	this.eng.drawImage(Tileset.hud.healthBack.getColor(255,0,0).img, x, y, Tileset.hud.healthBack.subImg);
	
	var tile = Tileset.hud.health;
	var s = tile.subImg;
	var img = tile.getColor(255,0,0).img;
	var per = (PlayerStats.health / PlayerStats.mHealth) * img.imgHeight;
	ctx.drawImage(img,
		s.x * img.imgWidth, s.y * img.imgHeight + img.imgHeight - per, img.imgWidth, per, 
		x, y + img.imgHeight - per, img.imgWidth, per);
		
	//Magic
	x = 52;
	y = ctx.height - this.gridS.y * 2 + 8;
	this.eng.drawImage(Tileset.hud.manaBack.getColor(58,135,175).img, x, y, Tileset.hud.manaBack.subImg);
	
	tile = Tileset.hud.mana;
	s = tile.subImg;
	img = tile.getColor(58,135,175).img;
	per = (PlayerStats.mana / PlayerStats.mMana) * img.imgHeight;
	ctx.drawImage(img,
		s.x * img.imgWidth, s.y * img.imgHeight + img.imgHeight - per, img.imgWidth, per, 
		x, y + img.imgHeight - per, img.imgWidth, per);
		
	//Stats
	x = 8;
	y += 54;
	
	var ps = PlayerStats;
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillText(ps.name + ", " + ps.class.name, x, y);
	ctx.fillText(this.map.name, x, y + 16);
	
	var exDmg = 0, exDfs = 0;
	if (ps.weapons[ps.currentW]) exDmg = ps.weapons[ps.currentW].item.dmg;
	if (ps.armours[ps.currentA]) exDfs = ps.armours[ps.currentA].item.dfs;
	exDmg += (PlayerStats.bersekT > 0)? 20 : 0;
	
	x = 100 + this.gridS.x;
	y = ctx.height - this.gridS.y * 2 + 24;
	
	ctx.fillText("lvl: " + ps.lvl, x, y);
	ctx.fillText("exp: " + ps.exp, x, y + 20);
	
	x += 100;
	ctx.fillStyle = (PlayerStats.bersekT > 0)? "rgb(255,0,0)" : "rgb(255,255,255)";
	ctx.fillText("str: " + (ps.str + exDmg), x, y);
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillText("def: " + (ps.def + exDfs), x, y + 20);
	ctx.fillText("spd: " + ps.spd, x, y + 40);
	
	x += 100;
	ctx.fillText("food: " + ps.food, x, y);
	ctx.fillText("luck: " + ps.luk, x, y + 20);
	ctx.fillText("gold: " + ps.gold, x, y + 40);
	
	//Weapon
	tile = Tileset.itemsWeapons.frame;
	x = ctx.width - this.gridS.x * 6 - 16;
	y = ctx.height - this.gridS.y * 2 + 8;
	this.eng.drawImage(this.sprites[tile.img], x, y, tile.subImg);
	
	if (PlayerStats.weapons[PlayerStats.currentW]){
		var weapon = PlayerStats.weapons[PlayerStats.currentW];
		tile = weapon.tile;
		var img = (this.sprites[tile.img])? this.sprites[tile.img] : tile.img;
		this.eng.drawImage(img, x, y, tile.subImg);
		
		ctx.fillText(Math.round(weapon.item.status * 100) + "%", x, y + this.gridS.y + 16);
	}
	
	//Armour
	tile = Tileset.itemsWeapons.frame;
	x += 55;
	this.eng.drawImage(this.sprites[tile.img], x, y, tile.subImg);
	
	if (PlayerStats.armours[PlayerStats.currentA]){
		var armour = PlayerStats.armours[PlayerStats.currentA];
		tile = armour.tile;
		var img = (this.sprites[tile.img])? this.sprites[tile.img] : tile.img;
		this.eng.drawImage(img, x, y, tile.subImg);
		
		ctx.fillText(Math.round(armour.item.status * 100) + "%", x, y + this.gridS.y + 16);
	}
	
	//Items
	tile = Tileset.itemsWeapons.frame;
	x += 55;
	this.eng.drawImage(this.sprites[tile.img], x, y, tile.subImg);
	
	if (PlayerStats.items[PlayerStats.currentI]){
		var item = PlayerStats.items[PlayerStats.currentI];
		tile = item.tile;
		var img = (this.sprites[tile.img])? this.sprites[tile.img] : tile.img;
		this.eng.drawImage(img, x, y, tile.subImg);
	}
	
	//Magic
	tile = Tileset.itemsWeapons.frame;
	x += 55;
	this.eng.drawImage(this.sprites[tile.img], x, y, tile.subImg);
	
	if (PlayerStats.spells[PlayerStats.currentS]){
		var item = PlayerStats.spells[PlayerStats.currentS];
		tile = item.tile;
		var img = (this.sprites[tile.img])? this.sprites[tile.img] : tile.img;
		this.eng.drawImage(img, x, y, tile.subImg);
	}
	
	this.drawWeaponsMenu();
	this.drawArmourMenu();
	this.drawItemsMenu();
	this.drawSpellsMenu();
	this.drawPickupItemsMenu();
};

Game.prototype.clearScreen = function(color){
	var ctx = this.eng.ctx;
	ctx.fillStyle = (color)? color : "rgb(0,0,0)";
	ctx.fillRect(this.viewPos.x*this.gridS.x,this.viewPos.y*this.gridS.y, this.viewS.x*this.gridS.x,this.viewS.y*this.gridS.y);
};

Game.prototype.repoblateDungeons = function(percentage){
	for (var i=0;i<this.maps.length;i++){
		if (this.maps[i].key == this.map.map) continue;
		if (this.maps[i].total == 0) continue;
		this.maps[i].createEnemies(percentage);
	}
};

Game.prototype.gotoMap = function(map){
	this.scene = null;
	if (map.map){
		this.map = null;
		for (var i=0;i<this.maps.length;i++){
			if (this.maps[i].key == map.map){
				this.map = this.maps[i];
				break;
			}
		}
		if (this.map == null){
			this.map = new Map(map);
			this.maps.push(this.map);
			this.map.loadInstances(this);
		}
	}else{
		this.map = new Map(map);
		this.maps.push(this.map);
		this.map.loadInstances(this);
	}
	
	this.map.player.act();
	this.map.player.playerAction = true;
	this.map.player.playerMoved = true;
	this.map.repaint = true;
};

Game.prototype.newGame = function(){
	var g = this;
	if (g.eng.imagesReady()){
		g.scene = new MainScreen();
		g.gameLoop();
	}else{
		requestAnimationFrame(function(){ g.newGame(); });
	}
};

Game.prototype.gameLoop = function(){
	var g = this;
	
	var now = Date.now();
	var delta = now - g.lastF;
	
	if (delta > g.fps){
		g.lastF = now - (delta % g.fps);
		if (g.map)
			g.map.drawMap(g);
		else if (g.scene)
			g.scene.loop(g);
	}
	
	requestAnimationFrame(function(){ g.gameLoop(); });
};

var game;
Utils.addEvent(window, "load", function(){
	game = new Game("divGame");
	game.newGame();
	
	Utils.addEvent(document, "keydown", function(e){
		if (window.event) e = window.event;
		
		if (game.keyP[e.keyCode] == 2) return;
		
		game.keyP[e.keyCode] = 1;
		game.lastK = e.keyCode;
		
		if(e.keyCode == 46 || e.keyCode == 8){
	        e.stopPropagation();
	        e.preventDefault();
	    }
	});
	
	Utils.addEvent(document, "keyup", function(e){
		if (window.event) e = window.event;
		
		game.keyP[e.keyCode] = 0;
		
		if(e.keyCode == 46 || e.keyCode == 8){
	        e.stopPropagation();
	        e.preventDefault();
	    }
	});
});

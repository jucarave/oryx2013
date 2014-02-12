function Game(container){
	this.eng = new Engine();
	this.eng.createCanvas(672, 528, container);
	//this.eng.canvas.style.zoom = "200%";
	this.eng.ctx.font = '15px "Courier New"';
	
	this.fps = 1000 / 30;
	this.lastF = Date.now();
	
	this.room = 0;
	this.sprites = {};
	this.sounds = {};
	this.music = {};
	this.instances = [];
	
	this.loadImages();
	this.loadSounds();
	
	this.selectedOpt = 0;
	
	this.viewS = new Position(21, 8);
	this.viewPos = new Position(0, 1.5);
	this.gridS = new Position(32, 48);
	
	this.maps = [];
	this.map = null;
	this.scene = null;
	
	this.keyP = new Array(255);
	this.lastK = -1;
	
	this.blink = 30;
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
	
	this.sprites["console"] = this.eng.loadImage(cp + "img/console.png?version=" + version, 1, 1);
	this.sprites["ui"] = this.eng.loadImage(cp + "img/UI.png?version=" + version, 1, 1);
};

Game.prototype.loadSounds = function(){
	this.sounds["step"] = this.eng.loadSound(cp + "wav/step.wav?version=" + version);
	this.sounds["attack"] = this.eng.loadSound(cp + "wav/attack1.wav?version=" + version);
	this.sounds["pick"] = this.eng.loadSound(cp + "wav/pick.wav?version=" + version);
	this.sounds["drop"] = this.eng.loadSound(cp + "wav/drop.wav?version=" + version);
	this.sounds["fireball"] = this.eng.loadSound(cp + "wav/fireball.wav?version=" + version);
	this.sounds["bersek"] = this.eng.loadSound(cp + "wav/bersek.wav?version=" + version);
	this.sounds["blink"] = this.eng.loadSound(cp + "wav/blink.wav?version=" + version);
	this.sounds["display"] = this.eng.loadSound(cp + "wav/display.wav?version=" + version);
	this.sounds["life"] = this.eng.loadSound(cp + "wav/life.wav?version=" + version);
	this.sounds["portal"] = this.eng.loadSound(cp + "wav/portal.wav?version=" + version);
	this.sounds["sleep"] = this.eng.loadSound(cp + "wav/sleep.wav?version=" + version);
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
		if (darker === true){
			ctx.fillStyle = "rgba(0,0,0,0.8)";
		}else if (darker > 0){
			ctx.fillStyle = "rgba(0,0,0," + (darker - 0.1) + ")";
		}
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
		if (items[i].item.effect && !items[i].item.effect.used){
			img = game.sprites[items[i].tile.parent.img];
			this.eng.drawImage(img, xx, y, itile.subImg);
		}else{
			this.eng.drawImage(img, xx, y, itile.subImg);
		}
		
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
	y = 80;
	
	for (var i=0;i<7;i++){
		this.eng.drawImage(this.sprites[tile.img], x, y, tile.subImg);
		if (bucket[i]){
			var item = bucket[i];
			var rtile = item.tile.img;
			if (item.item.effect && !item.item.effect.used){
				rtile = item.tile.parent.img;
			}
			
			var wtile = (this.sprites[rtile])? this.sprites[rtile] : rtile;
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
				Console.addMessage(msg.dropped + ItemFactory.getItemName(item.item), "rgb(255,255,255)");
				this.sounds.drop.stopAndPlay();
				PlayerStats.steppedItems.push(item);
				continue;
			}
			
			if (item.item.effect && this.keyP[73] == 1){
				if (item.item.effect.used){
					Console.addMessage(item.item.effect.desc, "rgb(255,255,255)");
				}else{
					Console.addMessage(msg.unknow, "rgb(255,255,255)");
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
	x = 635;
	this.drawPlayerMenu(PlayerStats.spells, "currentS", x, false);
	
	if (this.navigateMenu(82)){
		PlayerStats.spellsMenu = false;
		this.map.player.act();
	}
};

Game.prototype.drawItemsMenu = function(){
	if (!PlayerStats.itemsMenu) return;
	
	var ctx = this.eng.ctx;
	x = 600;
	this.drawPlayerMenu(PlayerStats.items, "currentI", x, true);
	
	if (this.navigateMenu(69)){
		PlayerStats.itemsMenu = false;
		this.map.player.act();
	}
};

Game.prototype.drawWeaponsMenu = function(){
	if (!PlayerStats.weaponsMenu) return;
	
	var ctx = this.eng.ctx;
	x = 530;
	this.drawPlayerMenu(PlayerStats.weapons, "currentW", x, true);
	
	if (this.navigateMenu(81)){
		PlayerStats.weaponsMenu = false;
		this.map.player.act();
	}
};

Game.prototype.drawArmourMenu = function(){
	if (!PlayerStats.armourMenu) return;
	
	var ctx = this.eng.ctx;
	x = 565;
	this.drawPlayerMenu(PlayerStats.armours, "currentA", x, true);
	
	if (this.navigateMenu(87)){
		PlayerStats.armourMenu = false;
		this.map.player.act();
	}
};

Game.prototype.drawConsole = function(){
	var ctx = this.eng.ctx;
	
	//ctx.fillStyle = "rgb(33,33,33)";
	//ctx.fillRect(0,0,ctx.width, this.gridS.y + 24);
	
	//this.eng.drawLine(0,this.gridS.y + 23, ctx.width, this.gridS.y + 23, "rgb(255,255,255)");
	
	ctx.drawImage(this.sprites["console"], 0, 0);
	
	var messages = Console.messages;
	var end = messages.length;
	
	for (var i=0;i<end;i++){
		var m = messages[i];
		
		ctx.fillStyle = m.color;
		ctx.fillText(m.text, 10, 19 + (13 * i));
	}
};

Game.prototype.drawInterface = function(){
	this.drawConsole();
	var ctx = this.eng.ctx;
	
	//ctx.fillRect(0,ctx.height - this.gridS.y * 2 + 20, ctx.width, this.gridS.y * 2);

	var x = 14;
	var y = ctx.height - this.sprites["ui"].height;
	
	ctx.drawImage(this.sprites["ui"], 0, y);

	//Name
	var yy = y + 34;
	var ps = PlayerStats;
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillText(ps.name, x, yy);

	//Health
	var per = (PlayerStats.health / PlayerStats.mHealth);
	yy = y + 40;
		
	ctx.strokeStyle = "rgb(255,0,0)";
	ctx.strokeRect(x, yy, 150, 10);
	
	ctx.fillStyle = "rgb(255,0,0)";
	ctx.fillRect(x + 2, yy + 2, 146 * per, 6);
	
	//Magic
	var per = (PlayerStats.mana / PlayerStats.mMana);
	yy = y + 56;
		
	ctx.strokeStyle = "rgb(58,135,175)";
	ctx.strokeRect(x, yy, 130, 8);
	
	ctx.fillStyle = "rgb(58,135,175)";
	ctx.fillRect(x + 2, yy + 2, 126 * per, 4);
	
	//Main Stats
	x = 180;
	yy = y + 34;
	
	var name = (this.map.level == 0)? "Tull" : this.map.level;
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillText("depth " + name, x, yy);
	ctx.fillText("Lvl " + ps.lvl, x, yy + 16);
	ctx.fillText("exp " + ps.exp, x, yy + 32);
	
	x = 355;
	var exDmg = 0, exDfs = 0;
	if (ps.weapons[ps.currentW]) exDmg = ps.weapons[ps.currentW].item.dmg;
	if (ps.armours[ps.currentA]) exDfs = ps.armours[ps.currentA].item.dfs;
	exDmg += (PlayerStats.bersekT > 0)? 20 : 0;
	
	ctx.fillStyle = (PlayerStats.bersekT > 0)? "rgb(255,0,0)" : "rgb(255,255,255)";
	ctx.fillText("str " + (ps.str + exDmg), x, yy);
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillText("def " + (ps.def + exDfs), x, yy + 16);
	ctx.fillText("spd " + ps.spd, x, yy + 32);
	
	x += 80;
	this.blink -= 1;
	if (this.blink <= 0) this.blink = 30;
	if (this.blink < 15 && ps.food <= 30){
		ctx.fillStyle = "rgb(255,0,0)";
	}
	ctx.fillText("food " + ps.food, x, yy);
	
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillText("luck " + ps.luk, x, yy + 16);
	ctx.fillText("gold " + ps.gold, x, yy + 32);
	
	//Weapon
	tile = Tileset.itemsWeapons.frame;
	x += 95;
	yy = y + 20;
	//this.eng.drawImage(this.sprites[tile.img], x, yy, tile.subImg);
	
	if (PlayerStats.weapons[PlayerStats.currentW]){
		var weapon = PlayerStats.weapons[PlayerStats.currentW];
		tile = weapon.tile;
		var img = (this.sprites[tile.img])? this.sprites[tile.img] : tile.img;
		this.eng.drawImage(img, x, yy, tile.subImg);
		
		ctx.fillText(Math.round(weapon.item.status * 100), x, yy + 48);
	}
	
	//Armour
	tile = Tileset.itemsWeapons.frame;
	x += 35;
	//this.eng.drawImage(this.sprites[tile.img], x, y, tile.subImg);
	
	if (PlayerStats.armours[PlayerStats.currentA]){
		var armour = PlayerStats.armours[PlayerStats.currentA];
		tile = armour.tile;
		var img = (this.sprites[tile.img])? this.sprites[tile.img] : tile.img;
		this.eng.drawImage(img, x, yy, tile.subImg);
		
		ctx.fillText(Math.round(armour.item.status * 100), x, yy + 48);
	}
	
	//Items
	tile = Tileset.itemsWeapons.frame;
	x += 35;
	//this.eng.drawImage(this.sprites[tile.img], x, y, tile.subImg);
	
	if (PlayerStats.items[PlayerStats.currentI]){
		var item = PlayerStats.items[PlayerStats.currentI];
		tile = item.tile;
		var img = (this.sprites[tile.img])? this.sprites[tile.img] : tile.img;
		if (item.item.effect && !item.item.effect.used){
			this.eng.drawImage(this.sprites[item.tile.parent.img], x, yy, tile.subImg);
		}else{
			this.eng.drawImage(img, x, yy, tile.subImg);
		}
	}
	
	//Magic
	tile = Tileset.itemsWeapons.frame;
	x += 35;
	//this.eng.drawImage(this.sprites[tile.img], x, yy, tile.subImg);
	
	if (PlayerStats.spells[PlayerStats.currentS]){
		var item = PlayerStats.spells[PlayerStats.currentS];
		tile = item.tile;
		var img = (this.sprites[tile.img])? this.sprites[tile.img] : tile.img;
		this.eng.drawImage(img, x, yy, tile.subImg);
	}
	
	//Clock
	x = 320;
	yy = 480;
	
	ctx.strokeStyle = "rgb(255,255,255)";
	ctx.beginPath();
	
	//Hour
	var angle = Math.degToRad((90 - (Clock.hour % 12) * 30) % 360);
	var x2 = Math.cos(angle) * 8;
	var y2 = -Math.sin(angle) * 8;
	
	ctx.moveTo(x, yy);
	ctx.lineTo(x + x2,yy + y2);
	
	//Minute
	angle = Math.degToRad((90 - Clock.minute * 6) % 360);
	x2 = Math.cos(angle) * 10;
	y2 = -Math.sin(angle) * 10;
	
	ctx.moveTo(x, yy);
	ctx.lineTo(x+x2,yy+y2);
	ctx.stroke();
	
	ctx.textAlign = "center";
	ctx.fillText("Day", 320, 462);
	ctx.fillText(Clock.day, 320, 510);
	
	ctx.textAlign = "left";
	
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
		if (this.maps[i].total == 0) continue;
		this.maps[i].createEnemies(percentage);
	}
};

Game.prototype.gotoMap = function(map, playerPos){
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
	
	if (playerPos){
		this.map.player.position.set(playerPos);
	}
	
	this.map.player.act();
	this.map.player.playerAction = true;
	this.map.player.playerMoved = true;
	this.map.repaint = true;
};

Game.prototype.loadGame = function(){
	var game = JSON.parse(localStorage.getItem("tull"));
	if (!game) return false;
	
	PlayerStats.name = game.p.n;
	PlayerStats.class = HeroClasses.fromId(game.p.c);
	PlayerStats.health = game.p.h;
	PlayerStats.mHealth = game.p.mH;
	PlayerStats.mana = game.p.m;
	PlayerStats.mMana = game.p.mM;
	PlayerStats.food = game.p.f;
	PlayerStats.lvl = game.p.l;
	PlayerStats.exp = game.p.e;
	PlayerStats.str = game.p.s;
	PlayerStats.def = game.p.d;
	PlayerStats.luk = game.p.lu;
	PlayerStats.spd = game.p.sp;
	PlayerStats.gold = game.p.g;
	PlayerStats.p = game.p.p;
	
	PlayerStats.currentW = game.p.cw;
	for (var i=0,len=game.p.w.length;i<len;i++){
		var w = game.p.w[i];
		var weapon = ItemFactory.getItem(w.n, w.s);
		item = new Item(weapon.tile, new Position(0,0), weapon);
		PlayerStats.weapons.push(item);
	}
	
	PlayerStats.currentA = game.p.ca;
	for (var i=0,len=game.p.a.length;i<len;i++){
		var a = game.p.a[i];
		var armour = ItemFactory.getItem(a.n, a.s);
		item = new Item(armour.tile, new Position(0,0), armour);
		PlayerStats.armours.push(item);
	}
	
	PlayerStats.currentI = game.p.ci;
	for (var i=0,len=game.p.i.length;i<len;i++){
		var a = game.p.i[i];
		var it = ItemFactory.getItem(a.n, a.s);
		item = new Item(it.tile, new Position(0,0), it);
		PlayerStats.items.push(item);
	}
	
	PlayerStats.currentS = game.p.cs;
	for (var i=0,len=game.p.spl.length;i<len;i++){
		var s = game.p.spl[i];
		var spl = ItemFactory.getItem(a.n, a.s);
		item = new Item(spl.tile, new Position(0,0), spl);
		PlayerStats.spells.push(item);
	}
	
	Clock.day = game.c.d;
	Clock.hour = game.c.h;
	Clock.minute = game.c.m;
	
	for (var i=0,len=game.m.length;i<len;i++){
		var m = game.m[i];
		
		var map = new Map({data: m});
		this.maps.push(map);
	}
	
	return true;
};

Game.prototype.saveGame = function(){
	var game = {
		p: {},
		m: [],
		c: {
			d: Clock.day,
			h: Clock.hour,
			m: Clock.minute
		}
	};
	
	game.p.n = PlayerStats.name;
	game.p.c = PlayerStats.class.id;
	game.p.h = PlayerStats.health;
	game.p.mH = PlayerStats.mHealth;
	game.p.m = PlayerStats.mana;
	game.p.mM = PlayerStats.mMana;
	game.p.f = PlayerStats.food;
	game.p.l = PlayerStats.lvl;
	game.p.e = PlayerStats.exp;
	game.p.s = PlayerStats.str;
	game.p.d = PlayerStats.def;
	game.p.lu = PlayerStats.luk;
	game.p.sp = PlayerStats.spd;
	game.p.g = PlayerStats.gold;
	game.p.p = PlayerStats.poison;
	
	game.p.w = [];
	game.p.cw = PlayerStats.currentW;
	for (var i=0,len=PlayerStats.weapons.length;i<len;i++){
		var w = PlayerStats.weapons[i].item;
		game.p.w.push({
			n: w.name,
			s: w.status
		});
	}
	
	game.p.a = [];
	game.p.ca = PlayerStats.currentA;
	for (var i=0,len=PlayerStats.armours.length;i<len;i++){
		var a = PlayerStats.armours[i].item;
		game.p.a.push({
			n: a.name,
			s: a.status
		});
	}
	
	game.p.i = [];
	game.p.ci = PlayerStats.currentI;
	for (var i=0,len=PlayerStats.items.length;i<len;i++){
		var it = PlayerStats.items[i].item;
		game.p.i.push({
			n: it.name,
			s: it.status
		});
	}
	
	game.p.spl = [];
	game.p.cs = PlayerStats.currentS;
	for (var i=0,len=PlayerStats.spells.length;i<len;i++){
		var s = PlayerStats.spells[i].item;
		game.p.spl.push({
			n: s.name,
			s: s.status
		});
	}
	
	for (var i=0,len=this.maps.length;i<len;i++){
		var m = this.maps[i];
		if (m.key == "town") continue;
		var map = {
			m: [],
			n: m.name,
			p: m.player.position.clone(),
			l: m.level,
			t: m.total,
			k: m.key,
			i: []
		};
		
		var offset = 0;
		var trackO = true;
		for (var j=0,jlen=m.map.length;j<jlen;j++){
			var row = [];
			var empty = true;
			for (var k=0,klen=m.map[j].length;k<klen;k++){
				var t = m.map[j][k];
				if (t == 0){
					row.push(t);
				}else{
					empty = false;
					trackO = false;
					if (t[0].visible > 0)
						row.push(t[0].tileId + "v");
					else
						row.push(t[0].tileId);
				}
			}
			
			if (!empty)
				map.m[j] = row;
			else if (trackO)
				offset += 1;
		}
		
		map.p.y -= offset;
		
		for (var j=0,jlen=m.instances.length;j<jlen;j++){
			var ins = m.instances[j];
			
			if (ins.enemy) continue;
			
			var instance = {
				x: ins.position.x,
				y: ins.position.y - offset,
				t: ins.tile.tile
			};
			
			if (ins.item){
				instance.i = {
					n: ins.item.name,
				};
				
				if (ins.item.isMoney){
					instance.i.a = ins.item.amount;
					instance.iM = true;
				}else if (ins.status){
					instance.i.s = status;
				}
			}
			
			if (ins.isStairs){
				instance.iS = true;
				instance.d = ins.direction;
				instance.l = ins.level;
				instance.iH = ins.isHole;
				instance.dN = ins.dungeonName;
				
				console.log(instance);
			}else if (ins.isTrap){
				instance.iT = true;
				instance.di = ins.active;
			}
			
			map.i.push(instance);
		}
		
		game.m.push(map);
	}
	
	var str = JSON.stringify(game);
	localStorage.setItem("tull", str);
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

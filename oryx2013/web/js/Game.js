function Game(container){
	this.eng = new Engine();
	this.eng.createCanvas(320, 240, container);
	this.eng.canvas.style.zoom = "200%";
	this.eng.ctx.font = "10px courier";
	
	this.fps = 1000 / 30;
	this.lastF = Date.now();
	
	this.room = 0;
	this.sprites = {};
	this.instances = [];
	
	this.loadImages();
	
	this.viewS = new Position(20, 8);
	this.viewPos = new Position(0, 0);
	this.gridS = new Position(16, 24);
	this.map = null;
	
	this.keyP = new Array(255);
}

Game.prototype.loadImages = function(){
	this.sprites["heroes"] = this.eng.loadImage(cp + "img/heroes.png?version=" + version, 19, 2);
	this.sprites["environment"] = this.eng.loadImage(cp + "img/environment.png?version=" + version, 19, 4);
	this.sprites["hud"] = this.eng.loadImage(cp + "img/hud.png?version=" + version, 4, 1);
	this.sprites["itemsWeapons"] = this.eng.loadImage(cp + "img/itemsWeapons.png?version=" + version, 19, 5);
};

Game.prototype.loadMap = function(){
	this.map = new Map({map: "test"});
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

Game.prototype.drawInterface = function(){
	var ctx = this.eng.ctx;
	
	ctx.fillStyle = "rgb(33,33,33)";
	ctx.fillRect(0,ctx.height - this.gridS.y * 2,ctx.width, this.gridS.y * 2);
	
	ctx.strokeStyle = "rgb(255,255,255)";
	ctx.beginPath();
	ctx.moveTo(0,ctx.height - this.gridS.y * 2 + 1);
	ctx.lineTo(ctx.width,ctx.height - this.gridS.y * 2 + 1);
	ctx.stroke();
	
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
	x = 30;
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
	y += 27;
	
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillText("Kram", x, y);
	
	//Weapon
	tile = Tileset.itemsWeapons.frame;
	x = ctx.width - this.gridS.x * 5;
	y = ctx.height - this.gridS.y * 2 + 8;
	this.eng.drawImage(this.sprites[tile.img], x, y, tile.subImg);
	
	//Armor
	tile = Tileset.itemsWeapons.frame;
	x += 20;
	this.eng.drawImage(this.sprites[tile.img], x, y, tile.subImg);
	
	//Food
	tile = Tileset.itemsWeapons.frame;
	x += 20;
	this.eng.drawImage(this.sprites[tile.img], x, y, tile.subImg);
	
	//stats
	tile = Tileset.itemsWeapons.frame;
	x += 20;
	this.eng.drawImage(this.sprites[tile.img], x, y, tile.subImg);
};

Game.prototype.clearScreen = function(){
	var ctx = this.eng.ctx;
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(this.viewPos.x*this.gridS.x,this.viewPos.y*this.gridS.y, this.viewS.x*this.gridS.x,this.viewS.y*this.gridS.y);
};

Game.prototype.newGame = function(){
	var g = this;
	if (g.eng.imagesReady()){
		game.loadMap();
		g.map.loadInstances(g);
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
		g.map.drawMap(g);
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
	});
	
	Utils.addEvent(document, "keyup", function(e){
		if (window.event) e = window.event;
		
		game.keyP[e.keyCode] = 0;
	});
});

function Player(tile, position){
	this.playerAction = true;
	this.playerMoved = false;
	this.fovDistance = 4;
	this.run = 0;
	
	this.stepCount = 0;
	
	Character.call(this, tile, position);
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.consoleMovement = function(xTo, yTo){
	if (yTo < 0){ Console.addMessage("North", "rgb(255,255,255)"); }
	else if (yTo > 0){ Console.addMessage("South", "rgb(255,255,255)"); }
	else if (xTo < 0){ Console.addMessage("West", "rgb(255,255,255)"); }
	else if (xTo > 0){ Console.addMessage("East", "rgb(255,255,255)"); }
};

Player.prototype.consumeFood = function(){
	this.stepCount++;
	if (this.stepCount == 10){
		PlayerStats.food--;
		if (PlayerStats.food == 0){
			PlayerStats.deathCause = 's';
			game.map = null;
			game.scene = new DeathScreen();
		}
		this.stepCount = 0;
	}
};

Player.prototype.tryMove = function(key, xTo, yTo){
	if (game.keyP[key]){ 
		if (this.run == 0 || this.run > 20){
			if (this.moveTo(xTo, yTo)){
				this.consumeFood();
				this.consoleMovement(xTo, yTo);
				this.playerMoved = true;
				PlayerStats.steppedItems = [];
			}
			this.playerAction = true;
			game.keyP[key] = 2;
			
		}
		this.run++;
		return true;
	}
	return false;
};

Player.prototype.step = function(game){
	if (PlayerStats.weaponsMenu) return;
	if (PlayerStats.armourMenu) return;
	if (PlayerStats.pickItemsMenu) return;
	
	if (!this.tryMove(37,-1,0))
	if (!this.tryMove(38,0,-1))
	if (!this.tryMove(39,1,0))
	if (!this.tryMove(40,0,1))
		this.run = 0;
		
	if (game.keyP[81] == 1){
		PlayerStats.weaponsMenu = true;
		game.keyP[81] = 2;
	}else if (game.keyP[87] == 1){
		PlayerStats.armourMenu = true;
		game.keyP[87] = 2;
	}
};

Player.prototype.setView = function(game){
	var view = this.mapManager.view;
	var x = this.position.x - game.viewS.x / 2;
	var y = this.position.y - game.viewS.y / 2;
	
	if (x < 0) x = 0;
	if (y < 0) y = 0;
	if (x + game.viewS.x > game.map.map[0].length) x = game.map.map[0].length - game.viewS.x;
	if (y + game.viewS.y > game.map.map.length) y = game.map.map.length - game.viewS.y;
	
	view.set(x, y);
};

Player.prototype.pickItem = function(item){
	item.inWorld = false;
		
	var items = PlayerStats.steppedItems;
	var weapons = PlayerStats.weapons;
	var armours = PlayerStats.armours;
	if (item.item.isWeapon){
		if (weapons.length == 7){
			Console.addMessage("You can't carry more weapons!", "rgb(255,0,0)");
			return;
		}
		weapons.push(item);
		if (weapons.length == 1){ PlayerStats.currentW = 0; }
	}else if (item.item.isArmour){
		if (armours.length == 7){
			Console.addMessage("You can't carry more armours!", "rgb(255,0,0)");
			return;
		}
		armours.push(item);
		if (armours.length == 1){ PlayerStats.currentA = 0; }
	}
	Console.addMessage("You pick up a(n) " + ItemFactory.getItemQuality(item.item.status) + " " + ItemFactory.getItemName(item.item), "rgb(255,255,255)");
};

Player.prototype.checkItems = function(game){
	if (PlayerStats.weaponsMenu) return;
	if (PlayerStats.armourMenu) return;
	
	var items = PlayerStats.steppedItems;
	if (items.length == 0) return;
	if (game.keyP[13] != 1 || PlayerStats.pickItemsMenu) return;
	
	game.keyP[13] = 2;
	this.playerAction = true;
	if (items.length == 1){
		this.pickItem(items[0]);
		PlayerStats.steppedItems = [];
	}else{
		PlayerStats.pickItemsMenu = true;
	}
};

Player.prototype.checkStairs = function(){
	if (!PlayerStats.stairs) return;
	if (game.keyP[13] == 1){
		var dir = "ascend";
		var rand = true;
		var level = PlayerStats.stairs.level - 1;
		if (PlayerStats.stairs.direction == 'D')
			dir = "descend";
			level = PlayerStats.stairs.level + 1;
		if (PlayerStats.stairs.direction == 'E'){
			Console.addMessage("You enter the dungeon!", "rgb(255,255,255)");
			PlayerStats.level = 1;
			level = 1;
		}else if (PlayerStats.stairs.level == 0){
			Console.addMessage("You enter the town!", "rgb(255,255,255)");
			PlayerStats.level = 0;
			rand = false;
		}else{
			Console.addMessage("You " + dir + " to level " + PlayerStats.stairs.level, "rgb(255,255,255)");
			PlayerStats.level = PlayerStats.stairs.level;
		}
		game.gotoMap({map: PlayerStats.stairs.dungeonName, random: rand, level: level});
		PlayerStats.stairs = null;
		game.keyP[13] = 2;
	}
};

Player.prototype.act = function(){
	this.playerAction = true;
	FOV.getFOV(this.position, this.mapManager, this.fovDistance);
};

Player.prototype.loop = function(game){
	this.playerMoved = false;
	
	this.step(game);
	if (!game.map) return;
	
	this.setView(game);
	this.checkItems(game);
	this.checkStairs();
	
	if (this.playerAction && !this.mapManager.light){
		FOV.getFOV(this.position, this.mapManager, this.fovDistance);
	}
	
	Character.prototype.loop.call(this, game);
};

var PlayerStats = {
	name: "",
	class: "",
	
	health: 0,
	mHealth: 0,
	
	mana: 0,
	mMana: 0,
	
	weapons: [],
	currentW: 0,
	
	armours: [],
	currentA: 0,
	
	food: 0,
	
	lvl: 0,
	exp: 0,
	str: 0,
	def: 0,
	spd: 0,
	wsd: 0,
	int: 0,
	
	steppedItems: [],
	stairs: null,
	
	weaponsMenu: false,
	armourMenu: false,
	pickItemsMenu: false,
	
	deathCause: '',
	level: 0
};
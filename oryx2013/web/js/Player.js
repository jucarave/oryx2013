function Player(tile, position){
	this.playerAction = true;
	this.playerMoved = false;
	this.fovDistance = 4;
	this.run = 0;
	
	this.stepCount = 0;
	this.battle = 0;
	
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
				PlayerStats.stairs = null;
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

Player.prototype.hurt = function(enemy, dmg){
	if (dmg <= 0) dmg = 1 + Math.iRandom(2);
	
	PlayerStats.health -= dmg;
	Console.addMessage(" > The " + enemy.name + " hit " + dmg + " points to you", "rgb(255,0,0)");
	
	if (PlayerStats.health <= 0){
		PlayerStats.deathCause = enemy.name;
		game.map = null;
		game.scene = new DeathScreen();
	}
};

Player.prototype.castAttack = function(x, y){
	var enemy = this.mapManager.getEnemyAt(x, y);
	if (!enemy){
		Console.addMessage("There is nothing in there", "rgb(255,255,255)"); 
		return; 
	}
	
	var dice = Math.iRandom(10);
	if (enemy.enemy.spd > PlayerStats.spd + 10 && dice != 6 && dice != 3){
		Console.addMessage("Missed!", "rgb(255,255,255)");
		return;
	}
	
	var weapon = PlayerStats.weapons[PlayerStats.currentW];
	weapon.item.status -= weapon.item.wear / 100;
	if (weapon.item.status < 0){
		weapon.item.status = 0;
		Console.addMessage("The weapon is damaged!", "rgb(255,255,0)");
		return;
	}
	var dmg = PlayerStats.str;
	if (weapon) dmg += Math.round(weapon.item.dmg * weapon.item.status);
	dmg -= enemy.enemy.dfs;
	
	var dice = weapon.item.dice;
	if (dice){
		var d = parseInt(dice.substring(dice.indexOf("D") + 1, dice.length), 10);
		if (Math.iRandom(10) == d){
			var v = parseInt(dice.substring(0, dice.indexOf("D")));
			dmg += v;
		}
	}
	
	enemy.hurt(dmg);
};

Player.prototype.shootMissile = function(x, y, arrow){
	if (PlayerStats.class.id != HeroClasses.archer.id && arrow)
		throw "You are not supossed to be here";
	if (PlayerStats.class.id != HeroClasses.wizard.id && !arrow)
		throw "You are not supossed to be here";
		
	var tile = Tileset.effects.magic;
	if (arrow){
		if (x > 0) tile = Tileset.effects.arrowRight; else
		if (x < 0) tile = Tileset.effects.arrowLeft; else
		if (y > 0) tile = Tileset.effects.arrowDown; else
		if (y < 0) tile = Tileset.effects.arrowUp;
	}
	
	var arrow = new PowerEffect(tile, new Position(this.position.x + x, this.position.y + y), new Position(x, y));
	arrow.mapManager = this.mapManager;
	this.mapManager.animateInstances.push(arrow);
};

Player.prototype.attack = function(game){
	if (this.battle < 0){
		this.battle++;
	}else if (this.battle == 1){
		var dir = "";
		var x = 0;
		var y = 0;
		if (game.keyP[37] == 1){ dir = "West"; game.keyP[37] = 2; x--; }else
		if (game.keyP[38] == 1){ dir = "North"; game.keyP[38] = 2; y--; }else
		if (game.keyP[39] == 1){ dir = "East"; game.keyP[39] = 2; x++; }else
		if (game.keyP[40] == 1){ dir = "South"; game.keyP[40] = 2; y++; }
		
		if (dir != ""){
			Console.removeLastMessage();
			Console.addMessage("Attack where? " + dir, "rgb(255, 255, 255)", "attack");
			this.battle = -5;
			
			if (PlayerStats.weapons[PlayerStats.currentW].item.isStaff){
				this.shootMissile(x, y);
			}else if (PlayerStats.weapons[PlayerStats.currentW].item.isBow){
				this.shootMissile(x, y, true);
			}else
				this.castAttack(this.position.x + x, this.position.y + y);
			this.playerAction = true;
			this.playerMoved = true;
			return true;
		}
	}else{
		if (game.keyP[65] == 1){
			Console.addMessage("Attack where? ", "rgb(255, 255, 255)", "attack");
			this.battle = 1;
			game.keyP[65] = 2;
			return true;
		}
	}
	return false;
};

Player.prototype.transact = function(game){
	if (game.keyP[84] != 1) return;
	
	game.keyP[84] = 2;
	var seller = this.mapManager.getSellerAt(this.position.x, this.position.y - 2);
	if (seller){
		seller.greet();
		return;
	}
	
	seller = this.mapManager.getSellerAt(this.position.x + 2, this.position.y);
	if (seller){
		seller.greet();
		return;
	}
	
	seller = this.mapManager.getSellerAt(this.position.x, this.position.y + 2);
	if (seller){
		seller.greet();
		return;
	}
	
	seller = this.mapManager.getSellerAt(this.position.x - 2, this.position.y);
	if (seller){
		seller.greet();
		return;
	}
};

Player.prototype.addExperience = function(exp){
	PlayerStats.exp += exp;
	var level = 60 * (PlayerStats.lvl - 1);
	var requiredExp = level + Math.round(Math.pow(level / 10, 2));
	if (PlayerStats.lvl == 1) requiredExp = 60;
	
	if (PlayerStats.exp >= requiredExp){
		var cl = PlayerStats.class;
		PlayerStats.lvl += 1;
		var str, dfs, spd, luk;
		if (cl.id == HeroClasses.archer.id || cl.id == HeroClasses.fighter.id)
			str = Math.iRandom(5);
		else
			str = Math.iRandom(3);
			
		if (cl.id == HeroClasses.fighter.id)
			dfs = Math.iRandom(5);
		else
			dfs = Math.iRandom(3);
			
		if (cl.id == HeroClasses.archer.id || cl.id == HeroClasses.wizard.id)
			spd = Math.iRandom(5);
		else
			spd = Math.iRandom(3);
			
		if (cl.id == HeroClasses.wizard.id)
			luk = Math.iRandom(5);
		else
			luk = Math.iRandom(3);
			
		PlayerStats.str += str;
		PlayerStats.dfs += dfs;
		PlayerStats.spd += spd;
		PlayerStats.luk += luk;
		
		Console.addMessage("New level: " + PlayerStats.lvl + " -> str+" + str + " -> dfs+" + dfs + " -> spd+" + spd + " -> luck+" + luk, "rgb(255,255,255)");
	}
};

Player.prototype.step = function(game){
	if (PlayerStats.weaponsMenu) return;
	if (PlayerStats.armourMenu) return;
	if (PlayerStats.pickItemsMenu) return;
	if (this.mapManager.store) return;
	
	if (this.attack(game)) return;
	if (this.battle != 0) return;
	this.transact(game);
	
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
	}else if (item.item.isMoney){
		PlayerStats.gold += item.item.amount;
	}
	
	if (item.item.isMoney){
		Console.addMessage("You pick " + item.item.name, "rgb(255,255,255)");
	}else{
		Console.addMessage("You pick up a(n) " + ItemFactory.getItemQuality(item.item.status) + " " + ItemFactory.getItemName(item.item), "rgb(255,255,255)");
	}
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
		var level = PlayerStats.stairs.level;
		if (PlayerStats.stairs.direction == 'D')
			dir = "descend";
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
	
	if ((this.playerAction || this.mapManager.repaint) && !this.mapManager.light){
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
	luk: 0,
	spd: 0,
	
	gold: 40,
	
	steppedItems: [],
	stairs: null,
	
	weaponsMenu: false,
	armourMenu: false,
	pickItemsMenu: false,
	
	deathCause: '',
	level: 0
};

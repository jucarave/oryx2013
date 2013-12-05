function Player(tile, position){
	this.playerAction = true;
	this.fovDistance = 4;
	this.run = 0;
	
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

Player.prototype.tryMove = function(key, xTo, yTo){
	if (game.keyP[key]){ 
		if (this.run == 0 || this.run > 20){
			if (this.moveTo(xTo, yTo)){
				this.consoleMovement(xTo, yTo);
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
	if (!this.tryMove(37,-1,0))
	if (!this.tryMove(38,0,-1))
	if (!this.tryMove(39,1,0))
	if (!this.tryMove(40,0,1))
		this.run = 0;
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

Player.prototype.checkItems = function(game){
	var items = PlayerStats.steppedItems;
	if (items.length == 0) return;
	if (game.keyP[13] != 1) return;
	
	game.keyP[13] = 2;
	this.playerAction = true;
	var weapons = PlayerStats.weapons;
	var armours = PlayerStats.armours;
	if (items.length == 1){
		items[0].inWorld = false;
		
		if (items[0].item.isWeapon){
			weapons.push(items[0]);
			if (weapons.length == 1){ PlayerStats.currentW = 0; }
		}else if (items[0].item.isArmour){
			armours.push(items[0]);
			if (armours.length == 1){ PlayerStats.currentA = 0; }
		}
		PlayerStats.steppedItems = [];
		Console.addMessage("You pick up a(n) " + ItemFactory.getItemQuality(items[0].item.status) + " " + items[0].item.name, "rgb(255,255,255)");
	}
};

Player.prototype.loop = function(game){
	this.step(game);
	this.setView(game);
	this.checkItems(game);
	
	if (this.playerAction){
		FOV.getFOV(this.position, this.mapManager, this.fovDistance);
	}
	
	Character.prototype.loop.call(this, game);
};

var PlayerStats = {
	health: 30,
	mHealth: 30,
	
	mana: 7,
	mMana: 15,
	
	weapons: [],
	currentW: 0,
	
	armours: [],
	currentA: 0,
	
	steppedItems: []
};

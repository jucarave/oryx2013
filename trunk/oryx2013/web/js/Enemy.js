function Enemy(tile, position, enemy){
	this.enemy = enemy;
	this.inWorld = true;
	this.discovered = false;
	this.blink = 8;
	this.keepAnimation = false;
	
	this.followPlayer = 0;
	this.playerPath = null;
	this.prior = false;
	
	this.sleep = 0;
	
	Character.call(this, tile, position);
}

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.attackPlayer = function(){
	var player = this.mapManager.player;
	var dice = Math.iRandom(10);
	
	if (PlayerStats.spd > this.enemy.spd + 10 && dice != 6 && dice != 3){
		return;
	}
	
	var dmg = this.enemy.str;
	dmg -= PlayerStats.def;
	
	player.hurt(this.enemy, dmg);
};

Enemy.prototype.followMovement = function(){
	var player = this.mapManager.player;
	var xdif = Math.abs(this.position.x - player.position.x);
	var ydif = Math.abs(this.position.y - player.position.y);
	if (xdif > 10 || ydif > 10) return;
	if ((xdif == 1 && ydif == 0) || (xdif == 0 && ydif == 1)){
		this.attackPlayer();
		return;
	}
	
	if (!this.playerPath || player.playerMoved){
		this.playerPath = PathFinder.getPath(this.position, player.position, this.mapManager);
		this.playerPath.pop();
	}
	
	if (this.playerPath.length > 0){
		var dice = Math.iRandom(10);
		if (dice == 4 || dice == 8) return;
		var node = this.playerPath[0];
		var xTo = node.x - this.position.x;
		var yTo = node.y - this.position.y;
		
		this.moveTo(xTo, yTo);
		this.playerPath.splice(0, 1);
	}
};

Enemy.prototype.randomMovement = function(){
	var xTo = Math.iRandom(-1, 1);
	var yTo = (xTo == 0)? Math.iRandom(-1, 1) : 0;
	
	if (xTo == 0 && yTo == 0) return;
	
	this.moveTo(xTo, yTo);
};

Enemy.prototype.dropLoot = function(){
	var ret = "";
	this.mapManager.player.addExperience(this.enemy.exp);
	
	ret += "> You earn " + this.enemy.exp + " points of experience";
	
	var money = Math.iRandom(this.enemy.money);
	if (money > 0){
		var it = ItemFactory.getMoney(money);
		var item = new Item(it.tile.getColor(255,255,0), new Position(this.position.x, this.position.y), it);
		item.mapManager = this.mapManager;
		
		this.mapManager.instances.push(item);
	}
	
	return ret;
};

Enemy.prototype.hurt = function(dmg){
	if (dmg <= 0){
		Console.addMessage("Missed!", "rgb(255,255,255)");
		return;
	}
	
	this.enemy.hp -= dmg;
	var msg = "You hit " + dmg + " points to the " + this.enemy.name;
	var msg2 = "";
	
	if (this.enemy.hp <= 0){
		msg += ". You killed the " + this.enemy.name;
		msg2 = this.dropLoot();
		this.inWorld = false;
	}else{
		this.mapManager.addAnimationInstance(this);
		this.keepAnimation = true;
	}
	
	this.mapManager.repaint = true;
	
	Console.addMessage(msg, "rgb(255,255,255)");
	
	if (msg2 != "") Console.addMessage(msg2, "rgb(255,255,255)");
};

Enemy.prototype.draw = function(game, tile){
	if (!tile) tile = this.tile;
	if (this.mapManager.isVisible(this.position) == 2){
		this.followPlayer = 5;
		if (!this.discovered){
			Console.addMessage("You saw a " + this.enemy.name, "rgb(255,0,0)");
			this.discovered = true;
		}
		
		if (PlayerStats.sleepSp && this.sleep == 0){
			var dice = Math.iRandom(10);
			if (dice == 3 || dice == 6 || dice == 9){
				this.sleep = 10;
			}
		}
		
		if (this.sleep > 0){
			this.sleep--;
			tile = (this.tile.parent)? this.tile.parent.getColor(75, 150, 163) : this.tile.getColor(75, 150, 163);
		}
		
		if (this.blink <= 3 || this.blink >= 8)
			Character.prototype.draw.call(this, game, tile);
	}else if (PlayerStats.displayEnemies){
		Character.prototype.draw.call(this, game, tile);
	}
};

Enemy.prototype.loop = function(game){
	if (this.sleep > 0){
		Character.prototype.loop.call(this,  game);
		return;
	}
	
	this.prior = false;
	if (this.followPlayer > 0){
		this.followMovement();
		if (this.mapManager.isVisible(this.position) != 2){
			this.followPlayer--;
		}
	}else{
		this.randomMovement();
	}
	Character.prototype.loop.call(this,  game);
};

Enemy.prototype.animatedLoop = function(game){
	if (this.mapManager.isVisible(this.position) != 2) return;
	
	if (this.blink > 3 && this.blink < 8){
		this.mapManager.repaint = true;
	}
	this.blink--;
	if (this.blink == 0){
		if (this.enemy.hp > 0)
			this.draw(game);
		this.keepAnimation = false; 
		this.blink = 8;
	}
};

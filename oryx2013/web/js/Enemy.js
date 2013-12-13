function Enemy(tile, position, enemy){
	this.enemy = enemy;
	this.inWorld = true;
	this.discovered = false;
	this.blink = 8;
	this.keepAnimation = false;
	Character.call(this, tile, position);
}

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.dropLoot = function(){
	var ret = "";
	PlayerStats.exp += this.enemy.exp;
	
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
	
	Console.addMessage(msg, "rgb(255,255,255)");
	
	if (msg2 != "") Console.addMessage(msg2, "rgb(255,255,255)");
};

Enemy.prototype.draw = function(game, tile){
	if (!tile) tile = this.tile;
	if (this.mapManager.isVisible(this.position) == 2){
		if (!this.discovered){
			Console.addMessage("You saw a " + this.enemy.name, "rgb(255,0,0)");
			this.discovered = true;
		}
		Character.prototype.draw.call(this, game, tile);
	}
};

Enemy.prototype.animatedLoop = function(game){
	if (this.mapManager.isVisible(this.position) != 2) return;
	
	if (this.blink > 3 && this.blink < 8){
		this.draw(game, this.tile.parent.getColor(0,0,0));
		this.mapManager.drawFloor(this.position.x, this.position.y, true);
	}
	this.blink--;
	if (this.blink == 0){
		if (this.enemy.hp > 0)
			this.draw(game);
		this.keepAnimation = false; 
		this.blink = 8;
	}
};

function Enemy(tile, position, enemy){
	this.enemy = enemy;
	this.inWorld = true;
	this.discovered = false;
	Character.call(this, tile, position);
}

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.dropLoot = function(){
	var ret = "";
	PlayerStats.exp += this.enemy.exp;
	
	ret += "> You earn " + this.enemy.exp + " points of experience";
	
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
	}
	
	Console.addMessage(msg, "rgb(255,255,255)");
	
	if (msg2 != "") Console.addMessage(msg2, "rgb(255,255,255)");
};

Enemy.prototype.draw = function(game){
	if (this.mapManager.isVisible(this.position) == 2){
		if (!this.discovered){
			Console.addMessage("You saw a " + this.enemy.name, "rgb(255,0,0)");
			this.discovered = true;
		}
		Character.prototype.draw.call(this, game);
	}
};

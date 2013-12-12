function Enemy(tile, position, enemy){
	this.enemy = enemy;
	this.inWorld = true;
	this.discovered = false;
	Character.call(this, tile, position);
}

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.draw = function(game){
	if (this.mapManager.isVisible(this.position) == 2){
		if (!this.discovered){
			Console.addMessage("You saw a " + this.enemy.name, "rgb(255,0,0)");
			this.discovered = true;
		}
		Character.prototype.draw.call(this, game);
	}
};

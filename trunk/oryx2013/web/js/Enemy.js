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
	
	var dice = Math.iRandom(100);
	if (dice > PlayerStats.luk){
		if (this.enemy.attr == "poison" && PlayerStats.level > 10){
			PlayerStats.poison = 1;
			Console.addMessage(msg.enPoison.replace("X",this.enemy.name), "rgb(0,255,255)");
		}else if (this.enemy.attr == "steal"){
			var money = Math.iRandom(this.enemy.money);
			money = Math.min(money, PlayerStats.gold);
			PlayerStats.gold -= money;
			
			var mess = msg.enSteal.replace("X", this.enemy.name);
			mess = mess.replace("Y", money);
			Console.addMessage(mess, "rgb(0,255,255)");
		}
	}
	
	var dmg = this.enemy.str;
	dmg -= PlayerStats.def;
	
	game.sounds.attack.stopAndPlay();
	player.hurt(this.enemy, dmg);
};

Enemy.prototype.shotMissile = function(arrow){
	var player = this.mapManager.player;
	var x = 0, y = 0;
	if (player.position.x > this.position.x) x = 1; else 
	if (player.position.x < this.position.x) x = -1; else
	if (player.position.y > this.position.y) y = 1; else 
	if (player.position.y < this.position.y) y = -1;
	
	if (x == 0 && y == 0){ return; }
	
	var tile = Tileset.effects.magic;
	if (arrow){
		if (x > 0) tile = Tileset.effects.arrowRight; else
		if (x < 0) tile = Tileset.effects.arrowLeft; else
		if (y > 0) tile = Tileset.effects.arrowDown; else
		if (y < 0) tile = Tileset.effects.arrowUp;
	}
	
	var arrow = new PowerEffect(tile.getColor(255,0,0), new Position(this.position.x + x, this.position.y + y), new Position(x, y));
	arrow.mapManager = this.mapManager;
	arrow.hitPlayer = true;
	arrow.master = this;
	this.mapManager.animateInstances.push(arrow);
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
	
	if ((xdif == 0 || ydif == 0) && this.enemy.attr == "arrow"){
		this.shotMissile(true);
		return;
	}
	
	if ((xdif == 0 || ydif == 0) && this.enemy.attr == "magic"){
		this.shotMissile();
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
	
	ret += msg.earnExp.replace("X", this.enemy.exp);
	
	var money = Math.iRandom(this.enemy.money);
	if (Math.iRandom(100) <= PlayerStats.luk)
		money = Math.iRandom(Math.floor(this.enemy.money / 2), this.enemy.money); 
	
	if (money > 0){
		var item = this.mapManager.getMoneyAt(new Position(this.position.x, this.position.y));
		if (item){
			item.item.amount += money;
			item.item.name = item.item.amount + msg.currency;
		}else{
			var it = ItemFactory.getMoney(money);
			var item = new Item(it.tile.getColor(255,255,0), new Position(this.position.x, this.position.y), it);
			item.mapManager = this.mapManager;
			
			this.mapManager.instances.push(item);
		}
	}
	
	return ret;
};

Enemy.prototype.hurt = function(dmg){
	if (dmg <= 0){
		Console.addMessage(msg.missed, "rgb(255,255,255)");
		return;
	}
	
	this.enemy.hp -= dmg;
	var mess = msg.hitTo.replace("D", dmg) + this.enemy.name;
	var msg2 = "";
	
	this.mapManager.repaint = true;
	
	if (this.enemy.hp <= 0){
		mess += msg.killedTo + this.enemy.name;
		msg2 = this.dropLoot();
		this.inWorld = false;
		
		if (this.mapManager.level == 20){
			setTimeout(function(){
				game.map = null;
				game.scene = new EndScene();
			}, 1000);
		}
		if (this.enemy.name == "Ias"){
			Console.addMessage(msg.killedIas, "rgb(255,255,255)");
			return;
		}
	}else{
		this.mapManager.addAnimationInstance(this);
		this.keepAnimation = true;
	}
	
	if (this.enemy.name == "Ias")
		Console.addMessage(msg.iasDmg.replace("D", dmg), "rgb(255,255,255)");
	else
		Console.addMessage(mess, "rgb(255,255,255)");
	
	if (msg2 != "") Console.addMessage(msg2, "rgb(255,255,255)");
};

Enemy.prototype.draw = function(game, tile){
	if (!tile) tile = this.tile;
	if (this.mapManager.isVisible(this.position) == 2){
		this.followPlayer = 5;
		if (!this.discovered){
			if (this.enemy.name == "Ias"){
				Console.addMessage(msg.findIas, "rgb(255,0,0)");
			}else{
				Console.addMessage(msg.sawTo + this.enemy.name, "rgb(255,0,0)");
			}
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

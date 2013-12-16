function Map(params){
	this.map = null;
	this.name = "";
	this.tiles = [];
	this.instances = [];
	this.enemies = [];
	this.view = new Position( 0, 0);
	this.player = null;
	this.level = 0;
	
	this.store = false;
	this.inTransact = null;
	
	this.light = false;
	
	this.passTurn = 0;
	
	this.signs = [];
	
	this.animateInstances = [];
	
	this.repaint = false;
	
	if (params.random){
		this.light = false;
		this.signs = [];
		this.name = "Dungeon Test - Level " + params.level;
		this.key = params.map;
		this.map = RDG.newMap(params.level);
		this.level = params.level;
		
		this.createEnemies();
	}else if (params.map){
		this.loadMap(params.map);
	}
	
	this.parseMap();
}

Map.prototype.loadMap = function(map){
	this.light = false;
	this.signs = [];
	if (map == "town"){
		this.name = "TULL";
		this.key = map;
		this.light = true;
		this.level = 0;
		
		var a = [5, 10];
		var b = [4, 10];
		var c = [4, 10, 11];
		var d = [4, 11, 10];
		var e = [1, 15];
		var f = [5, 16];
		var g = [5, 17];
		var h = [7, 18];
		
		this.map = [
			[ 4, 4, 4, 4, 2, d, a, a, a, a,14, e,-4, e,14, a, a, a, d, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			[ 4, 4, 4, 4, 2, a, 5, 5, 5, 5,13,13, 1,13,13, 5, 5, 5, a, 2, 7, 7, 7, 7, 7, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			[ 4, 4, 4, 4, 2, b, 5, f, 5, f, 5, 5, 1, 5, 5, f, 5, g, b, 2, 8, 8, 8, 8, 8, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			[ 4, 4, 4, 4, 2, a, 5, 5, 5, 1, 1, 1, 1, 5, 5, 5, 5, 5, a, 2, 7, 7, 7, 7, 7, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			[ 4, 4, 4, 4, 2, a, 5, g, 5, 1, 5, 5, 5, g, 5, 5, 5, f, a, 2, 7, 7, 7, 7, 7, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			[ 4, 4, 4, 4, 2, c, a, a, b, 1, b, b, b, a, b, b, b, a, c, 2, 7, 7, 7, 7, 7, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			[ 4, 4, 4, 4, 2, 5, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4],
			[ 4, 4, 4, 4, 2, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 2, 7, 7, 7, 7, 7, 8, 7, 2, 4, 4, 4, 4, 4, 4, 4],
			[ 2, 2, 2, 2, 2, 2, 2, 2, 4, 1, 4,-1, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 2, 7, 7, 7, 7, 7, 8, 7, 2, 4, 4, 4, 4, 4, 4, 4],
			[ 2, 2, 7, 7, 7, 7, 7, 2, 4, 1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 2, 7, 7, 7, 7, 7, 8, 7, 2, 4, 4, 4, 4, 4, 4, 4],
			[ 2, 2, 8, 8, 8, 8, 8, 2, 5, 1, 5, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 2, 7, 7, 7, 7, 7, 8, 7, 2, 4, 4, 4, 4, 6, 6, 6],
			[ 2, 2, 7, 7, 7, 7, 7, 1, 1, 1, 1, 1, 1, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 2, 7, 7, 7, 7, 7, 8, 7, 2, 4, 4, 4, 4, 6, 6, 6],
			[ 2, 2, 7, 7, 7, 7, 7, 2, 5, 5, 5, 5, 1, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 4, 4, 6, 6, 6],
			[ 2, 2, 7, 7, 7, 7, 7, 2, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 6, 6, 6, 6, 6, 2, 6, 6, 6, 6, 6],
			[ 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 1, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2, 6, 6, 6, 6, 6],
			[ 2, 2, 7, 8, 7, 7, 7, 2, 5, 5, 5, 5, 1, 4, 4, 4, 4, 4, 4, 4, 6, 1, 6, 6, 6, 4, 5, 5, 5, 2, 2, 2, 2, 2, 2, 4, 4, 6, 6, 6],
			[ 2, 2, 7, 8, 7, 7, 7, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 6, 6, 6, 1, 4, 4, 4, 4, 4, 5, 5, 2, 7, 7, 7, 7, 2, 4, 4, 6, 6, 6],
			[ 2, 2, 7, 8, 7, 7, 7, 2, 5, 5, 5, 4, 4, 4, 4, 6, 6, 6, 6, 4, 4, 1, 4, 4, 4, 4, 4, 5, 5, 2, 8, 8, 8, 8, 2, 4, 4, 6, 6, 6],
			[ 2, 2, 7, 8, 7, 7, 7, 2, 5, 5, 5, 5, 4, 6, 6, 6, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 5, 5, 2, 7, 7, 7, 7, 2, 4, 4, 4, 4, 4],
			[ 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 6, 6, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 5, 5, 2, 7, 7, 7, 7, 2, 4, 4, 4, 4, 4],
			[ 2, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 6, 6, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 7, 2, 4, 4, 4, 4, 4],
			[ 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 2, 2, 7, 7, 2, 2, 4, 4, 4, 4, 4],
			[ 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 2, h, 7, 7, h, 2, 4, 4, 4, 4, 4],
			[ 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 2, 2, 7, 7, 2, 2, 4, 4, 4, 4, 4],
			[ 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 2, h, 7, 7, h, 2, 4, 4, 4, 4, 4],
			[ 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4]
		];
		
		this.signs = [
			{title: "M A G I C", pos: new Position(4, 8)},
			{title: "F O O D", pos: new Position(4, 14)},
			{title: "W E A P O N S", pos: new Position(22, 0)},
			{title: "A R M O U R S", pos: new Position(28, 6)},
			{title: "H O T E L", pos: new Position(31.5, 15)}
		];
		
		this.loadVendors();
	}
	
};

Map.prototype.isSolid = function(position, avoidEnemies){
	if (position.y < 0 || position.x < 0) return true;
	if (position.y >= this.map.length || position.x >= this.map[0].length) return true;
	var tile = this.map[position.y][position.x];
	for (var i=0,len=tile.length;i<len;i++){
		if (tile[i] === 0) return false;
		if (tile[i].tile.solid){
			return true;
		}
	}
	
	if (!avoidEnemies){
		for (var i=0,len=this.enemies.length;i<len;i++){
			if (this.enemies[i].inWorld && this.enemies[i].position.equals(position)){
				return true;
			}
		}
	}
	
	if (!avoidEnemies && this.player.position.equals(position)){
		return true;
	}
	
	return false;
};

Map.prototype.isVisible = function(position){
	if (position.y < 0 || position.x < 0) return;
	if (position.y >= this.map.length || position.x >= this.map[0].length) return;
	var tile = this.map[position.y][position.x][0];
	if (tile === 0) return false;
	if (tile.wasVisible > 0){
		return tile.wasVisible;
	}
	return false;
};

Map.prototype.setVisible = function(position, visible){
	if (position.y < 0 || position.x < 0) return;
	if (position.y >= this.map.length || position.x >= this.map[0].length) return;
	var tile = this.map[position.y][position.x];
	for (var i=0,len=tile.length;i<len;i++){
		if (tile[i] === 0) return;
		tile[i].visible = visible;
	}
};

Map.prototype.addAnimationInstance = function(instance){
	for (var i=0;i<this.animateInstances.length;i++){
		if (this.animateInstances[i].position.equals(instance.position))
			return;
	}
	
	this.animateInstances.push(instance);
};

Map.prototype.getSellerAt = function(x, y){
	for (var i=0;i<this.instances.length;i++){
		if (this.instances[i].isSeller && this.instances[i].inWorld && this.instances[i].position.equals(x, y))
			return this.instances[i];
	}
	return null;
};

Map.prototype.getEnemyAt = function(x, y){
	for (var i=0;i<this.enemies.length;i++){
		if (this.enemies[i].inWorld && this.enemies[i].position.equals(x, y))
			return this.enemies[i];
	}
	return null;
};

Map.prototype.createEnemies = function(){
	var n = 5 + this.level + Math.iRandom(this.level, this.level * 2);
	for (var i=0;i<n;i++){
		var x, y;
		
		var counter = 0;
		while (true){
			if (counter == 1000) break;
			x = Math.iRandom(this.map[0].length - 1);
			y = Math.iRandom(this.map.length - 1);
			
			if (this.map[y][x] != 0 && !this.getEnemyAt(x, y)){
				var t = this.map[y][x];
				if (t instanceof Array) t = t[0];
				if (t <= 0) continue;
				var tile = Tileset.dungeon.getByTileId(t, this.level);
				if (tile.isFloor){
					counter = 0;
					break;
				}
			}
			counter++;
		}
		
		if (counter > 0) continue;
		
		var e = EnemyFactory.getRandomEnemy(this.level);
		var enemy = new Enemy(e.tile, new Position(x, y), e);
		enemy.mapManager = this;
		this.instances.push(enemy);
		this.enemies.push(enemy);
	}
};

Map.prototype.createStairs = function(tile, position, direction){
	var name, level;
	if (this.key.indexOf("_") != -1){
		name = this.key.substring(0,this.key.indexOf("_"));
		level = parseFloat(this.key.replace(name+"_", ""));
		level += (direction == 'D')? 1 : -1;
		
		if (level != 1)
			name += "_" + level;
	}else{
		level = 2;
		if (direction == 'D')
			name = this.key + "_2";
		else{
			name = "town";
			
		level = 0;
		if (direction == 'E'){
			name = "test";
			level = 1;
		}
			
		}
	}
	
	
	var ins = new Stairs(tile, position, direction, name);
	ins.mapManager = this;
	ins.level = level;
	
	this.instances.push(ins);
};

Map.prototype.newItem = function(tile, position, item){
	if (item.status == 0) return;
	
	var ins = new Item(tile, position, item);
	ins.mapManager = this;
	
	this.instances.push(ins);
};

Map.prototype.setPlayer = function(x, y){
	this.player = new Player(PlayerStats.class.tile, new Position(x, y));
};

Map.prototype.createVendors = function(tile, position, seller){
	var ven = new Seller(tile, position, seller);
	ven.mapManager = this;
	this.instances.push(ven);
};

Map.prototype.loadVendors = function(){
	this.createVendors(Tileset.heroes.seller.getColor(0, 0, 200), new Position(22, 1), SellerFactory.weapons);
	this.createVendors(Tileset.heroes.seller.getColor(255, 255, 0), new Position(31, 9), SellerFactory.armour);
	this.createVendors(Tileset.heroes.sellerWizard.getColor(100, 0, 100), new Position(4, 9), SellerFactory.weapons);
	this.createVendors(Tileset.heroes.seller.getColor(122, 122, 255), new Position(2, 16), SellerFactory.food);
	this.createVendors(Tileset.heroes.seller.getColor(255, 0, 0), new Position(31, 16), SellerFactory.hotel);
};

Map.prototype.loadInstances = function(game){
	switch (game.room){
		case 0:
			this.player.mapManager = this;
			this.player.setView(game);
			FOV.getFOV(this.player.position, this, this.player.fovDistance);
			
			//this.newItem(Tileset.itemsWeapons.sword, new Position(14, 1), ItemFactory.getItem("sword", Math.random()));
		break;
	}
};

Map.prototype.parseMap = function(){
	for (var i= 0,len=this.map.length;i<len;i++){
		for (var j= 0,jlen=this.map[i].length;j<jlen;j++){
			var tile = this.map[i][j];
			if (tile == 0) continue;
			if (tile == -1){
				this.setPlayer(j, i);
				tile = this.map[i + 1][j];
			}else if (tile == -2){
				this.createStairs(Tileset.misc.stairsDown, new Position(j, i), 'D');
				tile = this.map[i + 1][j];
			}else if (tile == -3){
				this.createStairs(Tileset.misc.stairsUp, new Position(j, i), 'A');
				tile = this.map[i + 1][j];
			}else if (tile == -4){
				this.createStairs(Tileset.misc.stairsDungeon, new Position(j, i), 'E');
				tile = this.map[i + 1][j];
			}
			
			if (tile instanceof Array){
				tile = tile.clone();
			}else{
				tile = [tile];
			}
			
			this.map[i][j] = [];
			for (var t=0;t<tile.length;t++){
				if (Tileset.dungeon.getByTileId(tile[t], this.level).isWall && this.map[i + 1]){
					var bt = this.map[i + 1][j];
					if (bt instanceof Array) bt = this.map[i + 1][j][t];
					
					if (bt){
						if (Tileset.dungeon.getByTileId(bt, this.level).isWall){
							tile[t]++;
						}
					}
				}
					
				var visible = 0;
				if (this.light) visible = 2;
				this.map[i][j][t] = {
					tileId: tile[t],
					tile: Tileset.dungeon.getByTileId(tile[t], this.level),
					visible: visible,
					wasVisible: false
				};
			}
		}
	}
};

Map.prototype.inHotel = function(game){
	if (game.keyP[89] == 1){
		game.keyP[89] = 2;
		if (PlayerStats.gold < 50){
			Console.addMessage("You can't afford it", "rgb(255,255,0)");
			this.store = null;
			return;
		}
		
		Console.addMessage("The room is ready, rest well.", "rgb(255,255,255)");
		PlayerStats.gold -= 50;
		PlayerStats.health = PlayerStats.mHealth;
		PlayerStats.mana = PlayerStats.mMana;
		this.player.position.set(33, 24);
		this.player.playerAction = true;
		this.player.playerMoved = true;
		this.player.setView(game);
		this.store = null;
	}else if (game.keyP[78] == 1){
		Console.addMessage("Have a nice day then.", "rgb(255,255,255)");
		this.store = null;
		game.keyP[78] = 2;
	}
};

Map.prototype.drawStore = function(game){
	if (!this.store) return;
	
	if (this.store[0] == "hotel"){
		this.inHotel(game); 
		return; 
	}
	
	var ctx = game.eng.ctx;
	var h = (this.store.length + 2) * 20 + 16;
	var x = ctx.width / 2 - 250;
	var y = ctx.height / 2 - h / 2;
	
	ctx.fillStyle = "rgb(33,33,33)";
	ctx.fillRect(x, y, 500, h);
	
	ctx.strokeStyle = "rgb(255,255,255)";
	ctx.strokeRect(x, y, 500, h);
	
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillText("Select the option of the item you want to buy.", x + 8, y + 20);
	
	var chr = 65;
	y += 60;
	for (var i=0,len=this.store.length;i<len;i++){
		if ((typeof this.store[i]) == "string") this.store[i] = ItemFactory.getItem(this.store[i], 1);
		var lt = String.fromCharCode(chr).toLowerCase();
		var name = ItemFactory.getItemName(this.store[i]);
		
		ctx.fillText(lt + ") " + name, x + 8, y + (i * 20));
		ctx.fillText("$" + this.store[i].price, x + 300, y + (i * 20));
		
		if (game.keyP[chr] == 1 && !this.inTransact){
			this.inTransact = this.store[i];
			if (PlayerStats.gold < this.inTransact.price){
				Console.addMessage("You can't afford it", "rgb(255,255,0)");
				this.inTransact = null;
			}else{
				Console.addMessage("Do you want to buy the " + name + "? Y/N", "rgb(255,255,0)");
			}
			game.keyP[chr] = 2;
		}
		
		chr++;
	}
	
	if (this.inTransact){
		if (game.keyP[89] == 1){
			var name = ItemFactory.getItemName(this.inTransact);
			if (this.inTransact.isWeapon){
				if (PlayerStats.weapons.length == 7){
					Console.addMessage("You can't carry more weapons", "rgb(255,255,255)");
					this.inTransact = null;
					return;
				}
				if (PlayerStats.class.id != this.inTransact.class.id){
					Console.addMessage("This weapon is reserved only for " + this.inTransact.class.name + "s", "rgb(255,255,255)");
					this.inTransact = null;
					return;
				}
				PlayerStats.gold -= this.inTransact.price;
				Console.addMessage("You bought a(n) " + name, "rgb(255,255,255)");
				var it = new Item(this.inTransact.tile, new Position(-1, 0), this.inTransact);
				it.inWorld = false;
				PlayerStats.weapons.push(it);
				this.inTransact = null;
			}else if (this.inTransact.isArmour){
				if (PlayerStats.armours.length == 7){
					Console.addMessage("You can't carry more armours", "rgb(255,255,255)");
					this.inTransact = null;
					return;
				}
				PlayerStats.gold -= this.inTransact.price;
				Console.addMessage("You bought a(n) " + name, "rgb(255,255,255)");
				var it = new Item(this.inTransact.tile, new Position(-1, 0), this.inTransact);
				it.inWorld = false;
				PlayerStats.armours.push(it);
				this.inTransact = null;
			}else if (this.inTransact.isFood){
				if (PlayerStats.food == 9999){
					Console.addMessage("You can't carry more food", "rgb(255,255,255)");
					this.inTransact = null;
					return;
				}
				PlayerStats.gold -= this.inTransact.price;
				Console.addMessage("You bought a(n) " + name, "rgb(255,255,255)");
				PlayerStats.food = Math.min(PlayerStats.food + this.inTransact.amount, 9999);
				this.inTransact = null;
			}
			game.keyP[89] = 2;
		}else if (game.keyP[78] == 1){
			this.inTransact = null;
			game.keyP[78] = 2;
		}
	}else if (game.keyP[27] == 1){
		Console.addMessage("Have a nice day", "rgb(255,255,255)");
		this.inTransact = null;
		this.store = null;
		this.player.playerAction = true;
		game.keyP[27] = 2;
	}
};

Map.prototype.drawFloor = function(x, y, visible){
	var xx = this.view.x;
	var yy = this.view.y;
	
	var tile = this.map[y][x];
	if (!tile && tile !== 0){ console.log(x + "_" + y); }
	for (var t=0,tlen=tile.length;t<tlen;t++){
		if (tile[t] === 0)  continue;
		if (tile[t].visible == 0) continue;
		
		var light = false;
		if (visible && tile[t].wasVisible == 2) light = true;
		
		tile[t].wasVisible = 0;
		if (this.light){
			tile[t].wasVisible = 2;
			tile[t].visible = 2;
		}
		
		if (tile[t].visible == 2 || (light)){
			game.drawTile(tile[t].tile, new Position(x - xx, y - yy), null, false);
			tile[t].wasVisible = 2;
		}else if (tile[t].visible == 1){
			var vis = (t==tlen-1);
			game.drawTile(tile[t].tile, new Position(x - xx, y - yy), null, vis);
			tile[t].wasVisible = 1;
		}
		
		tile[t].visible = 1;
	}
};

Map.prototype.drawMap = function(game){
	var x = this.view.x;
	var y = this.view.y;
	
	if (!this.store)
		this.passTurn++;
	
	if (this.player.playerAction || this.repaint){
		this.passTurn = 0;
		game.clearScreen();
		
		for (var i=y,len=y+game.viewS.y;i<len;i++){
			for (var j=x,jlen=x+game.viewS.x;j<jlen;j++){
				this.drawFloor(j,i);
			}
		}
		
		for (var i= 0;i<this.instances.length;i++){
			var ins = this.instances[i];
			if (!ins.inWorld){
				this.instances.splice(i,1);
				i--;
			}else{
				if (this.repaint)
					ins.draw(game);
				else
					ins.loop(game);
			}
		}
		
		var ctx = game.eng.ctx;
		for (var i=0,len=this.signs.length;i<len;i++){
			var s = this.signs[i];
			
			var xx = (s.pos.x + game.viewPos.x - this.view.x) * game.gridS.x + (game.gridS.x / 2);
			var yy = (s.pos.y + game.viewPos.y - this.view.y) * game.gridS.y;
			
			var w = (s.title.length * 12);
			
			ctx.fillStyle = "rgb(33,33,33)";
			ctx.fillRect(xx - w / 2, yy, w, 20);
			
			ctx.fillStyle = "rgb(255,255,255)";
			ctx.textAlign = "center";
			ctx.fillText(s.title, xx, yy + 16);
			ctx.textAlign = "left";
		}
		
	}
	
	this.player.playerAction = false;
	this.player.loop(game);
	
	this.repaint = false;
	
	for (var i=0;i<this.animateInstances.length;i++){
		if (!this.animateInstances[i].keepAnimation){
			this.animateInstances.splice(i,1);
			i--;
			continue;
		}
		this.animateInstances[i].animatedLoop(game);
	}
	
	if (this.passTurn == 500 || game.keyP[32] == 1){
		Console.addMessage("Pass", "rgb(130,160,90)");
		this.player.act();
		if (game.keyP[32] == 1)
			game.keyP[32] = 2;
	}
	
	this.drawStore(game);
	
	if (game.map == null) return;
	game.drawInterface();
};

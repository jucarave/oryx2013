function Map(params){
	this.map = null;
	this.tiles = [];
	this.instances = [];
	this.view = new Position( 0, 0);
	this.player = null;
	
	if (params.map){
		this.loadMap(params.map);
		this.parseMap();
	}
}

Map.prototype.loadMap = function(map){
	this.map = [
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 1, 3, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 2, 2, 2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];
	
	
};

Map.prototype.isSolid = function(position){
	if (position.y < 0 || position.x < 0) return;
	if (position.y >= this.map.length || position.x >= this.map[0].length) return;
	var tile = this.map[position.y][position.x];
	if (tile === 0) return false;
	if (tile.tile.solid){
		return true;
	}
	return false;
};

Map.prototype.setVisible = function(position, visible){
	if (position.y < 0 || position.x < 0) return;
	if (position.y >= this.map.length || position.x >= this.map[0].length) return;
	var tile = this.map[position.y][position.x];
	if (tile === 0) return;
	tile.visible = visible;
};

Map.prototype.newItem = function(tile, position, item){
	if (item.status == 0) return;
	
	var ins = new Item(tile, position, item);
	ins.mapManager = this;
	
	this.instances.push(ins);
};

Map.prototype.loadInstances = function(game){
	switch (game.room){
		case 0:
			this.player = new Player(Tileset.heroes.warrior1.getColor(150, 0,0), new Position(15, 2));
			this.player.mapManager = this;
			this.player.setView(game);
			FOV.getFOV(this.player.position, this, this.player.fovDistance);
			
			this.newItem(Tileset.itemsWeapons.sword, new Position(14, 1), ItemFactory.getItem("sword", Math.random()));
		break;
	}
};

Map.prototype.parseMap = function(){
	for (var i= 0,len=this.map.length;i<len;i++){
		for (var j= 0,jlen=this.map[i].length;j<jlen;j++){
			if (this.map[i][j] == 0)
				continue;
			this.map[i][j] = {
				tileId: this.map[i][j],
				tile: Tileset.environment.getByTileId(this.map[i][j]),
				visible: 0
			};
		}
	}
};

Map.prototype.drawMap = function(game){
	var x = this.view.x;
	var y = this.view.y;
	
	if (this.player.playerAction){
		game.clearScreen();
		
		for (var i=y,len=y+game.viewS.y;i<len;i++){
			for (var j=x,jlen=x+game.viewS.x;j<jlen;j++){
				var tile = this.map[i][j];
				if (tile === 0)  continue;
				if (tile.visible == 0) continue;
				
				if (tile.visible == 1)
					game.drawTile(tile.tile, new Position(j - x, i - y), null, true);
				else if (tile.visible == 2)
					game.drawTile(tile.tile, new Position(j - x, i - y), null, false);
					
				tile.visible = 1;
			}
		}
		
		for (var i= 0,len=this.instances.length;i<len;i++){
			this.instances[i].loop(game);
		}
	}
	
	this.player.playerAction = false;
	this.player.loop(game);
	
	game.drawInterface();
};

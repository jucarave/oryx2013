function getColor(r, g, b){
	var base = this.img;
	var name = "c"+r+g+b;
	var img;
	if (Tileset[base][name]){
		img = Tileset[base][name];
	}else{
		var spr = game.sprites[this.img];
		var img = game.eng.colorizeImage(spr, r, g, b);
		img.imgWidth = spr.imgWidth;
		img.imgHeight = spr.imgHeight;
		img.imgNum = spr.imgNum;
		img.vImgNum = spr.vImgNum;
		
		Tileset[base][name] = img;
	}
	
	var tile = {
		img: img,
		subImg: this.subImg,
		parent: this,
		getColor: this.getColor,
		solid: this.solid,
		isWall: this.isWall
	};
	
	return tile;
}
	
var Tileset = {
	heroes: {
		warrior1: {img: "heroes", subImg: new Position(0, 0), getColor: getColor}
	},
	
	environment: {
		floor1: {img: "environment", subImg: new Position(9, 0), tileId: 1, getColor: getColor, color: {r:95,g:110,b:130}},
		wall1: {img: "environment", subImg: new Position(0, 0), tileId: 2, getColor: getColor, solid: true, isWall: true, color: {r:170,g:40,b:40}},
		sidewall: {img: "environment", subImg: new Position(7, 0), tileId: 3, getColor: getColor, solid: true, isWall: true, color: {r:170,g:40,b:40}},
		grass: {img: "misc", subImg: new Position(17, 6), tileId: 4, getColor: getColor, color: {r:0,g:160,b:0} },
		highGrass: {img: "misc", subImg: new Position(16, 6), tileId: 5, getColor: getColor, color: {r:0,g:160,b:0} },
		water: {img: "environment", subImg: new Position(1, 3), tileId: 6, getColor: getColor, solid: true, color: {r:0,g:0,b:100} },
		woodFloor: {img: "environment", subImg: new Position(18, 1), tileId: 7, getColor: getColor, color: {r:165,g:100,b:70}},
		table: {img: "environment", subImg: new Position(16, 0), tileId: 8, getColor: getColor, solid: true, isWall: true, color: {r:100,g:60,b:40}},
		sideTable: {img: "environment", subImg: new Position(17, 0), tileId: 9, getColor: getColor, solid: true, isWall: true, color: {r:100,g:60,b:40}},
		fence: {img: "misc", subImg: new Position(0, 4), tileId: 10, getColor: getColor, solid: true, isWall: true},
		sideFence: {img: "misc", subImg: new Position(8, 4), tileId: 11, getColor: getColor, solid: true, isWall: true},
		fenceDR: {img: "misc", subImg: new Position(4, 4), tileId: 12, getColor: getColor, solid: true},
		dungeonW: {img: "environment", subImg: new Position(5, 0), tileId: 13, getColor: getColor, solid: true, color: {r:197,g:197,b:197}},
		dungeonSW: {img: "environment", subImg: new Position(7, 0), tileId: 14, getColor: getColor, solid: true, color: {r:197,g:197,b:197}},
		candle: {img: "misc", subImg: new Position(10, 2), tileId: 15, getColor: getColor, solid: true, color: {r:198,g:198,b:0}},
		grave: {img: "misc", subImg: new Position(12, 2), tileId: 16, getColor: getColor, solid: true, color: {r:198,g:198,b:198}},
		grave2: {img: "misc", subImg: new Position(15, 2), tileId: 17, getColor: getColor, solid: true, color: {r:198,g:198,b:198}},
		
		getByTileId: function(tileId){
			for (env in Tileset.environment){
				var tile = Tileset.environment[env];
				if (tile.tileId == tileId){
					if (tile.color){
						return tile.getColor(tile.color.r, tile.color.g, tile.color.b);
					}else{
						return tile;
					}
				}
			}
			
			throw "Invalid tileId " + tileId;
		}
	},
	
	hud: {
		healthBack: {img: "hud", subImg: new Position(0, 0), getColor: getColor},
		health: {img: "hud", subImg: new Position(1, 0), getColor: getColor},
		manaBack: {img: "hud", subImg: new Position(2, 0), getColor: getColor},
		mana: {img: "hud", subImg: new Position(3, 0), getColor: getColor}
	},
	
	itemsWeapons: {
		//Weapons
		sword: {img: "itemsWeapons", subImg: new Position(0, 0), getColor: getColor},
		
		//Armours
		cottomCloth: {img: "itemsWeapons", subImg: new Position(0, 1), getColor: getColor},
		
		food: {img: "itemsWeapons", subImg: new Position(13, 1), getColor: getColor},
		skull: {img: "itemsWeapons", subImg: new Position(3, 3), getColor: getColor},
		
		frame: {img: "itemsWeapons", subImg: new Position(4, 4), getColor: getColor}
	},
	
	misc: {
		stairsUp: {img: "misc", subImg: new Position(0, 1), getColor: getColor},
		stairsDown: {img: "misc", subImg: new Position(1, 1), getColor: getColor},
		stairsDungeon: {img: "misc", subImg: new Position(16, 2), getColor: getColor}	
	}
};

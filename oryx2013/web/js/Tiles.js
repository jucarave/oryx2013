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
		isWall: this.isWall,
		isFloor: this.isFloor
	};
	
	return tile;
}
	
var Tileset = {
	heroes: {
		warrior: {img: "heroes", subImg: new Position(0, 0), getColor: getColor},
		archer: {img: "heroes", subImg: new Position(0, 1), getColor: getColor},
		wizard: {img: "heroes", subImg: new Position(4, 0), getColor: getColor},
		
		seller: {img: "heroes", subImg: new Position(5, 0), getColor: getColor},
		sellerWizard: {img: "heroes", subImg: new Position(8, 0), getColor: getColor},
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
		bed: {img: "misc", subImg: new Position(2, 1), tileId: 18, getColor: getColor, solid: true}	,
		
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
	
	dungeon: {
		floor: {img: "environment", subImg: new Position(9, 0), tileId: 1, getColor: getColor, isFloor: true},
		wall: {img: "environment", subImg: new Position(0, 1), tileId: 2, getColor: getColor, solid: true, isWall: true},
		sidewall: {img: "environment", subImg: new Position(7, 0), tileId: 3, getColor: getColor, solid: true, isWall: true},
		wall2: {img: "environment", subImg: new Position(3, 1), tileId: 4, getColor: getColor, solid: true, isWall: true},
		
		//garbage
		bones: {img: "misc", subImg: new Position(1, 3), tileId: 5, getColor: getColor},
		grass1: {img: "misc", subImg: new Position(1, 5), tileId: 6, getColor: getColor, color: {r:0,g:100,b:0}},
		grass2: {img: "misc", subImg: new Position(2, 5), tileId: 7, getColor: getColor, color: {r:0,g:100,b:0}},
		drops: {img: "environment", subImg: new Position(3, 3), tileId: 8, getColor: getColor, color: {r:0,g:0,b:200}},
		web: {img: "misc", subImg: new Position(8, 2), tileId: 9, getColor: getColor},
		
		getColorByLevel: function(tile, level){
			if (level <= 5){
				if (tile.isWall){ return {r:50, g:80, b: 150}; } else
				if (tile.isFloor){ return {r:95,g:110,b:130}; }
			}else if (level <= 10){
				if (tile.isWall){ return {r:45, g:80, b: 40}; } else
				if (tile.isFloor){ return {r:95,g:140,b:110}; }
			}else if (level <= 15){
				if (tile.isWall){ return {r:45, g:80, b: 40}; }
			}
		},
		
		getByTileId: function(tileId, level){
			if (level == 0 || level == undefined) return Tileset.environment.getByTileId(tileId);
			var ret;
			for (env in Tileset.dungeon){
				var tile = Tileset.dungeon[env];
				if (tile.tileId == tileId){
					ret = tile;
					break;
				}
			}
			
			if (!ret) throw "Invalid tileId " + tileId;
			
			var c;
			if (ret.color){
				return ret.getColor(ret.color.r, ret.color.g, ret.color. b);
			}
			c = this.getColorByLevel(ret, level);
			
			if (c)
				return ret.getColor(c.r, c.g, c.b);
			else
				return ret;
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
		heavySword: {img: "itemsWeapons", subImg: new Position(1, 0), getColor: getColor},
		dagger: {img: "itemsWeapons", subImg: new Position(4, 0), getColor: getColor},
		quarterStaff: {img: "itemsWeapons", subImg: new Position(5, 0), getColor: getColor},
		gemStaff: {img: "itemsWeapons", subImg: new Position(6, 0), getColor: getColor},
		battleAxe: {img: "itemsWeapons", subImg: new Position(2, 0), getColor: getColor},
		heavyAxe: {img: "itemsWeapons", subImg: new Position(7, 0), getColor: getColor},
		bow: {img: "itemsWeapons", subImg: new Position(17, 0), getColor: getColor},
		crossBow: {img: "itemsWeapons", subImg: new Position(18, 0), getColor: getColor},
		
		//Armours
		cottomCloth: {img: "itemsWeapons", subImg: new Position(0, 1), getColor: getColor},
		helmet: {img: "itemsWeapons", subImg: new Position(1, 1), getColor: getColor},
		
		//Items
		potionS: {img: "itemsWeapons", subImg: new Position(1, 2), getColor: getColor},
		potionL: {img: "itemsWeapons", subImg: new Position(3, 2), getColor: getColor},
		mapOrb: {img: "itemsWeapons", subImg: new Position(15, 2), getColor: getColor},
		shovel: {img: "itemsWeapons", subImg: new Position(15, 3), getColor: getColor},
		time: {img: "itemsWeapons", subImg: new Position(17, 1), getColor: getColor},
		
		food: {img: "itemsWeapons", subImg: new Position(13, 1), getColor: getColor},
		skull: {img: "itemsWeapons", subImg: new Position(3, 3), getColor: getColor},
		money: {img: "itemsWeapons", subImg: new Position(18, 2), getColor: getColor},
		
		frame: {img: "itemsWeapons", subImg: new Position(4, 4), getColor: getColor}
	},
	
	misc: {
		stairsUp: {img: "misc", subImg: new Position(0, 1), getColor: getColor},
		stairsDown: {img: "misc", subImg: new Position(1, 1), getColor: getColor},
		stairsDungeon: {img: "misc", subImg: new Position(16, 2), getColor: getColor}	
	},
	
	enemies: {
		//Level 1
		krab: {img: "enemies", subImg: new Position(0, 0), getColor: getColor, color: {r: 255, g: 0, b: 0}},
		spider: {img: "enemies", subImg: new Position(2, 0), getColor: getColor, color: {r: 0, g: 0, b: 255}},
		rat: {img: "enemies", subImg: new Position(4, 0), getColor: getColor, color: {r: 255, g: 200, b: 64}},
		bat: {img: "enemies", subImg: new Position(6, 0), getColor: getColor, color: {r: 0, g: 0, b: 255}},
		//Level 2
		viper: {img: "enemies", subImg: new Position(8, 0), getColor: getColor, color: {r: 0, g: 255, b: 0}},
		wasp: {img: "enemies", subImg: new Position(11, 1), getColor: getColor, color: {r: 0, g: 0, b: 255}},
		bear: {img: "enemies", subImg: new Position(13, 1), getColor: getColor},
		thief: {img: "enemies", subImg: new Position(11, 2), getColor: getColor, color: {r: 255, g: 0, b: 255}},
		//Level 3
		warriorBear: {img: "enemies", subImg: new Position(14, 1), getColor: getColor, color: {r: 255, g: 0, b: 0}},
		spectre: {img: "enemies", subImg: new Position(8, 2), getColor: getColor},
		humanRat: {img: "enemies", subImg: new Position(0, 3), getColor: getColor, color: {r: 255, g: 200, b: 64}},
		skeleton: {img: "enemies", subImg: new Position(0, 4), getColor: getColor},
		
	},
	
	classes: {
		fighter: {img: "classes", subImg: new Position(0, 0), getColor: getColor},
		archer: {img: "classes", subImg: new Position(1, 0), getColor: getColor},
		wizard: {img: "classes", subImg: new Position(2, 0), getColor: getColor},
	},
	
	effects: {
		arrowUp: {img: "effects", subImg: new Position(5, 1), getColor: getColor},
		arrowDown: {img: "effects", subImg: new Position(6, 1), getColor: getColor},
		arrowLeft: {img: "effects", subImg: new Position(7, 1), getColor: getColor},
		arrowRight: {img: "effects", subImg: new Position(8, 1), getColor: getColor},
		
		magic: {img: "effects", subImg: new Position(0, 0), getColor: getColor},
	}
};

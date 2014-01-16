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
		wallTorch: {img: "environment", subImg: new Position(4, 1), tileId: 10, getColor: getColor, solid: true, isWall: true},
		
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
				if (tile.isWall){ return {r:104, g:36, b: 99}; } else
				if (tile.isFloor){ return {r:80,g:80,b:118}; }
			}else if (level <= 20){
				if (tile.isWall){ return {r:198, g:0, b: 0}; } else
				if (tile.isFloor){ return {r:132,g:137,b:61}; }
			}else{
				if (tile.isWall){ return {r:255, g:190, b: 255}; } else
				if (tile.isFloor){ return {r:255, g:190, b: 255}; }
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
		stairsDungeon: {img: "misc", subImg: new Position(16, 2), getColor: getColor},
		hole: {img: "misc", subImg: new Position(13, 1), getColor: getColor},
		portal: {img: "misc", subImg: new Position(16, 4), getColor: getColor}
	},
	
	enemies: {
		//Level 1
		krab: {img: "enemies", subImg: new Position(0, 0), getColor: getColor, color: {r: 255, g: 0, b: 0}},
		spider: {img: "enemies", subImg: new Position(2, 0), getColor: getColor, color: {r: 0, g: 0, b: 255}},
		rat: {img: "enemies", subImg: new Position(4, 0), getColor: getColor, color: {r: 255, g: 200, b: 64}},
		bat: {img: "enemies", subImg: new Position(6, 0), getColor: getColor, color: {r: 0, g: 0, b: 255}},
		//Level 2
		beetle: {img: "enemies", subImg: new Position(5, 1), getColor: getColor, color: {r: 197, g: 233, b: 192}},
		mantis: {img: "enemies", subImg: new Position(6, 1), getColor: getColor, color: {r: 0, g: 255, b: 0}},
		centipede: {img: "enemies", subImg: new Position(17, 0), getColor: getColor, color: {r: 117, g: 147, b: 202}},
		crow: {img: "enemies", subImg: new Position(15, 0), getColor: getColor, color: {r: 200, g: 200, b: 200}}, 
		//Level 3
		viper: {img: "enemies", subImg: new Position(8, 0), getColor: getColor, color: {r: 0, g: 255, b: 0}},
		wasp: {img: "enemies", subImg: new Position(11, 1), getColor: getColor, color: {r: 0, g: 0, b: 255}},
		bear: {img: "enemies", subImg: new Position(13, 1), getColor: getColor},
		thief: {img: "enemies", subImg: new Position(11, 2), getColor: getColor, color: {r: 255, g: 0, b: 255}},
		//Level 4
		fairy: {img: "enemies", subImg: new Position(12, 3), getColor: getColor, color: {r: 223, g: 223, b: 223}},
		spectre: {img: "enemies", subImg: new Position(8, 2), getColor: getColor},
		humanRat: {img: "enemies", subImg: new Position(0, 3), getColor: getColor, color: {r: 255, g: 200, b: 64}},
		skeleton: {img: "enemies", subImg: new Position(0, 4), getColor: getColor},
		//Level 5
		skeletonWarrior: {img: "enemies", subImg: new Position(1, 4), getColor: getColor, color: {r: 181, g: 230, b: 29}},
		littleDemon: {img: "enemies", subImg: new Position(3, 3), getColor: getColor, color: {r: 215, g: 17, b: 27}},
		gelatinousCube: {img: "enemies", subImg: new Position(2, 7), getColor: getColor, color: {r: 181, g: 230, b: 29}},
		spore: {img: "enemies", subImg: new Position(18, 3), getColor: getColor, color: {r: 163, g: 73, b: 164}},
		//Level 6
		centaur: {img: "enemies", subImg: new Position(0, 2), getColor: getColor, color: {r: 255, g: 200, b: 64}},
		warriorBear: {img: "enemies", subImg: new Position(14, 1), getColor: getColor, color: {r: 255, g: 0, b: 0}},
		ghost: {img: "enemies", subImg: new Position(2, 6), getColor: getColor, color: {r: 217, g: 191, b: 251}},
		lizardmen: {img: "enemies", subImg: new Position(9, 3), getColor: getColor, color: {r: 30, g: 110, b: 20}},
		//Level 7
		giantSpider: {img: "enemies", subImg: new Position(17, 6), getColor: getColor, color: {r: 68, g: 68, b: 68}},
		bigSpore: {img: "enemies", subImg: new Position(17, 3), getColor: getColor, color: {r: 163, g: 73, b: 164}},
		humanRatMace: {img: "enemies", subImg: new Position(1, 3), getColor: getColor, color: {r: 255, g: 200, b: 64}},
		warriorThief: {img: "enemies", subImg: new Position(12, 2), getColor: getColor, color: {r: 255, g: 0, b: 255}},
		//Level 8
		lycanthrope: {img: "enemies", subImg: new Position(17, 4), getColor: getColor, color: {r: 255, g: 200, b: 64}},
		worm: {img: "enemies", subImg: new Position(11, 5), getColor: getColor, color: {r: 241, g: 201, b: 139}},
		skeletonMaster: {img: "enemies", subImg: new Position(2, 4), getColor: getColor, color: {r: 181, g: 230, b: 29}},
		demon: {img: "enemies", subImg: new Position(4, 3), getColor: getColor, color: {r: 215, g: 17, b: 27}},
		//Level 9
		superiorGhost: {img: "enemies", subImg: new Position(3, 6), getColor: getColor},
		warrior: {img: "enemies", subImg: new Position(14, 4), getColor: getColor, color: {r: 241, g: 201, b: 139}},
		warriorFairy: {img: "enemies", subImg: new Position(14, 3), getColor: getColor, color: {r: 223, g: 223, b: 223}},
		lizardmenArcher: {img: "enemies", subImg: new Position(10, 3), getColor: getColor, color: {r: 60, g: 140, b: 50}},
		//Level 10
		spectreWizard: {img: "enemies", subImg: new Position(9, 2), getColor: getColor, color: {r: 60, g: 140, b: 50}},
		centaurArcher: {img: "enemies", subImg: new Position(1, 2), getColor: getColor, color: {r: 255, g: 200, b: 64}},
		superiorBear: {img: "enemies", subImg: new Position(15, 1), getColor: getColor, color: {r: 0, g: 0, b: 255}},
		ent: {img: "enemies", subImg: new Position(8, 5), getColor: getColor, color: {r: 100, g: 77, b: 45}},
		//Level 11
		mudMonster: {img: "enemies", subImg: new Position(1, 7), getColor: getColor, color: {r: 87, g: 34, b: 111}},
		slimeMonster: {img: "enemies", subImg: new Position(7, 7), getColor: getColor, color: {r: 0, g: 255, b: 0}},
		efreet: {img: "enemies", subImg: new Position(9, 7), getColor: getColor, color: {r: 255, g: 0, b: 0}},
		kingCobra: {img: "enemies", subImg: new Position(13, 5), getColor: getColor, color: {r: 0, g: 255, b: 0}},
		//Level 12
		kingHumanRat: {img: "enemies", subImg: new Position(2, 3), getColor: getColor, color: {r: 255, g: 200, b: 64}},
		demonWarrior: {img: "enemies", subImg: new Position(5, 3), getColor: getColor, color: {r: 215, g: 17, b: 27}},
		mummy: {img: "enemies", subImg: new Position(15, 2), getColor: getColor},
		echidna: {img: "enemies", subImg: new Position(4, 2), getColor: getColor, color: {r: 0, g: 255, b: 0}},
		//Level 13 
		kingBear: {img: "enemies", subImg: new Position(16, 1), getColor: getColor, color: {r: 100, g: 77, b: 45}},
		shadowWarrior: {img: "enemies", subImg: new Position(15, 4), getColor: getColor, color: {r: 241, g: 201, b: 139}},
		superiorSpectre: {img: "enemies", subImg: new Position(10, 2), getColor: getColor, color: {r: 60, g: 140, b: 50}},
		scorpion: {img: "enemies", subImg: new Position(15, 6), getColor: getColor, color: {r: 255, g: 0, b: 0}},
		//Level 14
		lycanthrope: {img: "enemies", subImg: new Position(17, 4), getColor: getColor, color: {r: 100, g: 77, b: 45}},
		skeletonArcher: {img: "enemies", subImg: new Position(3, 4), getColor: getColor},
		golem: {img: "enemies", subImg: new Position(15, 5), getColor: getColor, color: {r: 145, g: 142, b: 43}},
		beholder: {img: "enemies", subImg: new Position(7, 5), getColor: getColor, color: {r: 167, g: 84, b: 188}},
		//Level 15
		cyclops: {img: "enemies", subImg: new Position(14, 7), getColor: getColor, color: {r: 122, g: 143, b: 150}},
		minotaur: {img: "enemies", subImg: new Position(12, 7), getColor: getColor, color: {r: 147, g: 68, b: 68}},
		masterGhost: {img: "enemies", subImg: new Position(4, 6), getColor: getColor},
		superiorMummy: {img: "enemies", subImg: new Position(16, 2), getColor: getColor, color: {r: 220, g: 221, b: 191}},
		//Level 16
		demonArcher: {img: "enemies", subImg: new Position(6, 3), getColor: getColor, color: {r: 215, g: 17, b: 27}},
		entGolem: {img: "enemies", subImg: new Position(13, 6), getColor: getColor, color: {r: 100, g: 77, b: 45}},
		superiorBeholder: {img: "enemies", subImg: new Position(16, 6), getColor: getColor, color: {r: 167, g: 84, b: 188}},
		GolemRat: {img: "enemies", subImg: new Position(5, 6), getColor: getColor, color: {r: 255, g: 200, b: 64}},
		//Level 17
		dragon: {img: "enemies", subImg: new Position(16, 7), getColor: getColor, color: {r: 105, g: 242, b: 85}},
		efreetWarrior: {img: "enemies", subImg: new Position(10, 7), getColor: getColor, color: {r: 255, g: 0, b: 0}},
		shadowWizard: {img: "enemies", subImg: new Position(16, 4), getColor: getColor, color: {r: 146, g: 89, b: 179}},
		centaurWarrior: {img: "enemies", subImg: new Position(2, 2), getColor: getColor, color: {r: 255, g: 200, b: 64}},
		//Level 18
		masterDemon: {img: "enemies", subImg: new Position(8, 3), getColor: getColor, color: {r: 215, g: 17, b: 27}},
		echidnaArcher: {img: "enemies", subImg: new Position(5, 2), getColor: getColor, color: {r: 0, g: 255, b: 0}},
		fenix: {img: "enemies", subImg: new Position(18, 5), getColor: getColor, color: {r: 252, g: 101, b: 10}},
		superiorCyclops: {img: "enemies", subImg: new Position(15, 7), getColor: getColor, color: {r: 122, g: 143, b: 150}},
		//Level 19
		masterBeholder: {img: "enemies", subImg: new Position(18, 6), getColor: getColor, color: {r: 167, g: 84, b: 188}},
		ghostDragon: {img: "enemies", subImg: new Position(17, 7), getColor: getColor},
		marid: {img: "enemies", subImg: new Position(11, 7), getColor: getColor, color: {r: 73, g: 139, b: 188}},
		yonatan: {img: "enemies", subImg: new Position(11, 4), getColor: getColor, color: {r: 70, g: 70, b: 70}},
	},
	
	bosses: {
		flameSkelleton: {img: "enemies", subImg: new Position(5, 4), getColor: getColor, color: {r: 310, g: 11, b: 11}},
		incubus: {img: "enemies", subImg: new Position(18, 1), getColor: getColor, color: {r: 97, g: 43, b: 98}},
		medusa: {img: "enemies", subImg: new Position(14, 6), getColor: getColor, color: {r: 51, g: 98, b: 43}},
		Ias: {img: "enemies", subImg: new Position(17, 5), getColor: getColor, color: {r: 108, g: 32, b: 32}},
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
	},
	
	magic: {
		fireball: {img: "magic", subImg: new Position(0, 0), getColor: getColor},
		bersek: {img: "magic", subImg: new Position(1, 0), getColor: getColor},
		portal: {img: "magic", subImg: new Position(2, 0), getColor: getColor},
		sleep: {img: "magic", subImg: new Position(3, 0), getColor: getColor},
		display: {img: "magic", subImg: new Position(4, 0), getColor: getColor},
		blink: {img: "magic", subImg: new Position(5, 0), getColor: getColor},
		life: {img: "magic", subImg: new Position(6, 0), getColor: getColor},
	},
	
	cinema: {
		cave: {img: "cinema", subImg: new Position(0, 0), getColor: getColor},
		dungeon: {img: "cinema", subImg: new Position(0, 1), getColor: getColor},
		city: {img: "cinema", subImg: new Position(0, 2), getColor: getColor},
		cementery: {img: "cinema", subImg: new Position(1, 0), getColor: getColor},
		cementery2: {img: "cinema", subImg: new Position(1, 1), getColor: getColor},
		desert: {img: "cinema", subImg: new Position(1, 2), getColor: getColor}
	}
};

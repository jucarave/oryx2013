var EnemyFactory = {
	enemies: {
		//Level 1
		krab: {name: "krab",     level: 1, hp: 21, str:  7, dfs:  5, spd:  8, exp: 4, money: 4, tile: "krab"},
		spider: {name: "spider", level: 1, hp: 23, str:  9, dfs:  8, spd: 10, exp: 3, money: 4, tile: "spider"},
		rat: {name: "rat",       level: 1, hp: 25, str: 10, dfs:  9, spd: 12, exp: 6, money: 6, tile: "rat"},
		bat: {name: "bat",       level: 1, hp: 28, str: 12, dfs: 11, spd:  18, exp: 6, money: 5, tile: "bat"},
		//Level 2
		beetle: {name: "beetle",       level: 2, hp: 31, str: 13, dfs: 13, spd:  18, exp:   8, money: 8,  tile: "beetle"},
		centipede: {name: "centipede", level: 2, hp: 32, str: 15, dfs: 14, spd: 17, exp:   8, money:   8, tile: "centipede"},
		crow: {name: "crow",           level: 2, hp: 35, str: 17, dfs: 16, spd: 19, exp: 12, money: 11,  tile: "crow"},
		mantis: {name: "mantis",       level: 2, hp: 37, str:  26, dfs:  15, spd: 21, exp: 15, money:   8,  tile: "mantis"},
		//Level 3
		viper: {name: "viper",   level: 3, hp: 38, str: 21, dfs: 19, spd: 20, exp: 17, money: 15, tile: "viper"},
		wasp: {name: "wasp",     level: 3, hp: 40, str: 22, dfs: 21, spd: 22, exp: 19, money: 18, tile: "wasp"},
		bear: {name: "bear",     level: 3, hp: 42, str: 25, dfs: 23, spd: 25, exp: 22, money: 20, tile: "bear"},
		thief: {name: "thief",   level: 3, hp: 45, str: 27, dfs: 25, spd: 28, exp: 25, money: 22, tile: "thief"},
		//Level 4
		fairy: {name: "fairy",       level: 4, hp: 46, str: 27, dfs: 25, spd: 28, exp: 27, money: 22, tile: "fairy"},
		humanRat: {name: "humanRat", level: 4, hp: 48, str: 29, dfs: 27, spd: 30, exp: 29, money: 25, tile: "humanRat"},
		spectre: {name: "spectre",   level: 4, hp:  50, str: 31, dfs: 27, spd: 32, exp: 31, money: 27, tile: "spectre"},
		skeleton: {name: "skeleton", level: 4, hp: 51, str: 33, dfs: 29, spd: 33, exp: 33, money: 30, tile: "skeleton"},
		//Level 5
		skeletonWarrior: {name: "skeletonWarrior",  level: 5, hp:  50, str: 33, dfs: 31, spd: 33, exp: 35, money: 32, tile: "skeletonWarrior"},
		littleDemon: {name: "littleDemon",          level: 5, hp: 53, str: 35, dfs: 33, spd: 35, exp: 38, money: 35, tile: "littleDemon"},
		gelatinousCube: {name: "gelatinousCube",    level: 5, hp: 55, str: 38, dfs: 31, spd: 38, exp: 37, money: 37, tile: "gelatinousCube"},
		spore: {name: "spore",                      level: 5, hp:  50, str: 41, dfs: 35, spd: 38, exp: 40, money: 37, tile: "spore"},
		//Level 6
		centaur: {name: "centaur",             level: 6, hp:  50, str: 43, dfs: 36, spd: 40, exp: 41, money: 37, tile: "centaur"},
		warriorBear: {name: "warriorBear",     level: 6, hp:  50, str: 45, dfs: 38, spd: 42, exp: 43, money: 39, tile: "warriorBear"},
		ghost: {name: "ghost",                 level: 6, hp: 63, str: 49, dfs: 40, spd: 45, exp: 45, money: 40, tile: "ghost"},
		lizardmen: {name: "lizardmen",         level: 6, hp: 63, str: 47, dfs: 42, spd: 43, exp: 47, money: 42, tile: "lizardmen"},
		//Level 7
		giantSpider: {name: "giantSpider",   level: 7, hp: 65, str: 49, dfs: 45, spd: 45, exp: 50, money: 43, tile: "giantSpider"},
		bigSpore: {name: "bigSpore",         level: 7, hp: 68, str: 51, dfs: 47, spd: 47, exp: 52, money: 45, tile: "bigSpore"},
		humanRatMace: {name: "humanRatMace", level: 7, hp: 70, str: 53, dfs: 49, spd: 50, exp: 51, money: 48, tile: "humanRatMace"},
		warriorThief: {name: "warriorThief", level: 7, hp: 71, str: 55, dfs: 52, spd: 52, exp: 55, money: 50, tile: "warriorThief"},
		//Level 8
		lycanthrope: {name: "lycanthrope",        level: 8, hp: 72, str: 55, dfs: 52, spd: 52, exp: 55, money: 52, tile: "lycanthrope"},
		worm: {name: "worm",                      level: 8, hp: 75, str: 57, dfs: 54, spd: 55, exp: 57, money: 54, tile: "worm"},
		skeletonMaster: {name: "skeletonMaster",  level: 8, hp: 78, str: 59, dfs: 56, spd: 54, exp: 60, money: 56, tile: "skeletonMaster"},
		demon: {name: "demon",                    level: 8, hp: 80, str: 62, dfs: 59, spd: 57, exp: 62, money: 59, tile: "demon"},
		//Level 9
		superiorGhost: {name: "superiorGhost",      level: 9, hp: 82, str: 62, dfs: 59, spd: 57, exp: 65, money: 61, tile: "superiorGhost"},
		warrior: {name: "warrior",                  level: 9, hp: 85, str: 64, dfs: 62, spd: 59, exp: 68, money: 63, tile: "warrior"},
		warriorFairy: {name: "warriorFairy",        level: 9, hp: 87, str: 66, dfs: 65, spd: 60, exp: 67, money: 65, tile: "warriorFairy"},
		lizardmenArcher: {name: "lizardmenArcher",  level: 9, hp: 90, str: 69, dfs: 66, spd: 62, exp: 69, money: 68, tile: "lizardmenArcher"},
		//Level 10
		spectreWizard: {name: "spectreWizard",   level: 10, hp: 92, str: 69, dfs: 66, spd: 63, exp: 71, money: 70, tile: "spectreWizard"},
		centaurArcher: {name: "centaurArcher",   level: 10, hp: 95, str: 71, dfs: 68, spd: 65, exp: 73, money: 72, tile: "centaurArcher"},
		superiorBear: {name: "superiorBear",     level: 10, hp: 97, str: 74, dfs: 68, spd: 65, exp: 75, money: 74, tile: "superiorBear"},
		ent: {name: "ent",                       level: 10, hp: 99, str: 76, dfs: 71, spd: 67, exp: 78, money: 77, tile: "ent"},
		//Level 11
		mudMonster: {name: "mudMonster",       level: 11, hp: 102, str: 77, dfs: 71, spd: 68, exp: 78, money: 77, tile: "mudMonster"},
		slimeMonster: {name: "slimeMonster",   level: 11, hp: 103, str: 79, dfs: 73, spd: 70, exp: 81, money: 79, tile: "slimeMonster"},
		efreet: {name: "efreet",               level: 11, hp: 105, str: 79, dfs: 75, spd: 71, exp: 82, money: 82, tile: "efreet"},
		kingCobra: {name: "kingCobra",         level: 11, hp: 107, str: 82, dfs: 77, spd: 73, exp: 84, money: 85, tile: "kingCobra"},
		//Level 12
		kingHumanRat: {name: "kingHumanRat",  level: 12, hp: 109, str: 83, dfs: 78, spd: 75, exp: 85, money: 87, tile: "kingHumanRat"},
		demonWarrior: {name: "demonWarrior",  level: 12, hp: 110, str: 85, dfs: 80, spd: 77, exp: 85, money: 88, tile: "demonWarrior"},
		mummy: {name: "mummy",                level: 12, hp: 112, str: 87, dfs: 81, spd: 80, exp: 87, money: 90, tile: "mummy"},
		echidna: {name: "echidna",            level: 12, hp: 114, str: 89, dfs: 83, spd: 81, exp: 89, money: 91, tile: "echidna"},
		//Level 13
		kingBear: {name: "kingBear",               level: 13, hp: 117, str: 92, dfs: 85, spd: 82, exp: 89, money: 92, tile: "kingBear"},
		shadowWarrior: {name: "shadowWarrior",     level: 13, hp: 120, str: 95, dfs: 87, spd: 84, exp: 90, money: 94, tile: "shadowWarrior"},
		superiorSpectre: {name: "superiorSpectre", level: 13, hp: 122, str: 97, dfs: 88, spd: 87, exp: 92, money: 95, tile: "superiorSpectre"},
		scorpion: {name: "scorpion",               level: 13, hp: 123, str: 99, dfs: 90, spd: 89, exp: 95, money: 97, tile: "scorpion"},
		//Level 14 
		lycanthrope: {name: "lycanthrope",        level: 14, hp: 125, str: 102, dfs: 92, spd: 92, exp: 97, money: 97, tile: "lycanthrope"},
		skeletonArcher: {name: "skeletonArcher",  level: 14, hp: 127, str: 105, dfs: 94, spd: 95, exp: 97, money: 97, tile: "skeletonArcher"},
		golem: {name: "golem",                    level: 14, hp: 129, str: 107, dfs: 97, spd: 95, exp: 98, money: 99, tile: "golem"},
		beholder: {name: "beholder",              level: 14, hp: 131, str: 110, dfs: 99, spd: 97, exp: 99, money: 99, tile: "beholder"},
		//Level 15
		cyclops: {name: "cyclops",              level: 15, hp: 133, str: 113, dfs: 103, spd:  99, exp: 100, money: 100, tile: "cyclops"},
		minotaur: {name: "minotaur",            level: 15, hp: 135, str: 115, dfs: 105, spd: 102, exp: 102, money: 101, tile: "minotaur"},
		masterGhost: {name: "masterGhost",      level: 15, hp: 137, str: 118, dfs: 107, spd: 104, exp: 104, money: 103, tile: "masterGhost"},
		superiorMummy: {name: "superiorMummy",  level: 15, hp: 140, str: 120, dfs: 109, spd: 105, exp: 105, money: 105, tile: "superiorMummy"},
		//Level 16
		demonArcher: {name: "demonArcher",            level: 16, hp: 142, str: 122, dfs: 110, spd: 107, exp: 105, money: 105, tile: "demonArcher"},
		entGolem: {name: "entGolem",                  level: 16, hp: 145, str: 125, dfs: 112, spd: 108, exp: 107, money: 105, tile: "entGolem"},
		superiorBeholder: {name: "superiorBeholder",  level: 16, hp: 147, str: 126, dfs: 114, spd: 110, exp: 108, money: 107, tile: "superiorBeholder"},
		GolemRat: {name: "GolemRat",                  level: 16, hp: 150, str: 127, dfs: 115, spd: 112, exp: 109, money: 110, tile: "GolemRat"},
		//Level 17
		dragon: {name: "dragon",                   level: 17, hp: 153, str: 127, dfs: 115, spd: 112, exp: 110, money: 112, tile: "dragon"},
		efreetWarrior: {name: "efreetWarrior",     level: 17, hp: 155, str: 128, dfs: 116, spd: 114, exp: 112, money: 114, tile: "efreetWarrior"},
		shadowWizard: {name: "shadowWizard",       level: 17, hp: 157, str: 130, dfs: 118, spd: 115, exp: 115, money: 115, tile: "shadowWizard"},
		centaurWarrior: {name: "centaurWarrior",   level: 17, hp: 160, str: 132, dfs: 120, spd: 117, exp: 116, money: 117, tile: "centaurWarrior"},
		//Level 18
		masterDemon: {name: "masterDemon",           level: 18, hp: 172, str: 135, dfs: 121, spd: 119, exp: 117, money: 117, tile: "masterDemon"},
		echidnaArcher: {name: "echidnaArcher",       level: 18, hp: 175, str: 136, dfs: 123, spd: 121, exp: 117, money: 119, tile: "echidnaArcher"},
		fenix: {name: "fenix",                       level: 18, hp: 176, str: 138, dfs: 125, spd: 123, exp: 119, money: 121, tile: "fenix"},
		superiorCyclops: {name: "superiorCyclops",   level: 18, hp: 178, str: 140, dfs: 126, spd: 125, exp: 121, money: 123, tile: "superiorCyclops"},
		//Level 19
		masterBeholder: {name: "masterBeholder",   level: 19, hp: 180, str: 142, dfs: 126, spd: 127, exp: 123, money: 125, tile: "masterBeholder"},
		ghostDragon: {name: "ghostDragon",         level: 19, hp: 182, str: 143, dfs: 127, spd: 130, exp: 126, money: 128, tile: "ghostDragon"},
		marid: {name: "marid",                     level: 19, hp: 185, str: 145, dfs: 129, spd: 132, exp: 128, money: 129, tile: "marid"},
		yonatan: {name: "yonatan",                 level: 19, hp: 188, str: 147, dfs: 131, spd: 135, exp: 131, money: 132, tile: "yonatan"},
	},
	
	bosses: {
		flameSkelleton: {name: "flameSkelleton",   level: 5,  hp:  70, str:  53, dfs:  49, spd:  50, exp: 101, money:  90, tile: "flameSkelleton"},
		incubus: {name: "incubus",                 level: 10, hp: 110, str:  85, dfs:  80, spd:  77, exp: 150, money: 130, tile: "incubus"},
		medusa: {name: "medusa",                   level: 15, hp: 153, str: 127, dfs: 115, spd: 112, exp: 200, money: 170, tile: "medusa"},
		Ias: {name: "Ias",                         level: 20, hp: 188, str: 147, dfs: 131, spd: 135, exp: 300, money: 300, tile: "Ias"},
	},
	
	getBucket: function(level){
		var bucket = [];
		var l = Math.max(0, level - 3); 
		for (var e in EnemyFactory.enemies){
			var enemy = EnemyFactory.enemies[e];
			if (enemy.level > l && enemy.level <= level)
				bucket.push(enemy);
		}
		
		return bucket;
	},
	
	getRandomEnemy: function(level){
		var bucket = this.getBucket(level);
		var enemy;
		while (!enemy){
			enemy = bucket[Math.iRandom(bucket.length)];
		}
		
		var tile = Tileset.enemies[enemy.tile];
		if (tile.color)
			tile = tile.getColor(tile.color.r, tile.color.g, tile.color.b);
		var ret = {
			name: enemy.name,
			level: enemy.level,
			hp: enemy.hp,
			tile: tile,
			str: enemy.str,
			dfs: enemy.dfs,
			exp: enemy.exp,
			spd: enemy.spd,
			money: enemy.money
		};
		
		return ret;
	},
	
	getBoss: function(level){
		var enemy = null;
		if (level == 5){ enemy = EnemyFactory.bosses.flameSkelleton; }else
		if (level == 10){ enemy = EnemyFactory.bosses.incubus; }else
		if (level == 15){ enemy = EnemyFactory.bosses.medusa; }else
		if (level == 20){ enemy = EnemyFactory.bosses.Ias; }
		
		if (!enemy) return null;
		
		var tile = Tileset.bosses[enemy.tile];
		if (tile.color)
			tile = tile.getColor(tile.color.r, tile.color.g, tile.color.b);
		var ret = {
			name: enemy.name,
			level: enemy.level,
			hp: enemy.hp,
			tile: tile,
			str: enemy.str,
			dfs: enemy.dfs,
			exp: enemy.exp,
			spd: enemy.spd,
			money: enemy.money
		};
		
		return ret;
	}
};

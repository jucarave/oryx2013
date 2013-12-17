var EnemyFactory = {
	enemies: {
		//Level 1
		krab: {name: "krab",     level: 1, hp: 28, str: 19, dfs: 8,  spd: 10, exp: 4,  money: 4, tile: "krab"},
		spider: {name: "spider", level: 1, hp: 32, str: 20, dfs: 10, spd: 12, exp: 3,  money: 4, tile: "spider"},
		rat: {name: "rat",       level: 1, hp: 40, str: 22, dfs: 13, spd: 13, exp: 6, money: 6, tile: "rat"},
		bat: {name: "bat",       level: 1, hp: 40, str: 21, dfs: 13, spd: 11, exp: 6, money: 5, tile: "bat"},
		//Level 2
		viper: {name: "viper",   level: 2, hp: 50, str: 26, dfs: 15, spd: 18, exp: 8,  money: 8, tile: "viper"},
		wasp: {name: "wasp",     level: 2, hp: 58, str: 23, dfs: 15, spd: 15, exp: 7,  money: 10, tile: "wasp"},
		bear: {name: "bear",     level: 2, hp: 66, str: 28, dfs: 18, spd: 18, exp: 11, money: 13, tile: "bear"},
		thief: {name: "thief",   level: 2, hp: 60, str: 20, dfs: 12, spd: 18, exp: 9,  money: 8, tile: "thief"},
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
	}
};

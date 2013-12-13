var EnemyFactory = {
	enemies: {
		krab: {name: "krab", level: 1, hp: 8, str: 3, dfs: 5, spd: 3, exp: 4, money: 4, tile: "krab"},
		spider: {name: "spider", level: 1, hp: 9, str: 4, dfs: 3, spd: 3, exp: 3, money: 4, tile: "spider"},
		rat: {name: "rat", level: 1, hp: 12, str: 3, dfs: 3, spd: 6, exp: 5, money: 6, tile: "rat"},
		bat: {name: "bat", level: 1, hp: 9, str: 4, dfs: 3, spd: 5, exp: 3, money: 5, tile: "bat"},
		viper: {name: "viper", level: 1, hp: 15, str: 5, dfs: 6, spd: 5, exp: 8, money: 8, tile: "viper"}
	},
	
	getBucket: function(level){
		var bucket = [];
		for (var e in EnemyFactory.enemies){
			var enemy = EnemyFactory.enemies[e];
			if (enemy.level > level) continue;
			
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

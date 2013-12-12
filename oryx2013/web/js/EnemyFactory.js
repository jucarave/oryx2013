var EnemyFactory = {
	enemies: {
		krab: {name: "krab", level: 1, hp: 4, tile: "krab"},
		spider: {name: "spider", level: 1, hp: 6, tile: "spider"},
		rat: {name: "rat", level: 1, hp: 6, tile: "rat"},
		bat: {name: "bat", level: 1, hp: 8, tile: "bat"},
		viper: {name: "viper", level: 1, hp: 10, tile: "viper"}
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
			tile: tile
		};
		
		return ret;
	}
};

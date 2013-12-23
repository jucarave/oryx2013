var HeroClasses = {
	fighter: {id: 0, name: msg.fighter, tile: Tileset.heroes.warrior},
	archer: {id: 1, name: msg.archer, tile: Tileset.heroes.archer},
	wizard: {id: 2, name: msg.wizard, tile: Tileset.heroes.wizard},
	
	fromId: function(id){
		for (var i in HeroClasses){
			if (HeroClasses[i].id == id){
				return HeroClasses[i];
			}
		}
		
		return null;
	}
};

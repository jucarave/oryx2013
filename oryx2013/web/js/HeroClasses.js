var HeroClasses = {
	fighter: {id: 0, name: "Fighter", tile: Tileset.heroes.warrior},
	archer: {id: 1, name: "Archer", tile: Tileset.heroes.archer},
	wizard: {id: 2, name: "Wizard", tile: Tileset.heroes.wizard},
	
	fromId: function(id){
		for (var i in HeroClasses){
			if (HeroClasses[i].id == id){
				return HeroClasses[i];
			}
		}
		
		return null;
	}
};

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
		floor1: {img: "environment", subImg: new Position(9, 0), tileId: 1, getColor: getColor, color: {r:60,g:60,b:60}},
		wall1: {img: "environment", subImg: new Position(0, 0), tileId: 2, getColor: getColor, solid: true, color: {r:100,g:100,b:200}, isWall: true},
		sidewall: {img: "environment", subImg: new Position(7, 0), tileId: 3, getColor: getColor, solid: true, color: {r:100,g:100,b:200}, isWall: true},
		
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
		cottomCloth: ({img: "itemsWeapons", subImg: new Position(0, 1), getColor: getColor}),
		
		frame: {img: "itemsWeapons", subImg: new Position(4, 4), getColor: getColor}
	}
};

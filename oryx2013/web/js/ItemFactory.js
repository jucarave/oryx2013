var ItemFactory = {
	//Weapons
	sword: {dmg: 5, dice:"2D4", isWeapon: true, tile: "sword", class: HeroClasses.fighter},
	heavySword: {dmg: 9, dice:"1D2", isWeapon: true, tile: "heavySword", class: HeroClasses.fighter},
	greatSword: {dmg: 15, dice:"5D4", isWeapon: true, tile: "heavySword", class: HeroClasses.fighter, color: {r:0,g:0,b:255}},
	knife: {dmg: 5, dice:"1D3", isWeapon: true, tile: "dagger"},
	dagger: {dmg: 8, dice:"2D4", isWeapon: true, tile: "dagger", color: {r:255,g:201,b:14}},
	quarterStaff: {dmg: 10, dice:"2D4", isWeapon: true, tile: "quarterStaff", class: HeroClasses.wizzard, color: {r:132,g:82,b:55}},
	gemStaff: {dmg: 15, dice:"2D4", isWeapon: true, tile: "gemStaff", class: HeroClasses.wizzard, color: {r:255,g:201,b:14}},
	battleAxe: {dmg: 8, dice:"2D4", isWeapon: true, tile: "battleAxe"},
	heavyAxe: {dmg: 13, dice:"2D4", isWeapon: true, tile: "heavyAxe", class: HeroClasses.fighter},
	bow: {dmg: 8, dice:"3D6", isWeapon: true, tile: "bow", class: HeroClasses.archer},
	longBow: {dmg: 15, dice:"4D8", isWeapon: true, tile: "longBow", class: HeroClasses.archer, color: {r:255,g:201,b:14}},
	crossBow: {dmg: 19, dice:"6D9", isWeapon: true, tile: "crossBow", class: HeroClasses.archer},
	
	//Armours
	cottomCloth: {dfs: 2, dice:"2D4", isArmour: true, tile: "cottomCloth" },
	
	getItem: function(name, status){
		var item = ItemFactory[name];
		var nitem = {};
		for (var i in item){
			nitem[i] = item[i];
		}
		
		nitem.name = name;
		nitem.status = status;
		nitem.tile = Tileset.itemsWeapons[nitem.tile];
		
		if (nitem.color){
			nitem.tile = nitem.tile.getColor(nitem.color.r,nitem.color.g,nitem.color.b);
		}
		
		return nitem;
	},
	
	getItemQuality: function(status){
		if (status == 0){
			return "damaged";
		}else if (status <= 0.3){
			return "badly";
		}else if (status <= 0.6){
			return "fine";
		}else if (status <= 0.9){
			return "good";
		}else{
			return "excelent";
		}
	},
	
	getItemName: function(item){
		if (item.rName) return item.rName;
		
		var name = "";
		for (var i=0;i<item.name.length;i++){
			var letter = item.name.charAt(i);
			if (letter === letter.toUpperCase()){
				name += " ";
				letter = letter.toLowerCase();
			}
			
			name += letter;
		}
		
		item.rName = name;
		return name;
	}
};

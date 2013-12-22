var ItemFactory = {
	//Weapons
	sword: {dmg: 10, dice:"2D4", isWeapon: true, tile: "sword", class: HeroClasses.fighter, price: 45, wear: 0.6},
	heavySword: {dmg: 15, dice:"1D2", isWeapon: true, tile: "heavySword", class: HeroClasses.fighter, price: 65, wear: 0.4},
	greatSword: {dmg: 25, dice:"5D4", isWeapon: true, tile: "heavySword", class: HeroClasses.fighter, price: 100, color: {r:0,g:0,b:255}, wear: 0.1},
	knife: {dmg: 5, dice:"1D3", isWeapon: true, tile: "dagger", price: 20, wear: 0.6},
	dagger: {dmg: 8, dice:"2D4", isWeapon: true, tile: "dagger", color: {r:255,g:201,b:14}, price: 33, wear: 0.4},
	quarterStaff: {dmg: 13, dice:"2D4", isWeapon: true, tile: "quarterStaff", class: HeroClasses.wizard, isStaff: true, color: {r:132,g:82,b:55}, price: 38, wear: 0.4},
	gemStaff: {dmg: 28, dice:"2D4", isWeapon: true, tile: "gemStaff", class: HeroClasses.wizard, isStaff: true, color: {r:255,g:201,b:14}, price: 50, wear: 0.2},
	battleAxe: {dmg: 12, dice:"2D4", isWeapon: true, tile: "battleAxe", price: 38, wear: 0.8},
	heavyAxe: {dmg: 20, dice:"2D4", isWeapon: true, tile: "heavyAxe", class: HeroClasses.fighter, price: 48, wear: 0.5},
	bow: {dmg: 12, dice:"3D6", isWeapon: true, tile: "bow", class: HeroClasses.archer, price: 35, isBow: true, wear: 0.6},
	longBow: {dmg: 26, dice:"4D8", isWeapon: true, tile: "bow", class: HeroClasses.archer, isBow: true, color: {r:255,g:201,b:14}, price: 60, wear: 0.4},
	crossBow: {dmg: 34, dice:"6D9", isWeapon: true, tile: "crossBow", class: HeroClasses.archer, isBow: true, wear: 0.1, price: 120},
	
	//Armours
	cottomCloth: {dfs: 2, dice:"2D4", isArmour: true, tile: "cottomCloth", wear: 0.7 },
	leatherArmour: {dfs: 9, dice:"1D3", isArmour: true, tile: "cottomCloth", price: 30, color: {r:188,g:134,b:84}, wear: 0.5 },
	robe: {dfs: 5, dice:"1D3", isArmour: true, tile: "cottomCloth", price: 40, color: {r:68,g:116,b:187}, wear: 0.6 },
	plateArmour: {dfs: 15, dice:"3D7", isArmour: true, tile: "helmet", price: 60, wear: 0.3 },
	mailArmour: {dfs: 20, dice:"3D7", isArmour: true, tile: "helmet", price: 100, color: {r:147,g:181,b:153}, wear: 0.4 },
	scaleArmour: {dfs: 30, dice:"3D4", isArmour: true, tile: "helmet", price: 150, color: {r:65,g:143,b:184}, wear: 0.3 },
	reflectArmour: {dfs: 50, dice:"5D9", isArmour: true, tile: "helmet", price: 280, wear: 0.1},
	
	//Items
	redSmallPotion: {isItem: true, tile: "potionS", color: {r:255,g:0,b:0}, chance: 70, effect: null },
	blueSmallPotion: {isItem: true, tile: "potionS", color: {r:0,g:0,b:255}, chance: 70, effect: null },
	purpleSmallPotion: {isItem: true, tile: "potionS", color: {r:255,g:0,b:255}, chance: 70, effect: null },
	greenSmallPotion: {isItem: true, tile: "potionS", color: {r:0,g:255,b:0}, chance: 70, effect: null },
	redLargePotion: {isItem: true, tile: "potionS", color: {r:255,g:0,b:0}, chance: 50, effect: null },
	blueLargePotion: {isItem: true, tile: "potionS", color: {r:0,g:0,b:255}, chance: 50, effect: null },
	purpleLargePotion: {isItem: true, tile: "potionS", color: {r:255,g:0,b:255}, chance: 50, effect: null },
	greenLargePotion: {isItem: true, tile: "potionS", color: {r:0,g:255,b:0}, chance: 50, effect: null },
	shovel: {isItem: true, tile: "shovel", color: {r:155,g:155,b:155}, chance: 40, effect: EffectFactory.shovel },
	mapDiscoverer: {isItem: true, tile: "mapOrb", color: {r:155,g:0,b:155}, chance: 35, effect: EffectFactory.mapOrb },
	timeSlower: {isItem: true, tile: "time", color: {r:255,g:255,b:0}, chance: 30, effect: EffectFactory.time },
	
	//Food
	pack10: {amount: 20, isFood: true, tile: "food", rName: "pack of 20 rations", price: 10 },
	pack20: {amount: 50, isFood: true, tile: "food", rName: "pack of 50 rations", price: 20 },
	pack50: {amount: 100, isFood: true, tile: "food", rName: "pack of 100 rations", price: 50 },
	pack100: {amount: 200, isFood: true, tile: "food", rName: "pack of 200 rations", price: 100 },
	pack300: {amount: 600, isFood: true, tile: "food", rName: "pack of 600 rations", price: 300 },
	pack500: {amount: 1000, isFood: true, tile: "food", rName: "pack of 1000 rations", price: 500 },
	
	//Magic
	fireball: {isMagic: true, tile: "fireball", color: {r:255,g:201,b:14}, cast: MagicFactory.fireball, price: 70 },
	bersek: {isMagic: true, tile: "bersek", color: {r:255,g:0,b:0}, cast: MagicFactory.bersek, price: 100 },
	portal: {isMagic: true, tile: "portal", color: {r:97,g:70,b:168}, cast: MagicFactory.portal, price: 500 },
	sleep: {isMagic: true, tile: "sleep", color: {r:75,g:150,b:163}, cast: MagicFactory.sleep, price: 150 },
	display: {isMagic: true, tile: "display", cast: MagicFactory.display, price: 220 },
	blink: {isMagic: true, tile: "blink", color: {r:29,g:220,b:18}, cast: MagicFactory.blink, price: 300 },
	life: {isMagic: true, tile: "life", color: {r:255,g:0,b:0}, cast: MagicFactory.life, price: 400 },
	
	getMoney: function(amount){
		var ret = {
			tile: Tileset.itemsWeapons.money,
			amount: amount,
			isMoney: true,
			name: amount + " gold coins"
		};
		
		return ret;
	},
	
	getItem: function(name, status){
		var item = ItemFactory[name];
		var nitem = {};
		for (var i in item){
			nitem[i] = item[i];
		}
		
		nitem.name = name;
		nitem.status = status;
		if (nitem.isMagic){
			nitem.tile = Tileset.magic[nitem.tile];
		}else{
			nitem.tile = Tileset.itemsWeapons[nitem.tile];
		}
		
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
	},
	
	getBucket: function(chance){
		var bucket = [];
		for (var i in ItemFactory){
			var item = ItemFactory[i];
			if (!item.isItem) continue;
			if (item.chance >= chance)
				bucket.push(i);
		}
		
		return bucket;
	},
	
	getRandomItem: function(){
		var chance = Math.iRandom(100);
		var bucket = this.getBucket(chance);
		
		if (bucket.length == 0) return null;
		
		var dice = Math.iRandom(bucket.length - 1);
		var item = ItemFactory.getItem(bucket[dice], 1);
		
		return item;
	}
};

var ItemFactory = {
	//Weapons
	sword: {dmg: 5, dice:"2D4", isWeapon: true},
	
	//Armours
	cottomCloth: {shd: 2, dice:"2D4", isArmour: true},
	
	getItem: function(name, status){
		var item = ItemFactory[name];
		var nitem = {};
		for (var i in item){
			nitem[i] = item[i];
		}
		
		nitem.name = name;
		nitem.status = status;
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

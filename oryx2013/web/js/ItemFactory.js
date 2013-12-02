var ItemFactory = {
	sword: {dmg: 5, dice:"2D4", color: null},
	
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
	}
};

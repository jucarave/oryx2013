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
	}
};

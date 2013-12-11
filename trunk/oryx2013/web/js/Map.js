function Map(params){
	this.map = null;
	this.name = "";
	this.tiles = [];
	this.instances = [];
	this.view = new Position( 0, 0);
	this.player = null;
	
	this.light = false;
	
	this.passTurn = 0;
	
	this.signs = [];
	
	if (params.map){
		this.loadMap(params.map);
		this.parseMap();
	}
}

Map.prototype.loadMap = function(map){
	this.light = false;
	this.signs = [];
	if (map == "town"){
		this.name = "Town Map";
		this.key = map;
		this.light = true;
		
		var a = [5, 10];
		var b = [4, 10];
		var c = [4, 10, 11];
		var d = [4, 11, 10];
		var e = [1, 15];
		var f = [5, 16];
		var g = [5, 17];
		
		this.map = [
			[ 4, 4, 4, 4, 2, d, a, a, a, a,14, e,-4, e,14, a, a, a, d, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			[ 4, 4, 4, 4, 2, a, 5, 5, 5, 5,13,13, 1,13,13, 5, 5, 5, a, 2, 7, 7, 7, 7, 7, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			[ 4, 4, 4, 4, 2, b, 5, f, 5, f, 5, 5, 1, 5, 5, f, 5, g, b, 2, 8, 8, 8, 8, 8, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			[ 4, 4, 4, 4, 2, a, 5, 5, 5, 1, 1, 1, 1, 5, 5, 5, 5, 5, a, 2, 7, 7, 7, 7, 7, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			[ 4, 4, 4, 4, 2, a, 5, g, 5, 1, 5, 5, 5, g, 5, 5, 5, f, a, 2, 7, 7, 7, 7, 7, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			[ 4, 4, 4, 4, 2, c, a, a, b, 1, b, b, b, a, b, b, b, a, c, 2, 7, 7, 7, 7, 7, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			[ 4, 4, 4, 4, 2, 5, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4],
			[ 4, 4, 4, 4, 2, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 2, 7, 7, 7, 7, 7, 8, 7, 2, 4, 4, 4, 4, 4, 4, 4],
			[ 2, 2, 2, 2, 2, 2, 2, 2, 4, 1, 4,-1, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 2, 7, 7, 7, 7, 7, 8, 7, 2, 4, 4, 4, 4, 4, 4, 4],
			[ 2, 2, 7, 7, 7, 7, 7, 2, 4, 1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 2, 7, 7, 7, 7, 7, 8, 7, 2, 4, 4, 4, 4, 4, 4, 4],
			[ 2, 2, 8, 8, 8, 8, 8, 2, 5, 1, 5, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 2, 7, 7, 7, 7, 7, 8, 7, 2, 4, 4, 4, 4, 6, 6, 6],
			[ 2, 2, 7, 7, 7, 7, 7, 1, 1, 1, 1, 1, 1, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 2, 7, 7, 7, 7, 7, 8, 7, 2, 4, 4, 4, 4, 6, 6, 6],
			[ 2, 2, 7, 7, 7, 7, 7, 2, 5, 5, 5, 5, 1, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 4, 4, 6, 6, 6],
			[ 2, 2, 7, 7, 7, 7, 7, 2, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 6, 6, 6, 6, 6, 2, 6, 6, 6, 6, 6],
			[ 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 1, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2, 6, 6, 6, 6, 6],
			[ 2, 2, 7, 8, 7, 7, 7, 2, 5, 5, 5, 5, 1, 4, 4, 4, 4, 4, 4, 4, 6, 1, 6, 6, 6, 4, 5, 5, 5, 2, 2, 2, 2, 2, 2, 4, 4, 6, 6, 6],
			[ 2, 2, 7, 8, 7, 7, 7, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 6, 6, 6, 1, 4, 4, 4, 4, 4, 5, 5, 2, 7, 7, 7, 7, 2, 4, 4, 6, 6, 6],
			[ 2, 2, 7, 8, 7, 7, 7, 2, 5, 5, 5, 4, 4, 4, 4, 6, 6, 6, 6, 4, 4, 1, 4, 4, 4, 4, 4, 5, 5, 2, 8, 8, 8, 8, 2, 4, 4, 6, 6, 6],
			[ 2, 2, 7, 8, 7, 7, 7, 2, 5, 5, 5, 5, 4, 6, 6, 6, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 5, 5, 2, 7, 7, 7, 7, 2, 4, 4, 4, 4, 4],
			[ 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 6, 6, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 5, 5, 2, 7, 7, 7, 7, 2, 4, 4, 4, 4, 4],
			[ 2, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 6, 6, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 7, 2, 4, 4, 4, 4, 4],
			[ 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 2, 7, 7, 7, 7, 2, 4, 4, 4, 4, 4],
			[ 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 2, 7, 7, 7, 7, 2, 4, 4, 4, 4, 4],
			[ 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 2, 7, 7, 7, 7, 2, 4, 4, 4, 4, 4],
			[ 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 2, 7, 7, 7, 7, 2, 4, 4, 4, 4, 4],
			[ 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4]
		];
		
		this.signs = [
			{title: "P O T I O N S", pos: new Position(4, 8)},
			{title: "F O O D", pos: new Position(4, 14)},
			{title: "W E A P O N S", pos: new Position(22, 0)},
			{title: "A R M O U R S", pos: new Position(28, 6)},
			{title: "H O T E L", pos: new Position(31.5, 15)}
		];
	}else if (map == "test"){
		this.name = "Test map - Level 1";
		this.key = map;
		
		this.map = [
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1,-3,-1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1,-2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		];
	}else if (map == "test_2"){
		this.name = "Test map - Level 2";
		this.key = map;
		
		this.map = [
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 2, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 2, 1, 2, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0, 2, 1, 2, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0, 2, 1, 2, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,-3,-1, 1, 2, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		];
	}
	
	
};

Map.prototype.isSolid = function(position){
	if (position.y < 0 || position.x < 0) return true;
	if (position.y >= this.map.length || position.x >= this.map[0].length) return true;
	var tile = this.map[position.y][position.x];
	for (var i=0,len=tile.length;i<len;i++){
		if (tile[i] === 0) return false;
		if (tile[i].tile.solid){
			return true;
		}
	}
	return false;
};

Map.prototype.isVisible = function(position){
	if (position.y < 0 || position.x < 0) return;
	if (position.y >= this.map.length || position.x >= this.map[0].length) return;
	var tile = this.map[position.y][position.x][0];
	if (tile === 0) return false;
	if (tile.wasVisible > 0){
		return tile.wasVisible;
	}
	return false;
};

Map.prototype.setVisible = function(position, visible){
	if (position.y < 0 || position.x < 0) return;
	if (position.y >= this.map.length || position.x >= this.map[0].length) return;
	var tile = this.map[position.y][position.x];
	for (var i=0,len=tile.length;i<len;i++){
		if (tile[i] === 0) return;
		tile[i].visible = visible;
	}
};

Map.prototype.createStairs = function(tile, position, direction){
	var name, level;
	if (this.key.indexOf("_") != -1){
		name = this.key.substring(0,this.key.indexOf("_"));
		level = parseFloat(this.key.replace(name+"_", ""));
		level += (direction == 'D')? 1 : -1;
		
		if (level != 1)
			name += "_" + level;
	}else{
		level = 2;
		if (direction == 'D')
			name = this.key + "_2";
		else{
			name = "town";
			
		level = 0;
		if (direction == 'E'){
			name = "test";
			level = 1;
		}
			
		}
	}
	
	
	var ins = new Stairs(tile, position, direction, name);
	ins.mapManager = this;
	ins.level = level;
	
	this.instances.push(ins);
};

Map.prototype.newItem = function(tile, position, item){
	if (item.status == 0) return;
	
	var ins = new Item(tile, position, item);
	ins.mapManager = this;
	
	this.instances.push(ins);
};

Map.prototype.setPlayer = function(x, y){
	this.player = new Player(Tileset.heroes.warrior1.getColor(150, 0,0), new Position(x, y));
};

Map.prototype.loadInstances = function(game){
	switch (game.room){
		case 0:
			this.player.mapManager = this;
			this.player.setView(game);
			FOV.getFOV(this.player.position, this, this.player.fovDistance);
			
			//this.newItem(Tileset.itemsWeapons.sword, new Position(14, 1), ItemFactory.getItem("sword", Math.random()));
		break;
	}
};

Map.prototype.parseMap = function(){
	for (var i= 0,len=this.map.length;i<len;i++){
		for (var j= 0,jlen=this.map[i].length;j<jlen;j++){
			var tile = this.map[i][j];
			if (tile == 0) continue;
			if (tile == -1){
				this.setPlayer(j, i);
				tile = this.map[i][j + 1];
			}else if (tile == -2){
				this.createStairs(Tileset.misc.stairsDown, new Position(j, i), 'D');
				tile = this.map[i + 1][j];
			}else if (tile == -3){
				this.createStairs(Tileset.misc.stairsUp, new Position(j, i), 'A');
				tile = this.map[i + 1][j];
			}else if (tile == -4){
				this.createStairs(Tileset.misc.stairsDungeon, new Position(j, i), 'E');
				tile = this.map[i + 1][j];
			}
			
			if (tile instanceof Array){
				tile = tile.clone();
			}else{
				tile = [tile];
			}
			
			this.map[i][j] = [];
			for (var t=0;t<tile.length;t++){
				if (Tileset.environment.getByTileId(tile[t]).isWall)
					if (this.map[i + 1] && (this.map[i + 1][j] == tile[t] || this.map[i + 1][j][t] == tile[t])) tile[t] += 1;
					
				var visible = 0;
				if (this.light) visible = 2;
				this.map[i][j][t] = {
					tileId: tile[t],
					tile: Tileset.environment.getByTileId(tile[t]),
					visible: visible,
					wasVisible: false
				};
			}
		}
	}
};

Map.prototype.drawMap = function(game){
	var x = this.view.x;
	var y = this.view.y;
	
	this.passTurn++;
	
	if (this.player.playerAction){
		this.passTurn = 0;
		game.clearScreen();
		
		for (var i=y,len=y+game.viewS.y;i<len;i++){
			for (var j=x,jlen=x+game.viewS.x;j<jlen;j++){
				var tile = this.map[i][j];
				for (var t=0,tlen=tile.length;t<tlen;t++){
					if (tile[t] === 0)  continue;
					if (tile[t].visible == 0) continue;
					
					tile[t].wasVisible = 0;
					if (this.light){
						tile[t].wasVisible = 2;
						tile[t].visible = 2;
					}
					if (tile[t].visible == 1){
						game.drawTile(tile[t].tile, new Position(j - x, i - y), null, true);
						tile[t].wasVisible = 1;
					}else if (tile[t].visible == 2){
						game.drawTile(tile[t].tile, new Position(j - x, i - y), null, false);
						tile[t].wasVisible = 2;
					}
					
					tile[t].visible = 1;
				}
			}
		}
		
		for (var i= 0;i<this.instances.length;i++){
			var ins = this.instances[i];
			if (!ins.inWorld){
				this.instances.splice(i,1);
				i--;
			}else{
				ins.loop(game);
			}
		}
		
		var ctx = game.eng.ctx;
		for (var i=0,len=this.signs.length;i<len;i++){
			var s = this.signs[i];
			
			var x = (s.pos.x + game.viewPos.x - this.view.x) * game.gridS.x + (game.gridS.x / 2);
			var y = (s.pos.y + game.viewPos.y - this.view.y) * game.gridS.y;
			
			var w = (s.title.length * 12);
			
			ctx.fillStyle = "rgb(33,33,33)";
			ctx.fillRect(x - w / 2, y, w, 20);
			
			ctx.fillStyle = "rgb(255,255,255)";
			ctx.textAlign = "center";
			ctx.fillText(s.title, x, y + 16);
			ctx.textAlign = "left";
		}
		
	}
	
	this.player.playerAction = false;
	this.player.loop(game);
	
	if (this.passTurn == 500 || game.keyP[32] == 1){
		Console.addMessage("Pass", "rgb(130,160,90)");
		this.player.act();
		if (game.keyP[32] == 1)
			game.keyP[32] = 2;
	}
	
	if (game.map == null) return;
	game.drawInterface();
};

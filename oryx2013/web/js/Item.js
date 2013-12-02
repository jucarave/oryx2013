function Item(tile, position, item){
	this.tile = tile;
	this.position = position;
	this.mapManager = null;
	this.item = item;
}

Item.prototype.checkPlayer = function(){
	if (this.mapManager.player.position.equals(this.position)){
		Console.addMessage("You stepped into a(n) " + ItemFactory.getItemQuality(this.item.status) + " " + this.item.name, "rgb(255,255,255)");
	}
};

Item.prototype.draw = function(game){
	if (this.mapManager.isVisible(this.position))
		game.drawTile(this.tile, this.position, this.mapManager.view);
};

Item.prototype.loop = function(game){
	this.checkPlayer();
	this.draw(game);
};


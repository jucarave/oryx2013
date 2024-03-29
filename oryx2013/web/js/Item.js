function Item(tile, position, item){
	this.tile = tile;
	this.position = position;
	this.mapManager = null;
	this.item = item;
	this.inWorld = true;
}

Item.prototype.checkPlayer = function(){
	if (!this.mapManager.player.playerMoved) return;
	
	if (this.mapManager.player.position.equals(this.position)){
		var desc;
		if (this.item.isMoney){
			desc = this.item.name;
			Console.addMessage(desc, "rgb(255,255,255)", "stepped");
		}else if (this.item.isItem){
			if (this.item.effect && !this.item.effect.used){
				desc = (this.item.effect.size == 's')? msg.i.unknowSmallPotion : msg.i.unknowLargePotion;
				Console.addMessage(msg.stepped + desc, "rgb(255,255,255)", "stepped");
			}else{
				desc = ItemFactory.getItemName(this.item);
				Console.addMessage(msg.stepped + desc, "rgb(255,255,255)", "stepped");
			}
		}else{
			desc = ItemFactory.getItemQuality(this.item.status) + " " + ItemFactory.getItemName(this.item);
			Console.addMessage(msg.stepped + desc, "rgb(255,255,255)", "stepped");
		}
		
		PlayerStats.steppedItems.push(this);
	}
};

Item.prototype.draw = function(game){
	if (this.mapManager.isVisible(this.position) == 2){
		if (this.item.effect && !this.item.effect.used){
			game.drawTile(this.tile.parent, this.position, this.mapManager.view);
		}else{
			game.drawTile(this.tile, this.position, this.mapManager.view);
		}
	}
};

Item.prototype.loop = function(game){
	this.checkPlayer();
	this.draw(game);
};


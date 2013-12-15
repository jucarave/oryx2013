function Seller(tile, position, seller){
	this.inWorld = true;
	this.isSeller = true;
	this.seller = seller;
	
	this.seller.greet = this.seller.greet.replace("{player}", PlayerStats.name);
	
	Character.call(this, tile, position);
}

Seller.prototype = Object.create(Character.prototype);
Seller.prototype.constructor = Seller;

Seller.prototype.greet = function(){
	Console.addMessage(this.seller.greet, "rgb(255,255,255)");
	this.mapManager.store = this.seller.store;
};
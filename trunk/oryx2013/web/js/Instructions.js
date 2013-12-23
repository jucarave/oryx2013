function Instructions(){
	this.img = game.sprites.keyboard;
}

Instructions.prototype.step = function(game){
	if (game.keyP[27] == 1){
		game.scene = new MainScreen();
		game.keyP[27] = 2;
	}
};

Instructions.prototype.draw = function(game){
	var ctx = game.eng.ctx;
	
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0,0,ctx.width, ctx.height);
	ctx.drawImage(this.img, 100, 48);
	
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.textAlign = "center";
	ctx.fillText(msg.inst, ctx.width / 2, 30);
	
	ctx.textAlign = "left";
	ctx.fillText(msg.instQ, 16, 250);
	ctx.fillText(msg.instW, 16, 270);
	ctx.fillText(msg.instE, 16, 290);
	ctx.fillText(msg.instR, 16, 310);
	ctx.fillText(msg.instT, 16, 330);
	ctx.fillText(msg.instA, 16, 350);
	ctx.fillText(msg.instD, 16, 370);
	ctx.fillText(msg.instI, 16, 390);
	ctx.fillText(msg.instU, 16, 410);
	ctx.fillText(msg.instM, 16, 430);
	ctx.fillText(msg.instSB, 16, 450);
	ctx.fillText(msg.instInt, 16, 470);
	ctx.fillText(msg.instArr, 16, 490);
	
	ctx.textAlign = "center";
	ctx.fillText(msg.instEsc, ctx.width / 2, 520);
};

Instructions.prototype.loop = function(game){
	this.step(game);
	this.draw(game);
};

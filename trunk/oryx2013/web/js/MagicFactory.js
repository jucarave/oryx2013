var MagicFactory = {
	fireball: function(){
		if (game.map.key == "town"){
			Console.addMessage("This spell can't be cast in the town", "rgb(255,255,255)");
			return false;
		}
		
		if (PlayerStats.mana < 5){
			Console.addMessage("You have not enough mana", "rgb(255,255,0)");
			return false;
		}
		
		Console.addMessage("Cast fireball!", "rgb(255,201,14)");
		PlayerStats.mana -= 5;
			
		var tile = Tileset.effects.magic.getColor(255,201,14);
		var player = game.map.player;
		
		var ball = new PowerEffect(tile, new Position(player.position.x + 1, player.position.y), new Position(1, 0));
		ball.mapManager = player.mapManager;
		ball.repaint = false;
		player.mapManager.animateInstances.push(ball);
		
		var ball = new PowerEffect(tile, new Position(player.position.x, player.position.y + 1), new Position(0, 1));
		ball.mapManager = player.mapManager;
		ball.repaint = false;
		player.mapManager.animateInstances.push(ball);
		
		var ball = new PowerEffect(tile, new Position(player.position.x - 1, player.position.y), new Position(-1, 0));
		ball.mapManager = player.mapManager;
		ball.repaint = false;
		player.mapManager.animateInstances.push(ball);
		
		var ball = new PowerEffect(tile, new Position(player.position.x, player.position.y), new Position(0, -1));
		ball.mapManager = player.mapManager;
		player.mapManager.animateInstances.push(ball);
	},
	
	bersek: function(){
		if (game.map.key == "town"){
			Console.addMessage("This spell can't be cast in the town", "rgb(255,255,255)");
			return false;
		}
		
		if (PlayerStats.mana < 8){
			Console.addMessage("You have not enough mana", "rgb(255,255,0)");
			return false;
		}
		
		Console.addMessage("Bersek! str+20 during 20 turns", "rgb(255,0,0)");
		PlayerStats.mana -= 8;
		PlayerStats.bersekT = 20;
	},
	
	portal: function(){
		
	},
	
	sleep: function(){
		
	},
	
	display: function(){
		if (PlayerStats.mana < 12){
			Console.addMessage("You have not enough mana", "rgb(255,255,0)");
			return false;
		}
		
		Console.addMessage("Watch the enemies location in this level", "rgb(255,255,255)");
		PlayerStats.mana -= 12;
		PlayerStats.displayEnemies = true;
		game.map.player.act();
	},
	
	blink: function(){
		
	},
	
	life: function(){
		if (PlayerStats.mana < 20){
			Console.addMessage("You have not enough mana", "rgb(255,255,0)");
			return false;
		}
		
		Console.addMessage("You recover 60 health points", "rgb(255,0,0)");
		PlayerStats.mana -= 20;
		PlayerStats.health = Math.min(PlayerStats.health + 60, PlayerStats.mHealth);
	}
};

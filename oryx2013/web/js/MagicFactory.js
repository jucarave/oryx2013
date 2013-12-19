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
		if (game.map.key == "town"){
			Console.addMessage("This spell can't be cast in the town", "rgb(255,255,255)");
			return false;
		}
		
		if (PlayerStats.mana < 35){
			Console.addMessage("You have not enough mana", "rgb(255,255,0)");
			return false;
		}
		
		Console.addMessage("You opened a portal to the town", "rgb(255,0,0)");
		PlayerStats.mana -= 35;
		PlayerStats.portal = {
			pos: game.map.player.position.clone(),
			townPos: new Position(18, 10),
			map: game.map
		};
		game.map.player.act();
	},
	
	sleep: function(){
		if (PlayerStats.mana < 10){
			Console.addMessage("You have not enough mana", "rgb(255,255,0)");
			return false;
		}
		
		Console.addMessage("Cast a sleep spell on the nearby enemies", "rgb(75,N150,163)");
		PlayerStats.mana -= 10;
		PlayerStats.sleepSp = true;
		game.map.player.act();
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
	
	blink: function(xTo, yTo){
		if (xTo || yTo){
			Console.addMessage("Blink executed", "rgb(255,255,255)");
			PlayerStats.mana -= 15;
			PlayerStats.blinking = false;
			
			var pos = game.map.player.position.clone();
			for (var i=0;i<5;i++){
				pos.sum(xTo, yTo);
				if (game.map.isSolid(pos, true)){
					pos.sum(-xTo, -yTo);
					break;
				}
			} 
			
			game.map.player.position = pos;
			game.map.player.act();
		}else{
			if (PlayerStats.mana < 15){
				Console.addMessage("You have not enough mana", "rgb(255,255,0)");
				return false;
			}
			
			Console.addMessage("Blink where? ", "rgb(255,255,255)");
			PlayerStats.blinking = true;
			game.map.player.act();
		}
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

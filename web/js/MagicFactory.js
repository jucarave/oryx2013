var MagicFactory = {
	fireball: function(){
		if (game.map.key == "town"){
			Console.addMessage(msg.spellFor, "rgb(255,255,255)");
			return false;
		}
		
		if (PlayerStats.mana < 5){
			Console.addMessage(msg.noMana, "rgb(255,255,0)");
			return false;
		}
		
		Console.addMessage(msg.castFireball, "rgb(255,201,14)");
		PlayerStats.mana -= 5;
		
		game.sounds.fireball.stopAndPlay();
			
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
			Console.addMessage(msg.spellFor, "rgb(255,255,255)");
			return false;
		}
		
		if (PlayerStats.mana < 8){
			Console.addMessage(msg.noMana, "rgb(255,255,0)");
			return false;
		}
		
		game.sounds.bersek.stopAndPlay();
		Console.addMessage(msg.castBerserk, "rgb(255,0,0)");
		PlayerStats.mana -= 8;
		PlayerStats.bersekT = 50;
	},
	
	portal: function(){
		if (game.map.key == "town"){
			Console.addMessage(msg.spellFor, "rgb(255,255,255)");
			return false;
		}
		
		if (PlayerStats.mana < 35){
			Console.addMessage(msg.noMana, "rgb(255,255,0)");
			return false;
		}
		
		Console.addMessage(msg.castPortal, "rgb(255,0,0)");
		game.sounds.portal.stopAndPlay();
		PlayerStats.mana -= 35;
		PlayerStats.portal = {
			pos: game.map.player.position.clone(),
			townPos: new Position(18, 10),
			map: game.map
		};
		game.map.player.act();
	},
	
	sleep: function(){
		if (game.map.key == "town"){
			Console.addMessage(msg.spellFor, "rgb(255,255,255)");
			return false;
		}
		
		if (PlayerStats.mana < 10){
			Console.addMessage(msg.noMana, "rgb(255,255,0)");
			return false;
		}
		
		Console.addMessage(msg.castSleep, "rgb(75,150,163)");
		game.sounds.sleep.stopAndPlay();
		PlayerStats.mana -= 10;
		PlayerStats.sleepSp = true;
		game.map.player.act();
	},
	
	display: function(){
		if (game.map.key == "town"){
			Console.addMessage(msg.spellFor, "rgb(255,255,255)");
			return false;
		}
		
		if (PlayerStats.mana < 12){
			Console.addMessage(msg.noMana, "rgb(255,255,0)");
			return false;
		}
		
		Console.addMessage(msg.castDisplay, "rgb(255,255,255)");
		game.sounds.display.stopAndPlay();
		PlayerStats.mana -= 12;
		PlayerStats.displayEnemies = true;
		game.map.player.act();
	},
	
	blink: function(xTo, yTo){
		if (xTo || yTo){
			Console.addMessage(msg.castBlink, "rgb(255,255,255)");
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
			
			game.sounds.blink.stopAndPlay();
			game.map.player.position = pos;
			game.map.player.act();
		}else{
			if (PlayerStats.mana < 15){
				Console.addMessage(msg.noMana, "rgb(255,255,0)");
				return false;
			}
			
			Console.addMessage(msg.blinkWhere, "rgb(255,255,255)");
			PlayerStats.blinking = true;
			game.map.player.act();
		}
	},
	
	life: function(){
		if (PlayerStats.mana < 20){
			Console.addMessage(msg.noMana, "rgb(255,255,0)");
			return false;
		}
		
		game.sounds.life.stopAndPlay();
		Console.addMessage(msg.castLife, "rgb(255,0,0)");
		PlayerStats.mana -= 20;
		PlayerStats.health = Math.min(PlayerStats.health + 60, PlayerStats.mHealth);
	}
};

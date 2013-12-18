var EffectFactory = {
	mapOrb: {
		desc: "Reveals all the map in the current location",
		used: true,
		cast: function(){
			if (game.map.key != "town"){
				game.map.reveal = true;
				game.map.player.act();
				Console.addMessage("You orb reveals the map", "rgb(255,255,255)");
				return true;
			}else{
				Console.addMessage("This item can't be used in the town", "rgb(255,255,255)");
				return false;
			}
		}
	},
	
	shovel: {
		desc: "Opens a hole in the current position to the next level",
		used: true,
		cast: function(){
			if (game.map.key != "town"){
				var stairs = game.map.createStairs(Tileset.misc.hole, game.map.player.position.clone(), "D");
				stairs.isHole = true;
				game.map.player.act();
				return true;
			}else{
				Console.addMessage("This item can't be used in the town", "rgb(255,255,255)");
				return false;
			}
		}
	},
	
	time: {
		desc: "Slows the food consumption from 10 to 50 steps, during 200 steps",
		used: true,
		cast: function(){
			if (game.map.key != "town"){
				Console.addMessage("You feel like you can resist more time without food.");
				PlayerStats.slowerT = 200;
				return true;
			}else{
				Console.addMessage("This item can't be used in the town", "rgb(255,255,255)");
				return false;
			}
		}
	},
	
	hpPotionS: {
		desc: "Restores 20 health points",
		used: false,
		cast: function(){
			PlayerStats.health = Math.min(PlayerStats.health + 20, PlayerStats.mHealth);
			Console.addMessage("You recover 20 health points", "rgb(255,255,255)");
			this.used = true;
			EffectFactory.hpPotionL.used = true;
			return true;
		}
	},
	
	hpPotionL: {
		desc: "Restores 60 health points",
		used: false,
		cast: function(){
			PlayerStats.health = Math.min(PlayerStats.health + 60, PlayerStats.mHealth);
			Console.addMessage("You recover 60 health points", "rgb(255,255,255)");
			this.used = true;
			EffectFactory.hpPotionS.used = true;
			return true;
		}
	},
	
	poisonS: {
		desc: "Damage 1 health point for each step",
		used: false,
		cast: function(){
			PlayerStats.poison = 1;
			Console.addMessage("You got poisoned!", "rgb(255,0,0)");
			this.used = true;
			EffectFactory.poisonL.used = true;
			return true;
		}
	},
	
	poisonL: {
		desc: "Damage 3 health points for each step",
		used: false,
		cast: function(){
			PlayerStats.poison = 3;
			Console.addMessage("You got poisoned!", "rgb(255,0,0)");
			this.used = true;
			EffectFactory.poisonS.used = true;
			return true;
		}
	},
	
	antidoteS: {
		desc: "Cures the poison",
		used: false,
		cast: function(){
			if (PlayerStats.poison > 0){
				Console.addMessage("You cure the poison!", "rgb(255,255,0)");
			}else{
				Console.addMessage("This can be used to cure the poison", "rgb(255,255,0)");
			}
			PlayerStats.poison = 0;
			this.used = true;
			EffectFactory.antidoteL.used = true;
			return true;
		}
	},
	
	antidoteL: {
		desc: "Cures the poison and restore 30 health points",
		used: false,
		cast: function(){
			if (PlayerStats.poison > 0){
				Console.addMessage("You cure the poison and restore 30 health points!", "rgb(255,255,0)");
			}else{
				Console.addMessage("This can be used to cure the poison and restore 30 hp", "rgb(255,255,0)");
			}
			PlayerStats.poison = 0;
			PlayerStats.health = Math.min(PlayerStats.health + 30, PlayerStats.mHealth);
			this.used = true;
			EffectFactory.antidoteS.used = true;
			return true;
		}
	},
	
	attributeS: {
		desc: "Upgrade a random attribute by 3 points max",
		used: false,
		cast: function(){
			var ps = PlayerStats;
			var attrs = ["str", "def", "spd", "luk"];
			var i = Math.iRandom(attrs.length - 1);
			var upgrade = Math.iRandom(1,3);
			
			ps[attrs[i]] += upgrade;
			Console.addMessage(attrs[i] + " + " + upgrade, "rgb(255,255,0)");
			EffectFactory.attributeL.used = true;
			return true;
		}
	},
	
	attributeL: {
		desc: "Upgrade a random attribute by 3-7 points max",
		used: false,
		cast: function(){
			var ps = PlayerStats;
			var attrs = ["str", "def", "spd", "luk"];
			var i = Math.iRandom(attrs.length - 1);
			var upgrade = Math.iRandom(3, 7);
			
			ps[attrs[i]] += upgrade;
			Console.addMessage(attrs[i] + " + " + upgrade, "rgb(255,255,0)");
			EffectFactory.attributeS.used = true;
			return true;
		}
	}
};

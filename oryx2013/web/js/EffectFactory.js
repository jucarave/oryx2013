var EffectFactory = {
	mapOrb: {
		desc: "Reveals all the map in the current location",
		used: true,
		cast: function(){
			
		}
	},
	
	shovel: {
		desc: "Opens a hole in the current position to the next level",
		used: true,
		cast: function(){
			
		}
	},
	
	time: {
		desc: "Slows the food consumption from 10 to 50 steps, during 200 steps",
		used: true,
		cast: function(){
			
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
		}
	},
	
	antidoteS: {
		desc: "Eliminates the poison",
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
		}
	},
	
	antidoteL: {
		desc: "Eliminates the poison and restore 30 health points",
		used: false,
		cast: function(){
			if (PlayerStats.poison > 0){
				Console.addMessage("You cure the poison and restore 30 health points!", "rgb(255,255,0)");
			}else{
				Console.addMessage("This can be used to cure the poison and restore 30 health points", "rgb(255,255,0)");
			}
			PlayerStats.poison = 0;
			PlayerStats.health = Math.min(PlayerStats.health + 30, PlayerStats.mHealth);
			this.used = true;
			EffectFactory.antidoteS.used = true;
		}
	},
	
	attributeS: {
		desc: "Upgrade a random attribute by 3 points max",
		used: false,
		cast: function(){
			var ps = PlayerStats;
			var attrs = ["str", "def", "spd", "luk"];
			var i = Math.iRandom(attrs.length - 1);
			var upgrade = Math.iRandom(3);
			
			ps[attrs[i]] += upgrade;
			Console.addMessage(attrs[i] + " + " + upgrade, "rgb(255,255,0)");
			EffectFactory.attributeL.used = true;
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
		}
	}
};

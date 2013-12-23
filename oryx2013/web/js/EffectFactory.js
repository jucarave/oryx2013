var EffectFactory = {
	mapOrb: {
		desc: msg.orbDesc,
		used: true,
		cast: function(){
			if (game.map.key != "town"){
				game.map.reveal = true;
				game.map.player.act();
				game.sounds.life.stopAndPlay();
				Console.addMessage(msg.orbUses, "rgb(255,255,255)");
				return true;
			}else{
				Console.addMessage(msg.townFor, "rgb(255,255,255)");
				return false;
			}
		}
	},
	
	shovel: {
		desc: msg.shovelDesc,
		used: true,
		cast: function(){
			if (game.map.key != "town"){
				if (game.map.level == 20){
					Console.addMessage(msg.shovel20, "rgb(255,0,0)");
					return;
				}
				
				var stairs = game.map.createStairs(Tileset.misc.hole, game.map.player.position.clone(), "D");
				stairs.isHole = true;
				game.map.player.act();
				game.sounds.life.stopAndPlay();
				return true;
			}else{
				Console.addMessage(msg.townFor, "rgb(255,255,255)");
				return false;
			}
		}
	},
	
	time: {
		desc: msg.foodDesc,
		used: true,
		cast: function(){
			if (game.map.key != "town"){
				Console.addMessage(msg.foodUses);
				PlayerStats.slowerT = 200;
				game.sounds.life.stopAndPlay();
				return true;
			}else{
				Console.addMessage(msg.townFor, "rgb(255,255,255)");
				return false;
			}
		}
	},
	
	hpPotionS: {
		desc: msg.hpDesc,
		used: false,
		cast: function(){
			PlayerStats.health = Math.min(PlayerStats.health + 20, PlayerStats.mHealth);
			Console.addMessage(msg.hpUses, "rgb(255,255,255)");
			this.used = true;
			EffectFactory.hpPotionL.used = true;
			game.sounds.life.stopAndPlay();
			return true;
		}
	},
	
	hpPotionL: {
		desc: msg.hpLDesc,
		used: false,
		cast: function(){
			PlayerStats.health = Math.min(PlayerStats.health + 60, PlayerStats.mHealth);
			Console.addMessage(msg.hplUses, "rgb(255,255,255)");
			this.used = true;
			EffectFactory.hpPotionS.used = true;
			game.sounds.life.stopAndPlay();
			return true;
		}
	},
	
	poisonS: {
		desc: msg.poisonDesc,
		used: false,
		cast: function(){
			PlayerStats.poison = 1;
			Console.addMessage(msg.poisonUses, "rgb(255,0,0)");
			this.used = true;
			EffectFactory.poisonL.used = true;
			game.sounds.life.stopAndPlay();
			return true;
		}
	},
	
	poisonL: {
		desc: msg.poisonLDesc,
		used: false,
		cast: function(){
			PlayerStats.poison = 3;
			Console.addMessage(msg.poisonUses, "rgb(255,0,0)");
			this.used = true;
			EffectFactory.poisonS.used = true;
			game.sounds.life.stopAndPlay();
			return true;
		}
	},
	
	antidoteS: {
		desc: msg.antDesc,
		used: false,
		cast: function(){
			if (PlayerStats.poison > 0){
				Console.addMessage(msg.antUses, "rgb(255,255,0)");
			}else{
				Console.addMessage(msg.antUses2, "rgb(255,255,0)");
			}
			PlayerStats.poison = 0;
			this.used = true;
			game.sounds.life.stopAndPlay();
			EffectFactory.antidoteL.used = true;
			return true;
		}
	},
	
	antidoteL: {
		desc: msg.antLDesc,
		used: false,
		cast: function(){
			if (PlayerStats.poison > 0){
				Console.addMessage(msg.antLUses, "rgb(255,255,0)");
			}else{
				Console.addMessage(msg.antLUses2, "rgb(255,255,0)");
			}
			PlayerStats.poison = 0;
			PlayerStats.health = Math.min(PlayerStats.health + 30, PlayerStats.mHealth);
			this.used = true;
			EffectFactory.antidoteS.used = true;
			game.sounds.life.stopAndPlay();
			return true;
		}
	},
	
	attributeS: {
		desc: msg.attrDesc,
		used: false,
		cast: function(){
			var ps = PlayerStats;
			var attrs = ["str", "def", "spd", "luk"];
			var i = Math.iRandom(attrs.length - 1);
			var upgrade = Math.iRandom(1,3);
			
			ps[attrs[i]] += upgrade;
			Console.addMessage(attrs[i] + " + " + upgrade, "rgb(255,255,0)");
			EffectFactory.attributeL.used = true;
			game.sounds.life.stopAndPlay();
			return true;
		}
	},
	
	attributeL: {
		desc: msg.attrLDesc,
		used: false,
		cast: function(){
			var ps = PlayerStats;
			var attrs = ["str", "def", "spd", "luk"];
			var i = Math.iRandom(attrs.length - 1);
			var upgrade = Math.iRandom(3, 7);
			
			ps[attrs[i]] += upgrade;
			Console.addMessage(attrs[i] + " + " + upgrade, "rgb(255,255,0)");
			EffectFactory.attributeS.used = true;
			game.sounds.life.stopAndPlay();
			return true;
		}
	}
};

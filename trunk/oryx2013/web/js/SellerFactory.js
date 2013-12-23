var SellerFactory = {
	weapons: {
		greet: msg.weaponSeller,
		store: [
			"knife",
			"dagger",
			"sword",
			"battleAxe",
			"quarterStaff",
			"bow",
			"heavySword",
			"gemStaff",
			"longBow",
			"heavyAxe",
			"greatSword",
			"crossBow"
		]
	},
	
	food: {
		greet: msg.foodSeller,
		store: [
			"pack10",
			"pack20",
			"pack50",
			"pack100",
			"pack300",
			"pack500",
		]
	},
	
	armour: {
		greet: msg.armourSeller,
		store: [
			"leatherArmour",
			"robe",
			"plateArmour",
			"mailArmour",
			"scaleArmour",
			"reflectArmour"
		]
	},
	
	hotel: {
		greet: msg.hotelSeller,
		store: ["hotel"]
	},
	
	magic: {
		greet: msg.spellSeller,
		store: [
			"fireball",
			"bersek",
			"portal",
			"sleep",
			"display",
			"blink",
			"life",
		]
	}
};

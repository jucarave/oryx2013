<script type="text/javascript">
	var msg = {};
	
	msg.newAdventure = "a) To start a new adventure";
	msg.instructions = "b) To see the instructions";
	msg.language = "c) Para cambiar a español";
	msg.exitGame = "d) To exit the game";
	msg.info1 = "TULL, Developed by Camilo Ramírez (Jucarave) 2013";
	msg.info2 = "For the trials of oryx 2013";
	
	msg.characterCreation = "Character generation";
	msg.enterName = "ENTER YOUR NAME: ";
	msg.enterName2 = "(LETTERS AND SPACES ONLY, 12 CHARACTERS MAX)";
	msg.enterName3 = "PRESS ENTER WHEN FINISHED OR ESC TO RETURN TO THE MAIN MENU";
	
	msg.yourName = "      YOUR NAME: ";
	msg.remainPoints = "REMAIN SKILL POINTS: ";
	msg.ccStrength = "STRENGTH.............................";
	msg.ccDefense = "DEFENSE..............................";
	msg.ccSpeed = "SPEED................................";
	msg.ccLuck = "LUCK.................................";
	msg.upDownNav = "PRESS UP/DOWN ARROW KEYS TO NAVIGATE THROUGH THE OPTIONS";
	msg.rightLeftNav = "PRESS RIGHT/LEFT ARROW KEYS TO ADD/REMOVE POINTS";
	msg.skillsEnter = "PRESS ENTER WHEN YOU ARE READY OR ESC TO RETURN.";
	
	msg.skillPoints = "       SKILL POINTS:  ";
	msg.fighter = "FIGHTER";
	msg.archer = "ARCHER";
	msg.wizard = "WIZARD";
	msg.classesNav = "PRESS THE RIGHT/LEFT KEYS TO NAVIGATE THROUGH THE CLASSES";
	msg.classesEnt = "PRESS ENTER WHEN YOU ARE READY OR ESC TO RETURN.";
	msg.correctChar = "IS THIS CHARACTER CORRECT? Y / N";
	
	msg.story1 = "In the depths of a corner of the world, ancient forgotten\nruins are buried.  It's been one thousand years since the\nrealm  of Ias Lord of the darkness fell, and  everyone on\nearth forgot about the pain and suffering he caused.\n\nBut along all these centuries Ias has been on his chamber,\ngrowing in  strength  and hatred,  reuniting an  army and\nwaiting for the perfect time  to rise into the world once\nagain.";
	msg.story2 = "A recent exploration has connected an human graveyard with\nthe ruins of Ias...  the worst then took place: legions of\nmonsters are crawling  to the surface obeying their master.\nThe town of Tull is now threaten by the return of Ias, and\nthe king  has called out for all warriors to get  into the\ndungeon and destroy Ias and his minions.\n\nYou came from far away lands after hearing the rumor of the\nreturn of an ancient demon, and decided to help to the town\nof Tull.";
	msg.storeContinue = "[Press Enter to continue]";
	
	msg.pass = "Pass";
	msg.north = "North";
	msg.south = "South";
	msg.west = "West";
	msg.east = "East";
	
	msg.berserkOver = "Berserk effect is over";
	msg.portalLeads = "This portal leads to ";
	msg.portalTown = "This portal leads to the town";
	
	msg.playerHurt = " > The X hit Y points to you";
	msg.armourDmg = "Your armour got damaged!";
	msg.nothingThere = "There is nothing in there";
	msg.missed = "Missed!";
	msg.noWeapon = "You have no weapon";
	msg.weaponDmg = "The weapon is damaged!";
	msg.attackWhere = "Attack where? ";
	msg.newLevel = "New level: ";
	
	msg.blinkCanceled = "Blink canceled!";
	
	msg.carryWeapon = "You can't carry more weapons!";
	msg.carryArmour = "You can't carry more armours!";
	msg.carryItems  = "You can't carry more items!";
	
	msg.pick = "You pick ";
	msg.pickup = "You pick up a(n) ";
	
	msg.enterDun = "You enter the dungeon!";
	msg.enterTown = "You enter the town!";
	msg.useStairs = "You DD to level ";
	msg.ascend = "ascend";
	msg.descend = "descend";
	msg.ascendVerb = "ascend";
	msg.descendVerb = "descend";
	
	msg.dropped = "You dropped a(n) ";
	msg.unknow = "Unknow effect";
	
	msg.afford = "You can't afford it.";
	msg.room = "The room is ready, rest well.";
	msg.hNiceDay = "Have a nice day then.";
	msg.optionsBuy = "Select the option of the item you want to buy.";
	msg.buyQuestion = "Do you want to buy the ";
	msg.moreWeapons = "You can't carry more weapons";
	msg.weaponReserved = "This weapon is reserved only for ";
	msg.bought = "You bought a(n) ";
	msg.moreArmour = "You can't carry more armours";
	msg.moreFood = "You can't carry more food";
	msg.spellOwn = "You already have this spell";
	msg.buySpell = "You bought the X spell";
	msg.whatToBuy = "So, what do you want to buy?";
	msg.niceDay = "Have a nice day";
	
	msg.hitTo = "You hit D points to the ";
	msg.earnExp = "> You earn X points of experience";
	msg.killedTo = ". You killed the ";
	msg.killedIas = "You killed Ias";
	msg.iasDmg = "You hit D points to Ias";
	msg.findIas = "You find Ias";
	msg.sawTo = "You saw a ";
	
	msg.townFor = "This item can't be used in the town";
	msg.orbDesc = "Reveals all the map in the current location";
	msg.orbUses = "You orb reveals the map";
	msg.shovelDesc = "Opens a hole in the current position to the next level";
	msg.shovel20 = "Can't be used in this level!";
	msg.foodDesc = "Slows the food consumption from 10 to 50 steps, during 200 steps";
	msg.foodUses = "You feel stronger";
	msg.hpDesc = "Restores 20 health points";
	msg.hpUses = "You recover 20 health points";
	msg.hpLDesc = "Restores 60 health points";
	msg.hplUses = "You recover 60 health points";
	msg.poisonDesc = "Damage 1 health point for each step";
	msg.poisonUses = "You got poisoned!";
	msg.poisonLDesc = "Damage 3 health points for each step";
	msg.antDesc = "Cures the poison";
	msg.antUses = "You cure the poison!";
	msg.antUses2 = "This can be used to cure the poison";
	msg.antLDesc = "Cures the poison and restore 30 health points";
	msg.antLUses = "You cure the poison and restore 30 health points!";
	msg.antLUses2 = "This can be used to cure the poison and restore 30 hp";
	msg.attrDesc = "Upgrade a random attribute by 3 points max";
	msg.attrLDesc = "Upgrade a random attribute by 3-7 points max";
	
	msg.stepped = "You stepped into a(n) ";
	
	msg.spellFor = "This spell can't be cast in the town";
	msg.noMana = "You have not enough mana";
	msg.castFireball = "Cast fireball!";
	msg.castBerserk = "Berserk! str+20 during 50 turns";
	msg.castPortal = "You opened a portal to the town";
	msg.castSleep = "Cast a sleep spell on the nearby enemies";
	msg.castDisplay = "Watch the enemies location in this level";
	msg.castBlink = "Blink executed";
	msg.blinkWhere = "Blink where? ";
	msg.castLife = "You recover 60 health points";
	
	msg.hole = "You stepped on a hole, you can pass throught";
	msg.dungeonEntry = "You stepped into the dungeon entry";
	msg.stepStairs = "You stepped into a(n) D stairs ";
	
	msg.death1 = "As you went through your adventure you";
	msg.death2 = "starved to death in the middle of the town";
	msg.death3 = "manage to advance to the level ";
	msg.death4 = "but you starved to death";
	msg.death5 = "died of a poisoned injury in the middle of the town";
	msg.death6 = "manage to advance to the level ";
	msg.death7 = "but you died of a poisoned injury";
	msg.death8 = "were slayed by Ias.";
	msg.death9 = "were slayed by a(n) X on the level ";
	msg.death10 = "of the dungeon ";
	msg.reset = "Press [Enter] key to return to the main screen";
	
	msg.ending = "In your fight with evil Ias, you finally give end to his life\ngranting peace not only to Tull but to earth itself. However,\nyou decide  not to return with the king to report  your feat,\ninstead you abandon  the town before anyone  notices you and\ncontinue your journey through the desert. This is not the end\nof your journey but it will be the last time the town of Tull\nor any other hears about you.";
	
	msg.inst = "Ingame instructions";
	msg.instQ = "Q: Open the weapons menu";
	msg.instW = "W: Open the armour menu";
	msg.instE = "E: Open the Items menu";
	msg.instR = "R: Open the magic menu";
	msg.instT = "T: Transact with the vendors";
	msg.instA = "A: Attack";
	msg.instD = "D: Drops a weapon or an armour";
	msg.instI = "I: Gets info about an item";
	msg.instU = "U: Use the current item";
	msg.instM = "M: Use the current magic spell";
	msg.instSB = "Space Bar: Pass the turn";
	msg.instInt = "Enter: Accept / Choose / Pickup / Enter";
	msg.instArr = "Arrow Keys: Movement";
	msg.instEsc = "Press Escape to return";
	
	msg.e = {};
	
	msg.e.krab = "krab";
	msg.e.spider = "spider";
	msg.e.rat = "rat";
	msg.e.bat = "bat";
	msg.e.beetle = "beetle";
	msg.e.centipede = "centipede";
	msg.e.crow = "crow";
	msg.e.mantis = "mantis";
	msg.e.viper = "viper";
	msg.e.wasp = "wasp";
	msg.e.bear = "bear";
	msg.e.thief = "thief";
	msg.e.fairy = "fairy";
	msg.e.humanRat = "human rat";
	msg.e.spectre = "spectre";
	msg.e.skeleton = "skeleton";
	msg.e.skeletonWarrior = "skeleton warrior";
	msg.e.littleDemon = "imp";
	msg.e.gelatinousCube = "gelatinous cube";
	msg.e.spore = "spore";
	msg.e.centaur = "centaur";
	msg.e.warriorBear = "warrior bear";
	msg.e.ghost = "ghost";
	msg.e.lizardmen = "lizard man";
	msg.e.giantSpider = "giant spider";
	msg.e.bigSpore = "big spore";
	msg.e.humanRatMace = "human rat warrior";
	msg.e.warriorThief = "warrior thief";
	msg.e.lycanthrope = "lycanthrope";
	msg.e.worm = "worm";
	msg.e.skeletonMaster = "skeleton master";
	msg.e.demon = "demon";
	msg.e.superiorGhost = "superior ghost";
	msg.e.warrior = "warrior";
	msg.e.warriorFairy = "warrior fairy";
	msg.e.lizardmenArcher = "lizardman archer";
	msg.e.spectreWizard = "spectre wizard";
	msg.e.centaurArcher = "centaur archer";
	msg.e.superiorBear = "superior bear";
	msg.e.ent = "ent";
	msg.e.mudMonster = "mud monster";
	msg.e.slimeMonster = "slime monster";
	msg.e.efreet = "efreet";
	msg.e.kingCobra = "king cobra";
	msg.e.kingHumanRat = "king human rat";
	msg.e.demonWarrior = "demon warrior";
	msg.e.mummy = "mummy";
	msg.e.echidna = "echidna";
	msg.e.kingBear = "king bear";
	msg.e.shadowWarrior = "shadow warrior";
	msg.e.superiorSpectre = "superior spectre";
	msg.e.scorpion = "scorpion";
	msg.e.lycanthrope = "lycanthrope";
	msg.e.skeletonArcher = "skeleton archer";
	msg.e.golem = "golem";
	msg.e.beholder = "beholder";
	msg.e.cyclops = "cyclops";
	msg.e.minotaur = "minotaur";
	msg.e.masterGhost = "master ghost";
	msg.e.superiorMummy = "superior mummy";
	msg.e.demonArcher = "demon archer";
	msg.e.entGolem = "ent golem";
	msg.e.superiorBeholder = "superior beholder";
	msg.e.GolemRat = "golem rat";
	msg.e.dragon = "dragon";
	msg.e.efreetWarrior = "efreet warrior";
	msg.e.shadowWizard = "shadow wizard";
	msg.e.centaurWarrior = "centaur warrior";
	msg.e.masterDemon = "master demon";
	msg.e.echidnaArcher = "echidna archer";
	msg.e.fenix = "fenix";
	msg.e.superiorCyclops = "superior cyclops";
	msg.e.masterBeholder = "master beholder";
	msg.e.ghostDragon = "ghost dragon";
	msg.e.marid = "marid";
	msg.e.yonatan = "yonatan";
	msg.e.flameSkelleton = "flame skelleton";
	msg.e.incubus = "incubus";
	msg.e.medusa = "medusa";
	msg.e.Ias = "Ias";
	
	msg.weaponSeller = "Enter into the doom with the best weapons you can afford.";
	msg.foodSeller = "You cannot get into the dungeon without food";
	msg.armourSeller = "We have the best protection you can find";
	msg.hotelSeller = "Do you want to spend the night here for 25? Y/N";
	msg.spellSeller = "A good magic spell can save your life.";
	
	msg.currency = " gold coins";
	
	msg.i = {};
	
	msg.i.sword = "sword";
	msg.i.heavySword = "heavy sword";
	msg.i.greatSword = "great sword";
	msg.i.knife = "knife";
	msg.i.dagger = "dagger";
	msg.i.quarterStaff = "quarter staff";
	msg.i.gemStaff = "gem staff";
	msg.i.battleAxe = "battle axe";
	msg.i.heavyAxe = "heavy axe";
	msg.i.bow = "bow";
	msg.i.longBow = "long bow";
	msg.i.crossBow = "crossbow";
	msg.i.cottomCloth = "cottom cloth";
	msg.i.leatherArmour = "leather armour";
	msg.i.robe = "robe";
	msg.i.plateArmour = "plate armour";
	msg.i.mailArmour = "mail armour";
	msg.i.scaleArmour = "scale armour";
	msg.i.reflectArmour = "reflect armour";
	msg.i.unknowSmallPotion = "small potion";
	msg.i.redSmallPotion = "red small potion";
	msg.i.blueSmallPotion = "blue small potion";
	msg.i.purpleSmallPotion = "purple small potion";
	msg.i.greenSmallPotion = "green small potion";
	msg.i.unknowLargePotion = "large potion";
	msg.i.redLargePotion = "red large potion";
	msg.i.blueLargePotion = "blue large potion";
	msg.i.purpleLargePotion = "purple large potion";
	msg.i.greenLargePotion = "green large potion";
	msg.i.shovel = "shovel";
	msg.i.mapDiscoverer = "map discoverer";
	msg.i.timeSlower = "time slower";
	msg.i.pack10 = "pack of 20 rations";
	msg.i.pack20 = "pack of 50 rations";
	msg.i.pack50 = "pack of 100 rations";
	msg.i.pack100 = "pack of 200 rations";
	msg.i.pack300 = "pack of 600 rations";
	msg.i.pack500 = "pack of 1000 rations";
	msg.i.fireball = "fireball";
	msg.i.bersek = "berserk";
	msg.i.portal = "portal";
	msg.i.sleep = "sleep";
	msg.i.display = "display";
	msg.i.blink = "blink";
	msg.i.life = "life";
	
	msg.level1 = "Tull Graveyard";
	msg.level2 = "Dolvor Dungeon";
	msg.level3 = "Elemental Pain";
	msg.level4 = "Ias Chamber";
	
	msg.enPoison = "the X poisoned you!";
	msg.enSteal = "the X steals you Y gold coins!";
</script>
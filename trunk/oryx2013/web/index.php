<?php require("php/conf.php"); ?>
<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-type" content="text/html; charset=UTF-8" />
		<title>Oryx roguelike 2013</title>

		<script type="text/javascript" src="<?php echo $contextPath; ?>js/Engine.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/Utils.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/Game.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/Character.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/Position.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/Tiles.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/HeroClasses.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/Player.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/Map.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/FOV.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/Item.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/Console.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/EffectFactory.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/MagicFactory.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/ItemFactory.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/MainScreen.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/DeathScreen.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/Stairs.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/RDG.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/Enemy.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/EnemyFactory.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/Seller.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/SellerFactory.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/CharacterCreation.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/PowerEffect.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/PathFinder.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript">
			var cp = "<?php echo $contextPath; ?>";
			var version = "<?php echo $version; ?>";
			var exitPath ="<?php echo $exitPath; ?>";
		</script>
	</head>
	
	<body>
		<div id="divGame"></div>
	</body>
</html>
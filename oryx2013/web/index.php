<?php require("php/conf.php"); ?>
<?php require("system/visitCounter.php"); ?>
<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-type" content="text/html; charset=UTF-8" />
		<title>Tull - Jucarave 2013</title>
		
		<?php
			$lang = "en";
			if (isset($_REQUEST["lang"])){
				$lang = $_REQUEST["lang"];
			} 
			
			require("lang/" . $lang . ".php");
		?>

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
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/Instructions.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/StartScene.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/EndScene.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/Clock.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript" src="<?php echo $contextPath; ?>js/Trap.js?version=<?php echo $version; ?>"></script>
		<script type="text/javascript">
			var cp = "<?php echo $contextPath; ?>";
			var version = "<?php echo $version; ?>";
			var exitPath ="<?php echo $exitPath; ?>";
			var lang = "<?php echo $lang; ?>";
		</script>
		
		<style>
			body{ background-color: #000; color: #FFF; font-family: Courier; }
		</style>
	</head>
	
	<body>
		<div style="text-align: center;">
			<div id="divGame"></div>
			
			<div style="height: 32px;"></div>
			Tull, Developed by <a href="http://camiloramirezblog.wordpress.com/">Jucarave</a> Graphics by <a href="http://oryxdesignlab.com/">Oryx</a>
			<div>Try the <a href="http://jucarave.dx.am/tull">Trials of oryx version</a></div>
		</div>
	</body>
</html>
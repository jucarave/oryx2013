<?php
	require("conf.php");
	$connection = mysql_connect($dbHost, $dbUser, $dbPass)or die(exit("Database connection failed"));
	mysql_select_db($dbData, $connection);
	
	$query = "UPDATE jcr_visit_record SET totalVisits=totalVisits+1 WHERE pageCode='game_tull'";
	$result = mysql_query($query);
	
	if (!$result){
		error_log(mysql_error($connection));
	}
	
	mysql_close($connection);
?>
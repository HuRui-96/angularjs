<?php
	include "DBHelper.php";
	$check = "select * from user";
	$arry = query($check);
	echo '{"data":'.json_encode($arry, JSON_UNESCAPED_UNICODE).'}'
?>
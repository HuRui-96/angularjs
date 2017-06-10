<?php
	include "DBHelper.php";
	$check = "select * from vipuserlist";
	$arry = query($check);
	echo '{"data":'.json_encode($arry, JSON_UNESCAPED_UNICODE).'}'
?>
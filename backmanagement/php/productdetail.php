<?php
	include "DBHelper.php";
	$id = $_GET["index"];
	$check = "select * from product where productid = '$id'";
	$arry = query($check);
	echo json_encode($arry, JSON_UNESCAPED_UNICODE);
?>
<?php
	include "DBHelper.php";
	session_start();
	if(isset($_SESSION['username'])){
		$phone = $_SESSION['username'];
		$slect = "select * from ordergoods where username = '$phone'";
		$arry = query($slect);
		echo '{"state":true,"data":'.json_encode($arry, JSON_UNESCAPED_UNICODE).'}'; 
	}else{
		echo '{"state":false}';
	}
	
?>
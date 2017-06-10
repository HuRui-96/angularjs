<?php
	include "DBHelper.php";
	session_start();
	if(isset($_SESSION['username'])){
		$account = $_SESSION['username'];
		$check = "select * from buycar where username = '$account'";
		$arry = query($check);
		echo '{"state":true,"message":'.json_encode($arry, JSON_UNESCAPED_UNICODE).'}'; 
	}else{
		echo '{"state":false,"message":"请先登录或注册!"}';
	}
?>
<?php
	include "DBHelper.php";
	session_start();
	if(isset($_SESSION['username'])){
		$account = $_SESSION['username'];
		$check = "select * from buylist where username = '$account'";
		$res = query($check);
		echo '{"state":true,"data":' . json_encode($res, JSON_UNESCAPED_UNICODE) . '}';
	}else{
		echo '{"state":false,"message":"请先登录或注册!"}';
	}
?>
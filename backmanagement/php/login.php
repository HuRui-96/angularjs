<?php
	include "DBHelper.php";
	$laccount = $_POST["laccount"];
	$lpwd = $_POST["lpassword"];
	
	$check = "select * from user where phone = '$laccount' and password = '$lpwd'";
	
	$arry = query($check);
	
	if(count($arry)>0){
		echo '{"state":true,"message":"登录成功"}';
		session_start();
		$_SESSION['username'] = $laccount;
	}else{
		echo '{"state":false,"message":"密码错误或用户不存在"}';
	}
?>
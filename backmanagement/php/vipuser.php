<?php
	include "DBHelper.php";
	$phone = $_POST["phone"];
	$pwd = $_POST["password"];
	
	$check = "select * from vipuser where phone = '$phone' and password = '$pwd'";
	
	$arry = query($check);
	
	if(count($arry)>0){
		echo '{"state":true,"message":"登录成功"}';
		session_start();
		$_SESSION['userphone'] = $phone;
	}else{
		echo '{"state":false,"message":"密码错误或用户不存在"}';
	}
?>
<?php
	session_start();
	include "DBHelper.php";
	$phone = $_SESSION['userphone'];
	$oldpwd = $_POST["oldpwd"];
	$newpwd = $_POST["newpwd"];
	$check = "select * from vipuser where phone = '$phone' and password = '$oldpwd';";
	$sql = "update vipuser set password = '$newpwd' where phone = '$phone'";
	$arry = query($check);
	if(count($arry)>0){
		$result = excute($sql);
		
		if($result){
			echo '{"state":true,"message":"修改密码成功"}';
		}else{
			echo '{"state":false,"message":"修改密码失败"}';
		}
		
	}else{
		echo '{"state":false,"message":"用户旧密码错误"}';
	}
?>
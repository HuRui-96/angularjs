<?php
	include "DBHelper.php";
	$account = $_POST["account"];
	$newpwd = $_POST["newpwd"];
	$check = "select * from user where phone = '$account';";
	$sql = "update user set password = '$newpwd' where phone = '$account'";
	$arry = query($check);
	
	if(count($arry)>0){
		
		
		$result = excute($sql);
		
		if($result){
			echo '{"state":true,"message":"修改密码成功"}';
		}else{
			echo '{"state":false,"message":"修改密码失败"}';
		}
		
	}else{
		echo '{"state":false,"message":"用户不存在"}';
	}
?>
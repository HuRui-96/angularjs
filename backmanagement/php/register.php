<?php
	include "DBHelper.php";
	$account = $_POST["account"];
	$pwd = $_POST["password"];
	$phone = $_POST["phone"];
	
	$sql = "insert into user(password,phone,account) values('$pwd','$phone','$account');";
	$check = "select * from user where account = '$account' or phone = '$phone'";
	
	$arry = query($check);
	
	if(count($arry)>0){
		echo "{'state':false,'message':'用户已注册!'}";
		
	}else{
		$result = excute($sql);
		if($result){
			echo "{'state':true,'message':'注册成功!'}";
		}else{
			echo "{'state':false,'message':'注册失败!'}";
		}
	}
?>
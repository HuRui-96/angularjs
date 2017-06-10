<?php
	include "DBHelper.php";
	$indexid = $_POST["indexid"];
	$phone = $_POST["phone"];
	$account = $_POST["account"];
	$password = $_POST["password"];
	$sql = "update user set account = '$account',password='$password' where indexid = '$indexid'";
	$result = excute($sql);
	if($result){
		echo '{"state":true,"message":"修改成功"}';
	}else{
		echo '{"state":false,"message":"修改失败"}';
	}
?>
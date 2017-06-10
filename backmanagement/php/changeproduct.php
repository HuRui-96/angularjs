<?php
	include "DBHelper.php";
	$productid = $_POST["productid"];
	$money = $_POST["money"];
	$title = $_POST["title"];
	$src = $_POST["src"];
	$sql = "update product set money = '$money' , title = '$title' , src = '$src' where productid = '$productid'";
	$result = excute($sql);
	if($result){
		echo '{"state":true,"message":"修改成功"}';
	}else{
		echo '{"state":false,"message":"修改失败"}';
	}
?>
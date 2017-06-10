<?php
	include "DBHelper.php";
	$money = $_POST["money"];
	$title = $_POST["title"];
	$src = $_POST["src"];
	$sql = "insert into product(money,title,src) values('$money','$title','$src');";
	$result = excute($sql);
	if($result){
		echo "{'state':'true','message':'上传成功!'}";
	}else{
		echo "{'state':'false','message':'上传失败!'}";
	}
?>
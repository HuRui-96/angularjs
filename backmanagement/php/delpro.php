<?php
	include "DBHelper.php";
	$productid = $_POST["productid"];
	$delete = "delete from product where productid = '$productid'";
	$result = excute($delete);
	if($result){
		echo '{"state":true,"message":"删除成功"}';
	}else{
		echo '{"state":false,"message":"删除失败"}';
	}
?>
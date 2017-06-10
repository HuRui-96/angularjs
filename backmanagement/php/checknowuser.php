<?php
	session_start();
	include "DBHelper.php";
	if(isset($_SESSION['userphone'])){
		$phone = $_SESSION['userphone'];
		$check = "select * from vipuser where phone = '$phone'";
		$res = query($check);
		if(count($res)>0){
			echo '{"state":"true","data":'. json_encode($res, JSON_UNESCAPED_UNICODE).'}';
		}else{
			echo '{"state":"false"}';
		}
	}else{
		echo '{"state":"false"}';
	}
?>
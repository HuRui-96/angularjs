<?php
	include "DBHelper.php";		
	session_start();
	if(isset($_SESSION['username'])){
		
		$account = $_SESSION['username'];
		$check = "select * from user where phone = '$account'";
	
		$arry = query($check);
		
		if(count($arry)>0){
			echo '{"state":true,"data":' . json_encode($arry, JSON_UNESCAPED_UNICODE) .'}';
		}else{
			echo '{"state":false}';
		}
		
	}else{
		echo '{"state":false}';
	}

?>
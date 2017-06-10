<?php
	include "DBHelper.php";
	$check = "select * from product;";
	$arry = query($check);
	
	if(count($arry)>0){

		$result = excute($sql);
		echo '{"state":true,"data":' . json_encode($arry, JSON_UNESCAPED_UNICODE) .'}';
		
	}else{
		echo '{"state":false,"message":"用户不存在"}';
	}
?>
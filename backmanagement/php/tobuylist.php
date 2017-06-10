<?php
	include "DBHelper.php";
	session_start();
	if(isset($_SESSION['username'])){
		$account = $_SESSION['username'];
		$dd = $_GET["product"];
		$listnum = $_GET["listnum"];
		$payway = $_GET["payway"];
		$arry =json_decode($dd);
		$check = "select * from buycar where username = '$account' and (";
		$sqll = "delete from buycar where username = '$account' and (";
		for ($x=0; $x<count($arry); $x++) {
			if($x == 0){
				$check = $check . "productid=" . $arry[$x];
				$sqll = $sqll . "productid=" . $arry[$x];
			}else{
				$check = $check . " or productid=" . $arry[$x];
				$sqll = $sqll . " or productid=" . $arry[$x];
			}
		  	
		} 
		$check = $check . ");";
		$sqll = $sqll . ");";
		
		$arry1 = query($check);
		$array2 = json_encode($arry1, JSON_UNESCAPED_UNICODE);
		$sql = "insert into buylist(listnum,username,product,payway) values('$listnum','$account','$array2','$payway');";
		$result = excute($sql);
		
		if($result){
			$result1 = excute($sqll);
			if($result1){
				echo "{'state':true,'message':'下单成功!'}";
			}
		}else{
			echo "{'state':false,'message':'下单失败!商品种类过多，请分开下单。'}";
		}
	}else{
		echo '{"state":false,"message":"请先登录或注册!"}';
	}
?>
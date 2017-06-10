<?php
	include "DBHelper.php";
	session_start();
	if($_SESSION['username']){
		$list = $_POST["list"];
		$num = $_POST["num"];
		$account = $_SESSION['username'];
		$name = $_POST["name"];
		$phone = $_POST["phone"];
		$address = $_POST["address"];
		$creattime = $_POST["creattime"];
		$arr = json_decode($list);
		$check = "select * from buylist where username = '$account' and (";
		$sqll = "delete from buylist where username = '$account' and (";
		for ($x=0; $x<count($arr); $x++) {
			if($x == 0){
				$check = $check . "listnum=" . $arr[$x];
				$sqll = $sqll . "listnum=" . $arr[$x];
			}else{
				$check = $check . " or listnum=" . $arr[$x];
				$sqll = $sqll . " or listnum=" . $arr[$x];
			}
		  	
		}
		$check = $check . ");";
		$sqll = $sqll . ");"; 
		$arry1 = query($check);
		$into = "";
		$payway = $arry1[0]->payway;
		for($x=0; $x<count($arry1); $x++){
			$pro = json_decode($arry1[$x]->product);
			for($y=0;$y<count($pro);$y++){
				$product = json_encode($pro[$y], JSON_UNESCAPED_UNICODE);
				$into = "insert into ordergoods(name,address,phone,product,username,ordernum,creattime,payway) values('$name','$address','$phone','$product','$account','$num','$creattime','$payway');";
				$result = excute($into);
			}
		}
		
		$result1 = excute($sqll);
		if($result1){
			echo "{'state':true,'message':'购买成功！！'}";
		}else{
			echo "{'state':false,'message':'购买失败！！'}";
		}
	}else{
		echo "{'state':'out'}";
	}
	
?>
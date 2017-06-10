<?php
	include "DBHelper.php";
	session_start();
	if(isset($_SESSION['username'])){
		$del = $_GET["del"];
		$account = $_SESSION['username'];
		$amount = $_GET["amount"];
		$productid = $_GET["productid"];
		if($del == "true"){
			$sql = "delete from buycar where username = '$account' and productid = '$productid'";
			$result = excute($sql);
			if($result){
				echo '{"state":true}';
			}else{
				echo '{"state":false,"message":"更改商品失败!"}';
			}
		}else{
			$sql = "update buycar set amount = '$amount' where username = '$account' and productid = '$productid'";
			$result = excute($sql);
			if($result){
				echo '{"state":true}';
			}else{
				echo '{"state":false,"message":"更改商品失败!"}';
			}
		}
		
	}else{
		echo '{"state":false,"message":"请先登录或注册!"}';
	}
?>
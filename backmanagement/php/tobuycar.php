<?php
	include "DBHelper.php";
	session_start();
	if(isset($_SESSION['username'])){
		$account = $_SESSION['username'];
		$id = $_GET["index"];
		$check = "select * from buycar where username = '$account' and productid = '$id'";
		$arry = query($check);
		if(count($arry)>0){
			$amount = $arry[0]->{'amount'} +1;
			$sql = "update buycar set amount = '$amount' where username = '$account' and productid = '$id'";
			$result = excute($sql);
			if($result){
				echo '{"state":true,"message":"添加购物车成功!"}';
			}else{
				echo '{"state":true,"message":"添加购物车失败!"}';
			}
		}else{
			$checkp = "select * from product where productid = '$id'";
			$arryp = query($checkp);
			$money = $arryp[0]->{'money'};
			$title = $arryp[0]->{'title'};
			$src = $arryp[0]->{'src'};
			$sql = "insert into buycar(productid,username,amount,money,title,src) values('$id','$account',1,'$money','$title','$src');";
			$result = excute($sql);
			if($result){
				echo '{"state":true,"message":"添加购物车成功!"}';
			}else{
				echo '{"state":true,"message":"添加购物车失败!"}';
			}
		}
	}else{
		echo '{"state":false,"message":"请先登录或注册!"}';
	}
?>
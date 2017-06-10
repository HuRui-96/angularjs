<?php
	include "DBHelper.php";
	session_start();
	if(isset($_SESSION['username'])){
		$style = $_POST["style"];
		$account = $_SESSION['username'];
		if($style == 'slect'){
			$slect = "select * from address where username = '$account'";
			$arry = query($slect);
			echo '{"state":true,"message":'.json_encode($arry, JSON_UNESCAPED_UNICODE).'}'; 
		}else if($style == 'add'){
			$num = $_POST["num"];
			$address = $_POST["address"];
			$able = $_POST["able"];
			$phone = $_POST["phone"];
			$name = $_POST["name"];
			$mail = $_POST["mail"];
			if($able == 'true'){
				$slect = "select * from address where username = '$account' and able = 'true';";
				$arry = query($slect);
				if(count($arry)>0){
					$updata = "update address set  able = 'false' where username = '$account' and able = 'true';";
					$result1 = excute($updata);
					if($result1){
						$insert = "insert into address(username,address,able,num,phone,name,mail) values('$account','$address','$able','$num','$phone','$name','$mail');";
						$result = excute($insert);
						if($result){
							echo '{"state":true,"in":true,"message":"添加地址成功!"}';
						}else{
							echo '{"state":false,"in":true,"message":"添加地址失败!"}';
						}
					}
				}else{
					$insert = "insert into address(username,address,able,num,phone,name,mail) values('$account','$address','$able','$num','$phone','$name','$mail');";
					$result = excute($insert);
					if($result){
						echo '{"state":true,"in":true,"message":"添加地址成功!"}';
					}else{
						echo '{"state":false,"in":true,"message":"添加地址失败!"}';
					}
				}
			}else{
				$insert = "insert into address(username,address,able,num,phone,name,mail) values('$account','$address','$able','$num','$phone','$name','$mail');";
				$result = excute($insert);
				if($result){
					echo '{"state":true,"in":true,"message":"添加地址成功!"}';
				}else{
					echo '{"state":false,"in":true,"message":"添加地址失败!"}';
				}
			}
			
			
		}else if($style == 'change'){
			$num = $_POST["num"];
			$address = $_POST["address"];
			$able = $_POST["able"];
			$phone = $_POST["phone"];
			$name = $_POST["name"];
			$mail = $_POST["mail"];
			if($able == 'true'){
				$updata1 = "update address set  able = 'false' where username = '$account' and able = 'true';";
				$result1 = excute($updata1);
				if($result1){
					$updata = "update address set address = '$address' , able = '$able' , phone = '$phone' , name = '$name' , mail = '$mail' where username = '$account' and num = '$num';";
					$result = excute($updata);
					if($result){
						echo '{"state":true,"in":true,"message":"改变地址成功!"}';
					}else{
						echo '{"state":false,"in":true,"message":"改变地址失败!"}';
					}
				}
			}
			
		}else if($style == 'delete'){
			$num = $_POST["num"];
			$address = $_POST["address"];
			$able = $_POST["able"];
			$delete = "delete from address where username = '$account' and num = '$num'";
			$result = excute($delete);
			if($result){
				echo '{"state":true,"in":true,"message":"删除地址成功!"}';
			}else{
				echo '{"state":false,"in":true,"message":"删除地址失败!"}';
			}
		}
	}else{
		echo '{"state":false,"in":false,"message":"请先登录或注册!"}';
	}
?>
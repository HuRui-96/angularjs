<?php
	// echo '<pre>';
	// print_r($_POST);
	// echo '</pre>';

	// echo '<pre>';
	// print_r($_FILES);
	// echo '</pre>';

	// $q = $_POST["data"];
	// echo $q;
	include "fileupload.php";

    $array = '';

    if(isset($_FILES)){
        //实例化上传插件
        $uploadFileObject = new FileUpload();
        // $uploadFileObject->path = "upload";//文件存放目录
        $uploadFileObject->allowtype = array('jpg','gif','png','jpeg', 'txt');//可以不设置，类中有默认类型
        // $uploadFileObject->maxsize = "100000000";//可以不设置，类中有默认
        //调用上传方法开始上传文件，上传的文件保存到 file 文件夹
        //第一个参数为提交的 file 元素名称，第二个参数为要上传的文件夹名称
        $uploadFileObject->upload("file", "../img");
        //获取上传结果
        $returnStatus = $uploadFileObject->getErrorMsg();
        if(empty($returnStatus)){//returnStatus错误信息数据
            //成功
            $fileName = $uploadFileObject->getFileName();
            $array = array(
                "status"=>true,
                "fileName"=>$fileName,
            );
            $array = json_encode($array);
        } else {
            //失败
        	$array = array(
                "status"=> false,
                "fileName"=> "",
                "message" => $returnStatus
            );
            $array = json_encode($array, JSON_UNESCAPED_UNICODE);
        }
    }
    echo $array;
	 
?>
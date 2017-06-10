$(function(){
	$("header").load("header1.html",function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success"){
			$(".header1").find("div").text("登录");
			setTimeout(function(){
				$("header").show();
			},50)
		}
	});
	
	$(document).click(function(evt){
		if($(evt.target).hasClass("checklogin")){
			var checkacc = checkres({
				target:".login",
				name:[
						{"namedom":'account',"message":"手机号不能为空"},
						{"namedom":'password',"message":"密码不能为空"}
					],
			});
			
			if(checkacc.account && checkacc.password){
				$.post(baseurl+"php/login.php",{laccount:checkacc.account,lpassword:checkacc.password},function(rep){
					var result = eval('('+rep+')');
					alert(result.message);
					if(result.state){
						location.assign("index.html");
					}
				});
			}
			
			
		}
	})
})


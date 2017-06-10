$(function(){
	$("header").load("header1.html",function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success"){
			$(".header1").find("div").text("注册");
			setTimeout(function(){
				$("header").show();
			},50)
		}
	});
	
	$(".register").find("input[name='radomnunm']").val(mathematical());
	$("input").focus(function(){
		var $this = $(this);
	    console.log($this[0].offsetTop);
	    $(".register").scrollTop($this[0].offsetTop-10);
	})
	$(document).on("touchstart",function(evt){
		if($(evt.target).is("input[name='radomnunm']")){
			$(evt.target).val(mathematical());
		}
		if($(evt.target).is("input[name='regist']")){
			var registerto = checkres({
				target:".register",
				name:[
						{"namedom":'anothername',"message":"昵称不能为空"},
						{"namedom":'account',"message":"手机号不能为空"},
						{"namedom":'checknum',"message":"验证码不能为空"},
						{"namedom":'password',"message":"密码不能为空"},
						{"namedom":'repassword',"message":"两次密码不一致"}
					],
				random:'radomnunm'
			});
			if(registerto.account && registerto.anothername && registerto.password){
				$.post(baseurl+"php/register.php",{account:registerto.anothername,phone:registerto.account,password:registerto.password},function(rep){
					var result = eval('('+rep+')');
					alert(result.message);
					if(result.state){
						location.assign("login.html");
					}
				})
			}
		}
		
	})
	
})


$(function(){
	$("header").load("header1.html",function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success"){
			$(".header1").find("div").text("地址管理");
			setTimeout(function(){
				$("header").show();
			},50)
		}
	});
	$.post(baseurl+"php/address.php",{style:'slect'},function(rep){
		var result = eval('('+ rep +')');
		if(result.state){
			if(result.message.length==0){
				$("#scroller>ul").remove();
			}else{
				console.log(result);
				var _obj = {
					baseDom:'#scroller>ul',
					cloneSize: 16,
					data: {data:result.message},
					toscroll:true,
					scrolldom:".address",
					appenfcount:6,
					
				};
				var products1 = new clonedom(_obj);
			}
			$("#scroller>ul").show();
		}else{
			alert(result.message);
			location.assign("login.html");
		}
	})
	var it = true;
	$(document).on("touchstart",function(){
		it = true;
	})
	$(document).on("touchmove",function(){
		it = false;
	})
	$(document).on("touchend",function(evt){
		if(it == true){
			if($(evt.target).is("footer>button")){
				location.assign("newaddress.html");
			}else if($(evt.target).is("#scroller>ul") || $(evt.target).is("#scroller>ul *")){
				var changeadr = JSON.parse($(evt.target).closest("ul").attr("data"));
				changeadr.able='true';
				changeadr.style = "change";
				console.log(changeadr);
				$.post(baseurl+"php/address.php",changeadr,function(rep){
					alert(eval('('+rep+')').message);
					console.log(eval('('+rep+')').message);
					if(!eval('('+rep+')').in){
						location.assign("login.html");
					}else{
						if(eval('('+rep+')').state){
							location.assign("tobuy.html");
						}
					}
				})
			}
		}
	})
})

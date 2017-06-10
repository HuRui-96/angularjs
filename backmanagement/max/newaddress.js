$(function(){
	$("header").load("header1.html",function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success"){
			$(".header1").find("div").text("地址编辑");
			setTimeout(function(){
				$("header").show();
			},50)
		}
	});
	$("input").focus(function(){
		var $this = $(this);
	    console.log($this[0].offsetTop);
	    $(".newaddress").scrollTop($this[0].offsetTop-10);
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
			if($(evt.target).is(".newaddress>ul>li:last-child>div")){
				var checkadress = checkadr();
				if(checkadress.check){
					checkadress.style = "add";
					checkadress.num = new Date().getTime();
					console.log(checkadress);
					$.post(baseurl+"php/address.php",checkadress,function(rep){
						console.log(rep);
						alert(eval('('+rep+')').message);
						if(!eval('('+rep+')').in){
							location.assign("login.html");
						}else{
							if(eval('('+rep+')').state){
								location.assign("address.html");
							}
						}
					})
				}
			}
		}
	})
	var data1;
	$("select").change(function(evt){
		if($(evt.target).index()==0){
			if($(evt.target).val()=="选择省"){
				return false
			}
			$("select").not(":first-child").find("option").not(":first-child").remove();
			$.get("libs/data/address.txt",function(rep){
				var repp = JSON.parse(rep);
				var ht = "";
				for(var i=0;i<repp.data.length;i++){
					if(repp.data[i].province == $(evt.target).val()){
						data1 = repp.data[i].city;
						for(var j = 0 ;j < repp.data[i].city.length;j++){
							ht += "<option>";
							ht += repp.data[i]["city"][j]["name"];
							ht += "</option>";
						}
					}
				}
				$("select").eq(1).find("option").not(":first-child").remove();
				$("select").eq(1).append(ht);
			})
		}else if($(evt.target).index()==1){
			console.log(data1);
			var ht = "";
			for(var i=0;i<data1.length;i++){
				if(data1[i].name == $(evt.target).val()){
					for(var j = 0 ;j < data1[i]["district"].length;j++){
						ht += "<option>";
						ht += data1[i]["district"][j];
						ht += "</option>";
					}
				}
			}
			$("select").eq(2).find("option").not(":first-child").remove();
			$("select").eq(2).append(ht);
		}
	})
})

function checkadr(){
	var obj={};
	obj.check = true;
	if($("input[name='name']").val().length==0){
		alert("姓名不能为空！");
		obj.check = false;
		return obj
	}else if(!(/^[\u4e00-\u9fa5]+$/.test($("input[name='name']").val()))){
		alert("姓名只能是中文！");
		obj.check = false;
		return obj
	}
	if($("input[name='phone']").val().length==0){
		alert("手机号不能为空！");
		obj.check = false;
		return obj
	}else if(!(/^1\d{10}$/.test($("input[name='phone']").val()))){
		alert("手机号格式不正确！");
		obj.check = false;
		return obj
	}
	if($(".address select").eq(0).val()=="选择省" || $(".address select").eq(1).val()=="选择省" || $(".address select").eq(2).val()=="选择区/县" || $(".address input").val().length==0){
		alert("请完善地址信息！");
		obj.check = false;
		return obj
	}
	if($("input[name='mail']").val().length==0){
		alert("邮政编码不能为空！");
		obj.check = false;
		return obj
	}else if(!(/^\d{6}$/.test($("input[name='mail']").val()))){
		alert("邮政编码格式不正确！");
		obj.check = false;
		return obj
	}
	obj.name = $("input[name='name']").val();
	obj.phone = $("input[name='phone']").val();
	obj.mail = $("input[name='mail']").val();
	obj.address = $(".address select").eq(0).val()+$(".address select").eq(1).val()+$(".address select").eq(2).val()+$(".address input").val();
	obj.able = $("input[type='checkbox']").prop("checked");
//	obj {
//		name:$("input[name='name']").val(),
//		phone:$("input[name='phone']").val(),
//		mail:$("input[name='mail']").val(),
//		address:$(".address select").eq(0).val()+$(".address select").eq(1).val()+$(".address select").eq(2).val()+$(".address input").val(),
//		able:$("input[type='checkbox']").prop("checked")
//	}
	
	return obj
}

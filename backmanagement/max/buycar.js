
$(function(){
	
	$("header").load("header1.html",function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success"){
			$(".header1").find("div").text("购物车");
			setTimeout(function(){
				$("header").show();
			},50)
		}
	});
	$("footer").load("footer1.html",function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success"){
			
			$(".footer>div").eq(0).find("i").removeClass("icon-shopping-cart").addClass("icon-circle-blank").next("span").text("全选");
			$(".footer>div").eq(1).find("a").html("<span>支付方式</span><i class='icon-chevron-up'></i>");
			$(".footer>div").eq(2).html("<a>确认下单(<span>0</span>)</a>");
			$.get(baseurl+'php/buycar.php',function(rep){
		
				var result = eval('('+rep+')');
				console.log(result);
				if(!result.state){
					$('#scroller>ul').remove();
					location.assign("login.html");
				}
				if(result.message.length==0){
					$('#scroller>ul').remove();
				}else{
					var _obj = {
						baseDom:'#scroller>ul',
						cloneSize: 6,
						data: {data:result.message},
						toscroll:true,
						scrolldom:".buycar",
						appenfcount:6,
						readydom:".ready"
						
					};
					var products1 = new clonedom(_obj);
					$('div.buycar').show();
				}
			})
			$("footer").show();
		}
	});
	
	
	
	var it = true;
	$(document).on("touchstart",function(evt){
		it = true;
	});
	$(document).on("touchmove",function(evt){
		it = false;
	});
	$(document).on("touchend",function(evt){
		if(it==false){
			return false
		}
		if($(evt.target).is(".footer>div:nth-child(2)>a>*") || $(evt.target).is(".footer>div:nth-child(2)>a")){
			$(".selectpay").toggle();
		}else if($(evt.target).is(".selectpay>div>p")){
			$(".selectpay").toggle();
			$(".footer>div").eq(1).find("span").text($(evt.target).text());
		}else if($(evt.target).is(".option>div>div>i")){
			if($(evt.target).hasClass("icon-minus")){
				if($(evt.target).closest("div").next().text()>1){
					$(evt.target).closest("div").next().text($(evt.target).closest("div").next().text()-1);
					
//					calculate({
//						dom:$(evt.target).closest("ul")
//					});
					changebuycar({
						dom:$(evt.target).closest("ul"),
						del:false
					});
					allmoney();
					
				}
			}else if($(evt.target).hasClass("icon-plus")){
				$(evt.target).closest("div").prev().text(parseInt($(evt.target).closest("div").prev().text())+1);
				
//				calculate({
//					dom:$(evt.target).closest("ul")
//				});
				changebuycar({
					dom:$(evt.target).closest("ul"),
					del:false
				});
				allmoney();
			}else if($(evt.target).hasClass("icon-trash")){
//				calculate({
//					dom:$(evt.target).closest("ul"),
//					del:true
//				});
				changebuycar({
					dom:$(evt.target).closest("ul"),
					del:true
				});
				allmoney();
			}
		}else if($(evt.target).is("ul>li:first-child>i")){
			$(evt.target).toggleClass("icon-circle-blank").toggleClass("icon-ok-circle");
			allmoney();
		}else if($(evt.target).is(".footer>div:first-child>a>i")){
			$(evt.target).toggleClass("icon-circle-blank").toggleClass("icon-ok-circle");
			if($(evt.target).hasClass("icon-ok-circle")){
				$("ul>li:first-child>i").removeClass("icon-circle-blank").addClass("icon-ok-circle");
				allmoney();
			}else{
				$("ul>li:first-child>i").addClass("icon-circle-blank").removeClass("icon-ok-circle");
				allmoney();
			}
		}else if($(evt.target).is(".footer>div:first-child>a")){
			$(evt.target).find("i").toggleClass("icon-circle-blank").toggleClass("icon-ok-circle");
			if($(evt.target).find("i").hasClass("icon-ok-circle")){
				$("ul>li:first-child>i").removeClass("icon-circle-blank").addClass("icon-ok-circle");
				allmoney();
			}else{
				$("ul>li:first-child>i").addClass("icon-circle-blank").removeClass("icon-ok-circle");
				allmoney();
			}
		}else if($(evt.target).is(".footer>div:last-child>a") || $(evt.target).is(".footer>div:last-child>a>span")){
			if($(evt.target).is("span")){
				if($(evt.target).text()==0){
					alert("请选择商品");
					return
				}else if($(".footer>div:nth-child(2)>a>span").text()=="支付方式"){
					alert("请选择支付方式");
					return
				}
			}else{
				if($(evt.target).children("span").text()==0){
					alert("请选择商品");
					return
				}else if($(".footer>div:nth-child(2)>a>span").text()=="支付方式"){
					alert("请选择支付方式");
					return
				}
			}
			var array1 = $("#scroller i.icon-ok-circle").closest("ul");
			var d = new Date();
			var array2 = [];
			$.each(array1, function(index,res) {
				array2.push(JSON.parse($(res).attr("data")).productid);
			});
			
			$.get("http://10.3.134.63/show/oyav2/php/tobuylist.php"+"?product="+JSON.stringify(array2)+"&listnum="+d.getTime()+"&payway="+$(".footer>div:nth-child(2)>a>span").text(),function(rep){
				var repp = eval("("+rep+")");
				alert(repp.message);
				if(repp.state){
					$("#scroller i.icon-ok-circle").closest("ul").remove();
					location.assign("tobuy.html");
				};
			});
//			var array1 = $("#scroller i.icon-ok-circle").closest("ul");
//			var arr2 = [];
//			var arr3 = [];
//			if(localStorage.getItem("payproduct")){
//				arr3 = JSON.parse(localStorage.getItem("payproduct"));
//				console.log(arr3);
//			}
//			$.each(array1, function(index,result) {
//				console.log("aaaaa");
//				arr2.push(JSON.parse($(result).attr("data")));
//				calculate({
//					dom:result,
//					del:true
//				});
//			});
//			allmoney();
//			var obj1 = {};
//			obj1.payment = $(".footer>div:nth-child(2)>a>span").text();
//			obj1.data = arr2;
//			arr3.push(obj1);
//			localStorage.setItem("payproduct",JSON.stringify(arr3));
//			array1.remove();
//			
//			location.assign("tobuy.html");
		}
	})
})

function changebuycar(opt){
	if($(opt.dom).length==0){
		return false;
	}
	var amount = $(opt.dom).find("div[dk-bind='amount']").text();
	var productid = JSON.parse($(opt.dom).attr("data")).productid;
	$.get(bseurl+"php/changebuycar.php"+"?amount="+amount+"&productid="+productid+"&del="+opt.del,function(rep){
		var change = eval('('+rep+')');
		
		if(change.state){
			if(opt.del){
				$(opt.dom).remove();
			}
		}else{
			alert(change.message);
		}
	})
}


//function calculate(opt){
//	var changebuycar = function(){
//		if($(opt.dom).length==0){
//			return 
//		}
//		
//		var arr = JSON.parse(localStorage.getItem("buycar"));
//		$.each(arr, function(index,result) {
//			if(JSON.parse($(opt.dom).attr("data")).id == result.id){
//				if(opt.del==true){
//					console.log(result.id);
//					arr.splice(index,1);
//					localStorage.setItem("buycar",JSON.stringify(arr));
//					$(opt.dom).remove();
//					return false;
//				}else{
//					result.account = JSON.parse($(opt.dom).attr("data")).account;
//					localStorage.setItem("buycar",JSON.stringify(arr));
//				}
//				return true;
//			}
//		});
//
//	}
//	changebuycar();
//}

function allmoney(){
	var arr = $("#scroller i.icon-ok-circle").closest("ul");
	var allmoney = 0;
	$.each(arr, function(index,result) {
//		var data = JSON.parse($(result).attr("data"));
//		if(!data.account){
//			data.account = 1;
//			$(result).attr("data",JSON.stringify(data));
//		}
		allmoney += parseInt($(result).find("span[dk-bind='money']").text())*parseInt($(result).find("div[dk-bind='amount']").text());
	});
	$(".footer>div:last-child>a>span").text(allmoney);
}

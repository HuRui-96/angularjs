$(".buyproduct").hide();
$(function(){
	
	$("header").load("header1.html",function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success"){
			$(".header1").find("div").text("确认下单");
			setTimeout(function(){
				$("header").show();
			},50)
		}
	});
	$("footer").load("footer1.html",function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success"){
			$(".footer a").eq(0).html("共 <span>0</span> 件").end().eq(1).html("总金额  ￥ <span>0</span>").end().eq(2).text("提交订单");
			setTimeout(function(){
				$("footer").show();
			},50)
			$.post(baseurl+"php/address.php",{style:'slect'},function(rep){
				var result = eval('('+ rep +')');
				if(result.state){
					if(result.message.length==0){
						$(".buyaddress>ul").html("还没有添加地址，请添加地址");
					}else{
						var defaultadr ={state:false};
						$.each(result.message,function(num,adr){
							if(adr.able == 'true'){
								defaultadr = adr;
								defaultadr.state = true;
							}
							
						})
						if(!defaultadr.state){
							defaultadr = result.message[0];
						}
						$("div.buyaddress").find(".toname").text(defaultadr.name).end().find(".tophone").text(defaultadr.phone).end().find(".toaddress").text(defaultadr.address);
					}
					$(".buyaddress").show();
				}
			})
			$.get(baseurl+"php/showbuylist.php",function(rep){
				var res= JSON.parse(rep);
				if(!res.state){
					location.assign("login.html");
				}else{
					var arry = [];
					for(var i =0;i<res.data.length;i++){
						arry.push({'data':JSON.parse(res.data[i].product),"listnum":res.data[i].listnum,"payway":res.data[i].payway});
					}
					var obb = {"data":{"payment":res.data[0]}}
					if(arry.length<=0){
						$(".buyproduct").remove();
					}else{
						var _obj = {
							baseDom:'.buyproduct',
							cloneSize: 3,
							data:{"data":arry},
							toscroll:true,
							scrolldom:".tobuy",
							appenfcount:4,
							returnfun:cal,
							readydom:".ready"
						};
						var products1 = new clonedom(_obj);
						$(".buyproduct").show();
					}
				}
				
				
			})
		}
	});

	function cal(){
		$.each($(".item-all"),function(i,ele){
			var num = 0;
			var pay = 0;
			$.each($(ele).closest(".buyproduct").find("ul"), function(j,ele1) {
				num += parseInt($(ele1).find(".amount").text());
				pay += parseInt($(ele1).find(".money").text())*parseInt($(ele1).find(".amount").text());	
			});
			$(ele).find("span").eq(0).text(num);
			$(ele).find("span").eq(1).text("￥ "+pay);
		});

	}
	
	var it = true;
	$(document).on("touchstart",function(){
		it = true;
	})
	$(document).on("touchmove",function(){
		it = false;
	})
	$(document).on("touchend",function(evt){
		
		if(it == true){
			if($(evt.target).is(".buyaddress>ul *") || $(evt.target).is(".buyaddress>ul")){
				location.assign("address.html");
			}else if($(evt.target).is("div.addnewad *") || $(evt.target).is("div.addnewad")){
				location.assign("newaddress.html");
			}else if($(evt.target).is(":checkbox")){
				if(!$(evt.target).is(':checked')){
					$("footer a span").eq(0).text(parseInt($(evt.target).closest("div.item-all").find("span").eq(0).text().replace("￥ ",""))+parseInt($("footer a span").eq(0).text()));
					$("footer a span").eq(1).text(parseInt($(evt.target).closest("div.item-all").find("span").eq(1).text().replace("￥ ",""))+parseInt($("footer a span").eq(1).text()));
				}else{
					$("footer a span").eq(0).text(parseInt($("footer a span").eq(0).text())-parseInt($(evt.target).closest("div.item-all").find("span").eq(0).text().replace("￥ ","")));
					$("footer a span").eq(1).text(parseInt($("footer a span").eq(1).text())-parseInt($(evt.target).closest("div.item-all").find("span").eq(1).text().replace("￥ ","")));
				}
			}else if($(evt.target).is("footer div:nth-child(3) a")){
				if($("footer a span").eq(0).text()==0){
					alert("请选择商品");
				}else{
					var arr = [];
					$.each($("input:checked"), function(index,ele) {
						arr.push($(ele).closest("div.buyproduct").find("div.item div").eq(1).text());
					});
					$.post(baseurl+"php/ordergoods.php",{list:JSON.stringify(arr),num:new Date().getTime(),name:$(".toname").text(),phone:$(".tophone").text(),address:$(".toaddress").text(),creattime:new Date().toDateString()},function(rep){
						if(eval("("+rep+")").state=="out"){
							location.assign("login.html");
						}else{
							alert(eval("("+rep+")").message);
							if(eval("("+rep+")").state){
								$.each($("input:checked"), function(index,ele) {
									$(ele).closest("div.buyproduct").remove();
								});
								location.assign("takegoods.html");
							}
						}
						
					})
					
				}
			}
		}
	})
})
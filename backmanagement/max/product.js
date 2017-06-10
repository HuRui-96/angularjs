$(function(){
	$("header").load("header1.html",function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success"){
			$(".header1").find("div").text("优来选专场");
			setTimeout(function(){
				$("header").show();
			},50)
		}
	});
	
	$("footer").load("footer.html",function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success"){
			$("div.footer>div>a").eq(2).css({color:"black"});
			setTimeout(function(){
				$("footer").show();
			},50)
		}
	});
	
	$.get(baseurl+"php/product.php",function(rep){
		console.log(eval('('+rep+')'));
		var _obj = {
			baseDom:'#scroller>a',
			cloneSize: 12,
			data: {data:eval('('+rep+')').data},
			toscroll:true,
			scrolldom:".products",
			appenfcount:8,
			click:false,
			readydom:".ready"
		};
		var products1 = new clonedom(_obj);
		$("div.products").show();
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
			if($(evt.target).is("#scroller>a")||$(evt.target).is("#scroller>a>p") || $(evt.target).is("#scroller>a>img")|| $(evt.target).is("#scroller>a>span")){
				localStorage.setItem("nowproduct",$(evt.target).closest("a").attr("data"));
				location.assign("productdetail.html?index="+JSON.parse($(evt.target).closest("a").attr("data")).productid);
				console.log($(evt.target).closest("a").attr("data"));
			}
		}
	})
})

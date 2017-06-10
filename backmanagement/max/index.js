$(function(){
	
	$("header").load("header.html",function(responseTxt,statusTxt,xhr){
		console.log(xhr.statusText)
		if(statusTxt=="success" && xhr.status == 200 && xhr.statusText == "OK"){
			setTimeout(function(){
				$("header").show();
			},50)
		}
	});
	$("footer").load("footer.html",function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success"){
			console.log($("div.footer>div>a").eq(0));
			$("div.footer>div>a").eq(0).css({color:"black"});
			setTimeout(function(){
				$("footer").show();
			},50)
		}
	});
	
	var _obj = {
		baseDom:'.recommend',
		cloneSize: 6,
		url: 'libs/data/index.txt',
		toscroll:true,
		scrolldom:".content",
		appenfcount:3,
		totopdom:".totop",
		readydom:".ready"
		
	};
	var products1 = new clonedom(_obj);
	
	$(document).on("touchstart",function(evt){
		if($(evt.target).is("header>.header>.search>i")){
			if($(evt.target).hasClass("icon-search")){
				$(evt.target).parents(".header").find("div").text("商品搜索");
				$(evt.target).removeClass("icon-search").addClass("icon-remove-sign");	
			}
			else if($(evt.target).hasClass("icon-remove-sign")){
				$(evt.target).parents(".header").find("div").text("OYA商城");
				$(evt.target).removeClass("icon-remove-sign").addClass("icon-search");
			}
			$(".tosearch").toggle();
		}
		if($(evt.target).is(":button")){
			location.assign("product.html");
		}
	})
	
})


onload = function(){
	var mySwiper = new Swiper('.swiper-container', {
		autoplay: 1000,
		speed: 500,
		autoHeight: true,
		loop : true,
		pagination : '.swiper-pagination'
	});
}


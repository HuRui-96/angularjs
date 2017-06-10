$(function(){
	
	$("header").load("header1.html",function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success"){
			var str = "<div class='detail nowdiv'>详情</div><div class='comment'>评论</div>"
			$(".header1").find("div").html(str);
			setTimeout(function(){
				$("header").show();
			},50)
		}
	});
	$("footer").load("footer1.html",function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success"){
			setTimeout(function(){
				$("footer").show();
			},50)
		}
	});
	var _obj = {
		baseDom:'.usercomment',
		cloneSize: 6,
		url: 'libs/data/comment.txt',
		toscroll:true,
		scrolldom:".productcomment",
		appenfcount:3,
		readydom:".ready"
		
	};
	var products1 = new clonedom(_obj);
	var it = true;
	$(document).on("touchstart",function(){
		it = true;
	})
	$(document).on("touchmove",function(){
		it = false;
	})
	$(document).on("touchend",function(evt){
		if(it == true){
			if($(evt.target).is(".header1 div.detail")){
				$(".productdetail").show();
				$(".header1 div").toggleClass("nowdiv");
			}else if($(evt.target).is(".header1 div.comment")){
				$(".productdetail").hide();
				$(".header1 div").toggleClass("nowdiv");
			}else if($(evt.target).is(".footer>div>a")){
				var obj = JSON.parse(localStorage.getItem("nowproduct"));
				
				if($(evt.target).text()=="加入购物车"){
					tobuycar();
				}else if($(evt.target).text()=="立即购买"){
					tobuycar(function(){
						location.assign("buycar.html");
					});
					
				}
			}
		}
	})
})
onload = function(){
	$.get(baseurl+"php/productdetail.php"+location.search,function(rep){
		var repp = eval("("+rep+")");
		console.log(repp);
		$(".swiper-slide>img").attr("src",repp[0].src);
		$(".message1 p").eq(0).text(repp[0].title);
		$(".message1 p").eq(1).html("<span>￥</span>"+repp[0].money);
		var mySwiper = new Swiper('.swiper-container', {
			autoplay: 1000,
			speed: 500,
			autoHeight: true,
			loop : true,
			pagination : '.swiper-pagination'
		});
		var myScrolll;
		myScrolll = new IScroll(".productdetail", {
			scrollbars: true,
			mouseWheel: true,
			interactiveScrollbars: true,
			shrinkScrollbars: 'scale',
			fadeScrollbars: true,
			click:true
		});
	});
	
}

function tobuycar(callback){
	$.get(baseurl+"php/tobuycar.php"+location.search,function(rep){
		var res = eval("("+rep+")");
		alert(res.message);
		if(!res.state){
			location.assign("login.html");
		}
		if(callback){
			callback();
		}
		
	});
}

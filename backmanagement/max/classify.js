$(function(){

	$("header").load("header1.html",function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success"){
			$(".header1").find("div").text("分类");
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
	var _obj = {
		baseDom:'.left>li',
		cloneSize: 10,
		url: 'libs/data/classify.txt',
		returnfun:function(){
			$(".left").find("li").eq(0).addClass("nowli");
		}
		
	};
	var cateleft = new clonedom(_obj);
	
	var opt = {
		targetdom:'.rightcontent',
		url: 'libs/data/classify1.txt',
		toscroll:true,
		scrolldom:".right",
		readydom:".ready",
		
	};
	
	var  classify = new toclassify(opt);
	$(document).on("touchstart",function(evt){
		if($(evt.target).is(".left>li>p")){
			$(".ready").show();
			setTimeout(function(){
				$(".ready").hide();
			},500)
			$(".left>li").removeClass("nowli");
			$(evt.target).parent().addClass("nowli");
			var tt = $(evt.target).text();
			classify.refresh(tt);
		}
	})
//	$(document).click(function(evt){
//		if($(evt.target).is(".left>li>p")){
//			$(".ready").show();
//			setTimeout(function(){
//				$(".ready").hide();
//			},500)
//			$(".left>li").removeClass("nowli");
//			$(evt.target).parent().addClass("nowli");
//			var tt = $(evt.target).text();
//			aa.refresh(tt);
//		}
//	})
	
})

var toclassify = function(target){
	var $this = this;

	$this.newObj = target;
	
	var init = function(name){
		$.ajax({
			type:"get",
			url:target.url + '?_=' + Math.random(),
			async:true,
			beforeSend:function(){
				if($($this.newObj.readydom).length>0){
					$($this.newObj.readydom).show();
				}
			},
			success:function(_response){
				$this.newObj.data = typeof _response == 'string' ? JSON.parse(_response) : _response;			
				showhtml(name);
				if($this.newObj.toscroll){
					myScroll.refresh();
				}
				if($($this.newObj.readydom).length>0){
					$($this.newObj.readydom).hide();
				}
			}
		});
//		$.get(target.url + '?_=' + Math.random(), function(_response){
//			$this.newObj.data = typeof _response == 'string' ? JSON.parse(_response) : _response;			
//			
//			showhtml(name);
//			if($this.newObj.toscroll){
//				myScroll.refresh();
//				
//			}
//		})
	};
	var showhtml = function(name){
		var _html ="";
		$.each($this.newObj.data.data, function(index1,result1) {
			if(name==result1.name){
				_html += "<h3>"+result1.title1+"</h3><ul>";
				$.each(result1.product, function(index2,result2) {
					_html += "<li><a href='"+result2.href+"'>";
					_html += "<img src='"+result2.src+"' />";
					_html += "<p>"+result2.title+"</p></a></li>"
				});
				_html +="</ul>";
				$($this.newObj.targetdom).html(_html);
				return;
			}
			
		});
	};
	
	if(this.newObj.toscroll){
		if(!$this.newObj.scrolldom){
			return
		}
		var myScroll;
		myScroll = new IScroll($this.newObj.scrolldom, {
			scrollbars: true,
			mouseWheel: true,
			interactiveScrollbars: true,
			shrinkScrollbars: 'scale',
			fadeScrollbars: true,
			click:true
		});
		document.addEventListener('touchmove', function (e) { e.preventDefault(); });
		
	}

	this.refresh = function(name){
		if($this.newObj.data){
			showhtml(name);
			
			if($this.newObj.toscroll){
				myScroll.refresh();
			}
		}else{
			init(name);
		}
		
	}
	this.refresh("原味脆紫菜");
}

var baseurl ="http://10.3.134.63/show/oyav4/";
$(function(){
	$("header").hide();$("footer").hide();
})
var clonedom = function(opts){

	var _default = {
		baseDom: null,
		url: null, 
		data: [], 
		cloneSize: 0,
		pageContainer: null,
		click:true
	}
	var $this = this;

	$this.newObj = $.extend(_default, opts);

	var init = function(_callback){

		if(!$this.newObj.data && !$this.newObj.url){
			return false;
		}

		if(!$this.newObj.baseDom || $this.newObj.cloneSize < 1){
			return false;
		}
		
		if($this.newObj.data[0]){
			$this.newObj.data = !$this.newObj.data instanceof Array ? [$this.newObj.data] : $this.newObj.data;
		} else if($this.newObj.url)	{
//			$.get($this.newObj.url + '?_=' + Math.random(), function(_response){
//				
//			})
			$.ajax({
				type:"get",
				url:$this.newObj.url + '?_=' + Math.random(),
				async:true,
				success:function(_response){
					$this.newObj.data = typeof _response == 'string' ? JSON.parse(_response) : _response;			
					if(_callback && typeof _callback == 'function'){
						_callback();
						if($this.newObj.readydom){
							$($this.newObj.readydom).css("display","block");
						}
					}
				},
				complete:function(){
					if($this.newObj.readydom){
						
					}
				}
			});
		}
		return true;
	}

	var generateHtml = function(_page){
		if($this.newObj.readydom){
			$($this.newObj.readydom).css("display","block");
			setTimeout(function(){
				$($this.newObj.readydom).css("display","none");
			},1000);
		}
		_page = _page || 1;
		
		var _pageSize = $this.newObj.cloneSize;
		
		var _min = (_page - 1) * _pageSize;
		
		var _max = _page * _pageSize -1;

		if(!$this.newObj.data.data[0]){
			return false;
		}
		$($this.newObj.baseDom).not(":eq(0)").remove();
		$this.newObj.ccDom = $($this.newObj.baseDom).eq(0);
		for(var i = _min; i <= _max; i++){
			if($this.newObj.data.data[i]){
				var _cloneDom = $($this.newObj.baseDom).eq(0).clone().appendTo($($this.newObj.baseDom).parent());
				$.each($('[dk-bind]', _cloneDom), function(_index, _element){
					$(_cloneDom).attr("data",JSON.stringify($this.newObj.data.data[i]));
					
					if($this.newObj.data.data[i][$(_element).attr('dk-bind')] instanceof Array){
						$.each($this.newObj.data.data[i][$(_element).attr('dk-bind')], function(indexa,reshlta) {
							var clonea = $(_element).eq(0).clone();
							$(_element).eq(0).before(clonea);
							
							var str = /^\w*\s(in)\s\w*$/;
							$.each($('[ck-bind]', clonea), function(a,b) {
								if($(b).is('img')){
									$(b).attr('src', $this.newObj.data.data[i][$(_element).attr('dk-bind')][indexa][$(b).attr('ck-bind')]);
								}else if($(b).is('a')){
									$(b).attr('href', $this.newObj.data.data[i][$(_element).attr('dk-bind')][indexa][$(b).attr('ck-bind')]);
								}else {
									$(b).text($this.newObj.data.data[i][$(_element).attr('dk-bind')][indexa][$(b).attr('ck-bind')]);
								}
							});
						});
						$(_element).eq(0).remove();
					}
					else{
						if($(_element).is('img')){
							$(_element).attr('src', $this.newObj.data.data[i][$(_element).attr('dk-bind')]);
						}else if($(_element).is('a')){
							$(_element).attr('href', $this.newObj.data.data[i][$(_element).attr('dk-bind')]);
						}else {
							$(_element).text($this.newObj.data.data[i][$(_element).attr('dk-bind')]);
						}
					}
					
				})
			}
			
		}
		$($this.newObj.baseDom).eq(0).remove();
		$this.newObj.appendnum = $this.newObj.cloneSize;
		
		if(typeof $this.newObj.returnfun == "function"){
			$this.newObj.returnfun();
		}
		if($this.newObj.toscroll){
			setTimeout(function(){
				myScroll.refresh();
			},100)
			
		}
		
	}
	
	this.appendele = function(){
		if($this.newObj.readydom){
			$($this.newObj.readydom).css("display","block");
		}
		if(!$this.newObj.appendnum){
			$this.newObj.appendnum = $this.newObj.cloneSize;
		}else{
			$this.newObj.appendnum ;
		}
		if($this.newObj.appendnum>=$this.newObj.data.data.length){
			setTimeout(function(){
				$($this.newObj.readydom).css("display","none");
			},1000)
			return;
		}
		if($this.newObj.appenfcount){
			var _min = $this.newObj.appendnum;
		
			var _max = $this.newObj.appendnum+$this.newObj.appenfcount;
		}else{
			var _min = $this.newObj.appendnum;
		
			var _max = $this.newObj.appendnum+2;
		}
		if((_max+1) > $this.newObj.data.data.length){
			_max+=1;
		}
		for(var i = _min; i < _max; i++){
			var aa;
			if($this.newObj.data.data[i]){
				var _cloneDom = $($this.newObj.baseDom).eq(0).clone().appendTo($($this.newObj.baseDom).parent());
				$(_cloneDom).attr("data",JSON.stringify($this.newObj.data.data[i]));
				console.log($this.newObj.ccDom);
				$(_cloneDom).find("*[dk-bind=data]").not(":eq(0)").remove();
				$.each($('[dk-bind]', _cloneDom), function(_index, _element){
					
					if($this.newObj.data.data[i][$(_element).attr('dk-bind')] instanceof Array){
						$.each($this.newObj.data.data[i][$(_element).attr('dk-bind')], function(indexa,reshlta) {
							var clonea = $(_element).eq(0).clone();
							$(_element).eq(0).before(clonea);
							var aa = $this.newObj.data.data[i][$(_element).attr('dk-bind')].length;
							var str = /^\w*\s(in)\s\w*$/;
							$.each($('[ck-bind]', clonea), function(a,b) {
								if($(b).is('img')){
									$(b).attr('src', $this.newObj.data.data[i][$(_element).attr('dk-bind')][indexa][$(b).attr('ck-bind')]);
								}else if($(b).is('a')){
									$(b).attr('href', $this.newObj.data.data[i][$(_element).attr('dk-bind')][indexa][$(b).attr('ck-bind')]);
								}else {
									$(b).text($this.newObj.data.data[i][$(_element).attr('dk-bind')][indexa][$(b).attr('ck-bind')]);
								}
							});
						});
						$(_element).eq(0).remove();
					}else{
						if($(_element).is('img')){
							$(_element).attr('src', $this.newObj.data.data[i][$(_element).attr('dk-bind')]);
						}else if($(_element).is('a')){
							
							$(_element).attr('href', $this.newObj.data.data[i][$(_element).attr('dk-bind')]);
						}else {
							$(_element).text($this.newObj.data.data[i][$(_element).attr('dk-bind')]);
						}
					}
					
				})
			}
		}
		$this.newObj.appendnum = _max;
		myScroll.refresh();
		
		if($this.newObj.readydom){
			setTimeout(function(){
				$($this.newObj.readydom).css("display","none");
			},1000)
			
		}
		if(typeof $this.newObj.returnfun == "function"){
			$this.newObj.returnfun();
		}
	}

	this.refresh = function(_page){
		//如果数据源 data 为空，而且 url 不为空，则定为需要 ajax 请求数据源
		if(!this.newObj.data[0] && this.newObj.url){
			//调用初始化方法并把生成 html 方法当回调函数执行
			// init(generateHtml);
			init(function(){
				generateHtml(_page);					
			});
		} else if(this.newObj.data && !this.newObj.data instanceof Array){
			//直接调用数据初始化方法
			init(function(){
				generateHtml(_page);					
			});
		} else if(this.newObj.data.data instanceof Array){
			generateHtml(_page);	
		}
	}

	
	
	if(this.newObj.data && this.newObj.data instanceof Array){
		if($this.newObj.page){
			
		}
			
	}
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
			click:$this.newObj.click
		});
		
		myScroll.on('scrollEnd', function(){
			if(myScroll.y==myScroll.maxScrollY){
				$this.appendele();
				console.log(myScroll.maxScrollY);
				setTimeout(function(){
					myScroll.refresh();
					console.log(myScroll.maxScrollY);
				},200)
				
			}
			if($this.newObj.totopdom){
				if(myScroll.y*-1 > (myScroll.maxScrollY/4)*-1){
					$($this.newObj.totopdom).css("display","block");
				}else{
					$($this.newObj.totopdom).css("display","none");
				}
				
				$($this.newObj.totopdom).click(function(){
					$($this.newObj.totopdom).css("display","none");
					myScroll.scrollTo(0,0);
				})
				
			}
		});
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	}
	
 	this.refresh(1);
}

function mathematical(){
	var randomArray = [];
	for(var i =0;i<4;i++){
		randomArray.push(parseInt(Math.random()*9));
	}
	return randomArray.join("");
}


function checkres(opt){
	
	var check = function(){
		var obj = {};
		if(opt.name.length==0){
			return false;
		};
		$.each(opt.name, function(index,result) {
			if($(opt.target).find("input[name='"+result.namedom+"']").length==0){
				return false;
			}
			if($(opt.target).find("input[name='"+result.namedom+"']").val().length==0){
				alert(result.message);
				return false;
			}else{
				if(result.namedom=="anothername"){
					if($(opt.target).find("input[name='"+result.namedom+"']").val().length<4){
						alert("昵称长度不小于4位");
						return false;
					}
					obj.anothername=$(opt.target).find("input[name='"+result.namedom+"']").val();
				}else if(result.namedom=="account"){
					var str = /^1\d{10}$/;
					if(!str.test($(opt.target).find("input[name='"+result.namedom+"']").val())){
						alert("帐号格式不正确");
						return false;
					}
					obj.account=$(opt.target).find("input[name='"+result.namedom+"']").val();
				}else if(result.namedom=="checknum"){
					if($(opt.target).find("input[name='"+result.namedom+"']").val()!=$(opt.target).find("input[name='"+opt.random+"']").val()){
						alert("验证码不正确");
						return false;
					}
				}else if(result.namedom=="password"){
					var str = /^[A-Za-z0-9]{8}$/;
					if($(opt.target).find("input[name='"+result.namedom+"']").val().length<8){
						alert("密码长度不小于8位");
						return false;
					}
					if(!str.test($(opt.target).find("input[name='"+result.namedom+"']").val())){
						alert("密码格式不正确");
						return false;
					}
					obj.password=$(opt.target).find("input[name='"+result.namedom+"']").val();
				}else if(result.namedom=="repassword"){
					if($(opt.target).find("input[name='"+result.namedom+"']").val()!=$(opt.target).find("input[name='password']").val()){
						alert("两次密码不相同");
						return false;
					}
					obj.password=$(opt.target).find("input[name='"+result.namedom+"']").val();
				}		
			}
		});
		
		return obj
	};
	var aa = check();
	if(aa!=false){
		return aa
	}
	this.refresh(1);
}

$(function(){
	$(document).ajaxSend(function(event, xhr, settings){
		if(settings.url.indexOf(".html")<0){
			$(".ready").show();
		}
	})
	$(document).ajaxComplete(function(event, xhr, settings){
		if(settings.url.indexOf(".html")<0){
			$(".ready").hide();
		}
	})
})

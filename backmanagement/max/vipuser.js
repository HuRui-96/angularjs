var baseurl ="http://10.3.134.63/show/oyav4/";
var myapp = angular.module("myapp",['ui.router','oc.lazyLoad',"commonApp"]);

myapp.factory("checknow",["$http",function($http){
	var obj = {};
	obj.check = function(refunction){
		$http.get(baseurl+"php/checknowuser.php").success(function(ress){
			if(ress.state == 'false'){
				location.assign("viploginin.html");
			}else{
				refunction();
			}
		})
	}
	return obj;
}])
myapp.config(function ($stateProvider, $urlRouterProvider,$ocLazyLoadProvider) {
    //如果没有路由引擎能匹配当前的导航状态，那它就会默认将路径路由至 PageTab.html, 这个页面就是状态名称被声明的地方. 只要理解了这个，那它就像switch case语句中的default选项.
    //$urlRouterProvider.when("", "/pagetab/:id");
    //定义了会在main.html页面第一个显示出来的状态，作为页面被加载好以后第一个被使用的路由.
    //这就向母版页的子页面，应用程序会首先加载这个main.html页面。
    $stateProvider
       .state("user", {
           url: "/user",//当 url 为#/pagetab
           templateUrl: "datagird.html?_" + Math.random(),
           controller: 'user',
           resolve:{
           		 des: function ($ocLazyLoad) {
           		 	var ctrl = $ocLazyLoad.load([
           		 		{  
	                        files: ['max/vip-user.css'], 
	                        cache:true
	                    }  
	                ]);
           		 }
           }
       })
       .state("product", {
           url: "/product",
           templateUrl: "datagird2.html?_" + Math.random(),
           controller: 'product',
           resolve:{
           		 des: function ($ocLazyLoad) {
           		 	var ctrl = $ocLazyLoad.load([
           		 		{  
	                        files: ['max/vip-product.css'], 
	                        cache:true
	                    }  
	                ]);
           		 }
           }
       })
       .state("changepass", {
           url: "/changepass",
           templateUrl: "changepass.html?_" + Math.random(),
           controller: 'changepass',
           resolve:{
           		 des: function ($ocLazyLoad) {
           		 	var ctrl = $ocLazyLoad.load([
           		 		{  
	                        files: ['max/vip-changepass.css'], 
	                        cache:true
	                    }  
	                ]);
           		 }
           }
       })
     $ocLazyLoadProvider.config({  
        debug: true, //知否启用调试模式  
        events:true  //事件绑定是否启用  
    }); 
      
});
myapp.controller("changepass",["$scope","$http","checknow",function($scope,$http,checknow){
	$scope.newpass = '';
	$scope.repass = '';
	$scope.oldpass = '';
	$scope.show = true;
	$scope.newpassword = function(){
		if($scope.newpass.length<8 || $scope.repass.length<8 || $scope.oldpass.length<8){
			$scope.passtitle = '密码长度不小于8位';
			$scope.show = false;
		}else if(!($scope.repass==$scope.newpass)){
			$scope.passtitle = '两次新密码不一致';
			$scope.show = false;	
		}else{
			$scope.show = true;
			checknow.check(function(){
				$http.post(baseurl+"php/changeyippass.php",{oldpwd:$scope.oldpass,newpwd:$scope.newpass}).success(function(rep){
					alert(rep.message);
					if(rep.state){
						$scope.newpass = '';
						$scope.repass = '';
						$scope.oldpass = '';
					}
				})
			});
		}
	}
	
}])
myapp.controller("headcon",["$scope","$http",function($scope,$http){
	$http.get(baseurl+"php/checknowuser.php").success(function(ress){
		if(ress.state == 'false'){
			location.assign("viploginin.html");
		}else{
			console.log(ress);
			$scope.user = ress.data[0]["account"];
		};
	})
}]);
var mycon = myapp.controller("mycon",["$scope","$http","$compile","checknow",function($scope,$http,$compile,checknow){
	if(location.hash=="#/user"){
		$("div.where span").eq(1).text("用户信息");
	}else if(location.hash=="#/product"){
		$("div.where span").eq(1).text("商品信息");
	}else if(location.hash==""){
		$("div.where span").eq(1).text("首页");
	}else if(location.hash=="#/changepass"){
		$("div.where span").eq(1).text("修改密码");
	}
	checknow.check(function(){
		$http.post(baseurl+"php/vipuserlist.php").success(function(rep){
			$scope.result = rep.data[0];
			$scope.nowli = '';
			
			$scope.towhere = function(n,_event){
				 $(_event.target).closest('li').addClass('li-selected').siblings('li').removeClass('li-selected');
				if(n == "用户信息"){
					location.hash="#/user";
					$("div.where span").eq(1).text("用户信息");
				}else if(n == "商品信息"){
					location.hash="#/product";
					$("div.where span").eq(1).text("商品信息");
				}else if(n == "退出登录"){
					$http.get("php/viplogout.php").success(function(res){
						location.assign("viploginin.html");
					})
				}else if(n == "修改密码"){
					location.hash="#/changepass";
					$("div.where span").eq(1).text("修改密码");
				}
			}
			
		})	
	});
	
	$scope.nowlist = function(n){
		if(n == "用户信息" && location.hash=="#/user"){
			return 'li-selected';	
		}else if(n == "商品信息" && location.hash=="#/product"){
			return 'li-selected';
		}else if(n == "修改密码" && location.hash=="#/changepass"){
			return 'li-selected';
		}
	}
	
}]);
myapp.controller("user",["$scope","$http","$sce","checknow",function($scope,$http,$sce,checknow){
	$scope.search='';
	$scope.language='cn';
	$scope.optionshow=false;
	$scope.editshow=true;
	$scope.returnli=function(){
		$scope.optionshow=false;
	}
	checknow.check(function(){
		$http.get(baseurl+"libs/data/dictionary.txt").success(function(res){
			$scope.dictionary = res;
			$scope.searchrange = $scope.dictionary['indexid'][$scope.language];
			$http.get(baseurl+"php/user.php").success(function(rep){
				$scope.data = rep.data;
				$scope.colspan = 0;
				$scope.pagerows=8;
				
				for(var i in $scope.data[0]){
					$scope.colspan +=1 ;
				}
				$scope.pagecount = Math.ceil($scope.data.length/8);
				var arr = [];
				for (var i = 1 ; i <= $scope.pagecount; i++) {
		            arr.push(i);
		        }
				
				$scope.arr=arr;
				$scope.pageindex=1;
			})
		})
	});
	
	
	$scope.interpret = function(name){
		return $scope.dictionary[name][$scope.language];
	};
	$scope.clonn = function(_tr, _event){
        $(_event.target).closest('tr').addClass('tr-selected').siblings('tr').removeClass('tr-selected');
		delete _tr.$$hashKey;
		$scope.cloned = _tr;
		$scope.optionshow=true;
		$scope.editshow=true;
	};
	$scope.dischange = function(name,res){
		if((name =="indexid")||( name=="phone")){
			return $sce.trustAsHtml("<div class='"+name+"'>"+res+"</div>");
		}else{
			return $sce.trustAsHtml('<input type="text" value="'+res+'" name="'+name+'" />');
		}
	};
	$scope.upuser = function(){
		if($('[name=account]').val()==0){
			alert("用户昵称不能为空");
			return false;
		}
		if($('[name=password]').val().length<8){
			alert("密码不能小于8位");
			return false;
		}
		var cc= {indexid:$('.indexid').text(),phone:$('.phone').text(),account:$('[name=account]').val(),password:$('[name=password]').val()};
		checknow.check(function(){
			$.post(baseurl+"php/cahngeuser.php",cc,function(rep){
				alert(JSON.parse(rep).message);
				$http.get(baseurl+"php/user.php").success(function(reppp){
					$scope.data = reppp.data;
					$scope.optionshow=false;
					$scope.editshow=true;
				})
			})
		});
		
	};
	$scope.page = function (_index) {
        $scope.pageindex = _index;
    };
	$scope.mysearch = function(item){
		for(var mean in $scope.dictionary){
			if($scope.dictionary[mean][$scope.language] == $scope.searchrange){
				if(item[mean].toString().indexOf($scope.search)>-1){
					return item;	
				}
			}
		}
		
	};
	$scope.changepage = function(){
		var ac = 0;
		
		for(var j=0;j<$scope.data.length;j++){
			for(var mean in $scope.dictionary){
				if($scope.dictionary[mean][$scope.language] == $scope.searchrange){
					if($scope.data[j][mean].toString().indexOf($scope.search)>-1){
						ac ++;
					}
				}
			}
			
		}
		$scope.pagecount = Math.ceil(ac / $scope.pagerows);
		var arr = [];
		for (var i = 1 ; i <= $scope.pagecount; i++) {
            arr.push(i);
        }
		
		$scope.arr=arr;
		$scope.pageindex = 1;
		console.log(ac);
	};

}]);
	
myapp.controller("product",["$scope","$http","$sce","checknow",function($scope,$http,$sce,checknow){
	$scope.search='';
	$scope.language='cn';
	$scope.optionshow=false;
	$scope.editshow=true;
	$scope.addshow=true;
	$scope.returnli = function(){
		$scope.optionshow=false;
		$scope.editshow=false;
		$scope.addshow=false;
	}
	checknow.check(function(){
		$http.get(baseurl+"libs/data/dictionary.txt").success(function(res){
			$scope.dictionary = res;
			$scope.searchrange = $scope.dictionary['productid'][$scope.language];
			$http.get(baseurl+"php/prod.php").success(function(rep){
				$scope.data = rep.data;
				$scope.colspan = 0;
				$scope.pagerows=8;
				
				for(var i in $scope.data[0]){
					$scope.colspan +=1 ;
				}
				$scope.pagecount = Math.ceil($scope.data.length/$scope.pagerows);
				var arr = [];
				for (var i = 1 ; i <= $scope.pagecount; i++) {
		            arr.push(i);
		        }
				
				$scope.arr=arr;
				$scope.pageindex=1;
			})
		})
	});
	
	$scope.interpret = function(name){
		return $scope.dictionary[name][$scope.language];
	};
	$scope.delete = function(val){
		checknow.check(function(){
			if(confirm("确定删除该商品，商品号："+val.productid+"  商品名："+val.title)){
				$.post(baseurl+"php/delpro.php",val,function(repp){
					alert(JSON.parse(repp).message);
					$http.get(baseurl+"php/prod.php").success(function(reppp){
						$scope.data = reppp.data;
						$scope.changepage();
					})
				})
			}
		});
		
	};
	$scope.selctimg = function(v,s){
		if(v=='src'){
			return $sce.trustAsHtml('<img src="'+ s +'"/>');
		}else{
			return $sce.trustAsHtml('<p>'+s+'</p>');
		}
	};
	$scope.upproduct = function(){
		if($('[name=money]').eq(1).val().length==0){
			alert("价格不能为空");
			return false;
		}
		if($('[name=title]').eq(1).val().length==0){
			alert("商品名不能为空");
			return false;
		}
		if($('form.upproduct input').val().length==0){
			checknow.check(function(){
				$.post(baseurl+'php/changeproduct.php',{productid:$scope.cloned.productid,money:$('[name=money]').eq(1).val(),title:$('[name=title]').eq(1).val(),src:$scope.cloned.src},function(repson){
	       			var repp = eval('('+repson+')');
	       			alert(repp.message);
	       			$http.get(baseurl+"php/prod.php").success(function(reppp){
						$scope.data = reppp.data;
						$scope.optionshow=false;
						$scope.editshow=true;
						$scope.addshow=true;
					})
	       		})
			});
			
		}else{
			checknow.check(function(){
				$('form.upproduct').ajaxSubmit({
					type: 'post',
					url: baseurl+'php/form.php',
					success:function(data){
		               var dd = JSON.parse(data);
		               if(dd.status){
		               	console.log(dd);
		               		$.post(baseurl+'php/changeproduct.php',{productid:$scope.cloned.productid,money:$('[name=money]').eq(1).val(),title:$('[name=title]').eq(1).val(),src:'img/'+dd.fileName},function(repson){
		               			var repp = eval('('+repson+')');
		               			alert(repp.message);
		               			$http.get(baseurl+"php/prod.php").success(function(reppp){
									$scope.data = reppp.data;
									$scope.optionshow=false;
									$scope.editshow=true;
									$scope.addshow=true;
								})
		               		})
		               }
		            },
		            error:function(XmlHttpRequest,textStatus,errorThrown){
		                console.log(XmlHttpRequest);
		                console.log(textStatus);
		                console.log(errorThrown);
		            }
				})		
			});
		}
	};
	$scope.showadd = function(){
		$('[name=money]').eq(0).val("");
		$('[name=title]').eq(0).val("");
		$('form.upprod input').val("");
		$(".tr-selected").removeClass("tr-selected");
		$scope.optionshow=true;
		$scope.editshow=false;
		$scope.addshow=true;
	}
	$scope.clonn = function(_tr, _event){
        $(_event.target).closest('tr').addClass('tr-selected').siblings('tr').removeClass('tr-selected');
		delete _tr.$$hashKey;
		$scope.cloned = _tr;
		$scope.optionshow=true;
		$scope.editshow=true;
		$scope.addshow=false;
	};
	$scope.dischange = function(name,res){
		if(name=="productid"){
			return $sce.trustAsHtml("<div>"+res+"</div>");
		}else if(name=="src"){
			return $sce.trustAsHtml('<form class="upproduct"><input type="file" name="file" /></form>');
		}else{
			return $sce.trustAsHtml('<input type="text" value="'+res+'" name="'+name+'" />');
		}
		
	}
	$scope.page = function (_index) {
        $scope.pageindex = _index;
    };
	$scope.mysearch = function(item){
		for(var mean in $scope.dictionary){
			if($scope.dictionary[mean][$scope.language] == $scope.searchrange){
				
				if(item[mean].toString().indexOf($scope.search)>-1){
					return item;
				}
			}
		}

	};
	$scope.upprod = function(){
		if($('[name=money]').eq(0).val().length==0){
			alert("价格不能为空");
			return false;
		}
		if($('[name=title]').eq(0).val().length==0){
			alert("商品名不能为空");
			return false;
		}
		if($('form.upprod input').val().length==0){
			alert("请选择图片！");
			return false;
		}else{
			checknow.check(function(){
				$('form.upprod').ajaxSubmit({
					type: 'post',
					url: baseurl+'php/form.php',
					success:function(data){
						console.log(data);
		               var dd = JSON.parse(data);
		               if(dd.status){
		               		$.post(baseurl+'php/updata.php',{money:$('[name=money]').eq(0).val(),title:$('[name=title]').eq(0).val(),src:'img/'+dd.fileName},function(repson){
		               			var repp = eval('('+repson+')');
		               			alert(repp.message);
		               			$http.get(baseurl+"php/prod.php").success(function(reppp){
									$scope.data = reppp.data;
									$scope.optionshow=false;
									$scope.editshow=true;
									$scope.addshow=true;
								})
		               		})
		               }
		            },
		            error:function(XmlHttpRequest,textStatus,errorThrown){
		                console.log(XmlHttpRequest);
		                console.log(textStatus);
		                console.log(errorThrown);
		            }
				})		
			});
		}
		
	};
	$scope.changepage = function(){
		var ac = 0;
		
		for(var j=0;j<$scope.data.length;j++){
			for(var mean in $scope.dictionary){
				if($scope.dictionary[mean][$scope.language] == $scope.searchrange){
					if($scope.data[j][mean].toString().indexOf($scope.search)>-1){
						ac ++;
					}
				}
			}
			
		}
		$scope.pagecount = Math.ceil(ac / $scope.pagerows);
		var arr = [];
		for (var i = 1 ; i <= $scope.pagecount; i++) {
            arr.push(i);
       };
		
		$scope.arr=arr;
		$scope.pageindex = 1;
		console.log(ac);
	};
}]);
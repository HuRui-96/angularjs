//组件和指令模块
;
(function() {
	var directives = angular.module("directives", []);
	//底部
	directives.directive("hfooter", function() {
		return {
			replace : true,
			templateUrl: "directives/hfooter.html"
		}
	});
	directives.directive("hheader", function() {
		return {
			replace : true,
			templateUrl: "directives/hheader.html"
		}
	});
	//轮播图
	directives.directive("hswiper", function() {
		return {
			replace : true,
			templateUrl: "directives/hswiper.html",
			link: function(scope, ele, attr) {
				var swiper = new Swiper('.swiper-container', {
					pagination: '.swiper-pagination',
					paginationClickable: true
				});
			}
		}
	});
	//推荐页内容
	directives.directive("hlist", function() {
		return {
			replace : true,
			templateUrl: "directives/hlist.html"
		}
	});
	//新闻页内容
	directives.directive("hnews",function(){
		return {
			replace : true,
			templateUrl : "directives/hnews.html"
		}
	});
	//Loading
	directives.directive("hloading",function(){
		return {
			replace : true,
			templateUrl : "directives/hloading.html"
		}
	});
	//搜索框
	directives.directive("hsearch",function(){
		return {
			replace : true,
			templateUrl : "directives/hsearch.html"
		}
	})
})();
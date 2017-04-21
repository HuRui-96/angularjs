//路由模块
;
(function() {
	var routers = angular.module("routers", [])
	routers.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
		//第一层路由，切换推荐，新闻，社会，娱乐内容
		$stateProvider.state('index', {
				url: '/index',
				templateUrl: 'template/index.html',
				controller: 'indexCtrl'
			})
			.state('index.recommend', {
				url: '/recommend',
				templateUrl: "template/recommend.html",
				controller: "recommendCtrl"
			})
			//新闻
			.state("index.entertain", {
				url: "/entertain",
				templateUrl: "template/same.html",
				controller: "entertainCtrl"
			})
			//社会
			.state("index.society", {
				url: "/society",
				templateUrl: "template/same.html",
				controller: "societyCtrl"
			})
			//军事
			.state("index.military", {
				url: "/military",
				templateUrl: "template/same.html",
				controller:"militaryCtrl"
			})
			//新闻详情页
			.state("detail", {
				url: "/detail/:id",
				templateUrl: "template/detail.html",
				controller: "detailCtrl"
			});
		$urlRouterProvider.when("", "/index")
	}])
})();
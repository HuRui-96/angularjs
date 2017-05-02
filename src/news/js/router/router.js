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
				templateUrl: "template/news.html",
				controller: "entertainCtrl"
			})
			//音乐
			.state("index.music", {
				url: "/music",
				templateUrl: "template/music.html",
				controller: "music"
			})
			//军事
			.state("index.meinv", {
				url: "/meinv",
				templateUrl: "template/meinv.html",
				controller:"meinvCtrl"
			})
			//新闻详情页
			.state("detail", {
				url: "/detail/:id",
				templateUrl: "template/detail.html",
				controller: "detailCtrl"
			});
		$urlRouterProvider.when("", "/index/recommend")
	}])
})();
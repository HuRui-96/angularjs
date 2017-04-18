var app = angular.module('hrapp',['ui.router']);
app.config(function($stateProvider,$urlRouterProvider){
	/*
	 * page层路由，该层路由点击让页面不同的分类
	 * 
	 * page.xx路由，点击切换同一个分类里不同的内容
	 */
	$stateProvider.state('page',{
		url : '/page',
		templateUrl : 'template/duanzi.html'
	})
	.state('page2',{
		url : '/page2',
		templateUrl : 'template/shenav.html'
	}).state('page2.all',{
		url : '/all',
		templateUrl : 'template/shehui.html',
	}).state('page2.hb',{
		url : '/hb',
		templateUrl : 'template/qita.html',
		controller : 'page2hb'
	}).state('page2.spaq',{
		url : '/spaq',
		templateUrl : 'template/qita.html',
		controller : 'page2spaq'
	}).state('page2.ffcl',{
		url : '/ffcl',
		templateUrl : 'template/qita.html',
		controller : 'page2ffcl'
	})
	
	.state('page3',{
		url : '/page3',
		templateUrl : 'template/yule.html'
	});
	
	
	$urlRouterProvider.otherwise('/page');
});

app.controller('page2hb',function($scope){
	$scope.title = "江西井冈山一木板桥塌陷 至少10名香港人受伤";
	$scope.news = "中国新闻网";
	$scope.pinlun = "163评论";
	$scope.time = "1分钟前"
});
app.controller('page2spaq',function($scope){
	$scope.title = "江西井冈山";
	$scope.news = "人民日报";
	$scope.pinlun = "163评论";
	$scope.time = "1分钟前"
});
app.controller('page2ffcl',function($scope){
	$scope.title = "一木板桥塌陷 ";
	$scope.news = "南方网";
	$scope.pinlun = "没有评论";
	$scope.time = "3分钟前"
});

app.directive('topnav',function(){
	return {
		templateUrl : 'template/top.html'
	}
});
app.directive('rightnav',function(){
	return {
		templateUrl : 'template/right.html'
	}
})

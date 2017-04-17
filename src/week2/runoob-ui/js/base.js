var app = angular.module('hrapp',['ui.router']);
app.config(function($stateProvider){
	/*
	 * html,suggest是第一层路由。这层路由改变整个页面的模板。
	 * 
	 *html.pageXX导航是第二层路由，点击page1,page2,page3内容模板改变，头尾不变
	 * 
	 * html.page1.a是第三层路由，这层路由改变主体内容的分内容
	 */
	$stateProvider.state('html',{
		url : '/html',
		templateUrl : 'template/common.html'
	})
	.state('html.page1',{
		url : '/page1',
		templateUrl : 'template/page1.html',
		controller : 'page1Ctrl'
	})
	.state('html.page1.a',{
		url:'/a',
		templateUrl:'template/page1A.html'
	}).state('html.page1.b',{
		url:'/b',
		template:'<p>b</p>'
	}).state('html.page1.c',{
		url:'/c',
		template:'<p>c</p>'
	})
	
	.state('html.page2',{
		url : '/page2',
		templateUrl : 'template/page1.html',
		controller : 'page2Ctrl'
	}).state('html.page3',{
		url : '/page3',
		templateUrl : 'template/page1.html',
		controller : 'page3Ctrl'
	})
	
	.state('suggest',{
		url:'/suggest',
		templateUrl:'template/suggest.html'
	})
})



//page1,page2,page3 共用一套模板，各自的数据不一样
app.controller('page1Ctrl',function($scope){
	$scope.arr = [{
		url:'#!/html/page1/a',
		name:'a'
	},{
		url:'#!/html/page1/b',
		name:'b'
	},{
		url:'#!/html/page1/c',
		name:'c'
	}]
})
app.controller('page2Ctrl',function($scope){
	$scope.arr = [{
		url:'#!/html/page1/a',
		name:'page2'
	},{
		url:'#!/html/page1/b',
		name:'page2'
	},{
		url:'#!/html/page1/c',
		name:'page2'
	}]
})
app.controller('page3Ctrl',function($scope){
	$scope.arr = [{
		url:'#!/html/page1/a',
		name:'page3'
	},{
		url:'#!/html/page1/b',
		name:'page3'
	},{
		url:'#!/html/page1/c',
		name:'page3'
	}]
})

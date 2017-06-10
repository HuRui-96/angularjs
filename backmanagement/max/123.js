var myScroll;
myScroll = new IScroll(".products", {
	scrollbars: true,
	mouseWheel: true,
	interactiveScrollbars: true,
	shrinkScrollbars: 'scale',
	fadeScrollbars: true,
	
});
var tjl = angular.module("tjl",["ngSanitize"]);
var dd = tjl.controller("tjlcontrol",["$scope","$http",function($scope,$http){
	$http.get("libs/data/products.txt").success(function(rep){
		$scope.data = rep.data;
		setInterval(function(){
			myScroll.refresh();
		},30) 
	})
}]);
myScroll.refresh();
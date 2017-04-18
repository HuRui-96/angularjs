//console.log(angular);
var app = angular.module('hrapp', ['global']);
app.controller('controllerA', function($scope, $http, pagerow, searchFactory, $timeout) {

	$scope.rows = pagerow;
	$scope.page = 1;

	document.getElementsByClassName('mask')[0].style.display = 'block';
	$http.get('data/data.txt').then(function(response) {
		console.log(response);
		$scope.dataSource = response.data.data;
		$scope.rowcount = $scope.dataSource.length;
		$scope.pagecount = Math.ceil($scope.rowcount / $scope.rows);
		
		$timeout(function() {
			document.getElementsByClassName('mask')[0].style.display = 'none';
		}, 1000);		
	});

	$scope.myfilter = function(item) {
		return searchFactory.filter(item, $scope.rowname, $scope.keyword);
	}

	$scope.pagination = function(event) {
		document.getElementsByClassName('mask')[0].style.display = 'block';
		$scope.page = event.target.innerHTML;
		$timeout(function() {
			document.getElementsByClassName('mask')[0].style.display = 'none';
		}, 500);
	}
});
app.directive('data', function() {
	return {
		restrict: "AE",
		templateUrl: 'data/data.html'
	}
});
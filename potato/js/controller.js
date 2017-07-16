var controllers = angular.module('controllers',[]);

controllers.controller('homeCtrl',['$scope',function($scope){
    $scope.msg = 'R商城';
}])
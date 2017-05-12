//控制器模块
;
(function() {
	var controllers = angular.module("controllers", []);
	controllers.controller("indexCtrl", ["$scope", function($scope) {
		$scope.item = 0;
		$scope.itemOn = function(item) {
			$scope.item = item;
		}
	}]);
	controllers.controller("recommendCtrl", ["$scope", "$http", "$timeout", function($scope, $http, $timeout) {
		$scope.title = "推荐";
		$scope.page = 0;
		$scope.news = [];
		$scope.tanc = "opacity: 0; display: none;";
		/*初始化*/
		$scope.count = 0; /*计数器*/
		$scope.pageStart = 0; /*开始位置*/
		$scope.pageSize = 4; /*数据显示几条*/

		$scope.loadMore = function(offset, size) {
				$scope.isLoading = true;
				$timeout(function() {
					$http({
						url: "data/news2.json",
						method: "GET",
						params: {
							channel_id: 6,
							page: $scope.page++
						}
					}).then(function(data) {
						//console.log(data);
						$scope.sum = data.data.news_list.length;
						if($scope.pageStart >= $scope.sum) {
							console.log("没有更多数据了。");
							$scope.tanc = "opacity: 1; ";
							$scope.isLoading = false;
							return false;
						}
						/*如果剩下的记录数不够分页，就让分页数取剩下的记录数
						 * 例如分页数是4，只剩2条，则只取2条
						 *
						 * 实际MySQL查询时不写这个不会有问题
						 */
						if($scope.sum - $scope.pageStart < $scope.pageSize) {
							$scope.pageSize = $scope.sum - $scope.pageStart;
						}

						/*使用for循环模拟SQL里的limit(start,size)*/
						for(var i = $scope.pageStart; i < ($scope.pageStart + $scope.pageSize); i++) {
							$scope.news = $scope.news.concat(data.data.news_list[i]);
						}
						$scope.count += 1;
						$scope.pageStart = $scope.count * $scope.pageSize;
						//					console.log($scope.count)
						//					console.log($scope.pageStart)
						$scope.isLoading = false;
					})
				}, 1500)

			}
			/*首次加载*/
		$scope.loadMore($scope.pageStart, $scope.pageSize);
		//隐藏弹窗
		$scope.hideTanC = function() {
			$scope.tanc = "opacity: 0; display: none;";
		}
		//搜索框
		$scope.isShowSearchBar = false;
		$scope.showSearchBar = function() {
			$scope.isShowSearchBar = true;
		}
		$scope.searchName = '';
		//清空搜索框
		$scope.searchClear = function() {
			$scope.searchName = "";
			$scope.isShowSearchBar = false;
		}
	}]);
	controllers.controller("entertainCtrl", ["$scope", "$http", function($scope, $http) {
		$scope.title = "新闻";
		//搜索框
		$scope.isShowSearchBar = false;
		$scope.showSearchBar = function() {
			$scope.isShowSearchBar = true;
		}
		$scope.searchName = '';
		//清空搜索框
		$scope.searchClear = function() {
			$scope.searchName = "";
			$scope.isShowSearchBar = false;
		}

		function formatterDateTime() {
			var date = new Date()
			var month = date.getMonth() + 1
			var datetime = date.getFullYear() +
				"" // "年"
				+
				(month >= 10 ? month : "0" + month) +
				"" // "月"
				+
				(date.getDate() < 10 ? "0" + date.getDate() : date
					.getDate()) +
				"" +
				(date.getHours() < 10 ? "0" + date.getHours() : date
					.getHours()) +
				"" +
				(date.getMinutes() < 10 ? "0" + date.getMinutes() : date
					.getMinutes()) +
				"" +
				(date.getSeconds() < 10 ? "0" + date.getSeconds() : date
					.getSeconds());
			return datetime;
		}

		$scope.isLoading = true;
		$http({
			//method : 'JSONP',
//			url: 'http://route.showapi.com/1310-1',
			url: "data/xinwen.json",
//			params: {
//				"showapi_timestamp": formatterDateTime(), //注意要使用当前时间。服务器只处理时间误差10分钟以内的请求
//				"showapi_appid": '26916', //这里需要改成自己的appid
//				"showapi_sign": '72fa78be4c2045138d456456fb9a3a90' //这里需要改成自己的密钥
//			}
		}).then(function(data) {
			//console.log(data.data.showapi_res_body.showapi_res_body.list)
//			var da = data.data.showapi_res_body.showapi_res_body.list;
//			da = JSON.stringify(da);
//			console.log(da);
////			console.log(data.data);
//			$scope.news = data.data.showapi_res_body.showapi_res_body.list;
			$scope.news = data.data;
			$scope.isLoading = false;
		})
	}]);
	controllers.controller("music", ["$scope", "$http", function($scope, $http) {
		$scope.title = "热门音乐Top100";
		$scope.down = "下载地址";
		$scope.listen = "试听地址";
		$scope.topid = 5;
		$scope.rows = 15;
		$scope.page = 1;
		$scope.isLoading = true;
//		$http.get('data/qq_music.php', {
//			params: {
//				type: $scope.topid
//			}
//		}).then(function(data) {
////			var shuju = data.data.showapi_res_body.pagebean.songlist;
////			shuju = JSON.stringify(shuju);
////			console.log(shuju);
//			$scope.musiclist = data.data.showapi_res_body.pagebean.songlist;
//			$scope.pagecount = $scope.musiclist.length / $scope.rows;
//			$scope.isLoading = false;
//		});
		$http({
			url: "data/music.json",
		}).then(function(data){
			$scope.musiclist = data.data;
			$scope.pagecount = $scope.musiclist.length / $scope.rows;
			$scope.isLoading = false;
		});
		//点击分页
		$scope.pagination = function(event) {
			$scope.page = event.target.innerHTML;
		}
	}]);
	controllers.controller("meinvCtrl", ["$scope", "$http", function($scope, $http) {
		$scope.title = "美女";
		$scope.page = 1;
		$scope.isLoading = true;
//		$http({
//			url: 'http://127.0.0.1:82/src/yyapi/data/meinv.php',
//			type: 'get',
//			params: {
//				page: $scope.page
//			}
//		}).then(function(data) {
//			console.log(data);
//			$scope.list = data.data.showapi_res_body.newslist;
//			$scope.isLoading = false;
//		})
		$http({
			url: "data/meinv.json",
		}).then(function(data){
			console.log(data);
			$scope.list = data.data.showapi_res_body.newslist;
			$scope.isLoading = false;
		});
	}]);
	controllers.controller("shezCtrl",["$scope",function($scope) {
		$scope.title = "设置";
	}]);
	controllers.controller("detailCtrl", ["$scope", "$http", "$location", "$state", function($scope, $http, $location, $state) {
		//console.log($state.params)
		$scope.id = $state.params.id;
		$http({
			url: 'data/news2.json',
			method: 'get',
			params: {
				id: $state.id
			}
		}).then(function(data) {
			//console.log(data.data.news_list[$scope.id])
			$scope.newData = data.data.news_list[$scope.id];
		})
	}]);

})();
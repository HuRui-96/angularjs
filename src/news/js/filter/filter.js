//过滤器模块
;
(function() {
	var app = angular.module('filter', []);
	app.filter('rang', function() {
		return function(array, rang) {
			if(!(array instanceof Array)) {
				array = [];
			}
			if(typeof rang != 'number' || parseInt(rang) < 1) {
				rang = 1;
			}
			for(var i = 0; i < rang; i++) {
				array.push(i);
			}
			return array;
		}
	});
})();
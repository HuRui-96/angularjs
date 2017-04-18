var global = angular.module('global',[]);

global.value('pagerow', 5);

global.factory('searchFactory',[function(){
	return {
		filter: function(item, columnName, keyword){
			if(columnName && keyword && (item[columnName] + '').indexOf(keyword) > -1){
				return true;
			} else if(!columnName || !keyword) {
				return true;
			}
			return false;
		}
	};
}]);

global.filter('rang', function() {
	return function(array, rang) {
		if (!(array instanceof Array)) {
			array = [];
		}
		if (typeof rang != 'number' || parseInt(rang) < 1 ) {
			rang = 1;
		}
		for(var i = 0; i < rang; i++) {
			array.push(i);
		}
		return array;
	}
});
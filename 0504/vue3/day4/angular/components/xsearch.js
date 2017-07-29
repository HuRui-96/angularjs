app.directive("xsearch", ()=>{
	return {
		template: `
					<div class="has_header ng-scope">
						<div class="weui-search-bar" ng-class="{'weui-search-bar_focusing':isShowSearchBar}" id="search_bar">
							<form class="weui-search-bar__form ng-pristine ng-valid">
								<div class="weui-search-bar__box">
									<i class="weui-icon-search"></i>
									<input type="search" ng-model="searchName" ng-focus="showSearchBar()" class="weui-search-bar__input ng-pristine ng-untouched ng-valid ng-empty" id="search_input" placeholder="搜索">
									<a href="javascript:" ng-click="searchClear()" class="weui-icon-clear" id="search_clear"></a>
								</div>
								<label for="search_input" class="weui-search-bar__label" id="search_text">
									<i class="weui-icon-search"></i>
									<span>搜索</span>
									</label>
							</form>
							<a href="javascript:" ng-click="isShowSearchBar=false" class="weui-search-bar__cancel-btn" id="search_cancel">取消</a>
						</div>
					</div>
				`,
		link(scope, ele, attr) {
			scope.isShowSearchBar = false
			scope.searchName = ""
			scope.showSearchBar = function() {
				scope.isShowSearchBar = true
			}
			$(ele).css("color", "red")
			scope.searchClear = function() {
				scope.searchName = ""
				$(ele.find("input")[0]).focus()
			}

		}
	}
})
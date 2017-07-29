## vuex
安装vuex
```
cnpm install vuex
```
引入JS，记得在vue后面引入
```javascript
<script src="js/vuex.js"></script>
```
定义vuex状态管理的仓库
```javascript
		var store = new Vuex.Store({
			//存储数据的地方
			state:{
				name:"新闻",
				author:"wscats",
				searchName:""
			},
			mutations:{
				//改变值的方法
				changeName:function(state,a){
					state.name = a
				},
				changesearchName:function(state,a){
					state.searchName = a
				}
			},
			//获取数据的方法
			getters:{
				getName:function(state){
					return state.name
				}
			}
		})
```
把store注入到构造器里面
```
		new Vue({
			el: "#demo",
			components: {},
			store//注入store
		})
```
获取vuex中的state的值
利用`this.$store.state.searchName`获取值
```
	//推荐用计算属性拿
	computed:{
		searchName:function(){
			//vuex的state里面拿数据
			return this.$store.state.searchName
		},
	},
	//也可以用方法来获取
	methods:{
		getSearchName:function(){
			//vuex的state里面拿数据
			this.searchName = this.$store.state.searchName
		},
	},
```
设置vuex中的state的值
commit的第一个参数是触发vuex中的mutations的函数，让它帮我们修改对应的值
```
	this.$store.commit('changesearchName',this.searchName)
```
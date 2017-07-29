//头部组件
Vue.component("xheader", {
	template: `
			<div class="weui-tabbar weui-wheader">
				<p class="ng-binding">{{searchName}}</p>
				<button @click="getSearchName()">Ok</button>
			</div>
			`,
	data:function(){
		return {
			searchName: "abc"
		}
	},
	computed:{
		name:function(){
			//vuex的state里面拿数据
			return this.$store.state.name
		},
		/*searchName:function(){
			return this.$store.state.searchName
		},*/
	},
	methods:{
		getSearchName:function(){
			//vuex的state里面拿数据
			this.searchName = this.$store.state.searchName
		},
	},
	ready:function(){
		console.log(this)
	}
})
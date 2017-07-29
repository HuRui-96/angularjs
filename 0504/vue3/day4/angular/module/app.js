var app = angular.module("demo", ["ui.router"]);
app.config(($stateProvider)=>{
	$stateProvider.state('index',{
		url:'/index',
		template:`
			<xheader></xheader>
			<xsearch></xsearch>
			<third-cp></third-cp>
		`,
	}).state('home',{
		url:'/home',
		template:`
			<p>home</p>
		`,
	})
})

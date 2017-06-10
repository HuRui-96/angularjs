$(function(){
	$("header").load("header1.html",function(responseTxt,statusTxt,xhr){
		if(statusTxt=="success"){
			$(".header1").find("div").text("待收货");
			setTimeout(function(){
				$("header").show();
			},50)
		}
	});
	new Vue({
		el:".takegoods",
		data:{
			list:[],
		},
		mounted:function(){
			this.begin();
		},
		methods:{
			begin:function(){
				$this = this;
				$.get(baseurl+"php/takegoods.php",function(rep){
					if(eval("("+rep+")").state){
						$this.list = eval("("+rep+")").data;
						$(".takegoods").show();
						var myScroll;
						myScroll = new IScroll("div.takegoods", {
							scrollbars: true,
							mouseWheel: true,
							interactiveScrollbars: true,
							shrinkScrollbars: 'scale',
							fadeScrollbars: true,
							click:true
						});
						setTimeout(function(){
							myScroll.refresh();
						},200)
					}else{
						location.assign("login.html");
					}
					
				})
			},
			selevt:function(name,a){
				var product = eval("("+name+")");
				if(a == "all"){
					return (parseInt(product.amount)*parseInt(product.money))
				}else{
					return product[a];
				}
			}
		}
	});
})



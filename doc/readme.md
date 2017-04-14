##angularjs常识
[Module](angularjs使用模块化开发的)

一个angular程序就由一个主模块完成所有功能，一个主模块是由N个小模块组装成的
定义一个模块的方法就是`angular.module()`方法，接受两个参数
```javascript
	angular.module("模块的名字",['引入分模块的名字'])
```
模块化开发，方便我们团队开发，方便分工合作，方便找出问题的根源
```javascript
	//定义一个模块,是一个模块函数,主模块
	angular.module("app1",['app2','app3'])
	//小模块
	angular.module("app2",[])
	angular.module("app3",[])
```
ng-app作为一个属性值可以放在任何标签上，建议放在`<html>`和`<body>`标签上，放在那个标签上，那就是主模块控制那个标签的闭合作用域
```javascript
	ng-app="主模块的名字"
```
**ng-controller**作为控制器的定义标签，放在ng-app闭合标签的范围内

**ng-app**就是整个程序的作用域

**scope**定义完一个控制器后在控制器的函数里面注入一个`$scope`形参，
$scope就是控制所在范围的绑定值

控制层 C
```javascript
.controller("abc",function($scope){
		//model层
			$scope//是一个对象
			$scope.name  = "laoxie";
			$scope.age = 18
		})
```
视图层 V
```javascript
<div ng-controller="abc">
			<p>{{name}}</p>
			<p>{{age}}</p>
		</div>
```
##angularjs指令
**ng-bind**用来绑定值，相当于表达式{{}}

**ng-repeat**用来循环，重复创建代码

**ng-app** 定义作用域

**ng-model**此指令一般配合input select textarea标签使用,用来设置view层的数据

**ng-if**直接把DOM节点删除，或者插入DOM节点，ng-if比ng-show效率高一点

**ng-click**用来绑定点击事件
##自定义指令
```javascript
app.direcitve("指令的名字",自定义指令的函数(逻辑))
```
Angular叫指令，事实上就是组件
```javascript
app.directive("hr",function(){  //这个函数retrun 一个对象 通常包含几个属性
	return {
		restrict:'ECMA' //如果不写就是默认所有形式都可以呈现,可以支持"EA"和"EAMC"
		templateUrl : 'xxx.html'//如果组件html结构比较简单我们用`template`，如果组件html结构比较复杂我们用`templateUrl`
		replace : true或者false  //false表示显示组件的标签名
		scope ： true/false/{}  //表示组件和作用域三种关系  第一次影响/互相影响/互不影响
		link : function(scope,ele,attr){
			//link就是组件的控制器，存放该组件数据模型model
			//link控制该组件的逻辑，相当于组件内部的控制器
			scope用来绑定数据
			ele就是组件下的元素节点
			attr就是节点元素的属性值
		}
	}
})
```
##angularjs过滤器

|filter|methods|
|-|-|
|orderBy|排序|
|limitTo|可以用于分页,第一个参数就是截取的长度，第二个是截取的位置，可以用于截取字符串和数组|
|date|接受时间戳格式，处理成常用的时间格式|
##自定义过滤器
```javascript
app.filter("过滤器名字",function("服务")){
	return function("传入需要处理的值"){
		return "返回处理完的值"
	}
}
```

##服务
**$fiter服务**

**$sec服务**

**$http服务**
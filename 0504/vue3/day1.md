## 安装

先安装1.X的版本
```javascript
npm install vue@1
```
新建index.html，引入vue.js文件
vue比angular轻,vue的源码比较小

```javascript
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<script src="js/vue.js"></script>
	<body>
		<!--V-->
		<div id="demo">
			<p>{{name}}</p>
		</div>
	</body>
	<script>
		new Vue({
			el: "#demo",//element
			//M
			data: {
				name: "w"
			}
		})
	</script>
</html>
```
一般用id来绑定new Vue中的el,因为id具有唯一性,当然事实上class也是可以的，但不建议使用

## 指令
angular中指令,以属性值呈现在便签上，实现某类方法的复用
```javascript
ng-show
ng-click
ng-hide
ng-if
ng-repeat
ng-model
ng-change
ng-class
ng-style
ng-bind
ng-controller
ng-app
ng-bind-html
ng-keyup
```
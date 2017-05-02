##node.js
介绍：
Node 是一个 Javascript 运行环境(runtime)。实际上它是对 Google V8 引擎（应用于 Google Chrome 浏览器）进行了封装。V8 引擎执行 Javascript 的速度非常快，性能非常好。Node 对一些特殊用例进行了优化，提供了替代的 API，使得 V8 在非浏览器环境下运行得更好。

谷歌浏览器的控制台事实上就是V8引擎的界面，浏览器有窗口去看到页面效果，而nodejs环境就是一个脱离浏览器运行的V8引擎，它是没有显示页面的窗口
###install
[nodejs安装配置](http://www.runoob.com/nodejs/nodejs-install-setup.html)

### 客户端  也就是说浏览器
HTML
```javascript
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<body>
	</body>
	<script src="nodejs.js"></script>
</html>
```
JS 它如果不在HTM中嵌入，那这个脚本就失去了作用
```javascript
var a = 1;
setInterval(function() {
	console.log(a);
	a++
}, 1000)
```

### 服务器端 nodejs
```javascript
var a = 1;
setInterval(function() {
	console.log(a);
	a++
}, 1000)
```
在node命令行里面执行
```
node nodejs.js
```

### 浏览器引入多个JS的时候
```javascript
	<script src="nodejs.js"></script>
	<script src="module.js"></script>
```

### 服务端引入多个JS的时候
```javascript
	require("./nodejs.js");
	require("./module.js");
```
### nodeJs模块系统
[菜鸟教程介绍](http://www.runoob.com/nodejs/nodejs-module-system.html)
```
//带路径的自定义模块(服务)
var module = require("./module.js");
//不带路径的原生模块
var http = require("http");
```

### 创建服务器的步骤
接下来我们使用 http.createServer() 方法创建服务器，并使用 listen 方法绑定 8888 端口。 函数通过 request, response 参数来接收和响应数据。
1. 引入http模块
```javascript
var http = require("http");
```

2. 接下来我们使用 http.createServer() 方法创建服务器，并使用 listen 方法绑定 8888 端口。 函数通过 request, response 参数来接收和响应数据。
```javascript
http.createServer(function(request,response){
	//改写头部，允许跨域
	response.setHeader('Access-Control-Allow-Origin','*');
	var obj = {
		name:'wscats',
		age:88
	}
	response.end(JSON.stringify(obj))
}).listen(12345)
```
3. 打开服务器
```
node xxx-server.js
```

### nodejs获取前端传过来的数据
```javascript
$_GET['']
$_POST['']
```

```javascript
var url = require("url");
var querystring = require("querystring")
var paramsStr = url.parse(request.url).query
var params = querystring.parse(paramsStr)//$_GET['']
```

##Nodejs Express框架
[express官方文档](http://www.expressjs.com.cn/)

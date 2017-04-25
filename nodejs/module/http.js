//请求nodejs内置的模块http
var http = require('http');
//请求url模块 得到的是一个对象
/*
 { parse: [Function: urlParse],
  resolve: [Function: urlResolve],
  resolveObject: [Function: urlResolveObject],
  format: [Function: urlFormat],
  Url: [Function: Url] }
 */
var url = require('url');
//console.log(url);
//该模块的parse方法可以将键值对转换成对象
var querystring = require('querystring');
//console.log(querystring);

//创建http服务
http.createServer(function(request, response) {
	//url   http://localhost:8888/abc?name=hu&&age=18
//	console.log(request.url); //得到的是地址栏localhost:8888/之后的所有参数
//	console.log(url.parse(request.url).query); //得到的是localhost:8888/abc?之后的所有参数
	var paramstr = url.parse(request.url).query;
	var params = querystring.parse(paramstr);
	console.log(params);//{ name: 'hu', '': '', age: '18' }
	
	
	//改写头部，允许跨域
	response.setHeader('Access-Control-Allow-Origin','*');
	var obj = {
		name : 'xun',
		age : 17,
		skill : function() {console.log("CSS")}
	}
	
	response.end(JSON.stringify(obj))
}).listen(8888)
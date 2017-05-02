//nodejs  express框架

var express = require('express');
var app = express();
var mysql = require('mysql');
//创建连接
var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "10086q"
});
//中间件
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/',function(req,res){
	res.send("hello world")
});
app.get('/list',function(requst,response){
	response.send("list")
});
app.post('/list',function(req,res){
	//追加请求头
	res.append("Access-Control-Allow-Origin","*");
	console.log(req.body);
	connection.query('insert into websites (name,url,country) values ("' + req.body.names + '" ,"' + req.body.address + '","' + req.body.country + '")',function(err,data){
		console.log(data);
	})
});
app.listen(3000);


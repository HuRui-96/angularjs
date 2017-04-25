var http = require("http");
var url = require("url");
var querystring = require("querystring");
var mysql = require("mysql");

//创建连接
var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "10086q"
})
connection.connect();
http.createServer(function(request, response) {
			response.setHeader('Access-Control-Allow-Origin', '*');
			var paramsStr = url.parse(request.url).query;
			var params = querystring.parse(paramsStr);
			console.log(params);
			var pathname = url.parse(request.url).pathname;
			switch(pathname) {
				//查询的逻辑
				case "/select":
					connection.query("select * from websites", function(err, data) {
						if(err) {
							throw err
						} else {
							//					console.log('--------------------------SELECT----------------------------');
							//					console.log(data);
							//data => array
							var news = {};
							news.newlists = data;
							response.end(JSON.stringify(news));
						}
					})
					break;
				//增加
				case "/add":
					connection.query('insert into websites (name,url,country) values ("' + params.name + '" ,"' + params.address + '","' + params.country + '")', function(err, data) {
								if(err) {
									throw err
								} else {
									connection.query("select * from websites", function(err, data) {
											if(err) {
												throw err
											} else {
												var news = {};
												news.newlists = data;
												response.end(JSON.stringify(news));
											}
										})
									}
								})
						break;
				//删除
				case "/delete":
					connection.query('delete from websites where id =' + params.id,function(err,data){
						if (err) {throw err}
						else {
							connection.query('select * from websites',function(err,data){
								if (err) {throw err}
								else {
									var news = {};
									news.newlists = data;
									response.end(JSON.stringify(news));
								}
							})
						}
					})
					break;
				//修改
				case "/editdetail":
					connection.query("select * from websites where id = " + params.id,function(err,data){
						if (err) {throw err}
						else {
							var news = {};
							news.newlists = data;
							response.end(JSON.stringify(news));
						}
					})
					break;
				case "/edit":
					connection.query("update websites set country='" + params.country + "',name='" + params.name + "',url='" + params.address + "' where id =" + params.id,function(err,data){
						if (err) {throw err}
						else {
							connection.query('select * from websites',function(err,data){
								if (err) {throw err}
								else {
									var news = {};
									news.newlists = data;
									response.end(JSON.stringify(news));
								}
							})
						}
					})
					break;
			}
					
}).listen(8888)
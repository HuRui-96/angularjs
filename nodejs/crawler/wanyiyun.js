/*
 * 爬取网易云封面图片
 */
//http://www.cnblogs.com/CraryPrimitiveMan/p/3674421.html  博客：使用cheerio抓取网页数据
var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');

http.get('http://music.163.com/',function(res){
	var resData = '';
	res.on('data',function(data){
		resData += data;
	});
	res.on('end',function(){
		console.log(resData);//得到该页面的html结构
		var $ = cheerio.load(resData);
		//var a = $('li .m-cvrlst-alb4').length;
		//console.log($);
	})
}).on('error',function(){
	console.log(error)
})

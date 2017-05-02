//本案例通过爬虫获取网站的图片并保存到数据库
var http = require('http');
var mysql = require('mysql');
var fs = require('fs');

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'root',
	database : '10086q'
});
connection.connect();

//类似于服务端的jquery
var cheerio = require('cheerio');
//console.log(cheerio);
function download(url, callback) {
	http.get(url, function(res) {
		var data = "";
		res.on('data', function(chunk) {
			data += chunk;
		});
		res.on('end', function() {
			callback(data)
		});
	})
}

download("http://www.mzitu.com/zipai/comment-page-1/", function(data) {
	//console.log(data);
	//把html结构交给服务端的jq去处理
	var $ = cheerio.load(data);
	//console.log($("img"))
	var imgArr = [];
	$("img").each(function(index, ele) {
		//$(ele).attr("src")
		//console.log("名字", $(ele).attr("alt"));
		//console.log("路径", $(ele).attr("src"));
		//插入数据库
//		connection.query("insert into source (title,image) values ('" + $(ele).attr("alt") + "','" + $(ele).attr("src") + "')", function(err, data) {
//			if(err) throw {err}
//			console.log(imgArr.length);
//		});
		imgArr.push($(ele).attr("src"))
	})
	downloadImg(imgArr)
})
var i = 0;

function downloadImg(imgArr) {
	console.log(imgArr)
	var writerStream = fs.createWriteStream('./img/' + i + '.jpg');
	http.get(imgArr[i], function(res) {
		res.pipe(writerStream)
		if(i < imgArr.length) {
			i++;
			downloadImg(imgArr)
		} else {
			return;
		}
	})
}


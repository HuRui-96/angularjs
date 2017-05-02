var fs = require('fs');

var data = "腾讯上市时间为2004年";
var data2 = "腾讯五位创始人：马化腾，曾李青，陈一丹，.."

//创建一个可以写入的流，写入到文件output.txt文件里
var writerStream = fs.createWriteStream('./floder/output.txt');

writerStream.write(data2,'UTF8');
writerStream.end();
// 处理流事件 --> data, end, and error
writerStream.on('finish',function(){
	console.log("写入完成");
});
writerStream.on('error',function(err){
	console.log(err);
});
console.log("程序执行完毕")

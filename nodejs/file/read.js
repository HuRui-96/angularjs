var fs = require('fs');

console.log("start");
fs.readFile('test.txt',function(err,data){
	if(err){
		return console.log(err)
	}
	return console.log("异步读取："+data.toString());
});
console.log("end");

//同步读取
console.log("同步读取开始");
var data = fs.readFileSync('test.txt');
console.log("同步读取："+data.toString());
console.log("同步读取结束");

